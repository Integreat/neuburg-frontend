import React from 'react'
import PropTypes from 'prop-types'
import { Caption } from '@integreat-app/shared'
import {Button, FormHelperText} from '@material-ui/core'

export class DeleteOfferManager extends React.Component {
  static propTypes = {
    send: PropTypes.func.isRequired,
    sending: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    serverError: PropTypes.string
  }

  handleClick = () => {
    this.props.send('DELETE')
  }

  render () {
    if (this.props.success) {
      return <React.Fragment>
        <Caption title={'Angebot gelöscht'} />
        <p>Ihr Angebot wurde erfolgreich gelöscht.</p>
      </React.Fragment>
    }

    return <React.Fragment>
      <Caption title={'Angebot Löschen?'} />
      <p>Wollen Sie das Mietangebot wirklich löschen? Ihre Daten werden permanent gelöscht.</p>
      <Button disabled={this.props.sending} variant='raised' onClick={this.handleClick}>
        {this.props.sending ? 'Wird gelöscht...' : 'Mietangebot Löschen'}
       </Button>
      {this.props.serverError && <FormHelperText error>{this.props.serverError}</FormHelperText>}
    </React.Fragment>
  }
}

export default DeleteOfferManager
