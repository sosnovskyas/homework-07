'use strict';

const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const onLoginSubmit = event => {
  // const target = event.target;
  event.preventDefault();
  new Promise(function (resolve, reject) {

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);

    xhr.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function () {
      reject(new Error('Network Error'));
    };

    xhr.send();
  });
};
const onRegisterSubmit = event => {
  // const target = event.target;
  event.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/register', true);

  xhr.onload = function () {
    if (this.status == 200) {
      console.log(this.response);
    } else {
      const error = new Error(this.statusText);
      error.code = this.status;
      console.warn(error);
    }
  };

  xhr.onerror = function () {
    console.warn(new Error('Network Error'));
  };

  xhr.send();
};

if (loginForm) loginForm.addEventListener('submit', onLoginSubmit);
if (registerForm) registerForm.addEventListener('submit', onRegisterSubmit);
