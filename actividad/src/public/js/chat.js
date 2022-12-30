const socket = io({
    autoConnect:false 
})



let user

Swal.fire({
    title:"Hola",
    input:"text",
    text:"ingresa tu nombre de chat",
    inputValidator: (value) => {
        return !value && "Necesitas un nombre para entrar al chat"
    },
    allowOutsideClick:false
}).then(result=>{
    user =result.value
    socket.connect()
    socket.emit('autenticado',user)
})

    const chatbox = document.getElementById('textito')
    chatbox.addEventListener('keyup', evento =>{
        if(evento.key==="Enter"){
            if(chatbox.value.trim().length>0){
                socket.emit('mensaje',{user, mensaje:chatbox.value.trim()})
                chatbox.value= ""
            }
        }

    })

    socket.on('logs', data=>{
        const logsPanel = document.getElementById('logsPanel')
        let mensajes = ''
        data.forEach(msg=>{
            mensajes += `${msg.user} dice: ${msg.mensaje} <br/>`
        })
        logsPanel.innerHTML = mensajes
    })

    socket.on('nuevoUsuarioConectado',data=>{
        if(!user) return 
            Swal.fire({
                toast:true,
                position:"bottom-end",
                showConfirmButton:false,
                timer:2000,
                title:`${data} se unio al chat`
            })
        
    })