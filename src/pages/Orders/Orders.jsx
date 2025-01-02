import React, { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/User.context'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Orders() {
    let[userOrders,setUserOrders]=useState(null)
    const {token}=useContext(UserContext)

    useEffect(()=>{
        getUserOrders()
    },[])

    let {id} = jwtDecode(token)

    async function getUserOrders(){
        
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method:"GET",
            }
            let {data} = await axios.request(options)
            console.log(data)
            setUserOrders(data)
        } catch (error) {
            console.log(error)
        }
    }



  return <>
  
   {userOrders==null ? <Loading/> : <section className='space-y-4'>
        {userOrders.map((order)=> <div key={order.id} className='order p-4 border-2 border-gray-500 border-opacity-25 rounded-lg'>
            <header className='flex justify-between items-center'>
                <div>
                    <h2 className='text-gray-500'>Order ID</h2>
                    <span className='text-lg font-semibold text-gray-700'>#{order.id}</span>
                </div>
                <div>
                    {order.isPaid ? <span className=' inline-block px-3  py-1 mx-2 bg-primary-100 font-semibold rounded-full'>تم الدفع</span> :
                     <span className=' inline-block px-3  py-1 mx-2 bg-red-500 font-semibold rounded-full'>غير مدفوغ</span>
                    }
                    {order.isDelivered ? <span className=' inline-block px-3 py-1 bg-primary-200 font-semibold rounded-full'> تم التوصيل</span>
                    :<span className=' inline-block px-3 py-1 bg-blue-400 font-semibold rounded-full'> قيد التوصيل</span>}
                </div>
            </header>
            <div className='grid mt-4 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
                {order.cartItems.map((product)=><div key={product._id} className="product-item  overflow-hidden border-2 border-gray-400 border-opacity-30 rounded-lg">
                    <img className='w-full' src={product.product.imageCover} alt="" />
                    <div className='p-5'>
                    <h3 className='text-xl font-semibold line-clamp-2'><Link to={`/product/${product.product.id}`}>{product.product.title}</Link> </h3>
                    <div className='flex mt-3 justify-between items-center'>
                        <p> <span className='font-bold underline'>Count:</span>
                        {product.count}</p>
                        <span>{product.price} L.E</span>
                    </div>
                    </div>
                    
                </div> )}
            </div>
            <p className='text-lg mt-4'>Total Order Price : <span className='mx-1 font-bold text-primary-300'>{order.totalOrderPrice}</span> L.E </p>
        </div>)}
    </section>}
  
  </>
    
}
