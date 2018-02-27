import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import LanguageSelector from '../../common/containers/LanguageSelector'
import searchIcon from '../assets/magnifier.svg'
import locationIcon from '../assets/location-icon.svg'
import languageIcon from '../assets/language-icon.svg'
import LocationModel from 'modules/endpoint/models/LocationModel'
import Header from 'modules/layout/components/Header'
import HeaderNavigationItem from '../HeaderNavigationItem'
import HeaderActionItem from '../HeaderActionItem'
import SearchPage from '../../../routes/search/containers/SearchPage'
import LandingPage from '../../../routes/landing/containers/LandingPage'
import CategoriesPage from '../../../routes/categories/containers/CategoriesPage'
import EventsPage from '../../../routes/events/containers/EventsPage'
import integreatLogo from '../assets/integreat-app-logo.png'

class LocationHeader extends React.Component {
  static propTypes = {
    matchRoute: PropTypes.func.isRequired,
    locationModel: PropTypes.instanceOf(LocationModel).isRequired,
    language: PropTypes.string.isRequired,
    currentPath: PropTypes.string.isRequired,
    viewportSmall: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
  }

  getActionItems () {
    const {matchRoute} = this.props
    const currentParams = this.getCurrentParams()
    return [
      new HeaderActionItem({href: matchRoute(SearchPage).stringify(currentParams), iconSrc: searchIcon}),
      new HeaderActionItem({href: matchRoute(LandingPage).stringify(currentParams), iconSrc: locationIcon}),
      new HeaderActionItem({dropDownNode: <LanguageSelector />, iconSrc: languageIcon})
    ]
  }

  getCurrentParams () {
    return {
      location: this.props.locationModel.code,
      language: this.props.language
    }
  }

  getNavigationItems () {
    const {t, matchRoute, currentPath} = this.props
    const currentParams = this.getCurrentParams()

    const isEventsEnabled = () => this.props.locationModel.eventsEnabled
    const isExtrasEnabled = () => this.props.locationModel.extrasEnabled
    const isCategoriesEnabled = () => isExtrasEnabled() || isEventsEnabled()

    const isExtrasSelected = () => false
    const isCategoriesSelected = () => matchRoute(CategoriesPage).hasPath(currentPath)
    const isEventsSelected = () => matchRoute(EventsPage).hasPath(currentPath)

    const extras = isExtrasEnabled() &&
      new HeaderNavigationItem({
        href: '/',
        active: isExtrasSelected(),
        text: t('extras')
      })

    const categories = isCategoriesEnabled() &&
      new HeaderNavigationItem({
        href: matchRoute(CategoriesPage).stringify(currentParams),
        active: isCategoriesSelected(),
        text: t('categories')
      })

    const events = isEventsEnabled() &&
      new HeaderNavigationItem({
        href: matchRoute(EventsPage).stringify(currentParams),
        active: isEventsSelected(),
        text: t('news')
      })

    return [extras, categories, events].filter(isEnabled => isEnabled)
  }

  render () {
    const {matchRoute} = this.props
    return <Header
      logo={integreatLogo}
      viewportSmall={this.props.viewportSmall}
      logoHref={matchRoute(CategoriesPage).stringify(this.getCurrentParams())}
      actionItems={this.getActionItems()}
      navigationItems={this.getNavigationItems()} />
  }
}

export default translate('app')(LocationHeader)
