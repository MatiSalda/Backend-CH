import { Router } from "express";
import ContenedorSQL from "../contenedor/contenedor.js";
import sqliteOpcions from "../DB/knex.js";
import uploader from "../servicios/upload.js";

const router = Router();
const contenedor = new ContenedorSQL(sqliteOpcions, "products")
//products

router.get('/productos', async (request, response) => {
    const productos = await contenedor.getAll()
    if (productos.length != 0 ) {
        response.render('home', {        
            productos
        })
    } else {
        response.render('home', {    
            productos : {
                mensaje: "No hay productos agregados"
            }
        })
    }

})
router.post('/', uploader.single('image'), async (request, response) => {
    let image = ""
    if (request.file) {
        image = request.protocol + "://" + request.hostname + ":8080/images/" + request.file.filename
    }
    let product = request.body;
    if ((product.name && product.price) != '') {
        product.image = image;
        const result = await contenedor.save(product)
        response.send({ product: result })
    } else {
        response.send({ status: "error", message: "faltan completar campos obligatorios" })
    }
})

export default router 