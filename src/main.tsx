import ReactDOM from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'
import routers from './router'
import '@/styles/iconfont.js'
import './tailwind.css'
import '@/styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={routers}></RouterProvider>)
