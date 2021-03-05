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
  console.log('userNameInput.value:', userNameInput.value);
  if (!userNameInput.value) {
    alert('You cannot leave username empty!')
  } else {
    userName = userNameInput;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  };
};