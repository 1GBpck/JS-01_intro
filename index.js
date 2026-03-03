// Задача 1
function getAge(birthYear) {
    // Получаем текущую дату
    let currentDate = new Date();
    // Извлекаем текущий год
    let currentYear = currentDate.getFullYear();
    
    // Рассчитываем возраст
    let age = currentYear - birthYear;
    
    // Возвращаем результат
    return age;
}

// Вызываем функцию и выводим результат в консоль
console.log(getAge(1998)); 
console.log(getAge(1991)); 
console.log(getAge(2007));

// Задача 2
function filter(whiteList, blackList) {
    // Создаём новый массив, оставляя только те email, которых нет в чёрном списке
    let result = whiteList.filter(email => !blackList.includes(email));
    
    // Возвращаем отфильтрованный массив
    return result;
}

// Исходные данные
let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru'];
let blackList = ['jsfunc@mail.ru', 'goodday@day.ru'];

// Вызываем функцию и сохраняем результат
let result = filter(whiteList, blackList);

// Выводим результат в консоль
console.log(result);


// Задача 3
function arrSort(arr) {
    let sortedArr = arr.slice().sort((a, b) => a - b);
    
    // Возвращаем отсортированный массив
    return sortedArr;
}

// Проверка работы функции
console.log(arrSort([2, 5, 1, 3, 4]));        
console.log(arrSort([12, 33, 3, 44, 100]));  
console.log(arrSort([0, 1]));                 