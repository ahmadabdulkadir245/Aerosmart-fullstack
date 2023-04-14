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

    type AuthData {
        token: String!
        userId: String!
    }

    type ProductData {
        products: [Product!]!
        totalProducts: Int!
    }

    type BannerData {
        banners: [Banner]!
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
        banners: BannerData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createBanner(bannerInput: BannerInputData): Banner!
        createProduct(productInput: ProductInputData): Product!
        updateProduct(id: Int!, productInput: ProductInputData): Product!
        deleteProduct(id: Int): Boolean
        updateStatus(status: String!): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
