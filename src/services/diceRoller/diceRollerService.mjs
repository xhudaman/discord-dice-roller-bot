export const getRandNum = (lowerLimit, upperLimit) => {
  if (!lowerLimit || !upperLimit) {
    throw new TypeError("Missing input!");
  }
  if (lowerLimit < 1) {
    return new Error("lowerLimit must be 1 or greater!");
  }
  if (lowerLimit >= upperLimit) {
    throw new Error(
      "lowerLimit cannot be greater than or equal to upperLimit!"
    );
  }
  return Math.floor(Math.random() * upperLimit) + lowerLimit;
};

export const getTotalFromRolls = rolls => {
  if (!rolls) {
    throw new TypeError("Missing rolls!");
  }

  const result = rolls.reduce((accumulator, currentValue) => {
    let total = 0;
    Object.keys(currentValue).forEach(key => {
      if (key === "modifiers") {
        for (let i = 0; i < currentValue[key].length; i++) {
          total += currentValue[key][i];
        }
      } else {
        total += currentValue[key].reduce((acc, curr) => acc + curr, 0);
      }
    });

    accumulator += total;

    return accumulator;
  }, 0);

  return result;
};

const diceRoller = input => {
  // captures syntax 1d20+1 and any variation of it up to 3 digit dice sizes with a min of 1 die
  const diceAndModifiersRegex = /(\d{1,3}d\d{1,3})(((\+|\-)\d+)+)?/gi;

  // captures the dice syntax from the dice and modifier group i.e. 1d20 from 1d20+1
  const diceSyntaxRegex = /\d{1,3}d\d{1,3}/gi;

  // captures just the modifiers from the full syntax
  const modifierRegex = /(\+|\-)\d+/g;

  if (!input) {
    throw new TypeError(`Missing input!`);
  }

  if (!diceAndModifiersRegex.test(input)) {
    throw new Error("Invalid input format!");
  }

  // (dice syntax) any digit, letter d, digit between 1-3 characters long, (modifier syntax) + or - a digit one or more times
  const splitInputToDiceRolls = diceString =>
    diceString.match(diceAndModifiersRegex);

  const individualRolls = splitInputToDiceRolls(input).reduce(
    (accumulator, currentValue) => {
      let dice = currentValue.match(diceSyntaxRegex)[0];

      let modifiers = currentValue.match(modifierRegex);
      modifiers = modifiers ? modifiers.map(value => parseInt(value)) : [];

      let diceCount = parseInt(dice.match(/\d{1,3}(?=d)/g)[0]);
      let diceSize = parseInt(dice.match(/(?<=d)\d{1,3}/g)[0]);

      let rolls = { modifiers, [`d${diceSize}`]: [] };

      for (let i = 0; i < diceCount; i++) {
        rolls[`d${diceSize}`].push(getRandNum(1, diceSize));
      }

      accumulator.push(rolls);
      return accumulator;
    },
    []
  );

  return individualRolls;
};

export default diceRoller;
