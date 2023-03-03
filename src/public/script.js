//Cliente
const socket = io();    //conección al socket server.

socket.emit('message', 'hola como estas desde cliente!')

socket.on('message', (data) => {
    console.log('data del server: ', data);
})

socket.on('message-menos', (data) => {
    console.log(data)
})

socket.on('message-todos', (data) => {
    console.log(data)
})