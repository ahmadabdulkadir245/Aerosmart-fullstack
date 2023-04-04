import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import AdminProductsList from '../../components/AdminProductsList'

function AminProducts({products}) {
  return (
    <>
    <Header/>
       <div className='px-[10px] lg:px-[50px]'>
       <h2 className='text-center font-semibold text-2xl  py-6 tracking-wide font-changa text-gray-500'>ALL PRODUCTS</h2>
    <div className="grid grid-cols-7 items-center uppercase bg-gray-300 p-2 text-gray-700 text-xs font-semibold">
        <div className="">
          <p>PRODUCT IMAGE</p>
        </div>
        <div className="col-span-2">
          <p>PRODUCT DESCRIPTION</p>
        </div>
        <div className="flex  items-center space-x-2">
        <p>PRODUCT CATEGORY</p>
        </div>
        <div className="flex  items-center space-x-2">
        <p>PRODUCT PRICE</p>
        </div>
        <div className="">
          <p>EDIT PRODUCT</p>
        </div>
        <div className="">
          <p>DELETE PRODUCT</p>
        </div>
    </div>

    <div className="grid grid-cols-7 items-center uppercase  text-gray-700 text-xs font-semibold mt-3">
      {products.map(({ id, title, price, description, category, imageUrl,quantity }) => (
    <AdminProductsList
        key={id}
        id={id}
        title={title}
        price={price}
        description={description}
        category={category}
        quantity={quantity}
        imageUrl={imageUrl}
    />
      ))}
    </div>
    <div className="flex justify-end items-center space-x-4">
    <div className="">
        <button className="capitalize mt-4 w-[70px] h-[30px] rounded-sm  border-[1px]  bg-transparent  m-auto tracking-wide cursor-pointer hover:bg-gray-200  transition-all duration-300 ease-in-out text-xs">
          PREV
          </button>
        </div>

        <div className="">
        <button className="capitalize mt-4 w-[35px] h-[30px] rounded-sm  border-[1px]  bg-transparent  m-auto tracking-wide cursor-pointer hover:bg-gray-200  transition-all duration-300 ease-in-out text-xs">
          1
          </button>
        </div>
        <div className="">
        <button className="capitalize mt-4 w-[35px] h-[30px] rounded-sm  border-[1px]  bg-transparent  m-auto tracking-wide cursor-poiter hover:bg-gray-200  transition-all duration-300 ease-in-out text-xs">
          2
          </button>
        </div>

        <div className="">
        <button className="capitalize mt-4 w-[70px] h-[30px] rounded-sm  border-[1px]  bg-transparent  m-auto tracking-wide cursor-pointer hover:bg-gray-200  transition-all duration-300 ease-in-out text-xs">
          NEXT
          </button>
        </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default AminProducts

export const getServerSideProps = async (context) => {
    const page = 1
    const graphqlQuery = {
      query: `
      {
        products(page: ${page}) {
          products{
            id
            title
            price
            category
            quantity
            imageUrl
            description
          }
        }
      }
      `
    };
     const result = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
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
          products: data?.data?.products?.products || []
        }
      }
    }