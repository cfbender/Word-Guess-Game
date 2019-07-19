let game = {
  //document variable declaration
  primer: document.getElementById("primer"),

  currentWord: document.getElementById("current-guessing"),

  guessesLeftText: document.getElementById("guesses-left"),

  lettersGuessedText: document.getElementById("letters-guessed"),

  winsText: document.getElementById("wins"),

  //game variable declaration

  gameStart: false,

  guesses: [],

  links : {
      alcohol: "wikipedia.com/aco"
  },

  wordPossibilites: [
    "alcohol",
    "alkane",
    "alkene",
    "alkyne",
    "phenyl",
    "amine",
    "azide",
    "alkyl halide",
    "ether",
    "ester",
    "thiol",
    "thiother",
    "aldehyde",
    "ketone",
    "carboxylic acid",
    "amide",
    "carbamate",
    "lactone",
    "carbonate ester",
    "urea",
    "hemiacetal",
    "acetal",
    "hemiketal",
    "ketal",
    "nitrile",
    "imine",
    "nitro",
    "enamine",
    "isocyanate",
    "aziridine",
    "carbodiimide",
    "hydrazine",
    "isothiocyanate",
    "disulfide",
    "sulfone",
    "thioamide",
    "acid anhydride",
    "acid chloride",
    "epoxide"
  ],

  secretWord: "secret",

  secretArray: [],

  guessingArray: [],

  guessLimit: 10,

  guessesLeft: 0,

  keyPressed: "",

  lettersGuessed: [],

  gameWin: false,

  wins: 0,

  //method declaration

  gameInit() {
    if (!game.gameStart) {
      game.secretWord =
        game.wordPossibilites[
          Math.floor(Math.random() * (game.wordPossibilites.length - 1) +1)
        ];
      game.guessingArray = [];
      game.lettersGuessed = [];
      game.secretArray = [];
      game.lettersGuessedText.textContent = "";
      game.guessesLeftText.textContent = game.guessLimit;
      game.guessesLeft = game.guessLimit;
      game.primer.textContent = "";
      game.blankGenerator(game.secretWord);
      game.currentWord.textContent = game.guessingArray.join(" ");
      game.gameStart = true;
    }
  },

  blankGenerator(string) {
    for (let v of string) {
      game.secretArray.push(v);
    }

    for (let w of string) {
      if (w === " ") {
        game.guessingArray.push(" ");
      } else {
        game.guessingArray.push("_");
      }
    }
  },

  gameListen(event) {
    game.gameInit();
    game.keyPressed = event.key.toLowerCase();
    if (game.keyPressed.length !== 1) {
      return;
    }
    if (/^[a-z]$/i.test(event.key)) {
      if (!game.lettersGuessed.includes(event.key)) {
        game.lettersGuessed.push(event.key);
        game.lettersGuessedText.textContent = game.lettersGuessed.join(", ");
        game.gameUpdate();
      }
    }
  },

  gameUpdate() {
    game.guessesLeft--;
    game.guessesLeftText.textContent = game.guessesLeft;

    if (game.guessesLeft <= 0 && !game.gameWin) {
      game.gameEnd();
    } else {
      if (game.secretArray.includes(game.keyPressed)) {
        for (let i = 0; i < game.guessingArray.length; i++) {
          if (game.secretArray[i] === game.keyPressed) {
            game.guessingArray[i] = game.secretArray[i];
          }
        }
        game.currentWord.textContent = game.guessingArray.join("  ");
        if (game.arraysEqual(game.guessingArray, game.secretArray)) {
          game.gameWin = true;
          game.gameEnd();
        }
      }
    }
  },

  gameEnd() {
    if (!game.gameWin) {
      setTimeout(function() {
        game.primer.textContent = "Press any key to get started!";
      }, 2000);
      game.primer.textContent = "You Lose!";
      game.currentWord.textContent = game.secretArray.join(" ")
    } else {
      setTimeout(function() {
        game.primer.textContent = "Press any key to get started!";
      }, 2000);
      game.primer.textContent = "You Win!";
      game.wins++;
      game.winsText.textContent = game.wins;
    }

    
    game.guessingArray = [];
    game.lettersGuessed = [];
    game.lettersGuessedText.textContent = "";
    game.guessesLeftText.textContent = game.guessLimit;
    game.guessesLeft = game.guessLimit;
    game.gameStart = false;
  },

  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = arr1.length; i--; ) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  }
};

document.addEventListener("keyup", game.gameListen);
