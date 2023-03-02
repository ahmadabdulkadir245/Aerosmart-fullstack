import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux"
import {TbCurrencyNaira} from "react-icons/tb"

const Products = ({ id, title, price, description, image }) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setLoading(true);
      }, 500);
    }, []);
    const dispatch = useDispatch();
    const addProductToCart = () => {
      const Product = {
        id,
        title,
        price,
        description,
        image,
      };
      dispatch(addToCart(Product));
    };
  return (
    <>
      {loading ? (
        <div className='relative flex flex-col  bg-white z-30 shadow-xl transition-all duration-500 linear rounded-md text-gray-500'>
          <Link href={`/products/${id}`}>
              {/* <p className='absolute top-2 right-2 text-xs italic text-gray-400 z-20'>
                {category}
              </p> */}
              <div className='relative w-full h-[140px]  overflow-hidden rounded-t-md'>
                <Image src={image} alt={image} layout="fill" objectFit="cover" />
              </div>
          </Link>
          <h4 className='my-1 lg:my-3  px-2 capitalize text-sm font-semibold '>{title}</h4>
          <div className='flex  px-2'>
            {/* {Array(rating)
              .fill(1)
              .map((_, i) => (
                <StarIcon key={id} className='h-4 text-yellow-500' />
              ))} */}
          </div>
          <p className=' font-primary  md:my-2 line-clamp-2  px-2 text-xs  font-semibold'>{description} this text is add to increase the description text amount</p>
          <div className='  font-primary px-2 text-gray-500 flex items-center space-x-1 text-xs font-semibold mt-[2px]'>
            <TbCurrencyNaira  className="w-4 h-4"/>{price.toLocaleString()}
          </div>
          {/* {hasPrime && (
            <div className='flex items-center space-x-3 -mt-5 mb-2 px-2 '>
              <p className='text-xs text-gray-500'>FREE next-day Delivery</p>
            </div>
          )} */}
          <button
            className=' mt-1 mx-auto bg-yellow-400 p-2 w-[90%] text-white rounded-md  uppercase mb-2 text-xs'
            onClick={addProductToCart}
          >
            Add To Cart
          </button>
        </div>
      ) : (
        <div className='relative flex flex-col  bg-white z-30 shadow-xl transition-all duration-500 linear animate-pulse'>
          <div className='absolute h-full w-10  bg-white pulse overflow-hidden z-[40] rounded-md'></div>

          <div className='absolute top-2 right-2 w-12 h-2 rounded-md z-20 bg-gray-200'></div>
          <div className='relative w-full h-[160px] bg-gray-300  overflow-hidden '></div>
          <div className='my-1  ml-2 h-4 w-[85%] bg-gray-300 rounded-md'></div>

          <div className=' ml-2 h-3 w-[60%] bg-gray-300 rounded-md'></div>

          <div className='my-2 ml-2 h-8 w-[95%] bg-gray-300 rounded-md'></div>
          <div className=' ml-2 h-3 w-[40%] bg-gray-300 rounded-md'></div>
          <button className=' my-2 mx-auto p-2 w-[90%] h-[40px]  bg-gray-300 rounded-md' >
          </button>
        </div>
      )}
    </>
    )
}

export default Products