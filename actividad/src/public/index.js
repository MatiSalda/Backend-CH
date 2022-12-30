let form = document.getElementById("formProductos")

form.addEventListener('submit', e=> {
e.preventDefault()
let formData = new FormData(form)
fetch('/productos',{
    method:'POST',
    body:formData,
}).then(result => result.json()).then(json=>console.log(json))
})

