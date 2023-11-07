const express = require("express")
const http = require("http")
const mongoose  = require("mongoose");
const morgan = require("morgan");
const {Server} = require("socket.io")
const cors = require('cors')
const bodyParser = require ('body-parser')

const { userDB, password } = process.env;
const uri = `mongodb+srv://<username>:<password>@cluster0.9siz8th.mongodb.net/`
mongoose.Promise = global.Promise
const app = express()
 
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "~"
    }})
    
    
    app.use(cors())
    app.use(morgan("dev"))
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    //rutas
    //app.use(router)

io.on ("connection", socket => {  //on es para decir cuando pase algo
    console.log(socket.id); 
    socket.on("message", (body) => { //vamos a recibir el event message y vamos a recibir data
        socket.broadcast.emit("message",{
            body, // contenido del msj
            from: socket.id.slice(6)
         })
    })

})

//rutas
// app.use("api/", router)

// mongoose.connect(`mongodb+srv://${userDB}:${password}@cluster0.9siz8th.mongodb.net/`).then(()=>{
//     console.log("Conexion a la BDD")
    
    
    
// })
server.listen(4000, ()=>{
    console.log("Server on port", 4000);

})