import ProductFS from "./productManager.js"
import CartFS from "./cartManager.js"
import ProductMongo from "./productMongo.js"
import CartMongo from "./cartMongo.js";
import mongoose from 'mongoose';




const PERSISTENCIA = "MONGO" // Elegir FILESYSTEM O MONGO

let Product
let Cart

if (PERSISTENCIA === "FILESYSTEM") { 
    Product = ProductFS
    Cart= CartFS
    
} else { 
    Product = ProductMongo
    Cart = CartMongo
    const connection = mongoose.connect('mongodb+srv://Admin:1234@codercluster.u5lrvpk.mongodb.net/?retryWrites=true&w=majority', error => {
        if (error) console.log(error);
        else console.log(`Base de mongo conectada.`)
    })
}

export { Product, Cart } 