const express = require('express');
const path = require('path');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const app = express();
const session = require('express-session')
dotenv.config();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));


const userManagementRoutes = require('./routes/user_management')
const productRoutes = require('./routes/products')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(session({
  secret:"secret-key",
  resave: false,
  saveUninitialized:false,
}));
app.use('/api/products',productRoutes)
app.use('/api/user_management',userManagementRoutes)

// Start the server

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
