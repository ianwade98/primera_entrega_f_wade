const express = require('express');
const apiRoutes = require('./routers/app.routes');
const handlebars = require('express-handlebars');
const { join } = require('path')
const { Server } = require('socket.io')
const viewsRoutes = require('./routers/views/views.routes.js');

const PORT = 8080;
const app = express();

//template engine

app.engine('handlebars', handlebars.engine());

app.set('views', join(__dirname + '/views'));

app.set('view engine', 'handlebars');

//Middlewares
app.use(express.json());  //middleware incorporado
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname + '/public')));
app.use('/api', apiRoutes);
app.use('/', viewsRoutes);


const httpServer = app.listen(PORT, () => console.log('server listening on port: ', PORT));

const socketServer = new Server(httpServer);

//emit => emitir eventos
//on => escuchar eventosgit 

socketServer.on('connection', (socket) => {
    console.log('nuevo cliente conectado');
    console.log("Bienvenido", socket.id)
    socket.on('message', (data) => {
        console.log('la data llegada: ',  data)
    })

    // socket.emit('message', 'hola desde el server');
    // // socket._onclose('nos vemoss')
    // socket.broadcast.emit('message-menos', 'todos menos el actual.')

    // socketServer.emit('message-todos', 'todos los clientes')

    // socket.on('new-message', (data) => {
    //     console.log(data);
    //     socketServer.emit('new-message', data);
    // })
})