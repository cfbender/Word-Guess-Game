let game = {
  //document variable declaration
  primer: document.getElementById("primer"),

  currentWord: document.getElementById("current-guessing"),

  guessesLeftText: document.getElementById("guesses-left"),

  lettersGuessedText: document.getElementById("letters-guessed"),

  winsText: document.getElementById("wins"),

  funcGroupImage: document.getElementById("group-picture"),

  wikiLink: document.getElementById("wiki-link"),
  //game variable declaration

  gameStart: false,

  guesses: [],

  links: {
    alcohol: "wikipedia.com/aco"
  },

  functionalGroups: {
    alcohol: {
      image: "alcohol.png",
      link: "/Alcohol"
    },
    alkane: {
      image: "alkane.png",
      link: "/Alkane"
    },
    alkene: {
      image: "alkene.png",
      link: "/Alkene"
    },
    alkyne: {
      image: "alkyne.png",
      link: "/Alkyne"
    },
    phenyl: {
      image: "phenyl.png",
      link: "/Phenyl"
    },
    amine: {
      image: "amine.png",
      link: "/Amine"
    },
    azide: {
      image: "azide.png",
      link: "/Azide"
    },
    "alkyl halide": {
      image: "alkylHalide.png",
      link: "/Haloalkane"
    },
    ether: {
      image: "ether.png",
      link: "/Ether"
    },
    ester: {
      image: "ester.png",
      link: "/Ester"
    },
    thiol: {
      image: "thiol.png",
      link: "/Thiol"
    },
    thioether: {
      image: "thioether.png",
      link: "/Thioether"
    },
    aldehyde: {
      image: "aldehyde.png",
      link: "/Aldehyde"
    },
    ketone: {
      image: "ketone.png",
      link: "/Ketone"
    },
    "carboxylic acid": {
      image: "carboxylicAcid.png",
      link: "/Carboxylic_acid"
    },
    amide: {
      image: "amide.png",
      link: "/Amide"
    },
    carbamate: {
      image: "carbamate.png",
      link: "/Carbamate"
    },
    lactone: {
      image: "lactone.png",
      link: "/Lactone"
    },
    "carbonate ester": {
      image: "carbonateEster.png",
      link: "/Carbonate_ester"
    },
    urea: {
      image: "urea.png",
      link: "/Urea"
    },
    hemiacetal: {
      image: "hemiacetal.png",
      link: "/Hemiacetal"
    },
    acetal: {
      image: "acetal.png",
      link: "/Acetal"
    },
    hemiketal: {
      image: "hemiketal.png",
      link: "/Hemiketal"
    },
    ketal: {
      image: "ketal.png",
      link: "/Ketal"
    },
    nitrile: {
      image: "nitrile.png",
      link: "/Nitrile"
    },
    imine: {
      image: "imine.png",
      link: "/Imine"
    },
    nitro: {
      image: "nitro.png",
      link: "/Nitro_compound"
    },
    enamine: {
      image: "enamine.png",
      link: "/Enamine"
    },
    isocyanate: {
      image: "isocyanate.png",
      link: "/Isocyanate"
    },
    aziridine: {
      image: "aziridine.png",
      link: "/Aziridine"
    },
    carbodiimide: {
      image: "carbodiimide.png",
      link: "/Carbodiimide"
    },
    hydrazine: {
      image: "hydrazine.png",
      link: "/Hydrazine"
    },
    isothiocyanate: {
      image: "isothiocyanate.png",
      link: "/Isothiocyanate"
    },
    disulfide: {
      image: "disulfide.png",
      link: "/Disulfide"
    },
    sulfone: {
      image: "sulfone.png",
      link: "/Sulfone"
    },
    thioamide: {
      image: "thioamide.png",
      link: "/Thioamide"
    },
    "acid anhydride": {
      image: "acidAnhydride.png",
      link: "/Organic_acid_anhydride"
    },
    "acid chloride": {
      image: "acidChloride.png",
      link: "/Acid_chloride"
    },
    epoxide: {
      image: "epoxide.png",
      link: "/Epoxide"
    }
  },

  secretWord: "secret",

  secretArray: [],

  guessingArray: [],

  guessesLeft: 0,

  keyPressed: "",

  lettersGuessed: [],

  gameWin: false,

  wins: 0,

  //method declaration

  gameInit() {
    if (!game.gameStart) {
      //select random word from possibilities
      game.secretWord =
        Object.keys(game.functionalGroups)[
          Math.floor(Math.random() * (Object.keys(game.functionalGroups).length - 1) + 1)
        ];
        //generate wiki link and image
      game.wikiLink.href = "https://www.wikipedia.com/wiki" + game.functionalGroups[game.secretWord].link;
      game.funcGroupImage.src = "./assets/images/" + game.functionalGroups[game.secretWord].image;
      //initialize arrays to hold letters
      game.guessingArray = [];
      game.lettersGuessed = [];
      game.secretArray = [];
      //wipe html for letters guessed
      game.lettersGuessedText.textContent = "";
      //reset number of guesses left
      game.guessesLeftText.textContent = game.secretWord.length + 6;
      game.guessesLeft = game.secretWord.length + 6;
      game.primer.textContent = "";
      //generate blanks for the length of the word
      game.blankGenerator(game.secretWord);
      //put the blanks on the screen
      game.currentWord.textContent = game.guessingArray.join(" ");
    }
  },

  blankGenerator(string) {
    for (let v of string) {
      //push letters of secret word into an array
      game.secretArray.push(v);
    }
      //then generate blanks of the same length
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
    if (!game.gameStart) {
      game.gameStart = true;
      return 0;
    } 
    game.keyPressed = event.key.toLowerCase();
    // only let through single character key presses (still lets in symbols and 0-9)
    if (game.keyPressed.length !== 1) {
      return;
    }
    //test if the character is a-z
    if (/^[a-z]$/i.test(game.keyPressed)) {
      if (!game.lettersGuessed.includes(game.keyPressed)) {
        //if it was a-z and hadn't been pressed before, add it to letters guessed and update the game
        game.lettersGuessed.push(game.keyPressed);
        game.lettersGuessedText.textContent = game.lettersGuessed.join(", ");
        game.gameUpdate();
      }
    }
  },

  gameUpdate() {  
    //decrement guesses left and update the screen
      game.guessesLeft--;
      game.guessesLeftText.textContent = game.guessesLeft;

      //update guesses if letter is in secret word
      if (game.secretArray.includes(game.keyPressed)) {
        for (let i = 0; i < game.guessingArray.length; i++) {
          if (game.secretArray[i] === game.keyPressed) {
            game.guessingArray[i] = game.secretArray[i];
          }
        }
        game.currentWord.textContent = game.guessingArray.join("  ");
      }

      //first check if you won
      if (game.arraysEqual(game.guessingArray, game.secretArray)) {
        game.gameWin = true;
        game.gameEnd();
      }
      //then if you have no guesses left, end the game
      if (game.guessesLeft <=0 && !game.gameWin) {
        game.gameEnd();
      } 
    },

  gameEnd() {
    if (!game.gameWin) {
      setTimeout(function () {
        game.primer.textContent = "Press any key to get started!";
      }, 2000);
      game.primer.textContent = "You Lose!";
      game.currentWord.textContent = game.secretArray.join(" ")
    } else {
      setTimeout(function () {
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

  //checks if 2 arrays are equal
  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  },
};

document.addEventListener("keyup", game.gameListen);