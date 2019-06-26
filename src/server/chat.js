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
  socket.on('enterChat',( user ) => {
    users.push(user);
    io.emit('newUser', {user, users});
  });

  //Пользователь вышел из чата
  socket.on('disconnect',()=>{
    deleteUser(socket.id, users);
    io.emit('exitUser', 'user');
  });

  //Получение сообщения от пользователя и отправка его всем остальным
  socket.on('sendMessage', (objMessage) => {
    chatLog.push(objMessage); //Добавление пришедшего объекта в массив

    const largMesObj = createLargeMessObj(objMessage, users);
    io.emit('newMessage', largMesObj); //Отправка сообщения всем пользователям
    
    const {name, message, date} = largMesObj;
    console.log(date + ' Пользователь по имени:' + name + ' отправил сообщение: '+ message); //логирование сообщения
  })

});

function createLargeMessObj({id, message, date}, users){
  const user = users.filter( (obj) => {
    return obj.id === id;
  })[0]; //Метод возвращает массив с одним элементом, выбираем его
  console.log(user)
  return {
    key: date,
    message, 
    date,
    name: user.name
  };
}

function deleteUser(id, userList){
  console.log('Пользователь ' + id + ' нас покинул')
}