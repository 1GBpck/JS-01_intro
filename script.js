// Константы конфигурации
const BOARD_SIZE = 4;
const PAIRS_COUNT = (BOARD_SIZE * BOARD_SIZE) / 2;

// Элементы DOM
const gameBoardElement = document.getElementById('gameBoard');
const restartBtnElement = document.getElementById('restartBtn');

/**
 * Этап 1: Генерация массива парных чисел
 */
function generatePairs(count) {
    const pairs = [];
    for (let i = 1; i <= count; i++) {
        pairs.push(i, i);
    }
    return pairs;
}

/**
 * Этап 2: Перемешивание (Алгоритм Фишера — Йетса)
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Создание DOM-элемента карточки
 */
function createCardElement(number) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = number;

    const frontFace = document.createElement('div');
    frontFace.classList.add('card-face', 'card-front');
    frontFace.textContent = '?';

    const backFace = document.createElement('div');
    backFace.classList.add('card-face', 'card-back');
    backFace.textContent = number;

    card.appendChild(frontFace);
    card.appendChild(backFace);

    return card;
}

/**
 * Основная функция инициализации игры.
 */
function initGame() {
    let flippedCards = [];
    let matchedPairsCount = 0;
    let lockBoard = false;

    // Сброс интерфейса
    gameBoardElement.innerHTML = '';
    restartBtnElement.classList.add('hidden');
    matchedPairsCount = 0;
    flippedCards = [];
    lockBoard = false;

    // === Этап 3: Подготовка данных ===
    const numbers = generatePairs(PAIRS_COUNT);
    const shuffledNumbers = shuffleArray(numbers);

    // === Этап 4: Создание карточек ===
    shuffledNumbers.forEach((number) => {
        const card = createCardElement(number);
        
        // Стрелочная функция-обработчик (имеет доступ к замыканию)
        card.addEventListener('click', (event) => {
            handleCardClick(event.currentTarget, number);
        });

        gameBoardElement.appendChild(card);
    });

    function handleCardClick(card, value) {
        if (lockBoard || card.classList.contains('flip')) return;

        card.classList.add('flip');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        lockBoard = true;
        const [card1, card2] = flippedCards;
        const isMatch = card1.dataset.value === card2.dataset.value;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        matchedPairsCount++;
        flippedCards = [];
        lockBoard = false;

        if (matchedPairsCount === PAIRS_COUNT) {
            setTimeout(() => {
                restartBtnElement.classList.remove('hidden');
            }, 500);
        }
    }

    function unflipCards() {
        setTimeout(() => {
            flippedCards.forEach((card) => card.classList.remove('flip'));
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}

// Запуск при загрузке
initGame();

// Кнопка рестарта (стрелочная функция)
restartBtnElement.addEventListener('click', () => {
    initGame();
});