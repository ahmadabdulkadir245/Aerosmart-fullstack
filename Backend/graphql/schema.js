const { buildSchema } = require('graphql');
module.exports = buildSchema(`
    type Banner {
        id: Int
        image: String!
        category: String!
        userId: ID
    }

    type Product {
        id: Int
        title: String!
        price: Int!
        imageUrl: String!
        description: String!
        category: String!
        quantity: Int!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        password: String
        isAdmin: String!
        products: [Product!]!
    }

    type Cart {
        userId: Int
        qty: Int
        productId: Int
    }

    type AuthData {
        token: String!
        userId: String!
    }

    type ProductData {
        products: [Product!]!
        totalPages: Int!
    }

    type BannerData {
        banners: [Banner]!
    }

    type CartData {
        carts: [Cart]!
    }

    input BannerInputData {
        image: String!
        category: String!
        userId: ID
    }

    input UserInputData {
        email: String!
        password: String!
    }

    input CartInputData {
        userId: Int
        qty: Int
        product: Int
    }

    input ProductInputData {
        userId: Int
        title: String
        price: Int
        imageUrl: String
        description: String
        category: String
        quantity: Int
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        products(page: Int, perPage: Int): ProductData!
        product(id: ID!): Product!
        newProduct(id: ID!): Product!
        user: User!
        cart(userId: Int): ProductData!
        banners: BannerData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createBanner(bannerInput: BannerInputData): Banner!
        createProduct(productInput: ProductInputData): Product!
        addTocart(cartInput: CartInputData): Cart
        updateProduct(id: Int!, productInput: ProductInputData): Product!
        deleteProduct(id: Int): Boolean
        updateStatus(status: String!): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
