const getFavourabilityString = (rolls) => {
  let averages = [];

  rolls.forEach((currentRoll) => {
    Object.keys(currentRoll).forEach((key) => {
      if (key === "modifiers") {
        return;
      }
      let diceSize = parseInt(key.match(/(?<=d)\d{1,3}/));
      let totalOfRoll = currentRoll[key].reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      const average = (diceSize / 2 + 1) * currentRoll[key].length;

      if (totalOfRoll > average) {
        averages.push(1);
      } else if (totalOfRoll < average) {
        averages.push(-1);
      } else {
        averages.push(0);
      }
    });
  });

  let tally = averages.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  if (tally <= -1) {
    return "not very favourable";
  } else if (tally >= 1) {
    return "quite favourable";
  } else {
    return "relatively neutral";
  }
};

module.exports = getFavourabilityString;
