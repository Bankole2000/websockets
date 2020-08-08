const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const port = '5000';
const server = app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});

// Serve up static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

io.on('connection', (socket) => {
  console.log('Made socket connection');

  // listen for events - params ('eventName', callback(data) => {})
  socket.on('chat', (data) => {
    // emit the event and data back to all sockets
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
