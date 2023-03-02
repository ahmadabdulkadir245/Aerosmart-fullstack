const { buildSchema } = require('graphql');
module.exports = buildSchema(`
    type Banner {
        id:ID
        imageUrl: String!
        category: String!
        userId: ID
    }

    type Product {
        id: ID
        title: String!
        price: Int!
        imageUrl: String!
        description: String!
        creator: ID!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        password: String
        status: String!
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
        imageUrl: String!
        category: String!
        userId: ID
    }

    input UserInputData {
        email: String!
        password: String!
    }

    input ProductInputData {
        userId: ID
        title: String
        price: Int
        imageUrl: String
        description: String
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        products(page: Int): ProductData!
        product(id: ID!): Product!
        newProduct(id: ID!): Product!
        user: User!
        banners: BannerData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createBanner(bannerInput: BannerInputData): Banner!
        createProduct(productInput: ProductInputData): Product!
        updateProduct(id: ID!, productInput: ProductInputData): Product!
        deleteProduct(id: ID!): Boolean
        updateStatus(status: String!): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
