const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let room;

app.use(express.static(__dirname + '/'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    //отправка ID юзеру
    io.emit('send user id', socket.id)

    //присоединяем юзера к комнате
    socket.on('join room', (roomID)=>{
        let elementArray = []
        room = roomID
        socket.join(roomID);
        
        socket.on('player_current_element', (current_element)=>{
            elementArray.push(current_element)
            if (elementArray.length == 2) {
                let player1_elem = elementArray[0]
                let player2_elem = elementArray[1]
                
                if (player1_elem == player2_elem) {
                    io.in(room).emit(send)
                }
                
            }
        })

        // console.log(roomID)
        // console.log(socket.id)
    })

    //получение сообщения сервером и отправка их юзеру
    socket.on('send message', (message)=>{
        io.in(room).emit('getMessage', message)
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});