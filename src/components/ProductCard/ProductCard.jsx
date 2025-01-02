import React, { useContext } from 'react'
import { CartContext } from '../../context/Cart.context'
import { Link } from 'react-router-dom'
import ProductDetails from '../../pages/ProductDetails/ProductDetails'

export default function ProductCard({productInfo}) {
    let {images,title,price,category,ratingAverage,id}=productInfo
    const {addProductToCart} =useContext(CartContext)

  return <>
  <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-xl rounded-lg overflow-hidden'>
    <div className=' relative overflow-hidden rounded-md'>
      <img src={images[0]} className='w-full' alt="" />
      <div className=" flex gap-2  justify-center items-center layer absolute w-full right-0 bottom-0 left-0 top-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-all duration-300 ">
        <div className="icon w-8 h-8 rounded-full bg-primary-200 flex justify-center items-center text-white cursor-pointer hover:scale-110 hover:rotate-6 transition-all duration-300 "><i className='fa-solid fa-heart'></i></div>
        <div onClick={()=>{
          addProductToCart({productId: id})
        }} className="icon w-8 h-8 rounded-full bg-primary-200 flex justify-center items-center text-white cursor-pointer hover:scale-110 hover:rotate-6 transition-all duration-300 "><i className='fa-solid fa-cart-shopping'></i></div>
        <Link  to={`/product/${id}`} 
        className="icon w-8 h-8 rounded-full bg-primary-200 flex justify-center items-center text-white cursor-pointer hover:scale-110 hover:rotate-6 transition-all duration-300 "><i className='fa-solid fa-eye'></i></Link> 
      </div>
    </div>
    <div className='p-3'>
    <h3 className='text-primary-200 '>{category.name}</h3>
    <h2 className='text-lg font-semibold line-clamp-2'>{title}</h2>
    <div className='flex justify-between items-center mt-4'>
      <span>{price} L.E</span>
      <div className=' flex gap-1 items-center'>
        <i className='fa-solid fa-star text-yellow-500'></i>
        <span>{ratingAverage}</span>
      </div>
    </div>
    
    </div>
   
  </div>
  </> 
  
}
