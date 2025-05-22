import { addCardToHand, playerBust } from './hand.js';
import { calculateValueSum, updateBalanceDisplay } from './ui.js';
import { fillDeck, shuffle } from './deck.js';
import { deck, gameState, startGame} from './game.js';
import { playerAction, checkWinner} from './gameLogic.js';

document.getElementById('place-bet-button').addEventListener('click', handleBetPlacement);

function doubleBet(){
    if (gameState.balance >= gameState.bet) {
        gameState.balance -= gameState.bet;
        gameState.bet *= 2;
        updateBalanceDisplay();
        console.log(`Bet doubled to $${gameState.bet}`);
        console.log(`Remaining balance: $${gameState.balance}`);
    } else {
        alert("Not enough balance to double the bet.");
    }
}
// ✅ Pure function for handling bet placement
function handleBetPlacement() {

    const betInput = document.getElementById('bet-input');
    const betValue = parseInt(betInput.value);

    if (isNaN(betValue) || betValue <= 0) {
        alert('Please enter a valid bet amount.');
        return;
    }

    if (betValue > gameState.balance) {
        alert("You don't have enough balance to place this bet.");
        return;
    }


    gameState.bet = betValue;
    gameState.balance -= gameState.bet;
    updateBalanceDisplay();

    console.log(`Bet placed: $${gameState.bet}`);
    console.log(`Remaining balance: $${gameState.balance}`);

    document.getElementById('place-bet-button').style.display = "none";
    document.getElementById('bet-input').style.display = "none";

    startGame();

}

// ✅ Attach once to the button on load
document.getElementById('place-bet-button').addEventListener('click', handleBetPlacement);



export {doubleBet};