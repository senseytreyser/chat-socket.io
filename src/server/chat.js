const app = require('http').createServer();
const io = require('socket.io')(app);

const PORT = process.env.PORT || 8082;

app.listen(PORT,()=>{
  console.log('Connected to port ' + PORT);
});

const users = [];
const chatLog = [];


io.on('connection',(socket) => {

  console.log('Socket Id ' + socket.id);
  
  //Вход пользователя в чат
  socket.on('enterChat',( user )=>{
    users.push(user);
    console.log(users);
    io.emit('newUser', {user, users});
  });

  //Пользователь вышел из чата
  socket.on('disconnect',()=>{
    users.push(user);
    console.log(users);
    io.emit('newUser', {user, users});
  });

  //Получение сообщения от пользователя и отправка его всем остальным
  socket.on('sendMessage', (objMessage) => {
    chatLog.push(objMessage); //Добавление пришедшего объекта в массив

    const largMesObj = createLargeMessObj(objMessage, users);
    io.emit('newMessage', largMesObj); //Отправка сообщения всем пользователям
    
    const {id, message, date} = objMessage;
    console.log(date + ' Пользователь с id:' + id + ' отправил сообщение: '+ message); //логирование сообщения
  })

});

function createLargeMessObj({id, message, date},users){
  const user = users.filter( (obj) => {
    return obj.id === id;
  });
  return {
    key: date,
    message, 
    date,
    name: user.name
  };
}