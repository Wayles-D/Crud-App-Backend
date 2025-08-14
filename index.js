require("dotenv").config();

// Import the Express framework so we can create a server and handle HTTP requests
const express = require("express");

// Import Mongoose to connect and interact with MongoDB
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
//
const productRoute = require("./routes/Product.route.js");
// Create an instance of an Express app
const app = express();

// Parse incoming JSON and form data so we can use req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", productRoute);

// Define a simple GET route for the root URL '/'
// req = request (data coming in), res = response (data going out)
app.get("/", (req, res) => {
  // Send a plain text response back to the client
  res.send("Hello from Node API Server");
});

// Connect to MongoDB using Mongoose
// The string inside connect() is the MongoDB connection URL
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to database successfully");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}
      `);
  });
})
.catch(() => {
  console.log("Connection to database failed");
  
})
/* CONTROLLERS: always create them here before moving them to their specific files*/
// getting all products using .find
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // getting a singular product by .findById
// app.get("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // creating products
// app.post("/api/products", async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// updating a product
// app.put("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByIdAndUpdate(id, req.body);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     const updatedProduct = await Product.findById(id);
//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Deleting a product
// app.delete("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByIdAndDelete(id);
//     if (!product) {
//       return res.status(404).json({ message: "product not found" });
//     }
//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
