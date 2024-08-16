const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart-button');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkLoseCondition()) {
        messageElement.textContent = `Player ${currentPlayer} loses!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== '')) {
        messageElement.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkLoseCondition() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            const loseSound = document.getElementById('lose-sound');
            loseSound.play();
            showLoseModal(`I don't like you, you LOSERRRRRR !!!`);
            return true;
        }
    }
    return false;
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    messageElement.textContent = '';
    cells.forEach(cell => (cell.textContent = ''));
}

function showLoseModal(message) {
    const modal = document.getElementById('lose-modal');
    const modalMessage = document.getElementById('modal-message');
    const closeModal = document.getElementById('close-modal');

    modalMessage.textContent = message;
    modal.style.display = 'flex';

    closeModal.onclick = function () {
        modal.style.display = 'none';
        restartGame();
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            restartGame();
        }
    };
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
