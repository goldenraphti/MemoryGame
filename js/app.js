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
    moveNumber = 0;
}

//function removing a potential existing game board
function removeExistingBoard() {
    while (deck.firstChild) {
    deck.removeChild(deck.firstChild);
}
}


/*
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//function showing card when clicked
function cardClicking(card){
    //select all tags i in deck
    const allCards = deck.querySelectorAll('li:not(.show):not(.open):not(.match)');
    
    for (let i = 0; i < allCards.length ; i++) {
        allCards[i].addEventListener('click', function(card) {
                card.target.setAttribute("class", "show open card");
                
                cardIDStoring(card);
                cardChecking();
                checkWinning();
            
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
        clearCardClickedMemory();
        cardClickedMemory[0] = card.target.querySelector('i').className
        console.log(`ERROR, neither cardClickedMemory 0 nor 1 are empty`);
    }
    console.log(`now that a tile was click, at the end of the cardCheckingCard function, the state of cardClickedmemory is: ${cardClickedMemory}`);
}

// function clearing the memory of the last 2 cards checked
function clearCardClickedMemory() {
    cardClickedMemory = ['',''];
    console.log(`cleared memory of cardClickedmemory now is: ${cardClickedMemory}`);
}
// variable counting the number of moves
let moveNumber;
// select the move counter display
const movesDisplay = document.querySelector('.moves');
// function adding a move everytime two cards have been checked
function moveCounter (){
    
    console.log(`move counter: ${moveNumber}`);
    moveNumber++;
    console.log(`move counter: ${moveNumber}`);
    movesDisplay.textContent = moveNumber;
}


// function checking if the 2 cards checked before are the same. If it does then put them as validated, else put them wrong plus hide them again and clear the cardClickedMemory (use function clearCardClickedMemory())

function cardChecking() {
    
        // variable selecting the last 1 or 2 open cards
    const lastTwoCardsChecked = deck.querySelectorAll('li.open.show');

        // function hiding cards once they've been checked different
    function hideNonSimilarCards() {
        for (i=0; i < 2 ; i++){
            
            lastTwoCardsChecked[i].setAttribute("class", "card")
        }
    };

    const delayHiding = 1000; //1 second
    
    // check only if 2 cards are being open
    if (lastTwoCardsChecked.length === 2) {
        console.log(`2 cards are being open`)
        
        // if both values are strictly equal (classes of the icon, which means the ID of the card) then convert all li classes to match
        if (cardClickedMemory[0] === cardClickedMemory[1]) {
            console.log(`both values are check equals`)
            for (i=0; i < 2 ; i++){
                lastTwoCardsChecked[i].setAttribute("class", "card match animated tada");
            }
        } else {
                console.log(`both values are NOT equals, should wait and hide`)
                for (i=0; i < 2 ; i++){
                        lastTwoCardsChecked[i].setAttribute("class", "card show animated shake red")
                    };
                setTimeout(function(){              
                    for (i=0; i < 2 ; i++){
                        lastTwoCardsChecked[i].setAttribute("class", "card")
                    };
                }, delayHiding);
        }
        moveCounter();
        clearCardClickedMemory();

    };
}

// variable selecting the reset button
const resetButton = document.querySelector('.restart');

//function reseting the game to begining
function resetGame() {
    resetButton.addEventListener('click',function(){
        removeExistingBoard();
        setGameBoard(listCards);
        moveNumber = 0;
        movesDisplay.textContent = moveNumber;
         cardClickedMemory = ['',''];
        cardClicking();
    } , false);
};


//function checking if player has won
function checkWinning() {
    
    const cardMatching = deck.querySelectorAll('li.match').length;
    console.log(cardMatching);
    if(cardMatching === listCards.length) {
        console.log(`victory`);
    }
}

// call the function setting up the game board, with already the list of cards
setGameBoard(listCards);
//make the cards clickable and their behaviour when clicked
cardClicking();

resetGame();
