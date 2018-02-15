

let openCards = [];
let clickCounter = 0;
let timerStarted = false; 
let timer;
let seconds = 0;
let minutes = 0;
let starsNumber = 3;
let newCardsHtml = "";

let cards = $(".card");


// on page reload shuffle functions is called and shuffles array of cards
shuffle(cards);


// builting HTML string that is representing new deck after shuffling
for (const item of cards) {
    newCardsHtml += $(item).prop('outerHTML');
}

// inserting HTML of the cards into deck div
$('.deck').html(newCardsHtml);


// adding click functionality 
$(".card").click(function() {

    const currentCard = $(this);


    // starting timer on first click 
    if (timerStarted === false){
      startTimer();
      timerStarted = true;
    }

    starRating();
    
    //if player clicks on already opened card, ignore it  
    if (currentCard.hasClass("matched")){
        return;
    }

    // displaying card's symbols
    currentCard.addClass("open show");
    
    
    openCards.push(currentCard);


    // on every second click compare current card with previous 
    if ((openCards.length % 2) === 0) {

        const previousCard = $(openCards[openCards.length - 2]);

        //if player clicks on same cards, close them and remove from openCards 
        if (previousCard.is(currentCard)) {

            openCards.pop();
        }

        //if cards matched
        else if ((previousCard.prop('innerHTML')) == (currentCard.prop('innerHTML'))) {

            clickCounter++;

            currentCard.addClass("matched");
            previousCard.addClass("matched");

            
            if (openCards.length === 16){

                clearInterval(timer);

                setTimeout(function(){

                    let result = confirm ("Congratulations!\n Your time is: " + minutes + ":" + seconds +
                                          "\n Your score is: " + starsNumber + " stars. \n Play again?");
                        
                        if (result === true){
                            location.reload();
                        }

                },300);
            }
        // if cards are different, close them 
        }else{
            setTimeout(function(){
                currentCard.toggleClass("open show");
                previousCard.toggleClass("open show");

                openCards.pop();
                openCards.pop();
                
            },400);

            clickCounter++;
        }
    }
    //update number of moves
    $('.moves').html(clickCounter);
});

// reload function
$('.restart').click(function() {
    location.reload();
});


// Shuffle function 
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


// Timer 
function startTimer(){

  timer = setInterval( function(){

    seconds++;
    
        if(seconds == 60){
        
            minutes++;
            
            seconds = 0;
        }
        
    $("#seconds").html(seconds);
    $("#minutes").html(minutes);

    }, 1000);
}


// Star Rating function that depending on number of moves, updates score of users
function starRating(){

    if(clickCounter === 15){
        $('.stars > li:nth-child(3)').html('<i class="fa fa-star-o"></i>');
        --starsNumber;
    }

    if(clickCounter === 20){
        $('.stars > li:nth-child(2)').html('<i class="fa fa-star-o"></i>');
    }
}






