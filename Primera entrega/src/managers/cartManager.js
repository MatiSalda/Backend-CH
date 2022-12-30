import fs from 'fs';
import __dirname from '../utils.js';

export default class CartManager{

    constructor(){
        this.path = `${__dirname}/files/carts.json`;
        this.init();
    }

    init = async () => {
        if(!fs.existsSync(this.path)) await fs.promises.writeFile(this.path,JSON.stringify([]));
    }

    readCarts = async () => {
        let data =  await fs.promises.readFile(this.path,'utf-8');
        return JSON.parse(data);
    }

    getCarts = () => {
        return this.readCarts();
    }

    getCartsById = async (id) =>{
        const carts = await this.readCarts();
        const cart = carts.find(c => c.id === id);

        return cart;
    }

    exists = async (id)=>{
        const carts = await this.readCarts();
        return carts.some(ct => ct.id === id);
    }

    addCart = async()=>{
        let carts = await this.readCarts();
        const newCart = {
            timestamp : Date.now(),
            id : carts.length=== 0 ? 1 : carts[carts.length - 1].id + 1,
            products : []
        };
        carts.push(newCart);
        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,'\t'));
        return newCart;
    }

    addProductInContainer = async(cid,pid)=>{
        const carts = await this.readCarts();
        const newCarts = carts.map(cartM =>{
            if (cartM.id === cid) {

                if (!cartM.products.some(p => p.id === pid)) {
                    cartM.products.push({ 
                        id : pid,
                        quantity : 1
                    })
                } else {
                    const newProducts = cartM.products.map(obj => {
                        if (obj.id == pid) {
                            obj.quantity++;
                        }
                        return obj;
                    })

                    cartM.products = newProducts;
                }
            }
            return cartM;
        })
        await fs.promises.writeFile(this.path,JSON.stringify(newCarts, null, '\t'));
    }

    deleteCartById = async (id) =>{
        let carts = await this.getCarts();

        let newCart = carts.map(obj => {
            if(obj.id === id){
                obj.products = []
            };
            return obj
        });
        newCart = JSON.stringify(newCart,null,'\t')
        await fs.promises.writeFile(this.path,newCart);
    };

    deleteProductById = async(cid,pid)=>{
        let contremove = false;
        let carts  = await this.getCarts();
        let newCart = carts.map(obj =>{
            if(obj.id === cid){
                if(obj.products.some(prod => prod.id === pid)){
                    const indexCont = obj.products.findIndex(prodt => prodt.id === pid);
                    obj.products.splice(indexCont,1);
                    
                    contremove = true;
                }
                return obj;
            }
        });
        newCart = JSON.stringify(newCart,null,'\t')
        await fs.promises.writeFile(this.path,newCart);
        return contremove;
    } 
}

