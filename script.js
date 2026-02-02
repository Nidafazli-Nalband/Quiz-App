const questions = [
  { q: "HTML stands for?", o: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Markup", "None"], a: 0 },
  { q: "CSS is used for?", o: ["Logic", "Styling", "Database", "Server"], a: 1 },
  { q: "JavaScript runs in?", o: ["Browser", "Compiler", "Database", "OS"], a: 0 },
];

// Duplicate to make 30 questions
while (questions.length < 30) {
  questions.push(...questions.slice(0, 30 - questions.length));
}

let index = 0;
let score = 0;
let time = 1200; // 20 minutes
let timerInterval;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

function startQuiz() {
  const name = studentName.value.trim();
  const usn = studentUSN.value.trim();

  if (!name || !usn) {
    alert("Enter Name and USN");
    return;
  }

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  startTimer();
  loadQuestion();
}

function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    const min = Math.floor(time / 60);
    const sec = time % 60;
    timer.innerText = `⏱ ${min}:${sec.toString().padStart(2, "0")}`;

    if (time <= 0) finishQuiz();
  }, 1000);
}

function loadQuestion() {
  const q = questions[index];
  question.innerText = q.q;
  currentQ.innerText = index + 1;
  progressFill.style.width = `${((index + 1) / 30) * 100}%`;

  options.innerHTML = "";
  q.o.forEach((opt, i) => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(i);
    options.appendChild(btn);
  });
}

function selectAnswer(choice) {
  if (choice === questions[index].a) score++;

  index++;
  if (index < 30) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  clearInterval(timerInterval);
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  resName.innerText = studentName.value;
  resUSN.innerText = studentUSN.value;
  resScore.innerText = score;
  resPercent.innerText = ((score / 30) * 100).toFixed(2);
}
