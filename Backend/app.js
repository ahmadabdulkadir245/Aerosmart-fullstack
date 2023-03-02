
const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')
require("dotenv").config()
const bodyParser = require('body-parser');


const db = require('./util/database')

const app = express();


// graphql imports
const {graphqlHTTP} = require('express-graphql')
const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolvers')

// production tools import
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const Product = require('./models/product')

// production 
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
// app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());
app.use(cors({
    origin: '*',    
}));
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));



app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true,
    //     formatError(err) {
    //     if (!err.originalError) {
    //       return err;
    //     }
    //     const data = err.originalError.data;
    //     const message = err.message || 'An error occurred.';
    //     const code = err.originalError.code || 500;
    //     return { message: message, status: code, data: data };
    //   }
    })
  );


  app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode  || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data})
})

// database
// db.execute('SELECT * FROM products')
// .then(result => {
//     console.log(result)
// })
// .catch(err => {console.log(err)})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log("Server is running....")
})