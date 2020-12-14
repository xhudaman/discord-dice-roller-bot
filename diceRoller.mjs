const isDice = string => {
  // return if string matches dice naming syntax i.e. 1d20
  return string.match(/\d+[d+-]\d+/);
};

const getRolledValue = rollArray => {
  let diceSplit = rollArray[0].split("d");
  let dCount = Math.min(
    diceSplit[0].length > 0 ? Number.parseInt(diceSplit[0], 10) : 1,
    50
  );
  let dSize = Number.parseInt(diceSplit[1], 10);

  // modify the result from the roll
  let mods = [];
  if (rollArray.length > 1) {
    for (let i = 1; i < rollArray.length; i++) {
      mods.push(Number.parseInt(rollArray[i], 10));
    }
  }
  // console.log("getting mods from array of strings...", {
  // rollArray: rollArray,
  // mods: mods,
  // });

  let baseResult;
  for (let i = 0; i < dCount; ++i) {
    baseResult = Math.floor(Math.random() * Math.floor(dSize) + 1);
  }
  // console.log("got base result of roll...", baseResult);

  // Add all values in mods array together with starting value of our base roll results
  let modifiedResult = mods.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  }, baseResult);
  // console.log("got base modified of roll...", modifiedResult);

  return {
    dice: `${diceSplit[0]}d${diceSplit[1]}`,
    baseResult: baseResult,
    modifiedResult: modifiedResult,
    mods: mods
  };
};

const getResultString = results => {
  let total = 0;
  for (let i = 0; i < results.length; i++) {
    // console.log("Total before update", total);
    total += results[i].modifiedResult;
    // console.log("Total after update", total);
  }

  let resultString = `${total}`;

  resultString = `${resultString} (${results
    .map(function(result) {
      return `([${result.dice.slice(1)}: ${result.baseResult}] ${result.mods
        .map(function(mod) {
          return mod < 0 ? `- ${Math.abs(mod)}` : `+ ${Math.abs(mod)}`;
        })
        .join(" ")})`;
    })
    .join(" + ")})`;

  return resultString;
};

const diceRoller = input => {
  const inputSplit = input.split(/\+/).map(function(string) {
    return string.trim();
  });

  if (!Array.isArray(inputSplit)) {
    const rollResult = getRolledValue([inputSplit]);
    return getResultString(rollResult);
  }
  const rolls = inputSplit.reduce(function(accumulator, currentValue) {
    console.log("reducing input to rolls...", {
      accumulator: accumulator,
      currentValue: currentValue
    });
    if (isDice(currentValue)) {
      accumulator.push({ dice: currentValue, mods: [] });
      return accumulator;
    }
    accumulator[accumulator.length - 1].mods.push(currentValue);
    return accumulator;
  }, []);

  // console.log("Got dice and mods from input!", {
  // inputSplit: inputSplit,
  // rolls: rolls,
  // });

  const results = rolls.map(roll => {
    return getRolledValue([roll.dice].concat(roll.mods));
  });

  // console.log("Got all roll results!", results);
  //return getResultString(results);
  return results;
};

export default diceRoller;
