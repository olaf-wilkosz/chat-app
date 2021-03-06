const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('userJoined', ({ author, content }) => addMessage(author, content));
socket.on('userLeft', ({ author, content }) => addMessage(author, content));

let userName = '';

loginForm.addEventListener('submit', (event) => {
  login(event);
});

const login = event => {
  event.preventDefault();

  if (!userNameInput.value) {
    alert('You cannot leave username empty!');
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  };
  socket.emit('join', userName);
};

addMessageForm.addEventListener('submit', (event) => {
  sendMessage(event);
});

const sendMessage = event => {
  event.preventDefault();

  if (!messageContentInput.value) {
    alert('You cannot send empty message!');
  } else {
    addMessage(userName, messageContentInput.value);
    socket.emit('message', { author: userName, content: messageContentInput.value });
    messageContentInput.value = '';
  };
};

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message-received');
  if (author === 'Chat Bot') {
    message.classList.add('message--bot');
  } else if (author === userName) {
    message.classList.add('message--self');
  };
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
};