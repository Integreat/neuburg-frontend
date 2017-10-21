import React from 'react'
import PropTypes from 'prop-types'

import RichLayout from 'components/RichLayout'
import Events from '../../components/Content/Events'
import EventModel from 'endpoints/models/EventModel'
import EVENTS_ENDPOINT from 'endpoints/events'
import withFetcher from '../../endpoints/withFetcher'

class ContentWrapper extends React.Component {
  static propTypes = {
    /**
     * from withFetcher HOC which provides data from EVENTS_ENDPOINT
     */
    events: PropTypes.arrayOf(PropTypes.instanceOf(EventModel)).isRequired
  }

  render () {
    return <Events events={this.props.events}/>
  }
}

const FetchingContentWrapper = withFetcher(EVENTS_ENDPOINT)(ContentWrapper)

class EventsPage extends React.Component {
  render () {
    return (
      <RichLayout>
        <FetchingContentWrapper/>
      </RichLayout>
    )
  }
}

export default EventsPage