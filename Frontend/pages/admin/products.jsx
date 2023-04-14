import  { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import AdminProductsList from '../../components/AdminProductsList'
import ReactPaginate from "react-paginate";
import { useEffect } from 'react';

let globalPage = 1

function AminProducts() {
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const perPage = 3
  useEffect(() => {
    const graphqlQuery = {
      query: `
      {
        products(page: ${page}, perPage: ${perPage}) {
          products{
            id
            title
            price
            quantity
            category
            imageUrl
            description
          }
          totalProducts
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
      .then(productData => {
        const recievedData = productData.data?.products?.products || []
        recievedData.reverse()
        const productPages = productData.data?.products.totalProducts
        setProducts(recievedData)
        setTotalPages(productPages)
      })
  }, [page])

  return (
    <>
    <Header/>
       <div className='px-[10px] lg:px-[50px]'>
       <h2 className='text-center font-semibold text-2xl  py-6 tracking-wide font-changa text-gray-500'>ALL PRODUCTS</h2>
    <div className="grid grid-cols-4 lg:grid-cols-7 items-center uppercase bg-gray-300 p-2 text-gray-700 text-xs font-semibold text-center">
        <div className="">
          <p><span className='hidden lg:inline-block'>PRODUCT </span> IMAGE</p>
        </div>
        <div className=" lg:col-span-2">
          <p><span className='hidden lg:inline-block'>PRODUCT </span> DESCRIPTION</p>
        </div>
        <div className="hidden lg:inline-flex  items-center space-x-2">
        <p><span className='hidden lg:inline-block'>PRODUCT </span> CATEGORY</p>
        </div>
        <div className="hidden lg:flex  items-center space-x-2">
        <p><span className='hidden lg:inline-block'>PRODUCT </span> PRICE</p>
        </div>
        <div className="">
          <p>EDIT <span className='hidden lg:inline-block'>PRODUCT </span> </p>
        </div>
        <div className="">
          <p>DELETE <span className='hidden lg:inline-block'>PRODUCT </span> </p>
        </div>
    </div>

    <div className="grid grid-cols-4 lg:grid-cols-7 grap-2 items-center uppercase  text-gray-700 text-xs font-semibold mt-3">
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
    
        <div className="my-5">
        <ReactPaginate
          breakLabel='...'
          previousLabel='PREV'
          nextLabel='NEXT'
          pageRangeDisplayed={1}
          pageCount={totalPages}
          onPageChange={({ selected }) => setPage(selected + 1)}
          renderOnZeroPageCount={null}
          previousClassName='flex items-center justify-center capitalize   w-[70px] h-[30px] rounded-sm  border-[1px]  bg-transparent   tracking-wide cursor-pointer  text-xs '
          nextClassName='flex items-center justify-center capitalize   w-[70px] h-[30px] rounded-sm  border-[1px]  bg-transparent   tracking-wide cursor-pointer text-xs'
          containerClassName='flex justify-center items-center mx-auto space-x-2'
          pageLinkClassName='flex items-center justify-center capitalize   w-[30px] h-[30px] rounded-sm  border-[1px]  bg-transparent text-xs'
          activeClassName='bg-gray-200  transition-all duration-300 ease-in-out'
        />
  </div>
    </div>
    <Footer/>
    </>
  )
}

export default AminProducts

export const getServerSideProps = async (context) => {
    // const page = 1
    const perPage = 2
    const graphqlQuery = {
      query: `
      {
        products(page: ${globalPage}, perPage: ${perPage}) {
          products{
            id
            title
            price
            category
            quantity
            imageUrl
            description
          }
          totalProducts
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
          products: data?.data?.products?.products || [],
          totalProducts: data?.data?.products?.totalProducts || 1
        }
      }
    }