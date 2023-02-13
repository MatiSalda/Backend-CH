import fs from "fs" 
import __dirname from "../utils.js"

const stringAleatorio = (n) => { // Devuelve un string aleatorio de longitud n
    const simbolos = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789¡!¿?@#$%&()+-=*,.;:_"
    let stringRandom = ""
    for (let i=1; i<=n; i++) {
        stringRandom += simbolos[parseInt(simbolos.length*Math.random())]
    }
    return stringRandom
}



class Product {
    constructor(nombreDelArchivo) { 
        this.nombre = nombreDelArchivo
        this.path = `${__dirname}/json/${this.nombre}.json` 
    }

    async getAll() { 
        let datosArchivo = []
        if (fs.existsSync(this.path)) { 
            datosArchivo = await fs.promises.readFile(this.path, "utf-8")
            datosArchivo = datosArchivo === "" ? [] : JSON.parse(datosArchivo) 
        }
        return datosArchivo
    }
       
    async saveOne(objeto) {
        let datosArchivo = await this.getAll()
        if (datosArchivo.length === 0) { 
            objeto.id = 1 
        
        } else {
            const obtenerIds = datosArchivo.map(objeto => objeto.id)
            objeto.id = Math.max(...obtenerIds) + 1 
        }
        objeto.timestamp = Date.now()
        objeto.code = stringAleatorio(10)
        datosArchivo.push(objeto) 
        datosArchivo = JSON.stringify(datosArchivo, null, "\t") 
        await fs.promises.writeFile(this.path, datosArchivo) 
        return objeto.id 
    }

    async getById(id) { 
        id = parseInt(id)
        console.log(id)
        const datosArchivo = await this.getAll()
        return datosArchivo.some(objeto => objeto.id === id) ? datosArchivo.find(objeto => objeto.id === id) : null
    }

    async deleteById(id) {
        id = parseInt(id)
        let datosArchivo = await this.getAll()
        datosArchivo = datosArchivo.filter(objeto => objeto.id !== id)
        datosArchivo = JSON.stringify(datosArchivo, null, "\t")
        await fs.promises.writeFile(this.path, datosArchivo)
    }

    async deleteAll() {
        if (fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, "[]")
        }
    }

    async update(objetoActualizado, id) { 
        let datosArchivo = await this.getAll()
        const indiceObjeto = datosArchivo.findIndex(objeto => objeto.id == id)
        objetoActualizado.id = parseInt(id)
        objetoActualizado.code = datosArchivo[indiceObjeto].code
        datosArchivo[indiceObjeto] = objetoActualizado
        datosArchivo = JSON.stringify(datosArchivo, null, "\t")
        await fs.promises.writeFile(this.path, datosArchivo)
    }
}

export default Product