import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading'
import { CartContext } from '../../context/Cart.context'
import { useParams } from 'react-router-dom'
import ReactImageGallery from 'react-image-gallery'
import "swiper/css"
import {Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from '../../components/ProductCard/ProductCard'
import { FaBeer } from 'react-icons/fa'
import { GoArrowRight } from 'react-icons/go'

export default function ProductDetails() {
    let {id} = useParams()

    const [productDetails,setProductDetails]=useState(null)
    const [relatedProducts,setRealtedProducts]=useState(null)
    useEffect(()=>{
        getProductDetails()
    },[useParams()])

    useEffect(()=>{
        if(productDetails==null) return
        getRealtedProducts()
    },[productDetails])

    

   let {addProductToCart} = useContext(CartContext)
    

  async  function getProductDetails(){
try {
    const options={
        url:`https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method:"GET",
    }

     let{data} = await axios.request(options)
     setProductDetails(data.data)
     console.log(data.data.category._id)
    }
 catch (error) {
    console.log(error)
}
}

    async function getRealtedProducts(){
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/products/?category[in]=${productDetails.category._id}`,
                method:"GET"
            }
            let {data}=await axios.request(options)
            console.log(data.data)
            setRealtedProducts(data.data)
        } catch (error) {
            console.log(error)
        }
    }

  return <>
  {productDetails == null ? <Loading/> : <><section className='sm:grid gap-12 grid-cols-12'>
    <div className=' xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-12' >
        <ReactImageGallery
        showPlayButton={false}
        showNav={false}
        lazyLoad={true}
        items={productDetails.images.map((image)=>{
            return {
                original:image,
                thumbnail:image
            }
        })}/>
    </div>
    <div className=' xl:col-span-8 lg:col-span-6 md:col-span-6 sm:col-span-12  space-y-4'>
        <div>
         <h2 className='text-2xl font-semibold text-gray-600'>{productDetails.title}</h2>
         <h3 className='text-primary-100 font-semibold'>{productDetails.category.name}</h3>
        </div>
        <p className='text-gray-400'>{productDetails.description}</p>
        <div className='flex justify-between items-center'>
            <span>{productDetails.price} L.E</span>
            <div>
                <i className='fa-solid fa-star mr-2 text-yellow-400 '></i>
                <span>{productDetails.ratingsAverage}</span>
            </div>
        </div>
        <button onClick={()=>{
            addProductToCart({productId:id})
        }}
        className='btn bg-primary-100 hover:bg-primary-200 transition-colors duration-300 text-white w-full font-medium  '>Add To Cart</button>
    </div>
  </section>
  <section className='mt-8'>
    <div className='flex justify-center items-center gap-5 p-8'><h2 className='text-primary-200 font-semibold text-center text-xl'>Related Products 
    </h2><GoArrowRight className='iconSwipe' size={40} color='gray'/></div>
    {relatedProducts ? <Swiper className='' slidesPerView={5} spaceBetween={15}>
        {relatedProducts.map((product)=> <SwiperSlide className='col-span-1 md:col-span-2' key={product.id}>
            <ProductCard productInfo={product}/>
        </SwiperSlide>)}
    </Swiper>  : <Loading/>}
    </section>
    </> }
  
  
  </>
    
  
}
