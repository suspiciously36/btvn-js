// import { client } from "./client.js";
// import { config } from "./config.js";

let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");

let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;
let displayNext;

// const getTotalQuestions = async function () {
//   const { response } = await client.get(`/questions?_page=1&_limit=1`);
//   return response.headers.get("x-total-count");
// };

// let totalQuestions = await getTotalQuestions();

// const getQuestions = async function () {
//   let id = Number(Math.floor(Math.random() * totalQuestions) + 1);
//   const { data: question } = await client.get(`/questions/${id - 1}`);
//   console.log(question);
//   return question;
// };

// await getQuestions();

// const getQ = async function () {
//   const { data: question } = await client.get(`/questions`);
//   return question;
// };

const serverApi = `https://p9shrn-8080.csb.app`;

const getQ = async function () {
  const res = await fetch(`${serverApi}/questions`);
  let data = await res.json();
  return data;
};

// let quizArray = [
//   {
//     id: "0",
//     question: "Ngày 25/10/2023 là thứ mấy?",
//     options: ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm"],
//     correct: "Thứ tư",
//   },
//   {
//     id: "1",
//     question: "Ngày 25/10/2023 là thứ mấy?",
//     options: ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm"],
//     correct: "Thứ tư",
//   },
// ];

let quizArray = async () => {
  quizArray = await getQ();
  return quizArray;
};

console.log(quizArray());

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    questionCount += 1;

    if (questionCount == quizArray.length) {
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      userScore.innerHTML =
        "Your Score is " + scoreCount + " out of " + questionCount;
    } else {
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question ";

      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");

  quizCards.forEach((card) => card.classList.add("hide"));
  quizCards[questionCount].classList.remove("hide");
};

function quizCreater() {
  quizArray.sort(() => Math.random() - 0.5);

  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);

    div.innerHTML += `
    <button class="option-div" onclick="check(this)">${i.options[0]}</button>
    <button class="option-div" onclick="check(this)">${i.options[1]}</button>
    <button class="option-div" onclick="check(this)">${i.options[2]}</button>
    <button class="option-div" onclick="check(this)">${i.options[3]}</button>`;

    quizContainer.appendChild(div);
  }
}

function check(userOption) {
  let userSolution = userOption.innerText;
  let question = document.querySelector(".container-mid")[questionCount];
  console.log(question);
  let options = question.querySelectorAll(".option-div");

  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");

    options.forEach((element) => {
      if ((element.innerText = quizArray[questionCount].correct)) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countdown);
  options.forEach((element) => {
    element.disabled = true;
  });
}

function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreater();
  quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

startScreen.classList.remove("hide");
displayContainer.classList.add("hide");
