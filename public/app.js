// Get references to the dice, roll button, and score element
const dice = document.querySelectorAll('.dice');
const rollButton = document.querySelector('#roll');
const scoreElement = document.querySelector('#score');

// Set up event listeners for the roll button and the dice
rollButton.addEventListener('click', rollDice);

for (let i = 0; i < dice.length; i++) {
    dice[i].addEventListener('click', toggleHold);
}

// Define an array of scoring functions
const scoringFunctions = [
    checkForOnes,
    checkForTwos,
    checkForThrees,
    checkForFours,
    checkForFives,
    checkForSixes,
    checkForThreeOfAKind,
    checkForFourOfAKind,
    checkForFullHouse,
    checkForSmallStraight,
    checkForLargeStraight,
    checkForYahtzee,
];



// Define the scoring functions
function checkForPair(diceValues) {
    const valueCounts = new Map();

    for (const value of diceValues) {
        if (!valueCounts.has(value)) {
            valueCounts.set(value, 0);
        }
        valueCounts.set(value, valueCounts.get(value) + 1);
    }

    for (const [value, count] of valueCounts) {
        if (count >= 2) {
            return value * 2;
        }
    }

    return 0;
}

function checkForOnes(dice) {
    let sum = 0;
    for (let i = 0; i < dice.length; i++) {
        if (dice[i] === 1) {
            sum += 1;
        }
    }
    return sum;
}

function checkForTwos(dice) {
    let sum = 0;
    for (let i = 0; i < dice.length; i++) {
        if (dice[i] === 2) {
            sum += 2;
        }
    }
    return sum;
}

function checkForThrees(dice) {
    let sum = 0;
    for (let i = 0; i < dice.length; i++) {
        if (dice[i] === 3) {
            sum += 3;
        }
    }
    return sum;
}

function checkForFours(dice) {
    let sum = 0;
    for (let i = 0; i < dice.length; i++) {
        if (dice[i] === 4) {
            sum += 4;
        }
    }
    return sum;
}

function checkForFives(dice) {
    let sum = 0;
    for (let i = 0; i < dice.length; i++) {
        if (dice[i] === 5) {
            sum += 5;
        }
    }
    return sum;
}

function checkForSixes(dice) {
    let sum = 0;
    for (let i = 0; i < dice.length; i++) {
        if (dice[i] === 6) {
            sum += 6;
        }
    }
    return sum;
}

function checkForThreeOfAKind(dice) {
    let sortedDice = dice.slice().sort();
    if (sortedDice[0] === sortedDice[2] || sortedDice[1] === sortedDice[3] || sortedDice[2] === sortedDice[4]) {
        return dice.reduce((a, b) => a + b, 0);
    } else {
        return 0;
    }
}

function checkForFourOfAKind(dice) {
    let sortedDice = dice.slice().sort();
    if (sortedDice[0] === sortedDice[3] || sortedDice[1] === sortedDice[4]) {
        return dice.reduce((a, b) => a + b, 0);
    } else {
        return 0;
    }
}


function checkForFullHouse(dice) {
    let sortedDice = dice.slice().sort();
    if ((sortedDice[0] === sortedDice[1] && sortedDice[2] === sortedDice[4] && sortedDice[3] !== sortedDice[4]) || (sortedDice[0] !== sortedDice[1] && sortedDice[1] === sortedDice[3] && sortedDice[3] === sortedDice[4])) {
        return 25;
    } else {
        return 0;
    }
}

function checkForSmallStraight(dice) {
    let sortedDice = dice.slice().sort();
    if ((sortedDice[0] === 1 && sortedDice[1] === 2 && sortedDice[2] === 3 && sortedDice[3] === 4) || (sortedDice[1] === 1 && sortedDice[2] === 2 && sortedDice[3] === 3 && sortedDice[4] === 4) || (sortedDice[0] === 2 && sortedDice[1] === 3 && sortedDice[2] === 4 && sortedDice[3] === 5) || (sortedDice[1] === 2 && sortedDice[2] === 3 && sortedDice[3] === 4 && sortedDice[4] === 5)) {
        return 30;
    } else {
        return 0;
    }
}

function checkForLargeStraight(dice) {
    let sortedDice = dice.slice().sort();
    if ((sortedDice[0] === 1 && sortedDice[1] === 2 && sortedDice[2] === 3 && sortedDice[3] === 4 && sortedDice[4] === 5) || (sortedDice[0] === 2 && sortedDice[1] === 3 && sortedDice[2] === 4 && sortedDice[3] === 5 && sortedDice[4] === 6)) {
        return 40;
    } else {
        return 0;
    }
}

function checkForYahtzee(dice) {
    if (dice.every((val, i, arr) => val === arr[0])) {
        return 50;
    } else {
        return 0;
    }
}

// Define a function to roll the dice
function rollDice() {
    // Generate a random number between 1 and 6 for each dice
    const diceValues = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);

    // Set the images of the dice to correspond to the random values
    for (let i = 0; i < dice.length; i++) {
        dice[i].setAttribute('src', `images/dice${diceValues[i]}.png`);
    }

    // Calculate the score based on the scoring functions
    let score = 0;
    let hand = '';

    if (checkForYahtzee(diceValues)) {
        score = 50;
        hand = 'Yahtzee!';
    } else if (checkForLargeStraight(diceValues)) {
        score = 40;
        hand = 'Large straight';
    } else if (checkForSmallStraight(diceValues)) {
        score = 30;
        hand = 'Small straight';
    } else if (checkForFullHouse(diceValues)) {
        score = 25;
        hand = 'Full house';
    } else if (checkForFourOfAKind(diceValues)) {
        score = diceValues.reduce((a, b) => a + b, 0);
        hand = 'Four of a kind';
    } else if (checkForThreeOfAKind(diceValues)) {
        score = diceValues.reduce((a, b) => a + b, 0);
        hand = 'Three of a kind';
    } else {
        // If no scoring function matches, check for high card
        const sortedDiceValues = diceValues.slice().sort((a, b) => b - a);
        score = sortedDiceValues[0];
        hand = 'High card';
    }

    // Update the score and hand on the scoreboard
    scoreElement.textContent = `Score: ${score}`;
    const handNameElement = document.getElementById('hand-name');
    handNameElement.textContent = hand;
}
