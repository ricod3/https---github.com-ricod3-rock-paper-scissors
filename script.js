let userChoice;

async function startGame() {
    await readySetGo();

    const roundsInput = document.getElementById('rounds');
    const rounds = parseInt(roundsInput.value);

    // checking, if entered value is a number
    if (isNaN(rounds) || rounds <= 0) {
        alert('Please enter a valid number of rounds.');
        return;
    }

    let compScore = 0;
    let userScore = 0;

    for (let round = 1; round <= rounds; round++) {
        const computerChoice = getCompChoice();
        userChoice = null;
        while (!userChoice) {
            // waiting for user input
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        const result = getResult(userChoice, computerChoice);

        if (result === 'User') {
            userScore++;
        } else if (result === 'Computer') {
            compScore++;
        }
        showRoundResult(round, userChoice, computerChoice, result);

    }
    await new Promise(resolve => setTimeout(resolve, 6000));
    showGameResult(userScore, compScore);
}

function submitChoice(choice) {
    userChoice = choice;
}


function getCompChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomCompChoice = Math.floor(Math.random() * choices.length);
    return choices[randomCompChoice];
}

function getResult(userChoice, computerChoice) {
    const rules = {
        'Scissors': 'Paper',
        'Rock': 'Scissors',
        'Paper': 'Rock'
    };

    if (userChoice === computerChoice) {
        return 'Draw';
    }

    if (rules[userChoice] === computerChoice) {
        return 'User';
    } else {
        return 'Computer';
    }
}

function emojiChoice(choice) {
    if (choice === 'Rock') {
        return '🪨';
    } else if (choice === 'Paper') {
        return '📜';
    } else if (choice === 'Scissors') {
        return '✂️';
    } else {
        return choice;
    }
}


async function showRoundResult(round, userChoice, computerChoice, result) {
    const gameResults = document.getElementById('gameResults');
    const roundResult = document.createElement('p');
    roundResult.textContent = `Round ${round}: Your choice: ${userChoice}`;
    gameResults.appendChild(roundResult);

    // elemennt for showing text
    const diceText = document.createElement('p');
    diceText.textContent = 'The Computer chooses...';
    gameResults.appendChild(diceText);

    // three seconds rule
    await new Promise(resolve => setTimeout(resolve, 3000));

    // show computer's choice
    roundResult.textContent += ` // Computer's choice: ${computerChoice}`;
    gameResults.removeChild(diceText);

    // creating new element for only the compChoice
    const compChoiceText = document.createElement('p');
    compChoiceText.style.fontSize = '3em';
    compChoiceText.textContent = emojiChoice(computerChoice);
    compChoiceText.style.animation = 'flyIn 1s ease-out';
    gameResults.appendChild(compChoiceText);

    // three seconds rule
    await new Promise(resolve => setTimeout(resolve, 3000));
    gameResults.removeChild(compChoiceText);
    roundResult.textContent += `. Roundwinner: ${result}`;
}

function showGameResult(userScore, computerScore) {
    const gameResults = document.getElementById('gameResults');
    const gameResult = document.createElement('p');
    gameResult.textContent = `Game Over! You scored ${userScore}, Computer scored ${computerScore}.`;

    if (userScore > computerScore) {
        gameResult.textContent += ' >>> You win! <<<';
    } else if (userScore < computerScore) {
        gameResult.textContent += ' ### Computer wins! ###';
    } else {
        gameResult.textContent += ' DRAW!';
    }
    gameResults.appendChild(gameResult);
}

// from anime.js
async function readySetGo() {
    return new Promise(resolve => {
        var ml4 = {};
        ml4.opacityIn = [0, 1];
        ml4.scaleIn = [0.2, 1];
        ml4.scaleOut = 3;
        ml4.durationIn = 800;
        ml4.durationOut = 600;
        ml4.delay = 500;

        anime.timeline({
            complete: function() {
                resolve();
            }
        })
            .add({
                targets: '.ml4 .letters-1',
                opacity: ml4.opacityIn,
                scale: ml4.scaleIn,
                duration: ml4.durationIn
            }).add({
                targets: '.ml4 .letters-1',
                opacity: 0,
                scale: ml4.scaleOut,
                duration: ml4.durationOut,
                easing: "easeInExpo",
                delay: ml4.delay
            }).add({
                targets: '.ml4 .letters-2',
                opacity: ml4.opacityIn,
                scale: ml4.scaleIn,
                duration: ml4.durationIn
            }).add({
                targets: '.ml4 .letters-2',
                opacity: 0,
                scale: ml4.scaleOut,
                duration: ml4.durationOut,
                easing: "easeInExpo",
                delay: ml4.delay
            }).add({
                targets: '.ml4 .letters-3',
                opacity: ml4.opacityIn,
                scale: ml4.scaleIn,
                duration: ml4.durationIn
            }).add({
                targets: '.ml4 .letters-3',
                opacity: 0,
                scale: ml4.scaleOut,
                duration: ml4.durationOut,
                easing: "easeInExpo",
                delay: ml4.delay
            }).add({
                targets: '.ml4',
                opacity: 0,
                duration: 500,
                delay: 500
            });
    });
}