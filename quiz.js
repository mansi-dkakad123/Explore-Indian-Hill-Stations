const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");

let questions = [];
let currentQuestion = 0;
let score = 0;

async function fetchQuestions() {
  const res = await fetch("https://opentdb.com/api.php?amount=5&category=22&type=multiple");
  const data = await res.json();
  questions = data.results.map(q => {
    const options = [...q.incorrect_answers];
    const randomIndex = Math.floor(Math.random() * 4);
    options.splice(randomIndex, 0, q.correct_answer);
    return {
      question: q.question,
      options,
      correct: q.correct_answer
    };
  });
  displayQuestion();
}

function displayQuestion() {
  const q = questions[currentQuestion];
  questionEl.innerHTML = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    const li = document.createElement("li");
    li.innerHTML = option;
    li.onclick = () => checkAnswer(li, q.correct);
    optionsEl.appendChild(li);
  });
}

function checkAnswer(selected, correct) {
  const options = document.querySelectorAll("#options li");
  options.forEach(opt => opt.style.pointerEvents = "none");

  if (selected.innerHTML === correct) {
    selected.style.backgroundColor = "#90ee90"; // green
    score++;
  } else {
    selected.style.backgroundColor = "#ff7f7f"; // red
  }
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    showScore();
  }
};

function showScore() {
  questionEl.innerHTML = "Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  scoreEl.innerHTML = `Your Score: ${score} / ${questions.length}`;
}

fetchQuestions();
