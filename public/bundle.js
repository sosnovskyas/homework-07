'use strict';

const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');

if (loginForm) {
  loginForm.addEventListener('submit', event => {
    // const target = event.target;
    event.preventDefault();

  });
}

if (registerForm) {
  registerForm.addEventListener('submit', event => {
    // const target = event.target;
    event.preventDefault();

  });
}
