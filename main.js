(function(){

    // Сохранение и загрузка данных из LocalStorage
    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    function loadFromLocalStorage(key) {
        const jsonData = localStorage.getItem(key);
        if (!jsonData) return null;
        return JSON.parse(jsonData);
    }

    // Создание элементов интерфейса
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        input.type = 'text';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        button.type = 'submit';
        button.disabled = true; // Кнопка отключена, пока поле пустое

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return { form, input, button };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(todoObj) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = todoObj.name;
        
        // Визуальное выделение выполненного дела
        if (todoObj.done) {
            item.classList.add('list-group-item-success');
        }

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return { item, doneButton, deleteButton };
    }

    // Генерация уникального ID
    function generateTodoId(todos) {
        if (todos.length === 0) return 1;
        const maxId = todos.reduce((max, todo) => todo.id > max ? todo.id : max, 0);
        return maxId + 1;
    }

    // Основная функция приложения
    function createTodoApp(container, appTitle, listName) {
        let todos = [];
        
        let todoAppTitle = createAppTitle(appTitle);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        
        // Управление состоянием кнопки (disabled)
        todoItemForm.input.addEventListener('input', function() {
            todoItemForm.button.disabled = todoItemForm.input.value.trim() === '';
        });
        
        // Добавление нового дела
        todoItemForm.form.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputValue = todoItemForm.input.value.trim();
            
            if (!inputValue) return;

            const newTodo = {
                id: generateTodoId(todos),
                name: inputValue,
                done: false
            };
            
            todos.push(newTodo);
            let todoItem = createTodoItem(newTodo);

            // Обработчик кнопки "Готово"
            todoItem.doneButton.addEventListener('click', function(){
                todoItem.item.classList.toggle('list-group-item-success');
                const todo = todos.find(t => t.id === newTodo.id);
                if (todo) {
                    todo.done = !todo.done;
                    saveToLocalStorage(listName, todos);
                }
            });

            // Обработчик кнопки "Удалить"
            todoItem.deleteButton.addEventListener('click', function(){
                if (confirm('Вы уверены?')){
                    todoItem.item.remove();
                    const index = todos.findIndex(t => t.id === newTodo.id);
                    if (index !== -1) {
                        todos.splice(index, 1);
                        saveToLocalStorage(listName, todos);
                    }
                }
            });

            todoList.append(todoItem.item);
            todoItemForm.input.value = '';
            todoItemForm.button.disabled = true;
            saveToLocalStorage(listName, todos);
        });
        
        // Загрузка сохранённых дел при старте
        const savedTodos = loadFromLocalStorage(listName);
        
        if (savedTodos && Array.isArray(savedTodos)) {
            todos = savedTodos;
            
            todos.forEach(todo => {
                const todoItem = createTodoItem(todo);
                
                todoItem.doneButton.addEventListener('click', function(){
                    todoItem.item.classList.toggle('list-group-item-success');
                    const t = todos.find(item => item.id === todo.id);
                    if (t) {
                        t.done = !t.done;
                        saveToLocalStorage(listName, todos);
                    }
                });

                todoItem.deleteButton.addEventListener('click', function(){
                    if (confirm('Вы уверены?')){
                        todoItem.item.remove();
                        const index = todos.findIndex(item => item.id === todo.id);
                        if (index !== -1) {
                            todos.splice(index, 1);
                            saveToLocalStorage(listName, todos);
                        }
                    }
                });
                
                todoList.append(todoItem.item);
            });
        }
    }

    // Запуск приложения
    document.addEventListener('DOMContentLoaded', function() {
        const container = document.getElementById('todo-app');
        createTodoApp(container, 'Мои дела', 'my-todos');
    });

})();