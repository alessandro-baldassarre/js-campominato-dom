// Consegna
// L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati
// - abbiamo calpestato una bomba
// - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
// BONUS:
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste


// saved in the variables the DOM elements that i need
const gridElement = document.getElementById("grid");

const gridElementWrapper = document.getElementById("grid-bg");

const buttonPlay = document.getElementById("btn-play");

const buttonReset = document.getElementById("btn-reset");

const preGameElement =document.getElementById("game-instructions");

const resetGameElement =document.getElementById("game-reset");


// when the user clicks the button the program performs certain operations
buttonPlay.addEventListener("click", function(){

// hides or displays the game layout
preGameElement.classList.toggle("d-none");
resetGameElement.classList.toggle("d-none");
gridElementWrapper.classList.toggle("d-none");

//declare a new grid cell
let newGridElement;

const userSelection = document.querySelector("select").value;

let numberGridElements = 0;

let rowGridElements;

let listBombs;

let counterPoints = 0;

let flagEndGame = false;
    
// check the selection that the user has chosen and the program performs certain operations based on it
switch (userSelection) {


    case 'opt-easy':

        numberGridElements = 100;

        rowGridElements = 10;
        
        break;

    case 'opt-midd':

        numberGridElements = 81;

        rowGridElements = 9
        
        break;

    case 'opt-hard':

        numberGridElements = 49;

        rowGridElements = 7;
        
        break;
};

    listBombs = randomMines(listBombs, 16, numberGridElements);

    console.log(listBombs);

    // cycle that creates a new cell of the grid for "i" times
    for( let i = 1; i <= numberGridElements; i++ ){

        newGridElement = createNewDiv(gridElement, i);

        newGridElement.style = `width: calc((40vw - 1rem) / ${rowGridElements});
        height: calc((40vw - 1rem) / ${rowGridElements});
        line-height: calc((40vw - 1rem) / ${rowGridElements});`

            if(!(listBombs.includes(i))){

                newGridElement.addEventListener( "click", function() {

                    if(!flagEndGame){

                        this.classList.add("clicked");
                        counterPoints++;
                        addToDOM("game-result", `Il tuo punteggio è: ${counterPoints}`);
                    }
                });
                
            }
            else{

                newGridElement.addEventListener( "click", function() {

                    if(!flagEndGame){

                        this.classList.add("clicked-mine");
                        addToDOM("game-result", `Hai perso!! Hai trovato una mina! Il tuo punteggio finale è: ${counterPoints}`);
                        flagEndGame = true; 
                    }
                });
        }
    }




});

buttonReset.addEventListener("click", function(){

    resetGameElement.classList.toggle("d-none");
    preGameElement.classList.toggle("d-none");
    gridElementWrapper.classList.toggle("d-none");

    gridElement.innerHTML = "";
    addToDOM("game-result", ``);
    

});





/***********************FUNCTIONS**********************************/

/**
 * function that creates a DOM element of type div given as input the DOM element in which we want to insert it and the value to add to the div we are creating
 * 
 * @param {*} domElement 
 * @param {*} innerElement 
 */
function createNewDiv(domElement, innerElement){

    const newElement = document.createElement("div");
    newElement.classList.add("box", "border", "text-center");
    newElement.innerHTML = innerElement;

    domElement.appendChild(newElement);

    return newElement;


}


/**
 * function that generates a random number that is not present in the list given as an argument and that is between a minimum number and a maximum number also passed as arguments
 * 
 * @param {*} listUnavailableNumber 
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */

function randomNumberOnly (listUnavailableNumber,min, max){

    let randomNumber;

    let flag = false;

    while (!flag){

        randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

        if(!(listUnavailableNumber.includes(randomNumber))){
            flag = true;
        }

    }

    return randomNumber;
}

/**
 * function that generates a random numbers that is not present in the list given as an argument and that is between a minimum number and a maximum number also passed as arguments and and adds them to the list
 * 
 * @param {*} listMines 
 * @param {*} numberMines 
 * @param {*} numberCells 
 * @returns 
 */

function randomMines (listMines, numberMines, numberCells){
    
    listMines = [];

    for ( let i = 1; i <= numberMines; i++){

        listMines.push(randomNumberOnly(listMines, 1, numberCells));

    }

    return listMines;
}

/**
 * function that adds a value passed by argument to an element of the dom with id also passed by argument
 * 
 * @param {*} elementId 
 * @param {*} valueToAdd 
 */

function addToDOM (elementId, valueToAdd){
    
    document.getElementById(elementId).innerHTML = valueToAdd;
}

