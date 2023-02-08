const elForm = document.querySelector('.js-form')
const elInput = document.querySelector('.js-input')
const localData = localStorage.getItem('token')
console.log(localData);


const elLogOutBtn = document.querySelector('.js-logout')
const elList = document.querySelector('.js-list')

elLogOutBtn.addEventListener('click', function () {
  localStorage.removeItem('token')
  location.reload()
})

if (!localData) {
  location.replace('login.html')
}

const renderTodo = (array, node) => {
  node.innerHTML = ""
  array.allTodos.forEach(todo => {
    node.innerHTML += `
    <li class="list-group-item d-flex align-items-center ">
    <input class="form-check-input me-3 js-chechbox" type="checkbox" data-todo-id=${todo._id} ${todo.completed ? "checked" : ""}>
    <span class="flex-grow-1" style="${todo.completed ? "text-decoration: line-through " : ""};">${todo.task}</span>
    <button class="btn btn-warning me-2 js-edit-btn" data-todo-id=${todo._id}>EDIT</button>
    <button class="btn btn-danger js-delete-btn" data-todo-id=${todo._id}>DELETE</button>
  </li>`
  })
}



async function getTodos() {
  const res = await fetch("https://todo-for-n92.cyclic.app/todos/all", {
    headers: {
      "x-access-token": localData,
    }
  })
  const data = await res.json()
  console.log(data);
  renderTodo(data, elList)
}

getTodos()

elForm.addEventListener('submit', function (evt) {
  evt.preventDefault()
  fetch('https://todo-for-n92.cyclic.app/todos/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "x-access-token": localData,
    },
    body: JSON.stringify({
      task: elInput.value
    })
  }).then(res => res.json())
    .then(data => {
      if (data) {
        getTodos()
      }
    })
    .catch(err => console.log(err))
    elInput.value=""
})


const deleteTodo = (id) => {
  fetch(`https://todo-for-n92.cyclic.app/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': "application/json",
      "x-access-token": localData,
    }
  }).then(res => res.json())
    .then(data => {
      if (data) {
        getTodos()
      }
    })
    .catch(err => console.log(err))
}

const editTodo = (id) => {
  const newValue = prompt("Yangi todoni kiriting:")
  fetch(`https://todo-for-n92.cyclic.app/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': "application/json",
      "x-access-token": localData,
    },
    body:
      JSON.stringify({ task: newValue })

  })
    .then(res => res.json())
    .then(data => {
      if (data) {
        getTodos()
      }
    })
    .catch(err => console.log(err))
}

const isCompleted = (id) => {
  fetch(`https://todo-for-n92.cyclic.app/todos?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': "application/json",
      "x-access-token": localData,
    },
    body:
      JSON.stringify({ task: "Update task" })

  }).then(res => res.json())
    .then(data => {
      if (data) {
        getTodos()
      }
    })
    .catch(err => console.log(err))
}

elList.addEventListener('click', function (evt) {
  if (evt.target.matches(".js-delete-btn")) {
    const btnId = evt.target.dataset.todoId
    deleteTodo(btnId)
  };
  if (evt.target.matches(".js-edit-btn")) {
    const btnId = evt.target.dataset.todoId
    editTodo(btnId)
  };
  if (evt.target.matches('.js-chechbox')) {

    const todoId = evt.target.dataset.todoId;
    isCompleted(todoId)
  }
})





