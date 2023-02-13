
import express from "express";
import productosRouter from "./routes/product.router.js";
import __dirname from "./utils.js";
import { Product } from "./daos/index.js";
import carritoRouter from "./routes/cart.router.js";




const app = express()

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${server.address().port}`))

server.on("error", error => console.log(error))


app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(express.static(__dirname + "/public"))

app.use("/api/products", productosRouter) 
app.use("/api/cart", carritoRouter)


const contenedorProduct = new Product("productos")



