import dom from "../dom.js";

const loadHandler = () => {

const players = ['O', 'X'];
const gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
let gameBoardElement;

//  Create gameBoard

const makeGameBoardElement = () => {
    const gameBoardElement = document.createElement('div');
    
    gameBoardElement.classList.add('game-board');
    return gameBoardElement;
}

// Create Cell

const makeSquareElement = squareNumber => {
    const squareElement = document.createElement('div');

    squareElement.classList.add('game-square');

    squareElement.addEventListener('click', (e) => {
        const {target} = e;
        target.textContent = currentPlayer;
        gameBoard[squareNumber] = currentPlayer;

        // Check Board
        checkBoard();

        // SwitchPlayers
        switchPlayer()
    }, {once: true})

    return squareElement;
}

const switchPlayer = () => {
    if(currentPlayer === players[0]){
        currentPlayer = players[1];
    } else {
        currentPlayer = players[0];
    }
}

const checkBoard = () => {

    const winningStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let winState of winningStates) {
        const [position1, position2, position3] = winState;
    

    if(gameBoard[position1] !== "" && gameBoard[position1] === gameBoard[position2] && gameBoard[position1] === gameBoard[position3]){
        completeGame(`"${gameBoard[position1]}" player wins this round!`)
        return;
    }
}

const allSquaresUsed = gameBoard.every(square => square !== "")

if(allSquaresUsed){
    completeGame(`It's a draw`)
}
}

const completeGame = (message) => {
    const overlayElement = document.createElement('div');
    overlayElement.classList.add('overlay');

    // Create message

    const messageElement = document.createElement('h2');
    messageElement.classList.add('message');
    messageElement.textContent = message;

    overlayElement.appendChild(messageElement);

    // Create Button

    const restartButtonElement = document.createElement('button');
    restartButtonElement.textContent = 'Restart game';
    restartButtonElement.classList.add('button');

    restartButtonElement.addEventListener('click', () => {
        resetGame();
        document.body.removeChild(overlayElement);
    })

    overlayElement.appendChild(restartButtonElement);
    
    document.body.appendChild(overlayElement);
}

// Restart the game

const resetGame = () => {
    if(gameBoardElement){
        dom.container.removeChild(gameBoardElement);
    }

    gameBoardElement = makeGameBoardElement();

    for(let square = 0; square < 9; square++ ){
        gameBoardElement.appendChild(makeSquareElement(square));
    }

    currentPlayer = players[0];
    gameBoard.fill('');

    dom.container.appendChild(gameBoardElement)
}

resetGame()
}

export default loadHandler;