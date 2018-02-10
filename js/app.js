/*
 * Create a list that holds all of your cards
 */

let cards = $(".card");
/*let cards = [...card];*/




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffle(cards);

let newCardsHtml = "";

$('.restart').click(function() {
    location.reload();
});

for (const item of cards) {
    newCardsHtml += $(item).prop('outerHTML');
}

$('.deck').html(newCardsHtml);
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

let openCards = [];

let clickCounter = 0;

let timerStarted = false; 

let timer;


 

$(".card").click(function() {

    const currentCard = $(this);

    if (timerStarted === false){
      startTimer();
      timerStarted = true;
    }
    
    

    currentCard.addClass("open show");
    openCards.push(currentCard);

    console.log(currentCard);

    clickCounter++;

    starRating();

    $('.moves').html(clickCounter);




    if ((clickCounter % 2) === 0) {

        const previousCard = $(openCards[openCards.length - 2]);

        console.log(previousCard);
        console.log(currentCard);

        if (previousCard.is(currentCard)) {
            
            currentCard.toggleClass("open show");

            openCards.pop();
            openCards.pop();
        }

        else if ((previousCard.prop('innerHTML')) == (currentCard.prop('innerHTML'))) {
            
            if (openCards.length === 16){
                clearInterval(timer);

                setTimeout(function(){

                alert ("Congratulations!");
            },300);
            }

        } else{
           
            setTimeout(function(){
                currentCard.toggleClass("open show");
                previousCard.toggleClass("open show");

                openCards.pop();
                openCards.pop();
            },400);
        }

        console.log("Kliknuto je " + clickCounter);
    }


});


function startTimer(){

        var sec = 0;
        
        function pad ( val ) { 

            return val > 9 ? val : "0" + val; 
        }

        timer = setInterval( function(){
            $("#seconds").html(pad(++sec%60));
            $("#minutes").html(pad(parseInt(sec/60,10)));
    
        }, 1000);

}


function starRating(){
    if(clickCounter === 5){
        $('.stars > li:nth-child(3)').html('<i class="fa fa-star-o"></i>');
    }

    if(clickCounter === 10){
        $('.stars > li:nth-child(2)').html('<i class="fa fa-star-o"></i>');
    }

    if(clickCounter === 15){
        $('.stars > li:nth-child(1)').html('<i class="fa fa-star-o"></i>');
    }

}






