/*
 * Create a list that holds all of your cards
 */

// creates list with all its items twice
let listCards = [
  'diamond',
  'plane',
  'anchor',
  'bolt',
  'cube',
  'leaf',
  'bicycle',
  'bomb',
    'diamond',
  'plane',
  'anchor',
  'bolt',
  'cube',
  'leaf',
  'bicycle',
  'bomb'
]


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//creates variable to select the whole deck of card
const deck = document.querySelector('ul.deck');

// create the common part of each card, appending it in the deck
function createCommonHTMLcard(){
    deck.insertAdjacentHTML('beforeend', '<li class="card"><i class="fa"></i></li>');
    //console.log(`after created common card number: ${array[i]}`);
}

//creates the specific part for each card and attach an id to it as attribute
function createIndividualStyleEachCard(cardID){
    //select all tags i in deck
    const lastCardIcon = deck.querySelectorAll('i');
    
    // creates different specific part icon depending of which card ID it is
    switch (cardID) {
        case ('diamond'):
            lastCardIcon[lastCardIcon.length - 1 ].className = 'fa fa-diamond';
            break;
        case ('plane'):
            lastCardIcon[lastCardIcon.length - 1 ].className = 'fa fa-paper-plane-o';
            break;
        case ('anchor'):
            lastCardIcon[lastCardIcon.length - 1 ].className = 'fa fa-anchor';
            break;
        case ('bolt'):
            lastCardIcon[lastCardIcon.length - 1 ].className = 'fa fa-bolt';
            break;
        case ('cube'):
            lastCardIcon[lastCardIcon.length - 1 ].className = 'fa fa-cube';
            break;
        case ('leaf'):
            lastCardIcon[lastCardIcon.length - 1 ].className = 'fa fa-leaf';
            break;
        case ('bicycle'):
            lastCardIcon[lastCardIcon.length - 1 ].className = 'fa fa-bicycle';
            break;
        case ('bomb'):
            lastCardIcon[lastCardIcon.length - 1 ].className = 'fa fa-bomb';
            break;
    };
    
    console.log(`after creating specific part for cardID : ${cardID}`);
};

// function setting up the game board
function setGameBoard(array){
    
    console.log(`number of cards in the list: ${array.length}`);
    
    shuffle(array);
    console.log(`list of cards after shuffling it: ${array}`);
    
    for (let i=0 ; i < array.length ; i++){
        createCommonHTMLcard();
        createIndividualStyleEachCard(array[i]);
    };
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//function showing card when clicked
function showCard(card){
    //select all tags i in deck
    const allCards = deck.querySelectorAll('li');
    
    for (let i = 0; i < allCards.length ; i++) {
        allCards[i].addEventListener('click', function(card) {
                card.target.setAttribute("class", "show open card");
            
                
                cardIDStoring(card);
            
            }, false );
    }
    
}

let cardClickedMemory = ['',''];

//function store the class of i in the variable cardClickedMemory array. In its first parameter if completely empty, or in its second if first is empty. And if both are used then empty both and store in first.
function cardIDStoring(card) {
    if (cardClickedMemory[0] === '' && cardClickedMemory[1] === ''){
        console.log(`cardClickedMemory 0 and 1 are empty`);
        cardClickedMemory[0] = card.target.querySelector('i').className;
    } else if (cardClickedMemory[0] !== '' && cardClickedMemory[1] === '') {
        console.log(`only cardClickedMemory 1 is empty`);
        cardClickedMemory[1] = card.target.querySelector('i').className;
    } else {
        console.log(`ERROR, neither cardClickedMemory 0 nor 1 are empty`);
    }
    console.log(`now that a tile was click, at the end of the cardCheckingCard function, the state of cardClickedmemory is: ${cardClickedMemory}`);
}

function clearCardClickedMemory() {
    cardClickedMemory = ['',''];
}

// function checking if the 2 cards checked before are the same. If it does then put them as validated, else put them wrong plus hide them again and clear the cardClickedMemory (use function clearCardClickedMemory())
function cardChecking() {
}

function cardClicking() {
    showCard();
    cardChecking();
}

// call the function setting up the game board, with already the list of cards
setGameBoard(listCards);
//make the cards clickable and their behaviour when clicked
cardClicking();
