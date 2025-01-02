import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard/productCard'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import CategorySlider from '../../components/CategorySlider/CategorySlider'



export default function Home() {
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
  
  <HomeSlider/>
  <CategorySlider/>
    
  {products ?  <div className="grid grid-cols-12 gap-3 mb-8"> {products.map((product)=> <ProductCard productInfo ={product} key={product._id} />)}</div> :( <Loading/>)}
  
 



</>
}
