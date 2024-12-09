 document.addEventListener('DOMContentLoaded', () => {
    
    let todoList = JSON.parse(localStorage.getItem('todos')) || [];

    const todoListElement = document.getElementById('todoList');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const newTodoInput = document.getElementById('newTodo');
    function renderTodos() {
      todoListElement.innerHTML = '';
  
      todoList.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('list-group-item', 'todo-item');
        todoItem.innerHTML = `
          <span ${todo.completed ? 'style="text-decoration: line-through;"' : ''}>
            ${todo.text}
          </span>
          <button class="btn btn-warning btn-sm" onclick="editTodo(${index})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTodo(${index})">Delete</button>
          <button class="btn btn-success btn-sm" onclick="toggleComplete(${index})">
            ${todo.completed ? 'Undo' : 'Complete'}
          </button>
        `;
        todoListElement.appendChild(todoItem);
      });
    }
    function addTodo() {
      const todoText = newTodoInput.value.trim();
      if (todoText) {
        todoList.push({ text: todoText, completed: false });
        newTodoInput.value = ''; 
        saveTodos(); 
        renderTodos(); 
      }
    }
    function deleteTodo(index) {
      todoList.splice(index, 1);
      saveTodos(); 
      renderTodos(); 
    }
    function editTodo(index) {
      const newText = prompt('Edit your task:', todoList[index].text);
      if (newText) {
        todoList[index].text = newText.trim();
        saveTodos();
        renderTodos(); 
      }
    }
    function toggleComplete(index) {
      todoList[index].completed = !todoList[index].completed;
      saveTodos(); 
      renderTodos(); 
    }
    function saveTodos() {
      localStorage.setItem('todos', JSON.stringify(todoList));
    }
    addTodoBtn.addEventListener('click', addTodo);
    newTodoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
    renderTodos();
  });
  