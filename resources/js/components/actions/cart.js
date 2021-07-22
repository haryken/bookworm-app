import {
  ADD_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  DELETE_ITEM,
  CLEAR_CART,
} from './types'

const cart = JSON.parse(localStorage.getItem('cart')) || {}

export const addToCart = (book) => (dispatch) => {
  if (Object.keys(cart).includes(Object.keys(book)[0])) {
    cart[Object.keys(book)[0]].quantity += book[Object.keys(book)[0]].quantity
  } else {
    cart[Object.keys(book)[0]] = book[Object.keys(book)[0]]
  }
  localStorage.setItem('cart', JSON.stringify(cart))

  dispatch({
    type: ADD_CART,
    payload: cart,
  })
}

export const increaseQuantity = (bookId) => (dispatch) => {
  if (Object.keys(cart).includes(bookId)) {
    cart[bookId].quantity += 1
    dispatch({
      type: INCREASE_QUANTITY,
      payload: cart,
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log('increase')
  } else {
    console.log('no book found in cart')
  }
}

export const decreaseQuantity = (bookId) => (dispatch) => {
  if (Object.keys(cart).includes(bookId)) {
    if (cart[bookId].quantity > 1) {
      cart[bookId].quantity -= 1
      dispatch({
        type: DECREASE_QUANTITY,
        payload: cart,
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      console.log('decrease')
    } else {
      console.log('this cart item must > 1')
    }
  } else {
    console.log('no book found in cart')
  }
}

export const deleteItem = (bookId) => (dispatch) => {
  if (Object.keys(cart).includes(bookId)) {
    if (delete cart[bookId]) {
      dispatch({
        type: DELETE_ITEM,
        payload: cart,
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      console.log('delete')
    } else {
      console.log('cannot delete')
    }
  } else {
    console.log('no book found in cart')
  }
}

export const clearCart = () => (dispatch) => {
  localStorage.removeItem('cart')

  dispatch({
    type: CLEAR_CART,
  })
}
