  const LETTER_POOL = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
};

const SCORE_CHART = {
    A: 1, 
    B: 3, 
    C: 3, 
    D: 2, 
    E: 1, 
    F: 4, 
    G: 2, 
    H: 4, 
    I: 1, 
    J: 8, 
    K: 5, 
    L: 1, 
    M: 3, 
    N: 1, 
    O: 1, 
    P: 3, 
    Q: 10, 
    R: 1, 
    S: 1, 
    T: 1, 
    U: 1, 
    V: 4, 
    W: 4, 
    X: 8, 
    Y: 4, 
    Z: 10
}

export const drawLetters = () => {

  let letters = {...LETTER_POOL}
  let letterCount = Object.keys(letters).reduce(((total, letter) => total += letters[letter]), 0);

  let letterArr = [];

  for (let i = 0; i < 10; i++) {

    let letter = getLetter(letters, letterCount);

    letterArr.push(letter);

    letterCount -= 1;

  }

  return letterArr;

};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2

  let letterObject = buildLetterObject(lettersInHand);

  for (let letter of input) {
    if (letterObject[letter]) {
      letterObject[letter]--;
    } else {
      return false;
    }
  }
  return true;
};

export const scoreWord = (word) => {

  word = word.toUpperCase()
  
  let total = word.length >= 7 ? 8 : 0;

  for (let letter of word) {
    total += SCORE_CHART[letter];
  }

  return total;
};

export const highestScoreFrom = (words) => {
  let topWord = ['', 0];

  for (let word of words) {
    let score = scoreWord(word);

    if (score > topWord[1]) {
      topWord[0] = word;
      topWord[1] = score;
    } else if (score === topWord[1]) {
      let topLength = topWord[0].length;

      if ((word.length < topLength || word.length == 10) && topLength !== 10) {
        topWord[0] = word;
        topWord[1] = score;
      }
    }
  }

  return {
    word: topWord[0],
    score: topWord[1]
  };
};

const buildLetterObject = (letters) => {
  let letterObject = {};

  for (let letter of letters) {
    if (letterObject[letter]) {
      letterObject[letter]++;
    } else {
      letterObject[letter] = 1;
    }
  }
  return letterObject
};

const getLetter = (letters, count) => {
  
  let randomNumber = Math.floor(Math.random() * (count));

  for (let letter in letters) {
    
    randomNumber -= letters[letter];

    if (randomNumber <= 0 && letters[letter] !== 0) {
      letters[letter] -= 1;
      return letter;
    }
  }

  return 'something went wrong';
};