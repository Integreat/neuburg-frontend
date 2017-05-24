import { createAction } from 'redux-actions'

export default function fetchEndpoint (endpoint) {
  return function (dispatch, getState) {
    if (getState()[endpoint.name].isFetching) {
      return
    }

    dispatch(endpoint.requestAction())

    return fetch(endpoint.url)
      .then(response => response.json())
      .then(json => dispatch(endpoint.receiveAction(json)))
      .catch((ex) => {
        throw ex
      })
  }
}

export class Endpoint {
  constructor (name, url, transform) {
    this.name = name
    this.url = url

    let actionName = this.name.toUpperCase()

    this.receiveAction = createAction('RECEIVE_DATA' + actionName, json => ({
      isFetching: false,
      data: transform(json)
    }))
    this.requestAction = createAction('REQUEST_DATA' + actionName, {isFetching: true})
  }
}
