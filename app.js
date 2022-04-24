//localStorage.clear();


//Selectors
const todoInput = document.querySelector('.taskInput');
const todoButton = document.querySelector('.todoButton');
const todoList = document.querySelector('.todoList');
const filterOption = document.querySelector('.filterTodo');

//Event listeners
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click',addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener('click',filterTodo);


//functions
function addTodo(event){
    event.preventDefault(); //prevent from submitting
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    if(todoInput.value != ""){
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;

    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    newTodo.classList.add("todoItem");
    todoDiv.appendChild(newTodo);
    
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completeBtn");
    todoDiv.appendChild(completedButton);
    
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("deleteBtn");
    todoDiv.appendChild(trashButton);
    
    //Append to list
    todoList.appendChild(todoDiv);    
    /* this will append will append
    <div class="todo">
        <li></li>
        <button></button>
        <button></button>
    </div>
    to HTML*/
    }

    //Clear Input value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    //DELETE TASK
    if(item.classList[0] === 'deleteBtn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        todo.addEventListener('transitionend',function(){
            todo.remove();
            removeLocalTodos(todo);
        });
    }

    //MARK DONE
    if(item.classList[0] === 'completeBtn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
        }
    });
}

//Local Storage
function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;

    newTodo.classList.add("todoItem");
    todoDiv.appendChild(newTodo);
    
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completeBtn");
    todoDiv.appendChild(completedButton);
    
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("deleteBtn");
    todoDiv.appendChild(trashButton);
    
    //Append to list
    todoList.appendChild(todoDiv);
    });
}

//DELETING TODO FROM LOCAL STORAGE
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    const todoText = todo.children[0].innerText;
    //console.log(todos.indexOf(todoText));
    todos.splice(todos.indexOf(todoText),1);

    localStorage.setItem("todos",JSON.stringify(todos));    
}