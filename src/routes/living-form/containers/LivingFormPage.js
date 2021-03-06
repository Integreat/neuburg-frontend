import React from 'react'
import PropTypes from 'prop-types'
import getCurrentCityConfig from 'modules/city-detection/getCurrentCityConfig'
import environment from 'environment.config'
import { Caption } from '@integreat-app/shared'
import NeuburgForm from './NeuburgForm'
import TestumgebungForm from './TestumgebungForm'
import Failure from '../../../modules/common/components/Failure'
import { CREATED } from 'http-status-codes'
import withFetcher from 'modules/endpoint/hocs/withFetcher'
import CityConfig from 'modules/city-detection/CityConfig'
import HeidenheimForm from './HeidenheimForm'

const SENDER_MAIL = 'wohnraumboerse@integreat-app.de'

const availableForms = {
  'neuburgschrobenhausenwohnraum': NeuburgForm,
  'testumgebungwohnraum': TestumgebungForm,
  'lkheidenheimwohnraum': HeidenheimForm
}

export class LivingFormPage extends React.Component {
  static propTypes = {
    cityConfigs: PropTypes.arrayOf(PropTypes.instanceOf(CityConfig)).isRequired
  }
  state = { success: false, serverError: null, sending: false, emailAddress: '' }

  sendRequest = requestBody => {
    this.setState({ sending: true, serverError: null, emailAddress: requestBody.email })
    fetch(`${environment.apiBaseUrl}${getCurrentCityConfig(this.props.cityConfigs).cmsName}/offer/`, {
      body: JSON.stringify(requestBody),
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => {
      if (response.status === CREATED) {
        this.setState({ success: true, sending: false })
      } else {
        return response.json().then(error => this.setState({ serverError: error.errorMessage, sending: false }))
      }
    })
      .catch(() => {
        this.setState({ success: false, sending: false, serverError: 'Verbindung fehlgeschlagen' })
      })
  }

  render () {
    const currentCmsName = getCurrentCityConfig(this.props.cityConfigs).cmsName
    if (!availableForms[currentCmsName]) {
      return <Failure error='not-found:page.notFound' />
    }

    if (this.state.success) {
      return <React.Fragment>
        <Caption title='Fast fertig' />
        <p>Ihr Angebot wurde erfolgreich erstellt. Sie müssen nur noch Ihre E-Mail-Adresse bestätigen:</p>
        <p>Sie erhalten von <i>{SENDER_MAIL}</i> eine E-Mail an <i>{this.state.emailAddress}</i> mit
          einem Bestätigungslink.
          Klicken Sie darauf, um das Angebot freizuschalten.</p>
        <p>Falls Sie keine E-Mail bekommen haben, überprüfen Sie bitte, ob Sie die richtige E-Mail-Adresse angegeben
          haben und ob die E-Mail in Ihrem Spam-Ordner gelandet ist.</p>
      </React.Fragment>
    }

    const Form = availableForms[currentCmsName]

    return <React.Fragment>
      <Caption title={'Mietangebot erstellen'} />
      <Form sendRequest={this.sendRequest} sending={this.state.sending} serverError={this.state.serverError} />
    </React.Fragment>
  }
}

export default withFetcher('cityConfigs')(LivingFormPage)
