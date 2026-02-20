
const password = 'qaz-xsw';

// Проверяем длину пароля и наличие специальных символов
if (password.length >= 4 && (password.includes('-') || password.includes('_'))) {
  console.log('Пароль надёжный');
} else {
  console.log('Пароль недостаточно надёжный');
}




const userName = 'aNnA';
const userSurname = 'iVaNoVa';

// Преобразуем имя: первая буква заглавная, остальные строчные
const userNameTransformed = userName.substring(0, 1).toUpperCase() + userName.substring(1).toLowerCase();

// Преобразуем фамилию: первая буква заглавная, остальные строчные
const userSurnameTransformed = userSurname.substring(0, 1).toUpperCase() + userSurname.substring(1).toLowerCase();

// Выводим преобразованные имя и фамилию
console.log(userNameTransformed);
console.log(userSurnameTransformed);

// Проверяем, изменились ли строки
userName === userNameTransformed 
  ? console.log('Имя было преобразовано') 
  : console.log('Имя осталось без изменений');

userSurname === userSurnameTransformed 
  ? console.log('Фамилия была преобразована') 
  : console.log('Фамилия осталась без изменений');




const number = 5;

// Проверяем остаток от деления на 2
if (number % 2 === 0) {
  console.log('Число чётное');
} else {
  console.log('Число нечётное');
}