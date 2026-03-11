function createStudentsList(listArr) {
    const ul = document.createElement('ul');
    
    for (let student of listArr) {
        const li = document.createElement('li');
        
        const title = document.createElement('h2');
        title.textContent = student.name;
        
        const ageInfo = document.createElement('span');
        ageInfo.textContent = `Возраст: ${student.age} лет`;
        
        li.appendChild(title);
        li.appendChild(ageInfo);
        ul.appendChild(li);
    }
    
    document.body.appendChild(ul);
}

// Массив студентов
let allStudents = [
    {name: 'Валя', age: 11},
    {name: 'Таня', age: 24},
    {name: 'Рома', age: 21},
    {name: 'Надя', age: 34},
    {name: 'Антон', age: 7}
];

// Вызов функции
createStudentsList(allStudents);