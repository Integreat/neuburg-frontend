import React from 'react'
import PropTypes from 'prop-types'
import { Caption } from '@integreat-app/shared'
import { Button, FormHelperText } from '@material-ui/core'
import { NOT_FOUND } from 'http-status-codes'

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

  getErrorMessage () {
    switch (this.props.serverError.status) {
      case NOT_FOUND:
        return 'Das zugehörige Angebot konnte nicht gefunden werden.'
    }
    return this.props.serverError.message
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
      {this.props.serverError && <FormHelperText error>{this.getErrorMessage()}</FormHelperText>}
    </React.Fragment>
  }
}

export default DeleteOfferManager
