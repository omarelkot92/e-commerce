import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../context/Cart.context'
import Loading from '../../components/Loading/Loading'
import Cartitem from '../../components/Cartitem/Cartitem'
import { Link } from 'react-router-dom'

export default function Cart() {

    let {getCartProducts,cartInfo,clearCart} = useContext(CartContext)

    useEffect(()=>{
        getCartProducts()
    },[])



  return <>
   {cartInfo ==null ? <Loading/> : <section>
    <div className='flex gap-8 items-center '>
    <i className='fa-brands fa-opencart text-3xl'></i>
      <h2 className='text-xl pl-4 text-slate-600 font-semibold relative before:absolute before:w-0.5 before:bg-slate-600 before:h-3/4 before:-left-1 before:top-1/2 before:-translate-y-1/2'>
        Your Shopping Cart
      </h2>
    </div>
    {cartInfo.numOfCartItems == 0 ? <div className='mt-6 bg-gray-100 p-6 rounded-md shadow flex justify-center items-center flex-col gap-3'>
      <h2> OoPs! Your cart is empty . Start shopping now by clicking the button Below and find somthing you love ! </h2>
      <Link to="/" className='btn bg-primary-200 hover:bg-primary-300 transition-colors duration-300 text-white'> Back to Home page</Link>
    </div> : <><div className='space-y-4 mt-6'>
      {cartInfo.data.products.map((product)=> <Cartitem key={product.id} productInfo={product}/>)}
    </div>
    <div className='mt-6 flex justify-between'>
      <p className='text-xl'> <i className='fa-solid fa-dollar-sign text-xl mr-2 text-primary-200'></i>Your Total Cart Price : <span className='text-primary-200 font-bold text-lg'>{cartInfo.data.totalCartPrice}</span> </p>
      <button 
      onClick={clearCart}
      className='btn bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white '><i className='fa-solid fa-trash mr-2'></i>
        Clear Cart</button>
    </div>
    <Link to={"/checkout"} className=' inline-block btn bg-primary-100 w-full  mt-10 p-2 px-10 text-center mx-auto text-white hover:bg-primary-400 '>
       Next Step 
    </Link>
    </> 
    
    }
   </section> }
  </>
    
  
}
