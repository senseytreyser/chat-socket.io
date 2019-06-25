const app = require('http').createServer();
const io = require('socket.io')(app);

const PORT = process.env.PORT || 3231;

app.listen(PORT,()=>{
  console.log('Connected to port ' + PORT);
});

const users = {};

io.on('connection',(socket)=>{
  console.log('Socket Id ' + socket.id);

  socket.on('setUserName', (name)=>{
    users[socket.id] = {name};
    console.log('Пользователь ' + socket.id + ' ввёл имя - ' + name);
  });

  socket.on('enterChat',(socket)=>{
    const {name} = users[socket.id];
    io.emit('userCame', name)
  })

});

