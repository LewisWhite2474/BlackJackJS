import { addCardToHand, } from './hand.js';
import { showAction } from './ui.js';
import { fillDeck, shuffle } from './deck.js';
import { playerAction, checkBlackjack, sleep} from './gameLogic.js';



export let gameState = {
    playerAces: 0,
    dealerAces: 0,
    playerTotal: 0,
    dealerTotal: 0,
    hiddenCardValue: 0,
    balance: 1000,
    bet: 0,
    dealerHand:[],
    playerHand:[],
    deck:[]
};


export const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
export const suits = ["Club", "Spade", "Heart", "Diamond"];

async function startGame() {
    gameState.deck = [];
    fillDeck(gameState.deck, ranks, suits);
    shuffle(gameState.deck);

    for (let i = 0; i < 2; i++) {

        let playerCard = gameState.deck.pop();
        await addCardToHand("player-cards", playerCard, gameState.playerHand);

        let dealerCard = gameState.deck.pop();
        await addCardToHand("dealer-cards", dealerCard, gameState.dealerHand);
    }

    if(!checkBlackjack()){
        showAction();
    }
    

}

document.addEventListener("DOMContentLoaded", function() { 
    const hitButton = document.getElementById('hit-button');
    const standButton = document.getElementById('stand-button');
    const doubleButton = document.getElementById('double-button');
    const splitButton = document.getElementById('split-button');


    if (hitButton) hitButton.addEventListener('click', () => playerAction('H'));
    if (standButton) standButton.addEventListener('click', () => playerAction('S'));
    if (doubleButton) doubleButton.addEventListener('click', () => playerAction('D'));
    if (splitButton) splitButton.addEventListener('click', () => playerAction('SP'));
    
});

export {startGame};