import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import Image from 'next/legacy/image'

// const banners = BANNERS

// import required modules
import { Pagination, Navigation, Thumbs } from "swiper";


function Banner() {
  const [banners, setBanners] = useState([])
    const [swiperLoaded, setSwiperLoaded] = useState(false);
  const page = 1
  useEffect(() => {
    setSwiperLoaded(true);
    const graphqlQuery = {
      query: `
      {
        banners {
          banners{
            id
            category
            image
          }
        }
      }
      `
    };
   fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {  
        return res.json();
      })
      .then(bannerData => {
        const recievedData = bannerData.data?.banners?.banners
        recievedData.reverse()
        setBanners(recievedData)
      })
  }, [])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 400);
  }, []);

  
  return (
    <div className='w-full xl:w-[1024px] flex justify-center m-auto  mt-2 transition-all duration-700 ease-out'>
    {loading ?
    <>
    <div className="relative h-[200px] w-[95%] m-auto rounded-md overflow-hidden"
      suppressHydrationWarning
    >
    <Swiper
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      // navigation={true}
      modules={[Pagination, Thumbs]}
      className="mySwiper"
    >
        {banners.map(banner => (
        <SwiperSlide key={banner.id} >
            <div className='relative h-full w-full m-auto rounded-md overflow-hidden'>
        <Image src={banner.image} 
        alt={banner.id} width={700} height={350} priority layout="responsive"  objectFit="cover" />
            </div>
      </SwiperSlide>
        ))}
    </Swiper>
    </div>
        </>

  : 
  <div className='relative h-[200px] w-[95%] m-auto rounded-md bg-gray-400 overflow-hidden animate-pulse transition-all duration-500 linear'>
  <div className='absolute h-full w-10  bg-white pulse overflow-hidden z-[40]'></div>
          <div className="relative top-[90%] flex  justify-center  space-x-3  bottom-5 ">
            <p className="w-[8px] h-[8px]  rounded-full bg-gray-500"></p>
            <p className="w-[8px] h-[8px]  rounded-full bg-gray-500"></p>
            <p className="w-[8px] h-[8px]  rounded-full bg-gray-500"></p>
            <p className="w-[8px] h-[8px]  rounded-full bg-gray-500"></p>
            <p className="w-[8px] h-[8px]  rounded-full bg-gray-500"></p>
          </div>
            </div>
  }
  </div>
  )
}

export default Banner