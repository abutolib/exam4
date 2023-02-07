const elForm = document.querySelector('.js-form')
const elKozBtn = document.querySelector('.koz-btn')

const elNameInput = document.querySelector('.js-name')
const elPasswordInput = document.querySelector('.js-password')

elKozBtn.addEventListener('mousedown', function () {
  elPasswordInput.type = 'text'
})
elKozBtn.addEventListener('mouseup', function () {
  elPasswordInput.type = 'password'
})



elForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  fetch('https://todo-for-n92.cyclic.app/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: elNameInput.value,
      password: elPasswordInput.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.token) {
        localStorage.setItem("token", data.token)
        location.replace('index.html')
      }

    })
    .catch((error) => {
      console.error('Error:', error);
    });



})


const elCard = document.querySelector('.card')
elCard.addEventListener('click', function (evt) {
  if (evt.target.matches('.login')) {
    location.replace('login.html')
  }
})

