/*
 * First part : set up the game board
 */

let listCards = [ // creates list with all its items twice
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
];

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

}

// function setting up the game board
function setGameBoard(array){
    
    shuffle(array);
    
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
 *   Second part: Functions describing the game play and display
 */



function cardClicking(card){ //function showing card when clicked
    
    const allCards = deck.querySelectorAll('li:not(.show):not(.open):not(.match)'); //select all tags i in deck except the cards already open or matched
    
    for (let i = 0; i < allCards.length ; i++) {
        allCards[i].addEventListener('click', function(card) {
                if(card.target.tagName === 'LI'){
                    card.target.setAttribute("class", "show open card"); // show the card clicked

                    cardIDStoring(card); // store the ID of the card clicked
                    cardChecking(); // check if the card is the same than the one before (if it's the second card open)
                    checkWinning(); // check if player have won the game
                    starRating (); // check if need to change stars rating
                }
            
            }, false );
    }
    
}

let cardClickedMemory = ['','']; // variable storing the 0 1 or 2 last cards. Starts the game storing 0 cards. 

//function store the class of i in the variable cardClickedMemory array. In its first parameter if completely empty, or in its second if first is empty. And if both are used then empty both and store in first.
function cardIDStoring(card) {
    if (cardClickedMemory[0] === '' && cardClickedMemory[1] === ''){
        cardClickedMemory[0] = card.target.querySelector('i').className;
    } else if (cardClickedMemory[0] !== '' && cardClickedMemory[1] === '') {
        cardClickedMemory[1] = card.target.querySelector('i').className;
    } else {
        clearCardClickedMemory();
        cardClickedMemory[0] = card.target.querySelector('i').className;
    }
}


function clearCardClickedMemory() { // function clearing the memory of the last 2 cards checked
    cardClickedMemory = ['',''];
}

let moveNumber; // variable counting the number of moves

const movesDisplay = document.querySelector('.moves'); // select the move counter display

function moveCounter (){ // function adding a move everytime two cards have been checked

    moveNumber++;
    movesDisplay.textContent = moveNumber;
}

let starRate = 3; // result of stars (starts with 3)

const starBoard = document.querySelector('.stars'); //variable selecting the star result board

const starsDisplayed = starBoard.querySelectorAll('i'); //variable selecting all the stars displayed in the result board

function starRating () { // function rating in stars the result of the user, and displaying it in the board
    if (moveNumber>18){
        starRate = 1;
    }  else if (moveNumber===18){
        starRate = 0;
        starsDisplayed[1].setAttribute('class','fa fa-star-o')
    } else if (moveNumber>15){
        starRate = 2;
    } else if (moveNumber===15){
        starRate = 0;
        starsDisplayed[2].setAttribute('class','fa fa-star-o')
    };

}


// function checking if the 2 cards checked before are the same. If it does then put them as validated, else put them wrong plus hide them again and clear the cardClickedMemory (use function clearCardClickedMemory())
function cardChecking() {
    
        
    const lastTwoCardsChecked = deck.querySelectorAll('li.open.show'); // variable selecting the last 1 or 2 open cards
        
    function hideNonSimilarCards() { // function hiding cards once they've been checked different
        for (i=0; i < 2 ; i++){
            
            lastTwoCardsChecked[i].setAttribute("class", "card");
        }
    };

    const delayHiding = 1000; //1 second
    
    if (lastTwoCardsChecked.length === 2) { // check only if 2 cards are being open
        
        // if both values are strictly equal (classes of the icon, which means the ID of the card) then convert all li classes to match
        if (cardClickedMemory[0] === cardClickedMemory[1]) {
            for (i=0; i < 2 ; i++){
                lastTwoCardsChecked[i].setAttribute("class", "card match animated tada");
            }
        } else {
                for (i=0; i < 2 ; i++){
                        lastTwoCardsChecked[i].setAttribute("class", "card show animated shake red")
                    };
                setTimeout(function(){              
                    for (i=0; i < 2 ; i++){
                        lastTwoCardsChecked[i].setAttribute("class", "card")
                    };
                }, delayHiding);
        };
        moveCounter(); // add 1 to move Counter value, and will display it
        clearCardClickedMemory(); // since 2 cards have been open and checked, it clears the card storage memory

    } else if (moveNumber===0) { // if it is the first card open of the game, starts the timer
                startTimer();
   };
}

function starReset() { // function restarting stars to initial state
    starRate = 0;
    for ( i=0 ; i<3 ; i++ ){
            starsDisplayed[i].setAttribute('class','fa fa-star');
    };
    
}

const resetButton = document.querySelectorAll('.restart'); // variable selecting the reset button

function resetGame() { //function reseting the game to begining
    for (let i=0 ; i<2 ; i++) {
        resetButton[i].addEventListener('click',function(){
            
            document.querySelector('.victory-modal').setAttribute('class','victory-modal hidden');  
            removeExistingBoard();
            setGameBoard(listCards);
            moveNumber = 0;
            movesDisplay.textContent = moveNumber;
             cardClickedMemory = ['',''];
            cardClicking();
            starReset();
            resetTimer();
        } , false);
    };
};



function checkWinning() { //function checking if player has won
    
    const cardMatching = deck.querySelectorAll('li.match').length;
    if(cardMatching === listCards.length) {
        // stop counting and record results in variables
        stopTimer();
        // stop counting and store for Hall of fame
        let currentVictoryDate = new Date();
        currentResult = {
            moveNumber,
            currentVictoryDate,
            timeVictory: `time: ${seconds}'' ${tens} tens`,
        }
        insertCurrentResultInHallOfFame(); // calculate ranking
        // display results
        document.querySelector('.victory-modal').setAttribute('class','victory-modal');        
        displayVictoryMoves();
        // display hall of fame
        displayHallOfFame();
    }
}
// function displaying the moves, stars and time counter result in the victory modal
function displayVictoryMoves() {
    document.querySelector('.moves-victory-result').textContent = moveNumber;
    document.querySelector('.stars-victory-result').textContent = starRate;
}

let seconds = 00; 
let tens = 00; 
const appendTens = document.getElementById("tens");
const appendSeconds = document.getElementById("seconds");
let Interval ;
const appendTensVictory = document.getElementById("tens-victory");
const appendSecondsVictory = document.getElementById("seconds-victory");

function timeLiveCaluclations () { // make timer calculations and display it
    tens++; // add 1 ten of second (and is called by the interval of Start Timer function each 10 milliseconds)
    
    if(tens < 9){
        appendTens.innerHTML = "0" + tens; // display to Live
        appendTensVictory.innerHTML = "0" + tens; // display to Victory
    } else if (tens > 9){
        appendTens.innerHTML = tens; // display to Live
        appendTensVictory.innerHTML = tens; // display to Live
      
    } 
    
    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds; // display to Live
        appendSecondsVictory.innerHTML = "0" + seconds; // display to Live
        tens = 0;
        appendTens.innerHTML = "0" + 0; // display to Live
        appendTensVictory.innerHTML = "0" + 0; // display to Live
    }
    
    if (seconds > 9){
        appendSeconds.innerHTML = seconds; // display to Live
        appendSecondsVictory.innerHTML = seconds; // display to Live
    }
  
}

function stopTimer() { // stops the timer
       clearInterval(Interval);
}

function startTimer() { // Start the timer
    clearInterval(Interval); // stops the timer (in case it was working before)
    Interval = setInterval(timeLiveCaluclations, 10); // calls the timeLiveCalculations function every 0.01sec, so it will add 1 tens of second, and display it.
}
  
function resetTimer() { // reset timer to initial state
    clearInterval(Interval); // stops the timer
    tens = "00"; // reset tens of seconds to zero
    seconds = "00"; // reset seconds to zero
    appendTens.innerHTML = tens; // display to Live
    appendSeconds.innerHTML = seconds; // display to Live
}


// Get the <span> element that closes the modal
const closeCross = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
closeCross.onclick = function() {
    document.querySelector('.victory-modal').setAttribute('class','victory-modal hidden');
} 

/*
 * Hall of fame
 */

// variable recording the records
let currentResult, resultBest, resultSecondBest, resultThirdBest, emptyResult;

// set hall of fame to zero
emptyResult = {
            moveNumber : 100,
            currentVictoryDate : new Date(),
            timeVictory: `${seconds}''${tens}tens`,
}
resultBest = emptyResult;
resultSecondBest= emptyResult;
resultThirdBest = emptyResult;

//function checking if current result is worth entering the Hall of fame, and rank it
function insertCurrentResultInHallOfFame(){
    if(currentResult.moveNumber < resultBest.moveNumber){
        resultThirdBest = resultSecondBest;
        resultSecondBest = resultBest;
        resultBest = currentResult;
    } else if (currentResult.moveNumber < resultSecondBest.moveNumber) {
        resultThirdBest = resultSecondBest;
        resultSecondBest = currentResult;
    } else if (currentResult.moveNumber < resultThirdBest.moveNumber) {
        resultThirdBest = currentResult;
    };
}

// display Hall of fame amd hide empty results

function displayHallOfFame() {
    // display results for Best result
    document.getElementById('moves-fame-best').textContent = resultBest.moveNumber;
    document.getElementById('time-fame-best').textContent = resultBest.timeVictory;
    document.getElementById('date-fame-best').textContent = formatDate(resultBest.currentVictoryDate);
    
    // for Second best
    document.getElementById('moves-fame-second-best').textContent = resultSecondBest.moveNumber;
    document.getElementById('time-fame-second-best').textContent = resultSecondBest.timeVictory;
    document.getElementById('date-fame-second-best').textContent = formatDate(resultSecondBest.currentVictoryDate);
    
    // for Third Best
    document.getElementById('moves-fame-third-best').textContent = resultThirdBest.moveNumber;
    document.getElementById('time-fame-third-best').textContent = resultThirdBest.timeVictory;
    document.getElementById('date-fame-third-best').textContent = formatDate(resultThirdBest.currentVictoryDate);
    
     
    // style for new entry in hall of fame
    if (currentResult.timeVictory === resultBest.timeVictory ) {
        document.getElementById('result1').setAttribute("style", "color:red; font-weight: bold;");
        document.getElementById('result2').setAttribute("style", "");
        document.getElementById('result3').setAttribute("style", "");
    } else if (currentResult.timeVictory === resultSecondBest.timeVictory ) {
        document.getElementById('result2').setAttribute("style", "color:red; font-weight: bold;");
        document.getElementById('result1').setAttribute("style", "");
        document.getElementById('result3').setAttribute("style", "");
    } else if (currentResult.timeVictory === resultThirdBest.timeVictory ) {
        document.getElementById('result3').setAttribute("style", "color:red; font-weight: bold;");
        document.getElementById('result1').setAttribute("style", "");
        document.getElementById('result2').setAttribute("style", "");
    }
    
    // hide result 2 if empty
    if (resultSecondBest.moveNumber === 100) {
        document.getElementById('result2').style.display = 'none';
    } else {
        document.getElementById('result2').style.display = 'block';
    }
    // hide result 3 if empty
    if (resultThirdBest.moveNumber === 100) {
        document.getElementById('result3').style.display = 'none';
    } else {
        document.getElementById('result3').style.display = 'block';
    }
   
}

// function to style the date
function formatDate(date) {
    const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const minute = date.getMinutes();
    const hours = date.getHours();

  return `${day} ${monthNames[monthIndex]} ${year} - ${hours}:${minute}`;
}

/*
 * call the function setting up the game board, with already the list of cards
 */
setGameBoard(listCards); // function setting up the gane board

cardClicking(); // function enabling the game play

resetGame(); //function to restart the game

//TODO: Add unique functionality beyond the minimum requirements (Implement a leaderboard, store game state using local storage, difficulty levels (easy, intermediate, hard) which change the amount of cards in the game (9(3*3)/16(4*4grid)/25(grid5*5), etc.)
//TODO: Implement additional optimizations that improve the performance and user experience of the game (keyboard shortcuts for gameplay, etc).