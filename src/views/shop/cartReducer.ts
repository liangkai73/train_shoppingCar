import store from '@/utils/store/localStore'

interface Action {
  type: 'add' | 'remove' | 'delete'
  data: shop.cartItem
}

function cartReducer(state: Array<shop.cartItem> | [], actions: Action) {
  let newState: Array<shop.cartItem> = []
  let arr
  switch (actions.type) {
    case 'add':
      arr = state.filter(item => {
        return item.id == actions.data.id && item.size == actions.data.size
      })
      if (arr.length != 0) {
        newState = state.map(item => {
          if (item.id == actions.data.id && item.size == actions.data.size) {
            item.quantity += 1
          }
          return item
        })
      } else {
        newState = [...state, actions.data]
      }

      break
    case 'remove':
      newState = state.map(item => {
        if (item.id == actions.data.id && item.size == actions.data.size) {
          item.quantity -= 1
        }
        return item
      })
      newState.forEach((item, index) => {
        if (item.quantity <= 0) {
          newState.splice(index, 1)
        }
      })
      break
    case 'delete':
      newState = state.map(item => {
        if (item.id == actions.data.id && item.size == actions.data.size) {
          item.quantity = 0
        }
        return item
      })
      newState.forEach((item, index) => {
        if (item.quantity <= 0) {
          newState.splice(index, 1)
        }
      })
      break
    default:
      break
  }

  store.setCartInfo(newState)
  return newState
}

export default cartReducer
