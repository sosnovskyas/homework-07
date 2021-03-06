'use strict';

const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const onLoginSubmit = () => {
  fetch('/login', {method: 'post'})
    .catch(console.error)
  ;
};

const onRegisterSubmit = () => {
  fetch('/register', {method: 'post'})
    .catch(console.error)
  ;
};

if (loginForm) loginForm.addEventListener('submit', onLoginSubmit);
if (registerForm) registerForm.addEventListener('submit', onRegisterSubmit);
