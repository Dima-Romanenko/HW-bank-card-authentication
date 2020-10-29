let value = prompt("Введите номер карты");

let processData = (data) => {
  let stringToArray = data.split(" ").join("");
  let dataArray = [...stringToArray].filter((el) => {
    if (isFinite(el)) {
      return el;
    }
  });

  if (dataArray.length === 16) return dataArray.reverse();
};

let checkNumberWithLune = (data) => {
  let sum = 0;
  data = convertToNumber(data);
  let result = data.map((number, i) => {
    if (i % 2 != 0) {
      number *= 2;
      if (number > 9) {
        number -= 9;
      }
    }
    sum += number;
  });
  if (sum % 10 == 0) {
    return true;
  } else {
    return false;
  }
};

let convertToNumber = (data) => {
  data = data.map((el) => +el);
  return data;
};

let convertArrayToString = (arr) => {
  let str = "";
  for (el of arr) {
    str += el;
  }
  return str;
};

let compareCardInn = (code) => {
  let innWithTwoNum = "";
  let innWithFourNum = "";
  let innWithSixNum = "";
  let maestroInnArray = [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763];

  code = code.reverse();

  for (let i = 0; i <= 1; i++) {
    innWithTwoNum += code[i];
    innWithTwoNum = +innWithTwoNum;
  }

  for (let i = 0; i <= 3; i++) {
    innWithFourNum += code[i];
    innWithFourNum = +innWithFourNum;
  }
  for (let i = 0; i <= 5; i++) {
    innWithSixNum += code[i];
    innWithSixNum = +innWithSixNum;
  }

  if (
    (innWithTwoNum >= 51 && innWithTwoNum <= 55) ||
    (innWithSixNum > 222100 && innWithSixNum < 272099)
  ) {
    return "MasterCard";
  } else if (+code[0] == 4) {
    return "Visa";
  } else if (maestroInnArray.includes(innWithFourNum)) {
    return "Maestro";
  } else {
    return undefined;
  }
};

let mainFunc = (data) => {
  let cardNumber = processData(data);
  let check = checkNumberWithLune(cardNumber);
  let paymentSystem = compareCardInn(cardNumber);
  if (check && paymentSystem === undefined) {
    return {
      number: convertArrayToString(cardNumber),
      correct: check,
      paymentSystem: "",
      accepted: false,
    };
  } else if (check && paymentSystem !== undefined) {
    return {
      number: convertArrayToString(cardNumber),
      correct: check,
      paymentSystem,
      accepted: true,
    };
  } else {
    return {
      number: convertArrayToString(cardNumber),
      correct: check,
      paymentSystem,
      accepted: false,
    };
  }
};

console.log(mainFunc(value));
