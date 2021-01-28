const express = require('express');
var cors = require('cors')

const app = express()
const server = app.listen(3005 , () => console.log('listening on *:3005') )

app.options('*', cors())

var corsOptions = {
  cors:true,
  origin: '*'
}

app.use(cors(corsOptions))


const io = require('socket.io')(server , corsOptions)
 

app.get('/' , (req, res) => {
  res.send("<h1>Hello world!!</h1>")
});

io.on('connection' , socket => {

  console.log('User connected : ' + socket.id);

  socket.emit("your id" , socket.id)

  socket.on("send message" , body => {
      io.emit("message" , body)
  })
  
});
