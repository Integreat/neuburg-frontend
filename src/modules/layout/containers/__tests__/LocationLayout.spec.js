import React from 'react'
import { Provider } from 'react-redux'
import EndpointBuilder from 'modules/endpoint/EndpointBuilder'
import { mount, shallow } from 'enzyme'
import ConnectedLocationLayout, { LocationLayout } from '../LocationLayout'
import LocationModel from 'modules/endpoint/models/LocationModel'
import EndpointProvider from '../../../endpoint/EndpointProvider'
import createReduxStore from '../../../app/createReduxStore'
import createHistory from '../../../app/createHistory'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import Payload from '../../../endpoint/Payload'

describe('LivingLayout', () => {
  const matchRoute = id => {}

  const language = 'de'

  const locations = [new LocationModel({name: 'Mambo No. 5', code: 'location1'})]

  const MockNode = () => <div />

  it('should show LocationHeader and LocationFooter if LocationModel is available', () => {
    const component = shallow(
      <LocationLayout location='location1' language={language}
                      matchRoute={matchRoute}
                      locations={locations}
                      viewportSmall
                      currentPath='/:location/:language'>
        <MockNode />
      </LocationLayout>)
    expect(component).toMatchSnapshot()
  })

  it('should show GeneralHeader and GeneralFooter if LocationModel is not available', () => {
    const component = shallow(
      <LocationLayout location='unavailableLocation' language={language}
                      matchRoute={matchRoute}
                      locations={locations}
                      viewportSmall
                      currentPath='/:location/:language'>
        <MockNode />
      </LocationLayout>)
    expect(component).toMatchSnapshot()
  })

  describe('connect()', () => {
    const locationsEndpoint = new EndpointBuilder('locations')
      .withStateToUrlMapper(() => 'https://weird-endpoint/api.json')
      .withMapper(json => json)
      .withResponseOverride(locations)
      .build()

    const location = 'augsburg'
    const path = '/:location/:language'

    it('should map state to props', () => {
      const store = createReduxStore(createHistory, {
        router: {params: {location: location, language: language}, route: path},
        viewport: {is: {small: false}}
      })

      const locationLayout = mount(
        <Provider store={store}>
          <EndpointProvider endpoints={[locationsEndpoint]}>
            <ConnectedLocationLayout />
          </EndpointProvider>
        </Provider>
      ).find(LocationLayout)

      expect(locationLayout.props()).toEqual({
        currentPath: path,
        location: location,
        language: language,
        locations: locations,
        viewportSmall: false,
        dispatch: expect.any(Function)
      })
    })

    const mockStore = configureMockStore([thunk])

    const createComponentInViewport = small => {
      const smallStore = mockStore({
        locations: new Payload(false),
        router: {params: {location: 'augsburg', language: 'en', id: '1234'}, route: '/:location/:language'},
        viewport: {is: {small}}
      })
      return mount(
        <Provider store={smallStore}>
          <EndpointProvider endpoints={[locationsEndpoint]}>
            <ConnectedLocationLayout><MockNode /></ConnectedLocationLayout>
          </EndpointProvider>
        </Provider>
      )
    }

    it('should have correct scroll height', () => {
      const smallComponent = createComponentInViewport(true).find(ConnectedLocationLayout).childAt(0)
      expect(smallComponent.prop('viewportSmall')).toBe(true)

      const largeComponent = createComponentInViewport(false).find(ConnectedLocationLayout).childAt(0)
      expect(largeComponent.prop('viewportSmall')).toBe(false)
    })
  })
})
