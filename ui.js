import {sleep} from './gameLogic.js';
import { gameState} from './game.js';

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
    document.getElementById('player-value').textContent = '';
    document.getElementById('dealer-value').textContent = '';
    document.getElementById('winnings-field').textContent ='';

    restartButton.style.display = 'none';
    outcome.style.display = 'none';

    showBet();

    updateBalanceDisplay();
}

async function revealDealerCard() {
    await sleep(750);

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
    document.getElementById('bet-container-wrapper').style.display = "none";
}

function showBet(){
    document.getElementById('bet-container-wrapper').style.display = "flex";
}

function hideAction(){
    document.getElementById('action-buttons').style.display = "none";
}
function showAction(){
    document.getElementById('action-buttons').style.display = "flex";
}

window.addEventListener('click', () => {
  const bgMusic = document.getElementById('bg-music');
  if (bgMusic && bgMusic.paused) {
    bgMusic.volume = 0.1; 
    bgMusic.play();
  }
}, { once: true }); 

function playSound(src) {
  const sound = new Audio(src);
  sound.play();
}


window.onload = updateBalanceDisplay;

export { calculateValueSum, updateBalanceDisplay, revealDealerCard, showAction, hideBet, hideAction, playSound};