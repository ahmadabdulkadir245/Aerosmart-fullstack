const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const Product = require('../models/product');
const Banner = require('../models/banner_image');
// const User = require('../models/user');


module.exports = {
    createProduct: async function({ productInput }, req) {

        const product = new Product(null, productInput.title, productInput.imageUrl, productInput.description, productInput.price, productInput.category, productInput.quantity, 1);

         await product.save()
    
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          description: product.description,
          category: product.category,
          quantity: product.quantity,
          creator: 1,
          // createdAt: createdProduct.createdAt.toISOString(),
          // updatedAt: createdProduct.updatedAt.toISOString()
        };
      },

      products: async function({ page }, req) {
        if (!page) {
          page = 1;
        }
        const perPage = 2;
        const totalPosts = 3;
        const products = await Product.fetchAll() .then(([rows, fieldData]) => {
          return rows
        })
        .catch(err => console.log(err));
        return {
          products: products.map(product => {
            return {
                id: product.id,
                title: product.title,
                price: product.price,
                category: product.category,
                quantity: product.quantity,
                imageUrl: product.imageUrl,
                description: product.description,
                createdAt: product.createdAt.toISOString(),
                updatedAt: product.updatedAt.toISOString()
            };
          }),
          totalPosts: totalPosts
        };
      },
      product: async function({ id }, req) {
        const product = await   Product.findById(id)
        .then(([product]) => {
          return product[0]
        })
        .catch(err => console.log(err))

        // if (!product) {
        //   const error = new Error('No post found!');
        //   error.code = 404;
        //   throw error;
        // }
        return {  
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          description: product.description,
          createdAt: product.createdAt.toISOString(),
          updatedAt: product.updatedAt.toISOString()
        };
      },

      createBanner: async function({ bannerInput }, req) {
        // if (bannerInput.image !== 'undefined') {
        //   bannerInput.image = '/images/solo.png';
        // }
        const banner = new Banner(null,  bannerInput.category,bannerInput.image ,1);

         await banner.save()
    
        return {
          id: banner.id,
          category: banner.category,
          image: banner.image,
          userId: 1,
        };
      },

      banners: async function( req) {
        const banners = await Banner.fetchAll() .then(([rows, fieldData]) => {
          return rows
        })
        .catch(err => console.log(err));
        return {
          banners: banners.map(banner => {
            return {
                id: banner.id,
                category: banner.category,
                image: banner.image,
                userId: banner.userId,
                // createdAt: banner.createdAt.toISOString(),
                // updatedAt: banner.updatedAt.toISOString()
            };
          }),
        };
      },
      deleteProduct: async function( {id}, req) {
         Product.deleteById(id);
        console.log(id)
        return true
      }
}