function createStudentCard(name, age) {
    // Создаём основной контейнер карточки
    const card = document.createElement('div');
    card.classList.add('student-card');
    
    // Создаём заголовок с именем
    const title = document.createElement('h2');
    title.textContent = name;
    
    // Создаём элемент с возрастом
    const ageInfo = document.createElement('span');
    ageInfo.textContent = `Возраст: ${age} лет`;
    
    // Собираем карточку: добавляем элементы внутрь div
    card.appendChild(title);
    card.appendChild(ageInfo);
    
    // Добавляем карточку в body
    document.body.appendChild(card);
}

// Примеры вызова функции
createStudentCard('Игорь', 17);
createStudentCard('Анна', 20);
createStudentCard('Дмитрий', 19);