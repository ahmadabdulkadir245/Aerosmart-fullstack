import Products from './Products'
import { useEffect, useState } from 'react'
import { GRAPHQL_URL } from '../lib/constants'

const ProductFeed = () => {
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
        recievedData.reverse()
        setProducts(recievedData)
      })
  }, [products])

  
  return (
    <div
    className='grid grid-cols-2 grid-flow-row-dense md:grid-cols-3 lg:grid-cols-3
  xl:grid-cols-4 mx-auto m-2 gap-2 px-2 md:px-4'
  >
    {products.map(({ id, title, price, description, category, imageUrl }) => (
      <Products
        key={id}
        id={id}
        title={title}
        price={price}
        description={description}
        category={category}
        image={imageUrl}
      />
    ))}
  </div>
  )
}

export default ProductFeed
