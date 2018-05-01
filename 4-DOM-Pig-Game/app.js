/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
let scores, lastDice, roundScore, activePlayer, gamePlaying;

init();

// document.querySelector('#current-' + activePlayer).textContent = dice;

const x = document.querySelector('#score-' + activePlayer).textContent;

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. random umber
        let dice = Math.floor(Math.random() * 6) + 1;
        // 2. display result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        // if 6 rolled, check with last rolls.
        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer();
        }
        lastDice = dice;
        console.log(targetScore);
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Add current score to global score
        scores[activePlayer] += roundScore;
        // 2. Update ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 
        var input = document.querySelector('.final-score').value;
        let winningscore;

        // undefined, 0, null or empty string coerced to false
        if (input) {
            winningscore = input;
        } else {
            winningscore = 100;
        }
        // 3. Check to see if player won the game
        if (scores[activePlayer] >= winningscore) {
            // active player won
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    lastRolls = [0, 0];
};

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';
    gamePlaying = true;
    targetScore = 100;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 0';
    document.querySelector('#name-1').textContent = 'Player 1';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}