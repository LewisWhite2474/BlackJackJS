import { calculateValueSum } from './ui.js';
import { fillDeck, shuffle } from './deck.js';
import { playerAction, checkWinner, sleep} from './gameLogic.js';
import { Card } from './card.js';
import { gameState } from './game.js';
import {doubleBet } from './money.js';

  
async function addCardToHand(containerId, card, hand) {

    await sleep(1000);

    if(card.getValue() === 11){
        if (containerId === "player-cards"){
            gameState.playerAces +=1; 
        }else{
            gameState.dealerAces +=1;
        }
    }


    if (containerId === "player-cards"){
        gameState.playerTotal += card.getValue();
    }else{
        gameState.dealerTotal += card.getValue();
    }

    checkAces(containerId);

    const container = document.getElementById(containerId);
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    if(containerId === "dealer-cards" && hand.length === 1){
        cardDiv.id = "hidden-dealer-card";
        gameState.hiddenCardValue = card.getValue();
        const img = document.createElement('img');
        img.src = `cardsprites/backofcard.jpg`;
        img.alt = "blankcard";
        img.className = 'card-image';  
        cardDiv.appendChild(img);  
    }else{
        const img = document.createElement('img');
        img.src = `cardsprites/${card.rank}${card.suit[0]}.png`;
        img.alt = `${card.rank} of ${card.suit}`;
        img.className = 'card-image';  
        cardDiv.appendChild(img);  
    }



    hand.push(card)
    container.appendChild(cardDiv);

    if(hand.length > 2){
        document.getElementById('double-button').disabled = true;
    }else{
        document.getElementById('double-button').disabled = false;
    }

    calculateValueSum(containerId);

}

function checkAces(containerId){
    if(containerId === "player-cards"){
        while (gameState.playerTotal > 21){
            if(gameState.playerAces > 0){
                gameState.playerAces -=1 ;
                gameState.playerTotal -= 10;
                calculateValueSum("player-cards");
            }else{
                break;
            }
            
        }
    }else{
        while (gameState.dealerTotal > 21){
            if(gameState.dealerAces > 0){
                gameState.dealerAces -=1 ;
                gameState.dealerTotal -= 10;
                calculateValueSum("dealer-cards");
            }else{
                break;
            }
        }
    }


}

function playerBust(){
    return(gameState.playerTotal > 21);
}

export { addCardToHand, playerBust };