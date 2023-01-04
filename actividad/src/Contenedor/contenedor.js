import knex from "knex";

class ContenedorSQL {
    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }
    getById = async (id) => {
        try {
            return this.knex.select('*').from(this.tabla).where('id', id)
        } catch (error) {
            console.log(error)
        }
    }
    getAll = async () => {
        try {
            return this.knex.select('*').from(this.tabla)
        } catch (error) {
            console.log(error)
        }
    }
    save = async (product) => {
        try {
            return this.knex.insert(product).into(this.tabla)
        } catch (error) {
            console.log(error)
        }
    }
    updateItem = async (product, id) => {
        try {
            return this.knex.into(this.tabla).where("id", id).update(product)
        } catch (error) {
            console.log(error)
        }
    }
    deleteById = async (id) => {
        try {
            return this.knex.into(this.tabla).where("id", id).del()
        } catch (error) {
            console.log(error)
        }
    }
    deleteAll = async () => {
        try {
            return this.knex.into(this.tabla).del()
        } catch (error) {
            console.log(error)
        }
    }
}
export default ContenedorSQL;