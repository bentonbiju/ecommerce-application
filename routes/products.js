const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Transaction = require('../models/transaction');
const upload = require('../config/multerConfig');
const fs = require('fs').promises;


router.get('/', async (req, res) => {           //Route to fetch all products from the database.
    try {
      const products = await Product.find(); // Fetch all products from the database
      const productsWithImageUrl = products.map(product => ({                         //Adds imageurl to each individual object which is used to access images from the backend.
        ...product.toObject(), // Convert Mongoose document to plain object
        image: `${req.protocol}://${req.get('host')}/${product.uuid}/${product.uuid}-1.jpeg`, // Construct the full URL
    }));
      console.log(productsWithImageUrl)
      res.json(productsWithImageUrl); // Return the products as JSON
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error' });
    }
});


router.get('/:id', async (req, res) => {           //Route to fetch a single product from the database.
  try{
    const productId = req.params.id; // Extract the ID from the URL
    const product = await Product.findOne({ uuid: productId }).lean();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    //Below function counts the number of pictures that a product has.
    const files = await fs.readdir(`public/uploads/${productId}`);
    product.images = [];
    console.log(files)
    files.forEach(file=>{
      console.log(file)
      product.images.push(`${req.protocol}://${req.get('host')}/${productId}/${file}`)
    })
    console.log(product)
    res.json(product); // Return the product as JSON
  }catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }

});

router.delete('/:id', async (req, res) => { 
  try{
    const { id } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ uuid:id });

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Server error' });
  }
})

router.post('/', upload.array("pictures", 8), async (req, res) =>{      //Route to create a new product
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized: User not logged in' });
  }
  const new_product = {
    uuid: req.body.id,
    name: req.body.name,
    description: req.body.description,
    current_bidder: req.session.user,
    price:req.body.price,
    user:req.session.user
  };
  try {
    // Save the product to the database
    const createdProduct = await Product.create(new_product);
    return res.status(201).json({ message: 'Product created successfully', product: createdProduct });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create product', details: error.message });
  }
})


router.post('/bid', async (req, res) => {
  const { bid, product } = req.body       //product is the uuid of the product

  if (!req.session.user) {                                                          //Check if the user is logged in
    return res.status(401).json({ error: 'User not logged in.' });
  }
  if (!bid) {
      return res.status(400).json({ error: 'Bid amount is required' });
  }
  const current_product = await Product.findOne({ uuid: product });   //Get the current document for the product and check whether the current price value is lesser than the bid value.

  if (!current_product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  if (bid <= current_product.current_price) {
    return res.status(409).json({ error: 'Bid must be greater than the current price' });
  }

  const newTransaction = new Transaction({
    product_uuid: product,
    user_id: req.session.user,
    bid_price: bid,
  });

  try {
    await newTransaction.save();
    console.log('Transaction saved successfully!');
  } catch (error) {
    console.error('Error saving transaction:', error);
  }
  // Handle the bid (e.g., save to the database)
  const updatedProduct = await Product.findOneAndUpdate(
    { uuid: product }, // Find the product by its unique identifier
    { 
      current_price: bid, // Update the current_price field
      current_bidder: req.session.user // Update the current_bidder field
    },
    { 
      new: true // Return the updated document
    }
  );
  if (!updatedProduct) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Respond with success
  res.status(200).json({ message: 'Bid submitted successfully', updatedProduct });
});

router.put('/close/:id', async (req, res) => {  
  const { id } = req.params;

  try {
    // Find by the custom productId field instead of the default MongoDB _id
    const product = await Product.findOneAndUpdate(
      { uuid:id }, // Query to match your custom field
      { closed: true }, // Update operation
      { new: true } // Return the updated document
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Auction closed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to close auction', error: error.message });
  }
})

module.exports = router;