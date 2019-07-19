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
      image: " ",
      link: "/Azide"
    },
    "alkyl halide": {
      image: " ",
      link: "/Haloalkane"
    },
    ether: {
      image: " ",
      link: "/Ether"
    },
    ester: {
      image: " ",
      link: "/Ester"
    },
    thiol: {
      image: " ",
      link: "/Thiol"
    },
    thioether: {
      image: " ",
      link: "/Thioether"
    },
    aldehyde: {
      image: " ",
      link: "/Aldehyde"
    },
    ketone: {
      image: " ",
      link: "/Ketone"
    },
    "carboxylic acid": {
      image: " ",
      link: "/Carboxylic_acid"
    },
    amide: {
      image: " ",
      link: "/Amide"
    },
    carbamate: {
      image: " ",
      link: "/Carbamate"
    },
    lactone: {
      image: " ",
      link: "/Lactone"
    },
    "carbonate ester": {
      image: " ",
      link: "/Carbonate_ester"
    },
    urea: {
      image: " ",
      link: "/Urea"
    },
    hemiacetal: {
      image: " ",
      link: "/Hemiacetal"
    },
    acetal: {
      image: " ",
      link: "/Acetal"
    },
    hemiketal: {
      image: " ",
      link: "/Hemiketal"
    },
    ketal: {
      image: " ",
      link: "/Ketal"
    },
    nitrile: {
      image: " ",
      link: "/Nitrile"
    },
    imine: {
      image: " ",
      link: "/Imine"
    },
    nitro: {
      image: " ",
      link: "/Nitro"
    },
    enamine: {
      image: " ",
      link: "/Enamine"
    },
    isocyanate: {
      image: " ",
      link: "/Isocyanate"
    },
    aziridine: {
      image: " ",
      link: "/Aziridine"
    },
    carbodiimide: {
      image: " ",
      link: "/Carbodiimide"
    },
    hydrazine: {
      image: " ",
      link: "/Hydrazine"
    },
    isothiocyanate: {
      image: " ",
      link: "/Isothiocyanate"
    },
    disulfide: {
      image: " ",
      link: "/Disulfide"
    },
    sulfone: {
      image: " ",
      link: "/Sulfone"
    },
    thioamide: {
      image: " ",
      link: "/Thioamide"
    },
    "acid anhydride": {
      image: " ",
      link: "/Acid_anhydride"
    },
    "acid chloride": {
      image: " ",
      link: "/Acid_chloride"
    },
    epoxide: {
      image: " ",
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
      game.secretWord =
        Object.keys(game.functionalGroups)[
          Math.floor(Math.random() * (Object.keys(game.functionalGroups).length - 1) + 1)
        ];
      console.log("www.wikipedia.com/wiki" + game.functionalGroups[game.secretWord].link);
      game.wikiLink.href = "https://www.wikipedia.com/wiki" + game.functionalGroups[game.secretWord].link;
      game.guessingArray = [];
      game.lettersGuessed = [];
      game.secretArray = [];
      game.lettersGuessedText.textContent = "";
      game.guessesLeftText.textContent = game.secretWord.length + 8;
      game.guessesLeft = game.secretWord.length + 8;
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

    if (game.guessesLeft < 0 && !game.gameWin) {
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

  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  },

  changeInfo() {

  }
};

document.addEventListener("keyup", game.gameListen);