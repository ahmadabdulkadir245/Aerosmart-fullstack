import Image from "next/legacy/image";
import { useRouter } from "next/router";
import {AiFillStar} from "react-icons/ai"
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { GRAPHQL_URL } from '../../lib/constants'
import { addToCart } from "../../slices/cartSlice";

let prodId
function Product({product}) {
  const router = useRouter()
  prodId = router.query.productId
  const dispatch = useDispatch()
  const addProductToCart = (checkout) => {
    const Product = {
    id:  product.prodId,
      title: product.title,
     price: product. price,
      description: product.description,
      image: product.imageUrl,
    };
    console.log(Product)
    dispatch(addToCart(Product));

    if(checkout == true) {
      router.push('/checkout')
    }
  }

  return (
    <>
    <Header />
    <div className="px-3 pt-5 text-gray-500">
      <div className="relative   w-full h-[250px]  overflow-hidden rounded-md ">
        <Image src={product.imageUrl} alt={product.title}  layout="fill" objectFit="cover" />
      </div>

      <div className="flex items-center space-x-3 my-3">
      <div className="relative   w-[80px] h-[60px]  overflow-hidden rounded-md">
        <Image src={product.imageUrl} alt={product.title}  fill  className=""/>
      </div>
      <div className="relative   w-[80px] h-[60px]  overflow-hidden rounded-md">
        <Image src={product.imageUrl} alt={product.title}  fill  className=""/>
      </div>
      <div className="relative   w-[80px] h-[60px]  overflow-hidden rounded-md">
        <Image src={product.imageUrl} alt={product.title}  fill  className=""/>
      </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <div className="pt-1">
          <h3 className=" font-titilliumWeb  font-semibold uppercase text-sm">{product.title}</h3>
        </div>
        <span className="bg-yellow-100 flex items-center space-x-1 p-1 font-changa  rounded-md">
              <AiFillStar className="text-yellow-400 w-4 h-4"/>
              <p className="text-yellow-400 text-sm">4.5</p>
        </span>
      </div>

      <div>
        <h2 className="mt-1 capitalize text-sm underline tracking-wider ">description</h2>
        <p className="text-xs">{product.description} this is text is added to make sure that the description text is up to two lines and if it is more that 4 lines you press the more button to see all text. and a show less link will be added to reduce the list of all descriptions</p>
      </div>

        <h3 >Colors</h3>
      <div className="flex items-center justify-between my-3">
          <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-white shadow-sm"></div>
          <div className="w-8 h-8 rounded-full bg-yellow-400 shadow-md"></div>
          <div className="w-8 h-8 rounded-full bg-blue-500 shadow-md"></div>
          <div className="w-8 h-8 rounded-full bg-green-400 shadow-md"></div>
          </div>
         </div>

          <div className="flex justify-between">
         <div className="capitalize w-[15%] h-[48px] rounded-md border-[1px] border-gray-700 flex items-center justify-center mt-4 m-auto" onClick={addProductToCart}>
          <CiShoppingCart className="w-7 h-7 text-gray-700"/>
         </div>
         <button className="capitalize w-[80%] h-[48px] rounded-md text-white border-[1px] border-yellow-500 bg-yellow-500 block mt-4 m-auto" onClick={addProductToCart.bind(this, true)}>Checkout</button>
          </div>

    </div>
    <Footer/>
    </>
  )
}

export default Product


export const getServerSideProps = async (context) => {
  // console.log(context)
  const {productId} = context.query
  console.log(`thsi is the product Id ${productId}`)
  const graphqlQuery = {
    query: `
    {
      product(id: ${productId}) {
        title
        price
        imageUrl
        description
      }
    }
    `
  };
   const result = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {  
        return res.json();
      })
      .then(resData => {
        return resData
      })
      .catch(err => console.log(err))
     
      const data = await result
    return {
      props: {
        product: data?.data?.product
      }
    }
  }