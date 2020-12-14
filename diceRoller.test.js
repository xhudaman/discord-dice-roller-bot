import rollDice from "./diceRoller";

const validDiceRoll = "1d20";
const validDiceRollWithModifier = "1d20+1";
const validDiceRollWithMultipleDice = "2d20";
const validDiceRollWithMultipleDiceAndModifier = "2d20+1";

describe("dice roller", () => {
  test("falsy value throws error", () => {
    [null, false, undefined, ""].forEach(value => {
      expect(rollDice(value)).toStrictEqual(new TypeError(`Missing input!`));
    });
  });
});
