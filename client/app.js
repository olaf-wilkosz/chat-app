const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

loginForm.addEventListener('submit', (event) => {
  login(event);
});

const login = event => {
  event.preventDefault();

  if (!userNameInput.value) {
    alert('You cannot leave username empty!');
  } else {
    userName = userNameInput;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  };
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
    messageContentInput.value = '';
  };
};