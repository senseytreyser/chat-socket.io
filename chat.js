const express = require('express'); 
const app = express();
const server = require('http').Server(app); // Подключаем http через app
const io = require('socket.io')(server); // Подключаем socket.io и указываем на сервер

const port = 3000; // Прописываем порт
console.log('Script has been started...');
server.listen(port) // Прослушиваем подключения на указанном порту

app.use(express.static(__dirname + '/build')); // Отправляет "статические" файлы из папки public при коннекте // __dirname - путь по которому лежит chat.js

io.on('connection', function (socket) { // Создаем обработчик события 'connection' которое создает io.connect(port); с аргументом socket
  var name = 'U' + (socket.id).toString().substr(1,4); // Создаем никнейм нашему клиенту. В начале буква 'U' дальше берем 3 символа ID (сокета) после первого символа, и все это клеим с помощью '+'
  socket.broadcast.emit('newUser', name); // Отсылает событие 'newUser' всем подключенным, кроме текущего. На клиенте навешаем обработчик на 'newUser' (Отправляет клиентам событие о подключении нового юзера)
  socket.emit('userName', name); // Отправляем текущему клиенту событие 'userName' с его ником (name) (Отправляем клиенту его юзернейм)
  console.log(name + ' connected to chat!');
  
  socket.on('sendMessage',function(message){
    io.sockets.emit('newMessage', {message, name});
    console.log('отправка соообщения ' + message);
  });
});