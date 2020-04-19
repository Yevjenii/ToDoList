'use strict';

const toDoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const toDoList = document.querySelector('.todo-list');
const toDoCompleted = document.querySelector('.todo-completed');

let todoData = [
   
];

const render = function() {

    toDoList.textContent = '';
    toDoCompleted.textContent = '';

    todoData.forEach(function(item, index){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>'+
        '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
        '</div>';
        
        if(item.completed) {
            toDoCompleted.append(li);
        } else {
            toDoList.append(li);
        }
        
        const btnToDoComplete = li.querySelector('.todo-complete');
        
        localStorage.setItem("todoData", JSON.stringify(todoData));
        btnToDoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            
            render();
        });
        
        const btnToDoRemove = li.querySelector('.todo-remove');
        btnToDoRemove.addEventListener('click', function(){
            todoData.splice(index, 1);
            render();
        });
    });
};
toDoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if(headerInput.value === '') {
        alert('Введите дело!');
        return;
    }
    const newToDo = {
        value: headerInput.value,
        completed: false
    };
    
    todoData.push(newToDo);
    headerInput.value = '';
    render();
});
if(localStorage.getItem("todoData")){
    todoData = JSON.parse(localStorage.getItem("todoData"));
}
render();