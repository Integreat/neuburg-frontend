import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import FontAwesome from 'react-fontawesome'
import { goBack } from 'redux-little-router'

import style from './Error.css'
import { connect } from 'react-redux'

class Error extends React.Component {
  static propTypes = {
    error: PropTypes.string.isRequired
  }

  /**
   * Go back in history!!
   * @param event The click event
   */
  goBack (event) {
    event.preventDefault()
    this.props.dispatch(goBack())
  }

  render () {
    const {t} = this.props
    return <div>
      <div className={style.centerText}>{t(this.props.error)}</div>
      <div className={style.centerText}><FontAwesome name='frown-o' size="5x"/></div>
      <a className={style.centerText} href="/" onClick={this.goBack}>Go back</a>
    </div>
  }
}

export default connect()(translate('errors')(Error))