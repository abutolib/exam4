const elForm = document.querySelector('.js-form')
const elKozBtn = document.querySelector('.koz-btn')

const elEmailInput = document.querySelector('.js-email')
const elPasswordInput = document.querySelector('.js-password')


elKozBtn.addEventListener('mousedown', function () {
  elPasswordInput.type = 'text'
})
elKozBtn.addEventListener('mouseup', function () {
  elPasswordInput.type = 'password'
})

elPasswordInput.addEventListener('mousemove', function () {
  elPasswordInput.style.backgroundColor = '#ccc'
})

elPasswordInput.addEventListener('mouseleave', function () {
  elPasswordInput.style.backgroundColor = 'transparent'
})

elEmailInput.addEventListener('mousemove', function () {
  elEmailInput.style.backgroundColor = '#ccc'
})

elEmailInput.addEventListener('mouseleave', function () {
  elEmailInput.style.backgroundColor = 'transparent'
})

elForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  fetch("https://todo-for-n92.cyclic.app/user/login", {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({
      username: elEmailInput.value,
      password: elPasswordInput.value
    },)
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if(data.token){
      localStorage.setItem('token',data.token)
      window.location.replace('index.html')
    }
  })
  .catch((err) => console.log(err)); 
})

