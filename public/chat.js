// Make connection
const port = '5000';
const socket = io.connect(`http://localhost:${port}`);

// DOM elements
const message = document.querySelector('#message'),
  handle = document.querySelector('#handle'),
  button = document.querySelector('#send'),
  output = document.querySelector('#output'),
  feedback = document.querySelector('#feedback');

// emit event on send click
button.addEventListener('click', () => {
  console.log('clicked');
  // socket.emit takes 2 params - name of event and data to be sent
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
  });

  feedback.innerHTML = '';
  message.value = '';
});

// emit event on messagetyping
message.addEventListener('keypress', () => {
  socket.emit('typing', {
    handle: handle.value,
  });
});

// Listen for events from the server
socket.on('chat', (data) => {
  output.innerHTML += `<p><strong> ${data.handle}: </strong> ${data.message} </p>`;
  feedback.innerHTML = '';
});

socket.on('typing', (data) => {
  feedback.innerHTML = `<p><em>${data.handle} is typing</em></p>`;
});
