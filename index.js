//функция для функций
const todoElement = document.querySelector('.todo');
localStorage.clear();

const todo = {

    //метод init() инициализирует to-do
    initToDo()
    {
        const getFromStorage = localStorage.getItem('todo');
        if (getFromStorage){
            todoElement.querySelector('.todo-items-list').innerHTML = getFromStorage;
        }
        todoElement.querySelector('.todo-options').addEventListener('change', this.updateAction);
        todoElement.addEventListener('click', this.action.bind(this)); //bind в action для текущего контекста

    },


    //create для возврата html созданной задачи
    create(text) {
        return `<li class="todo-item" data-todo-state="active">
                <span class="todo-task-t">${text}</span>
                <span class="todo-action todo-action-restore" data-todo-action="active"></span>
                <span class="todo-action todo-action-complete" data-todo-action="completed"></span>
                <span class="todo-action todo-action-delete" data-todo-action="deleted"></span>
                </li>`;
    },


    updateAction() {
        const option = todoElement.querySelector('.todo-options').value;
        todoElement.querySelector('.todo-items-list').dataset.todoOption = option; //выставляет атрибуту data-tod-option (в элементе tod-items) значение выбранной опции
        todoElement.querySelector('.todo-task').disabled = option !== 'active'; //применяем disabled если option не active
    },

    addAction() {
        const taskText = todoElement.querySelector('.todo-task');
        if (taskText.disabled || !taskText.value.length){

            return;
        }

        todoElement.querySelector('.todo-items-list').insertAdjacentHTML('beforeend', this.create(taskText.value));
        taskText.value='';
    },

    save(){
        localStorage.setItem('todo', todoElement.querySelector('.todo-items-list').innerHTML);
    },

    action(event) {
        const target = event.target; //event.target - выбранный элемент (по которому идёт клик)
        if (target.classList.contains('todo-action')){

            const action = target.dataset.todoAction; //действие, которое нужно выполнить
            const elementItem = target.closest('.todo-item');
            if(action === 'deleted' && elementItem.dataset.todoState === 'deleted'){
                elementItem.remove();
            }
            else{
                elementItem.dataset.todoState = action;
            }
            this.save();
        }
        else if(target.classList.contains('todo-add-button')){
            this.addAction();
            this.save();
        }
    },
};

todo.initToDo();


