// import { addCardToHand, playerBust, dealerBust } from './hand.js';
// import { calculateValueSum } from './ui.js';
// import { fillDeck, shuffle } from './deck.js';
// import { playerAction, doubleBet, checkWinner, placeBet} from './gameLogic.js';
// import { Card } from './card.js';

// export let deck = [];
// export let balance = 1000;
// export let bet = 0;

// export let dealerHand = [];
// export let playerHand = [];

// export const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
// export const suits = ["Club","Spade","Heart","Diamond"];

// function main(){
//     console.log("Main function called.");
//     window.location.href = 'game.html';
// }

// function startGame(){
//     fillDeck(deck, ranks, suits);
//     shuffle(deck);

//     // console.log("Welcome to blackjack!");
//     // console.log("Balance:" + balance);
//     // console.log("Place bet to begin:")


//     for(let i = 0; i<2; i++){
//         let playerCard = deck.pop();
//         addCardToHand("player-cards", playerCard, playerHand);

//         let dealerCard = deck.pop();
//         addCardToHand("dealer-cards", dealerCard, dealerHand);
//     }

// }


// function gameOver(){

// }

// document.addEventListener("DOMContentLoaded", function() {
//     const startButton = document.getElementById('start-button');
//     if (startButton) {
//         startButton.addEventListener('click', main);
//     } else {
//         startGame(); 
//     }

//     const hitButton = document.getElementById('hit-button');
//     const standButton = document.getElementById('stand-button');
//     const doubleButton = document.getElementById('double-button');
//     const splitButton = document.getElementById('split-button');

//     // ✅ Attach event listeners
//     hitButton.addEventListener('click', () => playerAction('H'));
//     standButton.addEventListener('click', () => playerAction('S'));
//     doubleButton.addEventListener('click', () => playerAction('D'));
//     splitButton.addEventListener('click', () => playerAction('SP'));

// });

