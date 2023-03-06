import React, { useEffect, useState } from 'react';
import SwiperCore, { Virtual, Navigation, Pagination, FreeMode, Thumbs, Grid } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/legacy/image';
import { TbCurrencyNaira } from 'react-icons/tb';
import { useRouter } from 'next/router';
import { GRAPHQL_URL } from '../lib/constants';

// import './styles.css';

// install Virtual module
SwiperCore.use([Virtual, Navigation, Pagination]);

 function SectionSlider({sectionTitle}) {
  const router = useRouter()
  
  const [products, setProducts] = useState([])
  const page = 1
  useEffect(() => {
    const graphqlQuery = {
      query: `
      {
        products(page: ${page}) {
          products{
            id
            title
            price
            imageUrl
            description
          }
        }
      }
      `
    };
   fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {  
        return res.json();
      })
      .then(productData => {
        const recievedData = productData.data?.products?.products
        recievedData.reverse() || []
        setProducts(recievedData)
      })
  }, [])




  return (
    <div className='my-5'>
      <div className="flex items-center py-2 px-3 justify-between bg-gray-300 p-2 text-gray-700  mb-2 ">
          <p className="font-bold uppercase ">{sectionTitle}</p>
          <p className="capitalize text-xs">see All items</p>
      </div>
     <Swiper watchSlidesProgress={true} slidesPerView={2} className="mySwiper overflow-x-scroll">
        {products.map(product=> (
          <SwiperSlide key={product.id} onClick={() => router.push(`/products/${product.id}`)} >
             <div className='relative h-[100px] w-[90%] m-auto rounded-md overflow-hidden'>
                 <Image src={product.imageUrl} alt={product.title} layout='fill' objectFit='contain' priority/>
             </div>
             <div className="capitalize text-xs pt-1  flex items-center justify-between m-auto w-[90%]">
                 <p className="">
                      {product.title}
                 </p>
                 <p className='flex items-center space-x-2'><TbCurrencyNaira  className="w-4 h-4"/>{(product.price).toLocaleString()}</p>
             </div>


          </SwiperSlide>
        ))}
      </Swiper>

      {/* <p className="append-buttons">
        <button onClick={() => prepend()} className="prepend-2-slides">
          Prepend 2 Slides
        </button>
        <button onClick={() => slideTo(1)} className="prepend-slide">
          Slide 1
        </button>
        <button onClick={() => slideTo(250)} className="slide-250">
          Slide 250
        </button>
        <button onClick={() => slideTo(500)} className="slide-500">
          Slide 500
        </button>
        <button onClick={() => append()} className="append-slides">
          Append Slide
        </button>
      </p> */}
    </div>
  );
}
export default SectionSlider