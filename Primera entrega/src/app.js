import express from "express";
import productRouter from "./routes/product.router.js"
import cartRouter from "./routes/cart.router.js"

const app = express()
const PORT = process.env.PORT || 8081

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter);

const server = app.listen(PORT,()=>console.log(`listen on ${PORT}`));