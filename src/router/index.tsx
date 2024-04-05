import { Navigate, createBrowserRouter } from 'react-router-dom'
import ShoppingCar from '@/views/shop'
const routers = createBrowserRouter([
  {
    path: '/',
    element: <ShoppingCar />
  },
  {
    path: '/ShoppingCar',
    element: <ShoppingCar />
  }
])

export default routers
