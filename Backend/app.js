
const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')
const multer = require('multer');
require("dotenv").config()
const bodyParser = require('body-parser');
const { clearImage } = require('./util/file');
const mime = require('mime');


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

app.use('/images', express.static(path.join(__dirname, 'public/images'), {
  setHeaders: function(res, filePath) {
    const mimeType = mime.getType(filePath);
    res.setHeader('Content-Type', mimeType);
  }
}));

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


//  image upload functionality
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Frontend/public");
  },
  filename: (req, file, cb) => {
    cb(null,  '/' + Date.now() +  file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadImage =   multer({ storage: fileStorage, fileFilter: fileFilter});

app.post("/upload-image", uploadImage.single("file"), function (req, res) {
  if (!req.file) {
    return res.status(200).json({ message: 'No file provided!' });
  }
  const file = req.file;
  console.log(file)
  res.status(201).json({message: 'File Stored',filePath: file.filename});
});

// app.put('/upload-image', (req, res) => {
//   if (!req.file) {
//     return res.status(200).json({ message: 'No file provided!' });
//   }
//   let filepath = req.file.path;
//   console.log(filepath);
//   return res.status(201).json({ message: 'File stored.', filePath: '/' + req.file.path , contentType: "image/png"});
// });


// graphql functionality
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



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log("Server is running....")
})