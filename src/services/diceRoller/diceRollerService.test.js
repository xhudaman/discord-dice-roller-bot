import roll, { getRandNum, getTotalFromRolls } from "./diceRollerService";

describe("dice roller", () => {
  test("null, false, undefined, and empty string returns error", () => {
    [null, false, undefined, ""].forEach(value => {
      expect(roll(value)).toStrictEqual(new TypeError(`Missing input!`));
    });
  });

  test("invalid input format returns error", () => {
    expect(roll("1dd2+1")).toStrictEqual(new Error("Invalid input format!"));
  });

  test("input with one die returns correct format", () => {
    const result = roll("1d20");

    expect(result).toHaveLength(1);
    expect(result).toStrictEqual([
      expect.objectContaining({
        d20: expect.arrayContaining([expect.any(Number)]),
        modifiers: []
      })
    ]);
    expect(result[0].d20).toHaveLength(1);
    expect(result[0].modifiers).toHaveLength(0);
  });

  test("input with one die and modifier returns correct format", () => {
    const result = roll("1d10+1");

    expect(result).toHaveLength(1);
    expect(result).toStrictEqual([
      expect.objectContaining({
        d10: expect.arrayContaining([expect.any(Number)]),
        modifiers: expect.arrayContaining([1])
      })
    ]);
    expect(result[0].d10).toHaveLength(1);
    expect(result[0].modifiers).toHaveLength(1);
  });

  test("input with multiple dice of same size returns correct format", () => {
    const result = roll("2d20");
    expect(result).toHaveLength(1);
    expect(result).toStrictEqual([
      expect.objectContaining({
        d20: expect.arrayContaining([expect.any(Number), expect.any(Number)]),
        modifiers: []
      })
    ]);
    expect(result[0].d20).toHaveLength(2);
    expect(result[0].modifiers).toHaveLength(0);
  });

  test("input with multiple dice of same size and modifier returns correct format", () => {
    const result = roll("2d20+1");

    expect(result).toHaveLength(1);
    expect(result).toStrictEqual([
      expect.objectContaining({
        d20: expect.arrayContaining([expect.any(Number), expect.any(Number)]),
        modifiers: expect.arrayContaining([1])
      })
    ]);
    expect(result[0].d20).toHaveLength(2);
    expect(result[0].modifiers).toHaveLength(1);
  });

  test("input with negative modifier returns correct format", () => {
    const result = roll("1d20-1");

    expect(result).toHaveLength(1);
    expect(result).toStrictEqual([
      expect.objectContaining({
        d20: expect.arrayContaining([expect.any(Number)]),
        modifiers: expect.arrayContaining([-1])
      })
    ]);
    expect(result[0].d20).toHaveLength(1);
    expect(result[0].modifiers).toHaveLength(1);
  });

  test("input with two dice sizes returns correct format", () => {
    const result = roll("1d20 + 1d10");

    expect(result).toHaveLength(2);
    expect(result).toStrictEqual([
      expect.objectContaining({
        d20: expect.arrayContaining([expect.any(Number)]),
        modifiers: []
      }),
      expect.objectContaining({
        d10: expect.arrayContaining([expect.any(Number)]),
        modifiers: []
      })
    ]);
    expect(result[0].d20).toHaveLength(1);
    expect(result[1].d10).toHaveLength(1);
    expect(result[0].modifiers).toHaveLength(0);
  });
});

describe("getRandNum", () => {
  test("getRandNum null, undefined, false, and empty input returns error", () => {
    [null, false, undefined, ""].forEach(value => {
      expect(getRandNum(value, 20)).toStrictEqual(
        new TypeError("Missing input!")
      );
      expect(getRandNum(1, value)).toStrictEqual(
        new TypeError("Missing input!")
      );
    });
  });

  test("getRandNum with valid input generates number between given values", () => {
    const result = getRandNum(1, 20);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(20);

    const secondaryResult = getRandNum(1, 100);
    expect(secondaryResult).toBeGreaterThanOrEqual(1);
    expect(secondaryResult).toBeLessThanOrEqual(100);

    const tertiaryResult = getRandNum(1, 8);
    expect(tertiaryResult).toBeGreaterThanOrEqual(1);
    expect(tertiaryResult).toBeLessThanOrEqual(8);
  });

  test("returns error if lowerLimit is greater than upperLimit", () => {
    expect(getRandNum(20, 1)).toStrictEqual(
      new Error("lowerLimit cannot be greater than or equal to upperLimit!")
    );
  });
  test("returns error if lowerLimit is equal to upperLimit", () => {
    expect(getRandNum(10, 10)).toStrictEqual(
      new Error("lowerLimit cannot be greater than or equal to upperLimit!")
    );
  });
});

describe("getTotalFromRoll", () => {
  test("null, undefined, false, and empty inputs return error", () => {
    [null, false, undefined, ""].forEach(value => {
      expect(getTotalFromRolls(value)).toStrictEqual(
        new TypeError("Missing rolls!")
      );
    });
  });

  test("rolls with single die return correct result", () => {
    let rolls = [
      {
        d20: 15,
        modifiers: []
      }
    ];

    const result = getTotalFromRolls(rolls);
    expect(result).toBe(15);
  });

  test("rolls with single die and positive modifier return correct result", () => {
    let rolls = [
      {
        d20: 10,
        modifiers: [4]
      }
    ];

    const result = getTotalFromRolls(rolls);
    expect(result).toBe(14);
  });

  test("rolls with single die and negative modifier return correct result", () => {
    let rolls = [
      {
        d20: 18,
        modifiers: [-3]
      }
    ];

    const result = getTotalFromRolls(rolls);
    expect(result).toBe(15);
  });

  test("rolls with single die and multiple modifiers return correct result", () => {
    let rolls = [
      {
        d20: 18,
        modifiers: [-4, 1]
      }
    ];

    const result = getTotalFromRolls(rolls);
    expect(result).toBe(15);
  });

  test("rolls with multiple dice return correct result", () => {
    let rolls = [
      {
        d20: 13,
        modifiers: [2]
      },
      {
        d8: 7,
        modifiers: [-2]
      }
    ];

    const result = getTotalFromRolls(rolls);
    expect(result).toBe(20);
  });
});
