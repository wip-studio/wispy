// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'
import { MESSAGE_SHOW } from '../../../common/api/actions'
import { LIST_REQUEST, LIST_RESPONSE, LIST_DONE } from './types'

// Get list
export function getList(isLoading = true) {
  return async dispatch => {
    dispatch({
      type: LIST_REQUEST,
      isLoading
    })

    try {
      const { data } = await axios.post(API_URL, {
        operation: 'productList',
        fields: ['_id', 'name', 'description']
      })

      if(data.success) {
        dispatch({
          type: LIST_RESPONSE,
          list: data.data
        })
      } else {
        dispatch({
          type: MESSAGE_SHOW,
          message: 'There was some error.'
        })
      }
    } catch(error) {
      console.error(error)
    } finally {
      dispatch({
        type: LIST_DONE,
        isLoading: false
      })
    }
  }
}

// Get by id
export function get(productId) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'productById',
      params: {
        productId
      }
    })
  }
}
