class Card{
    constructor(suit, rank){
        this.suit = suit;
        this.rank = rank;
    }
    getValue(){
        if(this.rank === "A"){
            return 11;
        }else if(["K","J","Q"].includes(this.rank)){
            return 10;
        }else{
            return parseInt(this.rank);
        }
    }
}


export { Card};