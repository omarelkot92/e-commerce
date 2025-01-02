import React from 'react'
import slider1 from "../../assets/images/slider-image-3.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"
import slider3 from "../../assets/images/slider-image-1.jpeg"

export default function HomeSlider() {
  return (
  <>
  
<swiper-container>
  <swiper-slide></swiper-slide>

</swiper-container>




    <div className='grid grid-cols-12 mb-8 p-3'>
        <div className='col-span-8'>
            <swiper-container style={{height: "100%"}} loop={true}>
            <swiper-slide><img src={slider1} className='w-full h-full object-cover' alt="" /></swiper-slide>
            <swiper-slide><img src={slider2} className='w-full h-full object-cover' alt="" /></swiper-slide>
            <swiper-slide><img src={slider3} className='w-full h-full object-cover' alt="" /></swiper-slide>
            </swiper-container>
        </div>
        <div className='col-span-4 w-full'>
            <img src={slider2} className='w-full h-1/2 ' alt="" />
            <img src={slider3} className='w-full h-1/2 ' alt="" />
        </div>
    </div>






  </>
   
  )
}
