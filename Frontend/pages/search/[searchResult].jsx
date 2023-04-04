import { useRouter } from "next/router"
import {  BiSort } from "react-icons/bi"
import { BsGrid1X2Fill } from "react-icons/bs"
import { HiOutlineFilter } from "react-icons/hi"
import Header from "../../components/Header"
import Products from "../../components/Products"


function SearchResultPage({products}) {
    const router = useRouter()
    const searchResult = router.query.searchResult
    JSON.stringify(products)
    const searchedProducts = products.filter(product => product.title.toLowerCase() == searchResult.toLowerCase())

  return (
    <>
    <Header/>
    <div className="px-3 py-4 text-gray-500">
      <h2 className="text-center uppercase pb-2">{searchResult}</h2>
      <div className="flex justify-between items-center uppercase bg-gray-300 p-2 text-gray-700 ">
        <div className="flex  items-center space-x-2">
        <BsGrid1X2Fill className="h-5 w-5"/>
        <p>grid</p>
        </div>
        <div className="flex items-center space-x-2">
          <BiSort className="h-5 w-5"/> 
          <p>Sort</p>
        </div>
        <div className="flex items-center space-x-2">
          <HiOutlineFilter className="h-5 w-5"/>
          <p>Filter</p>
        </div>
      </div>
        
        {/* display products */}
        <div
    className='grid grid-cols-2 grid-flow-row-dense md:grid-cols-3 lg:grid-cols-3
  xl:grid-cols-4 mx-auto m-2 gap-2  md:px-4 pt-2'
  >
      {searchedProducts.map(({ id, title, price, description, imageUrl }) => (
      <Products
        key={id}
        id={id}
        title={title}
        price={price}
        description={description}
        image={imageUrl}
      />
    ))}
    </div>
    </div>
    </>
  )
}

export default SearchResultPage 

export const getServerSideProps = async () => {
    const page = 1
    const graphqlQuery = {
        query: `
        {
          products(page: ${1}) {
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
          products: data?.data?.products?.products
        }
      }
    }