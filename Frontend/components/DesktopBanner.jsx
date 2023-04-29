import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Thumbs } from "swiper";
import Image from 'next/legacy/image'


function DesktopBanner() {
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
        const recievedData = bannerData.data?.banners?.banners || []
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
    <div className='w-full px-[10px] max-w-7xl    m-auto  mt-2 lg:mt-8 transition-all duration-700 ease-out '>
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
      <div className="relative w-full h-full  overflow-hidden m-auto  lg:m-0 rounded-md lg:rounded-sm"
        // suppressHydrationWarning
      >
        {banners.map(banner => (
        <SwiperSlide key={banner.id} >
            <div className='relative  w-full h-[300px] lg:h-[500px]  rounded-md lg:rounded-sm'>
          <Image src={banner.image} 
          alt={banner.id} priority  className="rounded-md " layout="fill" objectFit="cover" />
            </div>
      </SwiperSlide>
        ))}
    </div>
    </Swiper>
  </div>
  )
}

export default DesktopBanner