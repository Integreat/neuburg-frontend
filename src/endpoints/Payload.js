/**
 * The payload gets stored in the redux store and holds the information about a etch
 */
class Payload {
  constructor (isFetching, data = null, error = null, requestUrl = null, fetchDate = null) {
    this._isFetching = isFetching
    this._fetchDate = fetchDate
    this._data = data
    this._error = error
    this._requestUrl = requestUrl
  }

  /**
   * @return {Date} The date the fetch was initiated
   */
  get fetchDate () {
    return this._fetchDate
  }

  /**
   * @return {boolean} If a fetch is going on
   */
  get isFetching () {
    return this._isFetching
  }

  /**
   * @return {*} The data which has been fetched or null
   */
  get data () {
    return this._data
  }

  /**
   * @return {string} The error message if the fetch failed or null
   */
  get error () {
    return this._error
  }

  /**
   * @return {string} The url which was used to initiate the fetch
   */
  get requestUrl () {
    return this._requestUrl
  }

  toNativeObject () {
    return {
      isFetching: this._isFetching,
      fetchDate: this._fetchDate,
      data: this._data,
      error: this._error,
      requestUrl: this._requestUrl
    }
  }
}

export default Payload
