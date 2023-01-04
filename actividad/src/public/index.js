let form = document.getElementById('productForm')
let nameInput = document.getElementById('name')
let priceInput = document.getElementById('price')
let img = document.getElementById('image')

form.addEventListener('submit',e=>{
    e.preventDefault();
    let formData = new FormData(form);
    if(form.price.value && form.name.value){
        socket.emit('addNew', {name: form.name.value,price: form.price.value})
        fetch('/productos',{
            method: 'POST',
            body: formData,
        }).then(result => result.json).then(result => console.log(result))
        productForm.reset()
    }else{
        console.log("Faltan completar campos")
    }
})