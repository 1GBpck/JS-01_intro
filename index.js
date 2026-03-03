// Задача 1
function getOlderUser(user1, user2) {
    if (user1.age > user2.age) {
        return user1.name;
    } else {
        return user2.name;
    }
}

// Исходные данные
let user1 = {
    name: 'Игорь',
    age: 17
};

let user2 = {
    name: 'Оля',
    age: 21
};

// Вызываем функцию и сохраняем результат
let result1 = getOlderUser(user1, user2);


console.log(result1); 


// Задача 2
// Функция getOlderUserArray, которая принимает массив пользователей
function getOlderUserArray(users) {
    if (users.length === 0) {
        return null;
    }
    
    
    let oldestUser = users[0];
    
    
    for (let i = 1; i < users.length; i++) {
        if (users[i].age > oldestUser.age) {
            oldestUser = users[i];
        }
    }
    
    
    return oldestUser.name;
}


let allUsers = [
    {name: 'Валя', age: 11},
    {name: 'Таня', age: 24},
    {name: 'Рома', age: 21},
    {name: 'Надя', age: 34},
    {name: 'Антон', age: 7}
];

// Вызываем функцию и сохраняем результат
let result2 = getOlderUserArray(allUsers);

console.log(result2); 

// Задача 3
function filter(objects, propertyName, propertyValue) {
    let result = objects.filter(obj => obj[propertyName] === propertyValue);
    
    // Возвращаем отфильтрованный массив
    return result;
}

// Исходные данные
let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов' },
    { name: 'Пётр', surname: 'Петров' }
];

// Вызываем функцию и сохраняем результат
let result = filter(objects, 'name', 'Иван');

console.log(result); 
