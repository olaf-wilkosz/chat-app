const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id + '.');

  socket.on('join', (user) => {
    console.log(user + ' has just joined the chat under ID ' + socket.id + '.');
    users.push({ user, id: socket.id });
    socket.broadcast.emit('userJoined', { author: 'Chat Bot', content: `${user} has joined the conversation!` });
  });

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    const leaving = users.find(user => user.id === socket.id);
    const index = users.indexOf(leaving);
    users.splice(index, 1);
    console.log('Oh, ' + leaving.user + ' (socket ' + socket.id + ') has left...');
    socket.broadcast.emit('userLeft', { author: 'Chat Bot', content: `${leaving.user} has left the conversation... :(` });
  });

  console.log('I\'ve added a listener on message and disconnect events. \n');
});