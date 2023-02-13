import { Router } from "express";
import { Product} from "../daos/index.js";


const router = Router(); 

const productos = new Product("productos");

let admin = true; 

router.get("/", async (req, res) => { 
    const result = await productos.getAll()
    res.send({ status: "success", payload: result })
})

router.get("/:pid", async (req, res) => {
    const { pid } = req.params
    const result = await productos.getById(pid)
    if (result === null) {
        res.send({ error: "Product not found"})
    } else {
        res.send({ status: "success", payload: result })
    }   
})

router.post("/", async (req, res) => {
    if (!admin) {
        return res.send({ error: -1, description: "Ruta '/api/products', método POST no autorizado" })
    }

    const { title, description, image, price, stock } = req.body;
        
    if (!title || !description || !image || !price || !stock) {
        res.status(400).send({ status: "error", error: "Incomplete values" })
    
    } else {
        const producto = { 
            title,
            description,
            image,
            price: parseFloat(price),
            stock
        }
        const result = await productos.saveOne(producto)
        res.send({ status: "sucess", message: "Product added", idProduct: result })
    }
})


router.put("/:pid", async (req, res) => {
    const { pid } = req.params

    if (!admin) {
        return res.send({ error: -1, description: `Ruta '/api/products/${pid}', método PUT no autorizado` })
    }

    const datosArchivo = await productos.getAll()

    const { title, description, image, price, stock } = req.body;
    
    const producto = { 
        title,
        description,
        image,
        price: parseFloat(price),
        stock
    }
    producto.timestamp = Date.now()

    if (!title || !description || !image || !price || !stock) {
        res.status(400).send({ status: "error", error: "Incomplete values" })
    
    } else if (datosArchivo.some(objeto => objeto.id == pid)) {
        await productos.update(producto, pid)
        res.send({ status: "sucess", message: `Producto con id ${pid} actualizado`})

    } else {
        res.send({ error: "Product not found"})
    }
})

router.delete("/:pid", async (req, res) => { 
    const { pid } = req.params

    if (!admin) {
        return res.send({ error: -1, description: `Ruta '/api/products/${pid}', método DELETE no autorizado` })
    }

    const datosArchivo = await productos.getAll()
    
    if (datosArchivo.some(objeto => objeto.id == pid)) {
        await productos.deleteById(pid)
        res.send({ status: "sucess", message: `Producto con id ${pid} eliminado` })
    } else {
        res.send({ error: "Product not found" })
    }
})

export default router;