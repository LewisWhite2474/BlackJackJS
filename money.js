import { addCardToHand, playerBust } from './hand.js';
import { calculateValueSum, updateBalanceDisplay, hideBet } from './ui.js';
import { fillDeck, shuffle } from './deck.js';
import {gameState, startGame} from './game.js';
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

    const betInput = document.getElementById('bet-display');
    const betValue = parseInt(betInput.textContent);

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

    hideBet();

    startGame();

}

document.addEventListener("DOMContentLoaded", function() { 
    const button25 = document.getElementById('25-button');
    const button50 = document.getElementById('50-button');
    const button100 = document.getElementById('100-button');
    const button250 = document.getElementById('250-button');
    const button500 = document.getElementById('500-button');


    if (button25) button25.addEventListener('click', () => addBet(25));
    if (button50) button50.addEventListener('click', () => addBet(50));
    if (button100) button100.addEventListener('click', () => addBet(100));
    if (button250) button250.addEventListener('click', () => addBet(250));
    if (button500) button500.addEventListener('click', () => addBet(500));
    
});

function addBet(amount){
  const betDisplay = document.getElementById('bet-display');
  const balanceDisplay = document.getElementById('balance-display');

  const currentBet = parseInt(betDisplay.textContent) || 0;
  betDisplay.textContent = currentBet + amount;


  const currentBalance = parseInt(balanceDisplay.textContent) || 0;
  balanceDisplay.textContent = currentBalance - amount;
}

// ✅ Attach once to the button on load
document.getElementById('place-bet-button').addEventListener('click', handleBetPlacement);



export {doubleBet};