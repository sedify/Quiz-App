// submit candidate's details
const form = document.querySelector('#myForm');
let username = '';
let index = '';

form.addEventListener('submit', function(e) {
  e.preventDefault(); // prevent form from submitting normally
  
  // get form data
  const formData = new FormData(form);
  
  // call another function and pass form data as parameter
  processCandidate(formData);

  // clear form after submission
  form.reset();

  // set `form` and the `quizContainer` div to disappear
  form.style.display = 'none';
  quizContainer.classList.remove("disappear");

});

// define function to send user details to the backend for processing
function processCandidate(formData) {
  // assign values to the defined variables 'username' and 'index' respectively...
  username = formData.get('name');
  index = formData.get('index');
}

// Initialize Timer
const startingMinutes = 5; // Change this to set the starting time in minutes
let time = startingMinutes * 60;  // recalibrate time in minutes to seconds for countdown
const countdownEl = document.getElementById('timer');

// define function to update the countdown in real-time
function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  countdownEl.innerHTML = `${minutes}:${seconds}`;
  time--;
  if (time < 0) {
    clearInterval(countdown);
    endQuiz();
  }
}

let countdown;

// store all shuffled questions here
let shuffledQuestions = [];

// define all questions and answers
const questions = [
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'London', correct: false },
      { text: 'Madrid', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Berlin', correct: false }
    ]
  },
  {
    question: 'What is the largest country in the world?',
    answers: [
      { text: 'Russia', correct: true },
      { text: 'Canada', correct: false },
      { text: 'China', correct: false },
      { text: 'USA', correct: false }
    ]
  },
  {
    question: 'What is the smallest country in the world?',
    answers: [
      { text: 'Vatican City', correct: true },
      { text: 'Monaco', correct: false },
      { text: 'Liechtenstein', correct: false },
      { text: 'San Marino', correct: false }
    ]
  },
  {
    question: 'What is the currency used in Japan?',
    answers: [
      { text: 'Yuan', correct: false },
      { text: 'Yen', correct: true },
      { text: 'Won', correct: false },
      { text: 'Dollar', correct: false }
    ]
  },
  {
    question: 'What is the largest planet in our solar system?',
    answers: [
      { text: 'Jupiter', correct: true },
      { text: 'Saturn', correct: false },
      { text: 'Neptune', correct: false },
      { text: 'Mars', correct: false }
    ]
  },
  {
    question: 'What is the capital of Nigeria?',
    answers: [
      { text: 'Lagos', correct: false },
      { text: 'Kano', correct: false },
      { text: 'Abuja', correct: true },
      { text: 'Ibadan', correct: false }
    ]
  },
  {
    question: 'What is the currency of Brazil?',
    answers: [
      { text: 'Pound', correct: false },
      { text: 'Dollar', correct: false },
      { text: 'Real', correct: true },
      { text: 'Euro', correct: false }
    ]
  },
  {
    question: 'What is the highest mountain in the world?',
    answers: [
      { text: 'Everest', correct: true },
      { text: 'Kilimanjaro', correct: false },
      { text: 'Denali', correct: false },
      { text: 'Elbrus', correct: false }
    ]
  },
  {
    question: 'What is the capital of South Korea?',
    answers: [
      { text: 'Busan', correct: false },
      { text: 'Seoul', correct: true },
      { text: 'Daegu', correct: false },
      { text: 'Incheon', correct: false }
    ]
  },
  {
    question: 'What is the largest continent in the world?',
    answers: [
      { text: 'Asia', correct: true },
      { text: 'Europe', correct: false },
      { text: 'Africa', correct: false },
      { text: 'North America', correct: false }
    ]
  },
  {
    question: 'What is the name of the longest river in Africa?',
    answers: [
      { text: 'Amazon', correct: false },
      { text: 'Mississippi', correct: false },
      { text: 'Nile', correct: true },
      { text: 'Yangtze', correct: false }
    ]
  },
  {
    question: 'What is the smallest continent in the world?',
    answers: [
      { text: 'Europe', correct: false },
      { text: 'Asia', correct: false },
      { text: 'Africa', correct: false },
      { text: 'Australia', correct: true }
    ]
  },
  {
    question: 'Who wrote the famous novel "To Kill a Mockingbird"?',
    answers: [
      { text: 'F. Scott Fitzgerald', correct: false },
      { text: 'Harper Lee', correct: true },
      { text: 'Ernest Hemingway', correct: false },
      { text: 'Mark Twain', correct: false }
    ]
  }
];

// define function to shuffle questions in the array using the Yetes' Algorithm
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

// Implement Score
let score = 0;
const scoreEl = document.getElementById('score');
const userName = document.getElementById('user_name');

// define function to update score as the candidate progress
function updateScore() {
  score++;
  scoreEl.innerHTML = Math.round((score / questions.length) * 100) + "%";
}

// Design Pie Chart using the chart.js library.
const alertCard = document.querySelector('#alert-card');
const chartCanvas = document.querySelector('#chart');

const chart = new Chart(chartCanvas, {
  type: 'pie',
  data: {
    labels: ['Correct', 'Incorrect'],
    datasets: [{
      data: [0, 0],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 99, 132)'
      ]
    }]
  },
  options: {
    responsive: true
  }
});

// Now the Quiz Section
const questionEl = document.getElementById('question');
const answerBtnsEl = document.getElementById('answer-buttons');
const startBtn = document.getElementById('start-button');
const nextBtn = document.getElementById('next-button');

let currentQuestionIndex;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

// define function that is triggered after the user has clicked on start
function startQuiz() {
  shuffleQuestions();
  shuffledQuestions = [...questions]; // create a new array with the shuffled questions

  currentQuestionIndex = 0;
  score = 0;
  scoreEl.innerHTML = Math.round((score / questions.length) * 100);
  time = startingMinutes * 60;
  countdown = setInterval(updateCountdown, 1000);
  startBtn.style.display = 'none';
  nextBtn.style.display = 'block';
  setNextQuestion();
}

// when the next button is clicked
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// populate the questions in the 'questions' array unto the frontend
function showQuestion(question) {
  questionEl.innerHTML = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('answer-button');

    // perform validation on how correct the answer is
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerBtnsEl.appendChild(button);
  });
}

// reset
function resetState() {
  nextBtn.style.display = 'none';
  while (answerBtnsEl.firstChild) {
    answerBtnsEl.removeChild(answerBtnsEl.firstChild);
  }
}

// after answer is selected, both the chart and score is updated till the questions are exhausted
function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct;
  if (correct) {
    updateScore();
    chart.data.datasets[0].data[0]++;
    chart.update();
  } else {
    chart.data.datasets[0].data[1]++;
    chart.update();
  }

  Array.from(answerBtnsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });

  if (currentQuestionIndex < shuffledQuestions.length - 1) {
    nextBtn.style.display = 'inline-block';
  } else {
    endQuiz();
  }
}

// check if answer is correct or wrong
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('incorrect');
  }
}

// clear status including colors
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('incorrect');
}

const playAgain = document.getElementById('play-again');
const quizContainer = document.getElementById('quiz-container');

// trigger this function after the questions are exhausted or the time elasped
function endQuiz() {
  shuffledQuestions = [];
  // stop timer
  clearInterval(countdown);
  resetState();

  // do something with the username and index number
  // console.log(username, index);
  userName.innerHTML = username;

  questionEl.innerHTML = `
    <div id="question-container">
      <p id="question"></p>
      <ul id="answer-buttons">
        <li><button class="answer-button"></button></li>
        <li><button class="answer-button"></button></li>
        <li><button class="answer-button"></button></li>
        <li><button class="answer-button"></button></li>
      </ul>
    </div>
  `;
  // chartContainer.style.display = 'block';

  // Display the alert card
  quizContainer.classList.add("disappear");
  alertCard.classList.remove("dot");

  // Display the updated chart on the alert div
  playAgain.addEventListener('click', retryQuiz);
}

// after the retry button on the alert "Congratulatory" Card is clicked
function retryQuiz() {
  // make the alert card disappear to the background
  alertCard.classList.add("dot");
  
  // display the start button to begin Quiz
  startBtn.style.display = 'inline-block';

  // display the form to receive the details of another candidate
  form.style.display = 'block';

  // display the working area of the quiz
  quizContainer.classList.add("disappear");
}