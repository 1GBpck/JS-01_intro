// === Константы ===
const DEFAULT_BOARD_SIZE = 4;
const MIN_BOARD_SIZE = 2;
const MAX_BOARD_SIZE = 10;
const TIMER_DURATION = 60; // секунд

// === Элементы DOM ===
const settingsScreen = document.getElementById('settingsScreen');
const gameScreen = document.getElementById('gameScreen');
const boardSizeInput = document.getElementById('boardSize');
const startBtn = document.getElementById('startBtn');
const settingsError = document.getElementById('settingsError');
const gameBoardElement = document.getElementById('gameBoard');
const timerDisplay = document.getElementById('timerDisplay');
const restartBtnElement = document.getElementById('restartBtn');
const gameOverMessage = document.getElementById('gameOverMessage');

// === Глобальные переменные для таймера ===
let gameTimer = null;
let timeRemaining = TIMER_DURATION;

// === Вспомогательные функции (не зависят от состояния) ===

/**
 * Генерация массива парных чисел
 */
const generatePairs = (count) => {
    const pairs = [];
    for (let i = 1; i <= count; i++) {
        pairs.push(i, i);
    }
    return pairs;
};

/**
 * Перемешивание массива (Fisher-Yates)
 */
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

/**
 * Создание DOM-элемента карточки
 */
const createCardElement = (number) => {
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
};

/**
 * Валидация размера поля
 * @returns {number} Валидный размер (чётное число 2-10)
 */
const validateBoardSize = () => {
    let size = parseInt(boardSizeInput.value, 10);
    
    // Проверка: чётное и в диапазоне
    if (isNaN(size) || size % 2 !== 0 || size < MIN_BOARD_SIZE || size > MAX_BOARD_SIZE) {
        return DEFAULT_BOARD_SIZE;
    }
    return size;
};

/**
 * Обновление отображения таймера
 */
const updateTimerDisplay = () => {
    timerDisplay.textContent = timeRemaining;
    
    // Визуальные предупреждения
    timerDisplay.parentElement.classList.remove('warning', 'danger');
    if (timeRemaining <= 10) {
        timerDisplay.parentElement.classList.add('danger');
    } else if (timeRemaining <= 20) {
        timerDisplay.parentElement.classList.add('warning');
    }
};

/**
 * Запуск таймера
 */
const startTimer = (onTimeUp) => {
    timeRemaining = TIMER_DURATION;
    updateTimerDisplay();
    
    gameTimer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(gameTimer);
            onTimeUp();
        }
    }, 1000);
};

/**
 * Остановка таймера
 */
const stopTimer = () => {
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
};

// === Основная функция игры (Замыкание) ===

const initGame = (boardSize) => {
    // === Состояние игры (замыкание) ===
    let flippedCards = [];
    let matchedPairsCount = 0;
    let lockBoard = false;
    let isGameOver = false;
    const totalPairs = (boardSize * boardSize) / 2;

    // Сброс UI
    gameBoardElement.innerHTML = '';
    gameBoardElement.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    restartBtnElement.classList.add('hidden');
    gameOverMessage.classList.add('hidden');
    
    // Сброс состояния
    flippedCards = [];
    matchedPairsCount = 0;
    lockBoard = false;
    isGameOver = false;

    // Подготовка данных
    const numbers = generatePairs(totalPairs);
    const shuffledNumbers = shuffleArray(numbers);

    // Создание карточек
    shuffledNumbers.forEach((number) => {
        const card = createCardElement(number);
        
        card.addEventListener('click', (event) => {
            // Игнорируем клики если игра закончена
            if (isGameOver) return;
            handleCardClick(event.currentTarget);
        });

        gameBoardElement.appendChild(card);
    });

    // Запуск таймера
    startTimer(handleGameEndByTime);

    // === Внутренние функции (доступ к замыканию) ===

    function handleCardClick(card) {
        if (lockBoard || card.classList.contains('flip') || card.classList.contains('matched')) {
            return;
        }

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

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        // Помечаем как найденные
        flippedCards.forEach(card => card.classList.add('matched'));
        matchedPairsCount++;
        flippedCards = [];
        lockBoard = false;

        // Проверка победы
        if (matchedPairsCount === totalPairs) {
            endGame(true);
        }
    }

    function unflipCards() {
        setTimeout(() => {
            flippedCards.forEach((card) => card.classList.remove('flip'));
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }

    /**
     * Завершение игры по истечении времени
     */
    function handleGameEndByTime() {
        isGameOver = true;
        lockBoard = true;
        
        // Переворачиваем все карточки обратно, кроме найденных
        document.querySelectorAll('.card.flip:not(.matched)').forEach(card => {
            card.classList.remove('flip');
        });
        
        // Показываем сообщение
        gameOverMessage.classList.remove('hidden');
        restartBtnElement.classList.remove('hidden');
    }

    /**
     * Завершение игры (победа или время)
     */
    function endGame(isWin) {
        stopTimer();
        isGameOver = true;
        
        if (isWin) {
            // Можно добавить сообщение о победе, если нужно
            restartBtnElement.classList.remove('hidden');
        }
    }

    // Возвращаем функцию для остановки таймера при рестарте
    return () => {
        stopTimer();
    };
};

// === Обработчики событий ===

// Кнопка "Начать игру"
startBtn.addEventListener('click', () => {
    const boardSize = validateBoardSize();
    
    // Если значение было некорректным — показываем ошибку и сбрасываем
    const inputVal = parseInt(boardSizeInput.value, 10);
    if (isNaN(inputVal) || inputVal % 2 !== 0 || inputVal < MIN_BOARD_SIZE || inputVal > MAX_BOARD_SIZE) {
        settingsError.textContent = `Некорректное значение. Установлено значение по умолчанию: ${DEFAULT_BOARD_SIZE}`;
        settingsError.classList.remove('hidden');
        boardSizeInput.value = DEFAULT_BOARD_SIZE;
    } else {
        settingsError.classList.add('hidden');
    }
    
    // Переключение экранов
    settingsScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // Запуск игры
    initGame(boardSize);
});

// Кнопка "Сыграть ещё раз" — возврат к настройкам
restartBtnElement.addEventListener('click', () => {
    stopTimer();
    gameScreen.classList.remove('active');
    settingsScreen.classList.add('active');
    boardSizeInput.focus();
});

// Валидация ввода в реальном времени (опционально)
boardSizeInput.addEventListener('input', () => {
    settingsError.classList.add('hidden');
});