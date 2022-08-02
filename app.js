// import functions and grab DOM elements
import { renderGame } from './render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');

const nameForm = document.getElementById('name-form');
const nameFormButton = document.getElementById('name-form-button');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

// create an array to hold on to the state of past games
const pastGames = [];

let currentGame = {
    name1: '',
    name2: '',
    score1: 0,
    score2: 0
};

nameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get the name data from the form
    const formData = new FormData(nameForm);
    // set the state to this data from the form
    const name1 = formData.get('team-one');
    const name2 = formData.get('team-two');

    currentGame.name1 = name1;
    currentGame.name2 = name2;
    
    // reset the form values
    nameForm.reset();

    // refresh the current game element with new data by calling the appropriate function
    refreshCurrentGameEl();
});


teamOneAddButton.addEventListener('click', () => {
    // increment the current state for team one's score
    currentGame.score1++;
    // refresh the current game element with new data by calling the appropriate function
    refreshCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    // increment the current state for team two's score
    currentGame.score2++;
    // refresh the current game element with new data by calling the appropriate function
    refreshCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    // decrement the current state for team one's score
    currentGame.score1--;
    // refresh the current game element with new data by calling the appropriate function
    refreshCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    // decrement the current state for team two's score
    currentGame.score2--;
    // refresh the current game element with new data by calling the appropriate function
    refreshCurrentGameEl();
});

finishGameButton.addEventListener('click', () => {
    // add the current game to an array of games in state
    // it will be helpful to keep track of these games as objects with 4 properties, one for each piece of state we're tracking
    // for example, make an object like this: { name1: 'ducks', name2: 'bears' ,score1: 1, score2: 2 }
    // then push it to your array in state
    pastGames.push(currentGame);
    // (be sure to make a new object. do not declare the object in global scope and mutate it for reuse. This would cause difficult bugs)
    currentGame = {
        name1: '',
        name2: '',
        score1: 0,
        score2: 0
    };
    
    displayAllGames();

    // reset the state to zero and empty strings
    
    // refresh the current game element with new data by calling the appropriate function
    refreshCurrentGameEl();
});

function refreshCurrentGameEl() {
    currentGameEl.textContent = '';

    teamOneLabel.textContent = currentGame.name1;
    teamTwoLabel.textContent = currentGame.name2;

    // const gameEl = . . . 
    // make a new gameEl here by calling renderGame with the approriate arguments.
    const gameEl = renderGame(currentGame);
    // Check the renderGame function declaration in render-utils.js to figure out the correct arguments to pass to this function 
    // In render-utils.js as yourself: How many arguments does the function take? What order does it take them in?
    
    gameEl.classList.add('current');

    currentGameEl.append(gameEl);
}


function displayAllGames() {
    // clear out the past games list in the DOM
    pastGamesEl.textContent = '';
    // loop through the past games in state
    for (let game of pastGames) {
        // use the renderGame function to render and append a past game for each past game in state
        const gameEl = renderGame(game);
        pastGamesEl.append(gameEl);
        // again, review the renderGame function in render-utils.js. How many arguments does it take? What order does it take them in?
    }
}

refreshCurrentGameEl();