const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')
const multer = require('multer');
require("dotenv").config()
const bodyParser = require('body-parser');
const { clearImage } = require('./util/file');
const mime = require('mime');
const cloudinary = require('./util/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const auth = require('./middleware/auth');


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
const Product = require('./models/product');


app.use('/images', express.static(path.join(__dirname, '/images'), {
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


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//  Authentication
app.use(auth)

//   image upload functionality
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
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

const multerCloudinaryBannerStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Aerosmart/banners',
  },
  fileFilter: fileFilter
});
const multerCloudinaryProductStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Aerosmart/products',
  },
  fileFilter: fileFilter
});

const cloudinaryBannerUpload = multer({ storage: multerCloudinaryBannerStorage });

const cloudinaryProductUpload = multer({ storage: multerCloudinaryProductStorage });

app.post('/ulpoad-banner-cloudinary', cloudinaryBannerUpload.single('image'), (req, res) => {
  // Get file details from multer
  const { originalname, mimetype, size, path } = req.file;
  if (!req.file) {
    console.log('Resuqest file doesnt exist')
  }

  // Upload file to Cloudinary
  cloudinary.uploader.upload(path, { public_id: originalname }, (error, result) => {
    if (error) {
      console.log('Error uploading file to Cloudinary:', error);
      res.status(500).json({ message: 'Error uploading file to Cloudinary' });
    } else {
      console.log('File uploaded to Cloudinary:', result);
      res.status(200).json({ message: 'File uploaded to Cloudinary', image: result.secure_url });
    }
  });
});

app.post('/ulpoad-product-cloudinary', cloudinaryProductUpload.single('image'), (req, res) => {
  // Get file details from multer
  const { originalname, mimetype, size, path } = req.file;
  if (!req.file) {
    console.log('Resuqest file doesnt exist')
  }

  // Upload file to Cloudinary
  cloudinary.uploader.upload(path, { public_id: originalname }, (error, result) => {
    if (error) {
      console.log('Error uploading file to Cloudinary:', error);
      res.status(500).json({ message: 'Error uploading file to Cloudinary' });
    } else {
      console.log('File uploaded to Cloudinary:', result);
      res.status(200).json({ message: 'File uploaded to Cloudinary', image: result.secure_url });
    }
  });
});



const uploadImage =   multer({ storage:fileStorage, fileFilter: fileFilter});

app.post("/upload-image", uploadImage.single("image"), function (req, res) {
  if (!req.file) {
    return res.status(200).json({ message: 'No file provided!' });
  }
  const file = req.file;
  console.log(file)
  res.status(201).json({message: 'File Stored',image: file.filename});
});

const uploadBanner = multer({
  storage: fileStorage,
    fileFilter: fileFilter
})
// const upload = multer({storage: fileStorage, fileFilter})

// define upload endpoint that handles image uploads
app.post('/upload-banner-image', async (req, res, next)   => {
  try {
    if (!req.body.image) {
      throw new Error('No image uploaded');
    }
    let image = req.body.image
    const result =  await cloudinary.uploader.upload(image, {
      folder: 'Aerosmart/banners',
      // width: 300,
      // crop: 'scale',
    });
    res.status(201).json({
      success: true,
      image: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// define upload endpoint that handles image uploads
app.post('/upload-product-image',async (req, res, next)   => {
  try {
    if (!req.body.image) {
      throw new Error('No image uploaded');
    }
    let image = req.body.image
    const result =  await cloudinary.uploader.upload(image, {
      folder: 'Aerosmart/products',
      // width: 300,
      // crop: 'scale',
    });
    res.status(201).json({
      success: true,
      image: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// define upload endpoint that handles image uploads
app.post("/upload", uploadImage.single("image"), async  (req, res)  => {
  if (!req.file) {
    return res.status(200).json({ message: 'No file provided!' });
  }
  const image = req.file;
//     const result = await cloudinary.uploader.upload(image, {
//     folder: "Aerosmart-files/banners",
// // width: 300,
// // crop: "scale"
// })
  console.log(image)
  res.status(201).json({message: 'File Stored', image: "result.secure_url"});
});

// Define the storage engine for multer
const storage = multer.memoryStorage();

// Create a multer instance with the storage engine
const uploadFile = multer({ storage: storage });

app.post('/upload-banner-image-file', uploadImage.single('image'), async (req, res) => {
    // try {
      // Get the uploaded file from the request object
      if (!req.file) {
        console.log('NO IMAGE UPLOADED')
      }
      const file = req.file;
    console.log(file)
      // Upload the file to Cloudinary and store it in the "banners" folder
      // const result = await cloudinary.uploader.upload(file, {
      //   folder: 'banners',
      //   use_filename: true,
      //   unique_filename: false,
      //   resource_type: 'auto',
      // });
    // Send the Cloudinary URL of the uploaded image back to the client
    res.send({message: 'File Stored', image: "result.secure_url" });
  } 
  // catch (error) {
  //   // Handle errors here
  //   console.error(error);
  //   res.status(500).send({ error: 'Something went wrong' });
  // }

);



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



const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log("Server is running....")
})