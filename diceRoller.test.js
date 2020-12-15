import roll from "./diceRoller";

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
