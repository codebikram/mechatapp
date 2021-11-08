const express = require('express')
const app = express()

//create server
const http = require('http').createServer(app)
const port = process.env.port || 3000

//set view engine
app.set('view engine', "ejs")

//midleware
app.use(express.static(__dirname+'/public'))


// route
app.get('/', (req, res) => {
    res.render('index', { title: "MeChat App" })
})

//port listen
http.listen(port, () => {
    console.log(`Listening port ${port}`)
})

//socket
const io=require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log('Someone Joined the chat')

    socket.on('message',(msg)=>{
        // console.log(msg)

        socket.broadcast.emit('message',msg)
    })
})