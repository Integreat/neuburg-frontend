import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compose from 'lodash/fp/compose'

import withFetcher from 'modules/endpoint/hocs/withFetcher'
import Layout from '../components/Layout'
import LivingHeader from '../components/LivingHeader'
import LivingFooter from '../components/LivingFooter'
import CityConfig from '../../city-detection/CityConfig'
import getCurrentCityConfig from '../../city-detection/getCurrentCityConfig'

export class LivingLayout extends React.Component {
  static propTypes = {
    matchRoute: PropTypes.func.isRequired,
    currentPath: PropTypes.string.isRequired,
    viewportSmall: PropTypes.bool.isRequired,
    children: PropTypes.node,
    cityConfigs: PropTypes.arrayOf(PropTypes.instanceOf(CityConfig)).isRequired
  }

  render () {
    const { matchRoute } = this.props
    return <Layout header={<LivingHeader viewportSmall={this.props.viewportSmall}
                                         matchRoute={matchRoute}
                                         location={getCurrentCityConfig(this.props.cityConfigs).cmsName}
                                         currentPath={this.props.currentPath} />}
                   footer={<LivingFooter matchRoute={matchRoute} />}>
      {this.props.children}
    </Layout>
  }
}

const mapStateToProps = state => ({
  currentPath: state.router.route,
  viewportSmall: state.viewport.is.small
})

export default compose(
  connect(mapStateToProps),
  withFetcher('cityConfigs')
)(LivingLayout)
