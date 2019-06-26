const app = require('http').createServer();
const io = module.exports = require('socket.io')(app);
const chatAction = require('./chatAction');

const PORT = process.env.PORT || 8082;

app.listen(PORT,()=>{
  console.log('Connected to port ' + PORT);
});

const users = [];
const chatLog = [];

io.on('connection', (socket) => {
  chatAction(socket, users, chatLog)
});