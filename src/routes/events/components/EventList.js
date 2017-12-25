import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import EventModel from 'modules/endpoint/models/EventModel'
import Caption from 'modules/common/components/Caption'

import cx from 'classnames'
import style from './EventList.css'

import EventPlaceholder1 from '../assets/EventPlaceholder1.jpg'
import EventPlaceholder2 from '../assets/EventPlaceholder2.jpg'
import EventPlaceholder3 from '../assets/EventPlaceholder3.jpg'
import RemoteContent from 'modules/common/components/RemoteContent'
import { translate } from 'react-i18next'

class Event extends React.Component {
  static propTypes = {
    event: PropTypes.instanceOf(EventModel).isRequired,
    parentUrl: PropTypes.string.isRequired,
    thumbnailPlaceholder: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
    isFirst: PropTypes.bool.isRequired
  }

  getUrl () {
    return `${this.props.parentUrl}/${this.props.event.id}`
  }

  getEventPlaceholder () {
    return (
      this.props.thumbnailPlaceholder === 0 ? EventPlaceholder1
        : this.props.thumbnailPlaceholder === 1 ? EventPlaceholder2
          : EventPlaceholder3
    )
  }

  render () {
    return (
      <Link href={this.getUrl()}>
        <div className={this.props.isFirst ? cx(style.firstEvent, style.event) : style.event}>
          <img className={style.eventThumbnail} src={this.props.event.thumbnail || this.getEventPlaceholder()}/>
          <div className={style.eventDescription}>
            <div className={style.eventTitle}>{this.props.event.title}</div>
            <div className={style.eventDate}>{this.props.event.getDate(this.props.language)}, {this.props.event.address}</div>
            <RemoteContent dangerouslySetInnerHTML={{__html: this.props.event.excerpt.slice(0, 70) + '...'}}/>
          </div>
        </div>
      </Link>
    )
  }
}

class EventList extends React.Component {
  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape({
      event: PropTypes.instanceOf(EventModel).isRequired,
      thumbnailPlaceholder: PropTypes.number.isRequired
    })).isRequired,
    url: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }

  render () {
    const {t} = this.props
    return (
      <div className={style.list}>
        <Caption title={t('news')}/>
        { this.props.events && this.props.events.length !== 0
          ? this.props.events.map((event, index) =>
            <Event key={event.event.id}
                   event={event.event}
                   parentUrl={this.props.url}
                   thumbnailPlaceholder={event.thumbnailPlaceholder}
                   language={this.props.language}
                   isFirst={index === 0}/>)
          : <div className={style.noEvents}>{t('currentlyNoEvents')}</div>
        }
      </div>
    )
  }
}

export default translate('events')(EventList)