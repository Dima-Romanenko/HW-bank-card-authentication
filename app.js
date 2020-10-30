const outputBox = document.querySelector(".outputBox");
let value = prompt("Введите номер карты");

// Функция удаляет из номера лишние символы и пробелы, проверяет количество символов
//  и возвращает массив со значениями выстроенными в обратном порядке
let processData = (data) => {
  let stringToArray = data.split(" ").join("");
  let dataArray = [...stringToArray].filter((el) => {
    if (isFinite(el)) {
      return el;
    }
  });

  if (dataArray.length === 16) return dataArray.reverse();
};
// Алгоритм луна для проверки коректности номера
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
// Функция приводит элементы массива к числу
let convertToNumber = (data) => {
  data = data.map((el) => +el);
  return data;
};
// Функция приводит элементы массива к строке и возвращает строку
let convertArrayToString = (arr) => {
  let str = "";
  for (el of arr) {
    str += el;
  }
  return str;
};
// Функция проверяет к какой платежной системе принадлежит номер карты
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
// Функция проверяет данные и формирует обьект ответа
let createObject = (number, check, payment) => {
  if (check && payment === undefined) {
    return {
      card: convertArrayToString(number),
      correct: check,
      payment: "",
      accepted: false,
    };
  } else if (check && payment !== undefined) {
    return {
      card: convertArrayToString(number),
      correct: check,
      payment,
      accepted: true,
    };
  } else {
    return {
      card: convertArrayToString(number),
      correct: check,
      payment,
      accepted: false,
    };
  }
};

// Функция вывода данных

let outputFunc = (obj, place) => {
  place.style.display = "flex";
  place.innerHTML = `
  <span>Card number: ${obj.card}</span>
  <span>Correct: ${obj.correct}</span>
  <span>Payment system: ${obj.payment}</span>
  <span>Accepted: ${obj.accepted}</span>

  `;
};

// Главная функция, по порядку запускает функции
let mainFunc = (data) => {
  let cardNumber = processData(data);
  let check = checkNumberWithLune(cardNumber);
  let paymentSystem = compareCardInn(cardNumber);
  let object = createObject(cardNumber, check, paymentSystem);
  outputFunc(object, outputBox);
};

if (value !== null || value !== "") {
  mainFunc(value);
}
