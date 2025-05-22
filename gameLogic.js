import { addCardToHand, playerBust } from './hand.js';
import { calculateValueSum, revealDealerCard, updateBalanceDisplay } from './ui.js';
import { fillDeck, shuffle } from './deck.js';
import {deck, gameState} from './game.js';
import {doubleBet } from './money.js';

const buttons = document.getElementById('action-buttons')
const normalMult = 2;
const blackjackMult = 2.5;

async function playerAction(action){
    switch (action) {
        //hit
        case "H":
            await addCardToHand("player-cards", deck.pop(), gameState.playerHand);
            console.log("Player total:" + gameState.playerTotal);
            if(playerBust()){
                playerLose()
            }else if(gameState.playerTotal === 21){
                dealerTurn();
            }
            break;
        //stand
        case "S":
            dealerTurn();
            break;
        //double
        case "D":
            doubleBet();
            await addCardToHand("player-cards", deck.pop(), gameState.playerHand);
            if(playerBust()){
                playerLose()
            }else{
                dealerTurn();
            }
            break;
        //split
        case "SP":
            // Code block for value3
            break;
        //no action
        default:
            break;
    }
    
}


function checkWinner(){
    let difference = gameState.playerTotal - gameState.dealerTotal;

    if (difference > 0) {
        playerWin(normalMult);
    } else if (difference === 0) {
        push();
    } else {
        playerLose();
    }
    
}

async function dealerTurn(){
    document.getElementById('action-buttons').style.display = "none";

    await revealDealerCard();

    while(gameState.dealerTotal < 17){
        await addCardToHand("dealer-cards", deck.pop(), gameState.dealerHand);
    }

    if(gameState.dealerTotal > 21){
        playerWin(normalMult);
    }else if(gameState.dealerTotal >= 17){
        checkWinner();
    }


}

function playerWin(multiplyer){
    const outcome = document.getElementById('outcome-field');
    const restartButton = document.getElementById('restart-button');
    const actionButtons = document.getElementById('action-buttons');

    if(multiplyer === 2.5){
        outcome.textContent = "Player Blackjack!";
    }else{
        outcome.textContent = "You Won!";
    }

    outcome.style.display = "flex";

    gameState.balance += multiplyer * gameState.bet;
    updateBalanceDisplay();
    actionButtons.style.display = "none"
    restartButton.style.display = 'flex';
}


function playerLose(){
    const restartButton = document.getElementById('restart-button');
    const outcome = document.getElementById('outcome-field');
    const buttons = document.getElementById('action-buttons')
    const betBalance= document.getElementById('bet-balance-container');

    //betBalance.style.display = 'none';
    buttons.style.display = 'none';

    outcome.textContent = "You Lost!";
    outcome.style.display = 'flex';
    restartButton.style.display = 'flex';

}

function push(){
    const outcome = document.getElementById('outcome-field');
    const restartButton = document.getElementById('restart-button');

    outcome.textContent = "You Pushed...";
    outcome.style.display = "flex";

    gameState.balance += gameState.bet;
    updateBalanceDisplay();

    restartButton.style.display = 'flex';
}

function checkBlackjack(){
    if(gameState.dealerTotal === 21 && gameState.playerTotal === 21){
        push()
    }
    else if(gameState.dealerTotal === 21){
        playerLose();
    }else if(gameState.playerTotal === 21){
        playerWin(blackjackMult);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export {checkWinner, playerAction, dealerTurn, checkBlackjack, sleep};
