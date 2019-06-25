const app = require('http').createServer();
const io = require('socket.io')(app);

const PORT = process.env.PORT || 8082;

app.listen(PORT,()=>{
  console.log('Connected to port ' + PORT);
});

const users = [];

io.on('connection',(socket)=>{
  console.log('Socket Id ' + socket.id);

  socket.on('setUserName', (name)=>{
    users.push({key:socket.id, name});
    console.log(users);
  });

  socket.on('enterChat',( {id, name} )=>{
    users.push( {id, name} );
    io.emit('userCame', {name, users});
  });

  socket.on('sendMessage', (message) => {
    console.log(message);
  })

});

