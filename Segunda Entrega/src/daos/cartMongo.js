import cartsModel from "../models/cart.js"


class Cart {
    constructor(nombreColeccion) {
        if (nombreColeccion === "carritos") {
            this.model = cartsModel
        } else {
            throw new Error(`Alto! Te falta crear y/o importar el modelo de ${nombreColeccion}`)
        }
    }

    async getAll() { 
        return await this.model.find({})
    }

    async saveOne() { 
        const newDocument = {
            timestamp: Date.now(),
            contenedor: []
        }
        const documentSaveModel = new this.model(newDocument)
        const saveOne_ = await documentSaveModel.save()
        return saveOne_._id.valueOf()
    }

    async getById(id) {
        return await this.model.findOne({_id: id})
    }

    async saveContainerInContainer(idContGrande, idContChico) { 
        let document = await this.model.findOne({_id: idContGrande})
        let productos = document.contenedor
        
        if (productos.some(producto => producto.id === idContChico)) { 
            productos = productos.map(prod => {
                if (prod.id === idContChico){
                    prod.quantity++
                }
                return prod
            })
        } else { 
            productos.push({
                id: idContChico,
                quantity: 1
            })
        }
        await this.model.updateOne({_id: idContGrande}, {$set: {contenedor: productos}})
    }

    async deleteById(id) { 
        await this.model.updateOne({_id: id}, {$set: {contenedor: []}})
    }

    async deleteContainerInContainer(idContGrande, idContChico) { 
        let contenedorChicoBorrado = false
        let document = await this.model.findOne({_id: idContGrande})
        let productos = document.contenedor
        if (productos.some(producto => producto.id === idContChico)) { 
            const indiceContChico = productos.findIndex(producto => producto.id === idContChico)
            productos.splice(indiceContChico, 1);
            contenedorChicoBorrado = true
        }
        await this.model.updateOne({_id: idContGrande}, {$set: {contenedor: productos}})
        return contenedorChicoBorrado
    }
}

export default Cart