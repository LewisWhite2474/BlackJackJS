import { Card } from './card.js';
//create the initial deck before shuffle
function fillDeck(deck, ranks, suits) {
    ranks.forEach(rank => {
        suits.forEach(suit => {
            const card = new Card(suit, rank);
            deck.push(card);
        });
    });
}

//shuffle the deck
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }
  
export { shuffle, fillDeck };