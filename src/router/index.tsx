import { createBrowserRouter } from 'react-router-dom'
import ShoppingCar from '@/views/shop'
const routers = createBrowserRouter([
  {
    path: 'train_shoppingCar/',
    element: <ShoppingCar />
  },
  {
    path: 'train_shoppingCar/ShoppingCar',
    element: <ShoppingCar />
  }
])

export default routers
