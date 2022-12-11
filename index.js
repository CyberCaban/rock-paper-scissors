const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let room;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    //присоединяем юзера к комнате
    socket.on('join room', (roomID)=>{
        room = roomID
        socket.join(roomID);
        //отправка ID комнаты юзеру
        io.emit('current room', roomID)
        console.log(roomID)
    })
    //получение сообщения сервером и отправка их юзеру
    socket.on('send message', (message)=>{
        io.to(room).emit('getMessage', message)
    })
});




server.listen(3000, () => {
    console.log('listening on *:3000');
});