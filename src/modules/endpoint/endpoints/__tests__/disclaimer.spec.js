import disclaimer from '../disclaimer'
import DisclaimerModel from '../../models/DisclaimerModel'
import moment from 'moment'

jest.unmock('../disclaimer')

describe('disclaimer', () => {
  const pageJson = {
    id: 1689,
    title: 'Feedback, Kontakt und mögliches Engagement',
    type: 'disclaimer',
    modified_gmt: '2017-06-12 12:27:57',
    content: '<span>Content</span>'
  }

  it('should throw if the city to map the url are missing', () => {
    expect(() => disclaimer.mapParamsToUrl({})).toThrowErrorMatchingSnapshot()
  })

  it('should throw if the language to map the url are missing', () => {
    expect(() => disclaimer.mapParamsToUrl({ city: 'city' })).toThrowErrorMatchingSnapshot()
  })

  it('should throw if there is no disclaimer', () => {
    expect(() => disclaimer.mapResponse(undefined)).toThrowErrorMatchingSnapshot()
  })

  it('should map fetched data to models', () => {
    const disclaimerModel = disclaimer.mapResponse(pageJson)
    expect(disclaimerModel).toEqual(new DisclaimerModel({
      id: pageJson.id,
      title: pageJson.title,
      content: pageJson.content,
      lastUpdate: moment('2017-06-12 12:27:57')
    }))
  })
})
