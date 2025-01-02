import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../Loading/Loading'
import axios from 'axios'
import ProductCard from '../productCard/productCard'

export default function Products() {
    const [products,setProducts]=useState(null)
      async  function getProducts (){
      let options = {
        url:"https://ecommerce.routemisr.com/api/v1/products",
        method: "GET"
      }
      let{data}=await axios.request(options)
      console.log(data)
      setProducts(data.data)
      }
    
      useEffect(()=>{getProducts()},[])

  return <>
  {products ?  <div className="grid grid-cols-12 gap-3 mb-8"> {products.map((product)=> <ProductCard productInfo ={product} key={product._id} />)}</div> :( <Loading/>)}
  
  
  
  
  </>
   
  
}
