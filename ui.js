import { addCardToHand, playerBust } from './hand.js';
import { fillDeck, shuffle } from './deck.js';
import { playerAction, checkWinner, sleep} from './gameLogic.js';
import { Card } from './card.js';
import { gameState} from './game.js';
import {doubleBet } from './money.js';

const restartButton = document.getElementById('restart-button');


function calculateValueSum(containerId){
    const handOwner = containerId === "player-cards" ? "player-value" : "dealer-value";
    const container = document.getElementById(handOwner);

    if(handOwner === "player-value"){
        container.textContent = gameState.playerTotal;
    }else{
        container.textContent = gameState.dealerTotal - gameState.hiddenCardValue;
    }
}

function updateBalanceDisplay() {
    document.getElementById('balance-display').textContent = gameState.balance;
    document.getElementById('bet-display').textContent = gameState.bet;
}


restartButton.addEventListener('click', () => {
    resetGame();
});



function resetGame(){

    const outcome = document.getElementById('outcome-field');

    gameState.playerHand = [];
    gameState.dealerHand = [];
    gameState.playerTotal = 0;
    gameState.dealerTotal = 0;
    gameState.playerAces = 0;
    gameState.dealerAces = 0;
    gameState.bet = 0;

    document.getElementById('player-cards').innerHTML = '';
    document.getElementById('dealer-cards').innerHTML = '';

    restartButton.style.display = 'none';
    outcome.style.display = 'none';

    showBet();

    calculateValueSum("player-cards");
    calculateValueSum("dealer-cards");

    updateBalanceDisplay();
}

async function revealDealerCard() {
    await sleep(3000);
    
    const cardDiv = document.getElementById("hidden-dealer-card");
    const secondCard = gameState.dealerHand[1];

    gameState.hiddenCardValue = 0;

    // Find the <img> inside the div
    const img = cardDiv.querySelector("img");
    if (img) {
        img.src = `cardsprites/${secondCard.rank}${secondCard.suit[0]}.png`;
        img.alt = `${secondCard.rank} of ${secondCard.suit}`;
    }

    cardDiv.removeAttribute("id");
    calculateValueSum();
}

function hideBet(){
    document.getElementById('bet-container').style.display = "none";
    //document.getElementById('bet-display').style.display = "none";
}

function showBet(){
    document.getElementById('bet-container').style.display = "flex";
    // const betBalance = document.getElementById('bet-balance-container');

    // document.getElementById('place-bet-button').style.display = "flex";
    // document.getElementById('bet-display').style.display = "flex";
    // document.getElementById('bet-display').textContent = '';
    
    // betBalance.style.display = 'flex';

}

function hideAction(){
    document.getElementById('action-buttons').style.display = "none";
}
function showAction(){
    document.getElementById('action-buttons').style.display = "flex";
}


window.onload = updateBalanceDisplay;

export { calculateValueSum, updateBalanceDisplay, revealDealerCard, showAction, hideBet, hideAction};