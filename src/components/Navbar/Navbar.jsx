import { Link, NavLink } from "react-router-dom"
import freshLogo from "../../assets/images/freshcart-logo.svg"
import React, { useContext } from 'react'
import { UserContext } from "../../context/User.context"
import { CartContext } from "../../context/Cart.context"
import { useEffect } from "react"

export default function Navbar() {
  const {token,logOut}= useContext(UserContext)
  const {cartInfo,getCartProducts}=useContext(CartContext)

  useEffect(()=>{
    getCartProducts()
  },[])


  return <>
  <div className="nav bg-slate-100 py-3 shadow p-12 fixed top-0 left-0 right-0 z-50">
    <div className="container flex items-center gap-12  ">
  <a href="">
  <img src= {freshLogo}  alt="freshcart logo as a shoping cart"/>
  </a>

  {token && <>
    <ul className="flex items-center gap-5">
    <li>
      <NavLink className= {({isActive})=>{
        return `relative  before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:bg-primary-200 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold " : ""}`
      }} to="/">Home</NavLink>
    </li>
    <li>
      <NavLink className= {({isActive})=>{
        return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:bg-primary-200 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
      }} to="products">Products</NavLink>
    </li>
    <li>
      <NavLink className= {({isActive})=>{
        return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:bg-primary-200 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
      }} to="category">Category</NavLink>
    </li>
    <li>
      <NavLink className= {({isActive})=>{
        return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:bg-primary-200 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
      }} to="brands">Brands</NavLink>
    </li>
    <li>
      <NavLink className= {({isActive})=>{
        return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:bg-primary-200 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
      }} to="allorders">Orders</NavLink>
    </li>
  </ul>
  
  <Link to={"cart"} className="cart ml-auto cursor-pointer relative">
  <i className="fa-solid fa-cart-shopping text-lg"></i>
  <div className="card-counter flex justify-center items-center h-4 w-4 rounded-full bg-primary-100  text-white absolute right-0 top-0 translate-x-3/4 -traslate-y-1/2">
  {cartInfo==null ? <i className="fa-solid fa-spinner text-xs fa-spin"></i> : <span className="text-xs">{cartInfo.numOfCartItems}</span>}
  </div>
  </Link>

  </> }

  <ul className={`flex items-center gap-5 ${!token && "ms-auto"}`}>
    <li>
      <a href="https://instagram.com" target="_blank">
      <i className="fa-brands fa-instagram"></i>
      </a>
    </li>
    <li>
      <a href="https://facebook.com" target="_blank">
      <i className="fa-brands fa-facebook"></i>
      </a>
    </li>
    <li>
      <a href="https://tiktok.com" target="_blank">
      <i className="fa-brands fa-tiktok"></i>
      </a>
    </li>
    <li>
      <a href="https://twitter.com" target="_blank">
      <i className="fa-brands fa-twitter"></i>
      </a>
    </li>
    <li>
      <a href="https://linkedin.com" target="_blank">
      <i className="fa-brands fa-linkedin"></i>
      </a>
    </li>
    <li>
      <a href="https://youtube.com" target="_blank">
      <i className="fa-brands fa-youtube"></i>
      </a>
    </li>
  </ul>
  
  
    <ul className="flex items-center gap-5">
    {!token && <>
    <li>
      <NavLink className= {({isActive})=>{
        return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:bg-primary-200 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
      }} to="/signup">Sign up</NavLink>
    </li>
    <li>
      <NavLink className= {({isActive})=>{
        return `relative before:absolute before:w-0 hover:before:w-full before:transition-[width] before:duration-300 before:h-0.5 before:bg-primary-200 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
      }} to="/login">Log in</NavLink>
    </li></>}
    {token &&<li onClick={logOut}>
    <NavLink  to="logout"><i className="fa-solid fa-right-from-bracket text-lg"></i></NavLink>
    </li>}
  </ul>
  

 
 </div></div>
 
  </>
    
  
}
