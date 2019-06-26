const io = require('./chat');

function chatAction(socket, users, chatLog){
    
  console.log('Подключение ' + socket.id);

  let room;

  socket.on('sendRoomName', (roomName) => {
    room = roomName;
    socket.join(room);
  });
  
  //Вход пользователя в чат
  socket.to(room).on('enterChat',( user ) => {
    user.room = room;
    users.push(user);
    let roomUsers = getRoomUsers(room, users);
    io.to(room).emit('newUser', {user, roomUsers});
    console.log('Пользователь ' + user.id + ' вошёл в чат-комнату ' + room );
    console.log(roomUsers);
  });

  //Пользователь вышел из чата
  socket.on('disconnect',()=>{
    deleteUser(socket.id, users);
    io.emit('exitUser', 'user');
  });

  //Получение сообщения от пользователя и отправка его всем остальным
  socket.to(room).on('sendMessage', (objMessage) => {
    chatLog.push(objMessage); //Добавление пришедшего объекта в массив

    const largMesObj = createLargeMessObj(objMessage, users);
    io.to(room).emit('newMessage', largMesObj); //Отправка сообщения всем пользователям
    
    const {name, message, date} = largMesObj;
    console.log(date + ' Пользователь по имени:' + name + ' отправил сообщение: '+ message); //логирование сообщения
  })
}

function createLargeMessObj({id, message, date}, users){
  const user = users.filter( (obj) => {
    return obj.id === id;
  })[0]; //Метод возвращает массив с одним элементом, выбираем его
  console.log(user)
  const name = (user) ? user.name : id;
  return {
    key: date,
    message, 
    date,
    name
  };
}

function getRoomUsers(room, users){
  return users.filter( (obj) => {
    return obj.room === room;
  });
}

function deleteUser(id, userList){
  console.log('Пользователь ' + id + ' нас покинул')
}

module.exports = chatAction;