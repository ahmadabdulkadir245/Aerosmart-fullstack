import { useState } from "react";
import { useEffect } from "react";
import { GRAPHQL_URL } from "../lib/constants";

function SearchSuggesstions({searchWord, pressToSearchHandler}) {
  const [products, setProducts] = useState([])
  let suggestions = products.filter((product) => {
    return product.title.includes(searchWord);
  });

  function filterProductsByUniqueTitle(products) {
    const uniqueTitles = [];    
    products.forEach(product => {
      const title = product.title.toString().toLowerCase();
  
      if (!uniqueTitles.includes(title)) {
        uniqueTitles.push(title);
      }
    });
    return uniqueTitles;
  }
  
  const searchTitles = filterProductsByUniqueTitle(suggestions)

    const page = 1
    const perPage = 10
    // useEffect(() => {
      if(searchWord.length > 2) {
        const graphqlQuery = {
          query: `
          {
            products(page: ${page}, perPage: ${perPage}) {
              products{
                id
                title
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
          .then(productData => {
            const recievedData = productData.data?.products?.products || []
            recievedData.reverse()
            setProducts(recievedData)
          })
        }
      // }, [searchWord])
  return (
    <div className={`${searchWord.length > 2 ? '' : 'hidden'} absolute bg-gray-50 px-3 text-gray-700  left-0 top-[119px] w-full h-[30vh] rounded-b-lg shadow-lg overflow-y-scroll mb-3 z-50 scrollbar-hide transition-all duration-500 ease-in`}>
        {searchTitles.map((searchTitle, index) => (
    <p key={index} className="py-2 capitalize" onClick={pressToSearchHandler.bind(this, searchTitle)}>
      {searchTitle}
    </p>
        ))}
   
  </div>
  )
}

export default SearchSuggesstions