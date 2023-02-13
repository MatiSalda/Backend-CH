import productsModel from "../models/product.js"


const stringAleatorio = (n) => { 
    const simbolos = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789¡!¿?@#$%&()+-=*,.;:_"
    let stringRandom = ""
    for (let i=1; i<=n; i++) {
        stringRandom += simbolos[parseInt(simbolos.length*Math.random())]
    }
    return stringRandom
}


class Product {
    constructor(nombreColeccion) {
        if (nombreColeccion === "productos") {
            this.model = productsModel
        
        } else {
            throw new Error(`Alto! Te falta crear y/o importar el modelo de ${nombreColeccion}`)
        }
    }

    async getAll() { 
        return await this.model.find({})
    }

    async saveOne(document) { 
        document.timestamp = Date.now()
        document.code = stringAleatorio(10)
        const documentSaveModel = new this.model(document)
        const saveOne_ = await documentSaveModel.save()
        return saveOne_._id.valueOf()
    }

    async getById(id) { 
        const document = await this.model.find({_id: id})
        return document.length === 0 ? null : document
    }

    async deleteById(id) { 
        await this.model.deleteOne({_id: id})
    }

    async deleteAll() { 
        await this.model.deleteMany({})
    }

    async update(documentoActualizado, id) { 
        await this.model.updateOne({_id: id}, {$set: {...documentoActualizado}})
    }
}

export default Product