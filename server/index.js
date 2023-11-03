const express = require("express")
const http = require("http")
const {Server} = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
    origin: "http://127.0.0.1:5173"
}})

io.on("connection", socket => {  //on es para decir cuando pase algo
    console.log(socket.id); 
    socket.on("message", (body) => { //vamos a recibir el event message y vamos a recibir data
        socket.broadcast.emit("message",{
            body, // contenido del msj
            from: socket.id.slice(6)
         })
    })

})

server.listen(3000)
console.log("Server on port", 3000);