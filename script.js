let myDollars = 100;
let cards = [];
let count = 0;
let firstRun=true;
// let score = 0;
// let lives = 3;

let cardOutput = document.getElementById('cards');
let suits = ['spades', 'hearts', 'clubs', 'diams'];

let numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let message = document.getElementById('message');
let scoreOutput = document.getElementById('score');
let myDol = document.getElementById('dollars');
let myB = document.getElementById('myBet');

function checkMe(){
    if(myB.value>myDollars){
        myB.value=myDollars;
    }
    if(myB.value<0){
        myB.value=0;
    }
    message.innerHTML="Bet changed to $<span id=msgin>"+myB.value+"</span>";
}

function gameStart() {
    myDollars = 100;
    myDol.innerHTML=myDollars;
    myB.value=0;
    count = 0;
    let msg = document.createTextNode('Game Started!');

    message.innerHTML = '';

    message.append(msg);

    document.getElementById('cards').innerHTML = "";
    document.getElementById('start').style.display = 'none';
    document.getElementById('highLow').style.display = 'block';
    document.getElementById('score').style.display = 'block';

    if(firstRun){
    buildCards();
    firstRun=false;
    }
    shuffleArray(cards);
    cardOutput.innerHTML += showCard();
    // scoreOutput.innerHTML="SCORE:"+score+" LIVES:("+lives+")";
}

function hilo(a) {
    let win = false;
    let oldCard = cards[count].cardValue;
    let myBetAmount = parseInt(myB.value);
    count++;
    cardOutput.innerHTML += showCard();
    let newCard = cards[count].cardValue;
    if (a == 'high' && oldCard < newCard) win = true;
    else if (a == 'low' && oldCard > newCard) win = true;
    if (win) {
        message.innerHTML = "You were RIGHT :)<br> You made $" + myBetAmount;
        // score++;
        myDollars = myDollars + myBetAmount;
    }
    else {
        message.innerHTML = "You were WRONG :( <br> You lost $" + myBetAmount;
        myDollars = myDollars - myBetAmount;
        // lives--;
        // if (lives < 1) {
        //     endPlay();
        // }
    }
    let currentBet = parseInt(myB.value);
    if (myDollars < 1) {
        myB.value = 0;
    }
    if (currentBet > myDollars) {
        myB.value = myDollars;
    }
    myB.max = myDollars;
    myDol.innerHTML = myDollars;
    if (count > 3) {
        endPlay();
    }
    // scoreOutput.innerHTML="SCORE:"+score+" LIVES:("+lives+")";
}

function endPlay() {
    document.getElementById('highLow').style.display = 'none';
    message.innerHTML = "Game over. You have $" + myDollars;
    document.getElementById('start').style.display = 'block';
    document.getElementById('score').style.display = 'none';
    // myDollars=100;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        let holder = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[holder];
        array[holder] = temp;
    }
    // console.log(array);
    return array;
}

function showCard() {
    let bgColor = (cards[count].icon == 'H' || cards[count].icon == 'D') ? 'red' : 'black';
    let hpos = (count > 0) ? count * 80 + 30 : 30;

    return '<div class="icard ' + cards[count].suit + '"style="left:' + hpos + 'px;"><div class="cardtop suit">' + cards[count].num + '<br></div><div class="cardmid suit"></div><div class="cardbottom suit">' + cards[count].num + '<br></div></div>';
}

function buildCards() {
    cards = [];
    for (let i = 0; i < suits.length; i++) {
        let suit = suits[i][0].toUpperCase();
        for (let j = 0; j < numbers.length; j++) {
            let card = {
                suit: suits[i],
                num: numbers[j],
                cardValue: j + 2,
                icon: suit
            }
            cards.push(card);
        }
    }
    // console.log(cards);
}