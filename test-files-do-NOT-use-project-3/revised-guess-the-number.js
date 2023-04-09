// Guess the Number - Mini-Game
// John Isabella III

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

retiredAdventurerInteraction(); // This is where all the code is for the Guess the Number Game

async function retiredAdventurerInteraction() {
  console.log(
    `\nRetired Adventurer\n    "L'est playith a game wherein I thinkith a number\n     and you, Squire, try to guess it.\n     Me has't selected a number betwixt 1 and 30."\n\n`
  );

  // Global Variable List (default)
  const maxInitial = 30; // Starting Value
  const minInitial = 1; // Starting Value
  let maxNumber = maxInitial;
  let minNumber = minInitial;
  let guess;
  let guessCount = 0; // Keeps track of how many times the Hero has guessed

  let secretNumber = randomNum(minInitial, maxInitial); //picks the Secret Number
  console.log(secretNumber, "Secret Number");

  while (guessCount <= 6 && secretNumber !== guess) {
    //console.log("Guess Count =", guessCount); //!TEST
    //console.log(typeof guess); //!TEST
    //console.log(typeof secretNumber); //!TEST
    guessCount++;
    if (guessCount <= 5) {
      guess = await heroGuess();
      if (guess == secretNumber) {
        console.log(
          `\nRetired Adventurer\n    "By Jove, squire!\n     You hath done it!!\n     Thou hast found mine number.\n     Thou art truly cunning to find my number was ${secretNumber}\n     and thou hath used ${guessCount} guesses only!"`
        );
      } else if (guess > secretNumber && guess <= maxNumber) {
        console.log(
          `\nRetired Adventurer\n    "Mine number art more miniscule than ${guess}.\n     Thou has't guesses ${
            5 - guessCount
          } to tarry twith."`
        );
        maxNumber = guess;
      } else if (guess < secretNumber && guess >= minNumber) {
        console.log(
          `\nRetired Adventurer\n    "Mine number art far grander than ${guess}.\n     Thou has't guesses ${
            5 - guessCount
          } to tarry twith."`
        );
        minNumber = guess;
      } else if (guess < minNumber || guess > maxNumber) {
        console.log(
          `\nRetired Adventurer\n    "Squire,\n     Forsooth why art thou selected ${guess}.\n     Dost thee fail to recollect thine figures and arithmetic?\n\n`
        );
      } else {
        console.log(
          `\nRetired Adventurer\n    "I art confused by thou selection...\n     Doth thou wish to wasteth time?\n\n`
        );
      }
    } else if ((guessCount === 6)) {
      console.log(
        `\nRetired Adventurer\n    "Thou hath squandered thy guesses and spoiled mine revelry!\n     Begone, knave!!!"`
      );
    }
  }
}

//This function stores the Hero's guess as an interger
async function heroGuess() {
  let guessedNumber = await ask(
    `\nRetired Adventurer\n    "Please pickith a number."\n>_ `
  );
  return parseInt(guessedNumber);
}

// Function to Generate a Random Number
function randomNum(min, max) {
  let range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

//Color Changing Text so some words pop out easier
function colorChangeWords(string, highlightedWords) {
    let white = "\033[0;39m";
    let yellow = "\033[0;33m";
    highlightedWords.forEach((word) => {
      string = string.replaceAll(word, yellow + word + white);
    });
    console.log(white + string + white);
  }