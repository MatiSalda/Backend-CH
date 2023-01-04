import knex from "knex";
import __dirName from "../utils.js";

const sqliteOpcions = {
    client: 'sqlite3',
    connection:{
        filename:`${__dirName}./DB/ecommerce.sqlite`  //Solucion a: SQLite Error 14: 'unable to open database file'
    },
    useNullAsDefault: true
}
const db = knex (sqliteOpcions)

try {
    let exist = await db.schema.hasTable('products')
    if(!exist){
        await db.schema.createTable('products', table => {
            table.primary('id');
            table.increments('id');
            table.string('name', 35).nullable(false);
            table.float('price').nullable(false);
            table.string('image', 1024);
        })
    }
} catch (error) {
    console.log(error)
}

try {
    let exist = await db.schema.hasTable('messages')
    if(!exist){
        await db.schema.createTable('messages', table => {
            table.primary('id');
            table.increments('id');
            table.string('emailUser', 35)
            table.string('message')
            table.string('date', 30)
        })
    }
} catch (error) {
    console.log(error)
}
export default sqliteOpcions;