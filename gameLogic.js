import { addCardToHand, playerBust } from './hand.js';
import { calculateValueSum, revealDealerCard, updateBalanceDisplay, hideAction, hideBet } from './ui.js';
import { fillDeck, shuffle } from './deck.js';
import {gameState} from './game.js';
import {doubleBet } from './money.js';

const normalMult = 2;
const blackjackMult = 2.5;

async function playerAction(action){
    switch (action) {
        //hit
        case "H":
            await addCardToHand("player-cards", gameState.deck.pop(), gameState.playerHand);
            console.log("Player total:" + gameState.playerTotal);
            if(playerBust()){
                playerLose()
                revealDealerCard();
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
    hideAction();

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

    if(multiplyer === 2.5){
        outcome.textContent = "Player Blackjack!";
    }else{
        outcome.textContent = "You Won!";
    }

    outcome.style.display = "flex";

    gameState.balance += multiplyer * gameState.bet;
    updateBalanceDisplay();
    hideAction();
    restartButton.style.display = 'flex';
}


function playerLose(){
    const restartButton = document.getElementById('restart-button');
    const outcome = document.getElementById('outcome-field');

    hideBet();
    hideAction();

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
    hideAction();
    if(gameState.dealerTotal === 21 && gameState.playerTotal === 21){
        push()
        revealDealerCard();
        return true;
    }
    else if(gameState.dealerTotal === 21){
        playerLose();
        revealDealerCard();
        return true;
    }else if(gameState.playerTotal === 21){
        playerWin(blackjackMult);
        revealDealerCard();
        return true;
    }
    return false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export {checkWinner, playerAction, dealerTurn, checkBlackjack, sleep};
