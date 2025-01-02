import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'

export default function CategorySlider() {
    const[category,setCategory]=useState(null)

    async function getCategories(){
        const options={
            url:"https://ecommerce.routemisr.com/api/v1/categories",
            method:"GET"
        }
        let {data} =await axios.request(options)
        setCategory(data.data)
        console.log(data.data)
    }

    useEffect(()=>{getCategories()},[])

   
  return (<>
    { category ? <section id='category' className='py-10 p-3 '>
        <h2 className='font-semibold '>Shop Popular Categories</h2>
        <swiper-container loop={true} slides-per-view={6}>{category.map((category)=> 
        
            <swiper-slide key={category._id}>
                <div className='flex flex-col justify-center items-center'>
                <img className='  h-20 w-full object-cover md:h-36 lg:h-56 xl:h-72   p-4' src={category.image} alt=""/>
                <h3 className='text-sm  md:text-base p-2'>{category.name}</h3>
                </div>
            </swiper-slide>
             )}</swiper-container>
            </section>: <Loading/>
     }
   
  


  </>
    
  )
}
