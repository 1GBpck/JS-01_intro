// ==================== ЗАДАЧА 1 ====================
function generateRandomArray(count, n, m) {
    const min = Math.min(n, m);
    const max = Math.max(n, m);
    const result = [];

    for (let i = 0; i < count; i++) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        result.push(randomNumber);
    }

    console.log(result);
}

// ==================== ЗАДАЧА 2 ====================
function createAndShuffleArray(count) {
    const array = [];
    for (let i = 1; i <= count; i++) {
        array.push(i);
    }

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

// ==================== ЗАДАЧА 3 ====================
function findElementIndex(array, n) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === n) {
            return i;
        }
    }
    return -1;
}

function runTask3(count, n) {
    const array = createAndShuffleArray(count);
    console.log("Массив:", array);
    console.log("Искомое число:", n);
    
    const index = findElementIndex(array, n);
    if (index !== -1) {
        console.log("Индекс элемента =", index);
    } else {
        console.log("Элемент не найден");
    }
}

// ==================== ЗАДАЧА 4 ====================
function mergeArrays(array1, array2) {
    const result = [];
    const totalLength = array1.length + array2.length;

    for (let i = 0; i < totalLength; i++) {
        if (i < array1.length) {
            result.push(array1[i]);
        } else {
            result.push(array2[i - array1.length]);
        }
    }

    return result;
}

// ==================== ЗАПУСК И ПРОВЕРКА ====================

console.log("--- ЗАДАЧА 1: Генерация массивов ---");
console.log("n = 0, m = 100, count = 5:");
generateRandomArray(5, 0, 100);

console.log("n = 100, m = -5, count = 5:");
generateRandomArray(5, 100, -5);

console.log("\n--- ЗАДАЧА 2: Перемешивание массива ---");
console.log("count = 5:");
console.log(createAndShuffleArray(5));

console.log("count = 7:");
console.log(createAndShuffleArray(7));

console.log("\n--- ЗАДАЧА 3: Поиск индекса ---");
runTask3(5, 3);
runTask3(3, 7);

console.log("\n--- ЗАДАЧА 4: Объединение массивов ---");
const arr1 = [2, 2, 17, 21, 45, 12, 54, 31, 53];
const arr2 = [12, 44, 23, 5];
console.log(mergeArrays(arr1, arr2));