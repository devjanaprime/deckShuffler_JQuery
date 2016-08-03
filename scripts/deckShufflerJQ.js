console.log( 'deckShufflerJQ.js sourced' );

$( document ).ready( function(){
  console.log( 'JQuery loaded' );
  setupDeck();
  showDeck();
});

// on click for cutDeckButton
$( document ).on( 'click', '.cutDeckButton', function(){
  console.log( 'in cutDeckButton click' );
  cutDeck();
}); // end

// on click for shuffleDeckButton
$( document ).on( 'click', '.shuffleDeckButton', function(){
  console.log( 'in shuffleDeckButton click' );
  shuffleDeck();
}); // end

// this array will hold our deck of cards
var deck = [];
// the possible suits
var suits = [ 'Clubs', 'Diamonds', 'Hearts', 'Spades' ];
// the possible faces
var faces = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King' ];

var cutDeck = function(){
  console.log( 'in cutDeck' );
  // cutIndex needs to be between 0 and deck.length
  // we are using Math.random returns a float between 0.0 and 1.0
  // multiply that by deck length and we'll get a float between 0 and deck.length
  var cutIndex = Math.random() * deck.length;
  // now we want an integer to use as an index
  // Math.floor will round down to the nearest integer
  var cutIndex =  Math.floor( cutIndex );
  console.log( cutIndex );
  // cards above and including cutIndex in deck are the "top" of the cut
  var topCut = [];
  for( var i=cutIndex; i<deck.length; i++ ){
    topCut.push( deck[ i ] );
  }// end top cut loop
  // cards below cutIndex are the 'bottom"
  var bottomCut = [];
  for( var i=0; i<cutIndex; i++ ){
    bottomCut.push( deck[ i ] );
  }// end top cut loop
  // put top cut in the bottom of the deck
  deck = topCut;
  // push in bottomCut to the top
  deck.push.apply( deck, bottomCut );
  showDeck();
} // end funk

var setupDeck = function(){
  // use suits and faces to create the deck
  for( var i=0; i < suits.length; i++){
    for( var j=0; j < faces.length; j++ ){
      // create a new card with the current face/suit combination
      var newCard={
        suit: suits[ i ],
        face: faces [ j ]
      };
      //push the new card into the deck
      deck.push( newCard );
    } // end faces loop
  } // end suits loop
  console.log( deck );
} // end funk

var showDeck = function(){
  console.log( 'in showDeck' );
  // empty div by clas
  $( '.outputDiv' ).empty();
  // unordered list for the cards
  $( '.outputList').append( '<ul>');
  // for each card append a list item
  for( var i=0; i < deck.length; i++ ){
    $( '.outputDiv').append( '<li>' + deck[ i ].face + ' of ' + deck[ i ].suit + '</li>' );
  }
  // close ul
  $( '.outputDiv').append( '</ul>');
} // end funk

// shuffle array function from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var shuffleDeck = function(){
  console.log( 'in shuffleDeck' );
  deck = shuffle( deck );
  showDeck();
} // end funk
