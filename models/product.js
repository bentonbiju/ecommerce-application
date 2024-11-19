const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  uuid:{
    type:String,
    required:true,
    unique:true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required:true
  },
  price: {
    type: Number,
    required: true
  },
  user: {                                             //User who created the product
    type:String,
    required:true
  },
  current_bidder:{
    type:String,
  },
  current_price: {
    type: Number
  },
  closed:{
    type: Boolean,
    default: false
  }
  
});
//Sets the value of current_price to price when creating a new document.
productSchema.pre('save', function (next) {           
  if (this.isNew) {
    this.current_price = this.price;
  }
  next();
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;