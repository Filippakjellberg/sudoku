const sudokuBoard = document.getElementById('sudoku-board');
const checkButton = document.getElementById('check-solution');
const resetButton = document.getElementById('reset-game');

let initialBoard = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9]
];

let currentBoard = JSON.parse(JSON.stringify(initialBoard));

// Skapa brädet
function createBoard() {
    sudokuBoard.innerHTML = ''; // Töm brädet

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('input');
            cell.classList.add('cell');
            cell.setAttribute('maxlength', 1); // Bara ett tecken

            // Lägger till klasser för att markera 3x3-blocken
            const blockIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
            cell.classList.add(`block-${blockIndex}`);

            if (initialBoard[row][col] !== null) {
                cell.value = initialBoard[row][col];
                cell.disabled = true; // Fixerade celler kan inte ändras
                cell.classList.add('fixed');
            } else {
                cell.addEventListener('input', () => handleInput(cell, row, col));
            }
            
            sudokuBoard.appendChild(cell);
        }
    }
}

// Hantera användarens inmatning
function handleInput(cell, row, col) {
    const value = parseInt(cell.value);

    if (isNaN(value) || value < 1 || value > 9) {
        cell.value = ''; // Rensa om värdet inte är en giltig siffra
    } else {
        currentBoard[row][col] = value; // Uppdatera brädet
    }
}

// Kontrollera om lösningen är korrekt
function checkSolution() {
    if (isValidSolution(currentBoard)) {
        alert('Grattis! Sudoku är löst korrekt.');
    } else {
        alert('Lösningen är inte korrekt. Försök igen.');
    }
}

// Kontrollera om brädet är en giltig lösning
function isValidSolution(board) {
    // Kontrollera rader, kolumner och 3x3-block
    for (let i = 0; i < 9; i++) {
        if (!isValidGroup(board[i]) || !isValidGroup(board.map(row => row[i])) || !isValidBlock(board, i)) {
            return false;
        }
    }
    return true;
}

// Kontrollera om en grupp (rad eller kolumn) är giltig
function isValidGroup(group) {
    const nums = group.filter(n => n !== null);
    return new Set(nums).size === nums.length; // Kontrollera om det finns några dubbletter
}

// Kontrollera om ett 3x3-block är giltigt
function isValidBlock(board, index) {
    const startRow = Math.floor(index / 3) * 3;
    const startCol = (index % 3) * 3;
    let block = [];

    for (let row = startRow; row < startRow + 3; row++) {
        for (let col = startCol; col < startCol + 3; col++) {
            if (board[row][col] !== null) {
                block.push(board[row][col]);
            }
        }
    }

    return isValidGroup(block);
}

// Återställ spelet till ursprungsläget
function resetGame() {
    currentBoard = JSON.parse(JSON.stringify(initialBoard)); // Kopiera startbrädet
    createBoard(); // Återskapa brädet
}

// Koppla knappar till funktioner
checkButton.addEventListener('click', checkSolution);
resetButton.addEventListener('click', resetGame);

// Skapa brädet när sidan laddas
createBoard();
