
import './App.css'
import Home from './pages/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login'
import Singup from './pages/Singup/Singup'
import Layout from './components/Layout/Layout'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import UserProvider from './context/User.context'
import GuestRoute from './components/GuestRoute/GuestRoute'
import CartProvider from './context/Cart.context'
import Cart from './pages/Cart/Cart'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Checkout from './pages/Checkout/Checkout'
import Orders from './pages/Orders/Orders'
import CategorySlider from './components/CategorySlider/CategorySlider'
import Products from './components/Products/Products'



function App() {
  const router = createBrowserRouter([
    
    {path:"/",element:<ProtectedRoute><Layout/></ProtectedRoute> , children:[{index:true , element:<Home/>},
      {path:"cart", element: <Cart/>},
      {path:"product/:id", element: <ProductDetails/>},
      {path:"checkout", element:<Checkout/>},
      {path:"allorders", element:<Orders/>},
      {path:"category", element:<CategorySlider/>},
      {path:"products", element:<Products/>}
    ]},
    {path:"/", element:<GuestRoute><Layout/></GuestRoute> , children:[ {path:"login", element:<Login/>},
      {path:"signup", element:<Singup/>}]}

  ])
    
  

  return <>
  <UserProvider>
    <CartProvider>
     <RouterProvider router={router}></RouterProvider> 
    </CartProvider>
  </UserProvider>
  <Toaster position='bottom-right'/>

  </>

  }
export default App
