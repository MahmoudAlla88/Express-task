const express=require('express')
const cors=require('cors')
const app=express();
const port=8007;
app.use(express.json())
app.use(cors())
const axios = require("axios");

let products = []; 
const fetchProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    products = response.data.map(product => ({
        id:product.id,
        title: product.title,         
        description: product.description,  
        price: product.price         
      }));
    console.log(" Products fetched successfully!");
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
};


fetchProducts();

app.get('/home',(req,res)=>{
    res.json(products)
})

app.post('/home',(req,res)=>{
    const {title,description,price}=req.body;
    const newproduct={id:products.lenght+1,title,description,price};
    products.push(newproduct);
    res.status(201).json({message:'done add product',products:newproduct});
})


app.listen(port,()=>{
    console.log(`server:http://localhost:${port}`)
})