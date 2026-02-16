// Задание 1
let x1 = 2;
let y1 = 3;
let x2 = 10;
let y2 = 5;

// 2. Вычисляем ширину (разница по оси X)
let width = Math.abs(x2 - x1);

// 3. Вычисляем высоту (разница по оси Y)
let height = Math.abs(y2 - y1);

let area = width * height;
console.log("Площадь прямоугольника:", area);


// Задание 2
let a = 13.123456789;
let b = 2.123;
let n = 5;

// Вычисляем множитель для заданной точности (10 в степени n)
let factor = Math.pow(10, n);

let fracA = Math.floor(Math.abs(a % 1) * factor + 1e-9);
let fracB = Math.floor(Math.abs(b % 1) * factor + 1e-9);

// Выводим получившиеся дробные части
console.log("Дробная часть a:", fracA);
console.log("Дробная часть b:", fracB);

// Выводим результаты сравнения
console.log("a > b :", fracA > fracB);
console.log("a < b :", fracA < fracB);
console.log("a >= b:", fracA >= fracB);
console.log("a <= b:", fracA <= fracB);
console.log("a === b:", fracA === fracB);
console.log("a !== b:", fracA !== fracB);


// Задание 3
let n2 = 0;
let m = 100;

// Определяем минимальное и максимальное значение
// Это нужно, чтобы корректно работать когда n > m или n < m
let min = Math.min(n2, m);
let max = Math.max(n2, m);

// Генерируем два случайных числа в диапазоне [min, max] включительно
// Math.random() возвращает число от 0 (включительно) до 1 (исключительно)
// Формула: Math.random() * (max - min) + min
let random1 = Math.random() * (max - min) + min;
let random2 = Math.random() * (max - min) + min;

// Выводим полученные числа
console.log("Случайное число 1:", random1);
console.log("Случайное число 2:", random2);

// Выводим результаты сравнения
console.log("n > m :", random1 > random2);
console.log("n < m :", random1 < random2);
console.log("n >= m:", random1 >= random2);
console.log("n <= m:", random1 <= random2);
console.log("n === m:", random1 === random2);
console.log("n !== m:", random1 !== random2);