function createStudentCard(student) {
    const card = document.createElement('div');
    card.classList.add('student-card');
    
    const title = document.createElement('h2');
    title.textContent = student.name;
    
    const ageInfo = document.createElement('span');
    ageInfo.textContent = `Возраст: ${student.age} лет`;
    
    card.appendChild(title);
    card.appendChild(ageInfo);
    document.body.appendChild(card);
}


let studentObj = {
    name: 'Игорь',
    age: 17
};
createStudentCard(studentObj);