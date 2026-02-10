// DOM Elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');

// quiz questions

const quizQuestions = [
    {
        question: "What is my favorite color?",
        answers: [
            { text: "Black", correct: false },
            { text: "Pink", correct: false },
            { text: "Purple", correct: true },
            { text: "Green", correct: false },
        ],
    },
    {
        question: "Who is my husband?",
        answers: [
            { text: "Draco Malfoy", correct: false },
            { text: "Rafayel of LaDS", correct: false },
            { text: "Caleb of LaDS", correct: true },
            { text: "Jacks from OUABH", correct: false },
        ],
    },
    {
        question: "What's my favorite flavor of drink?",
        answers: [
            { text: "Strawberry", correct: false },
            { text: "Matcha", correct: true },
            { text: "Choco Hazelnut", correct: false },
            { text: "Mint Choco", correct: false },
        ],
    },
    {
        question: "What's my favorite book series?",
        answers: [
            { text: "Harry Potter by J.K. Rowling", correct: false },
            { text: "Heroes of Olympus by Rick Riordan", correct: false },
            { text: "School for Good and Evil by Soman Chainani", correct: false },
            { text: "Broken Heart Series by Stephanie Garber", correct: true },
        ],
    },
    {
        question: "What's my favorite manhwa?",
        answers: [
            { text: "Trapped", correct: true },
            { text: "Solo-leveling", correct: false },
            { text: "Infinite Gacha", correct: false },
            { text: "Iseop's Romance", correct: false },
        ],
    }
];

// quiz state vars

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    // rest vars
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%"

    questionText.textContent = currentQuestion.question

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        } else if(button === selectedButton) {
            button.classList.add("incorrect")
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion()
        } else {
            showResults()
        }
    }, 1000)
}

function showResults() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100

    if (percentage === 100) {
        resultMessage.textContent = "That's amazing pookie!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "That's close oof!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Ermm just a little more!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Are you serious...";
    } else {
        resultMessage.textContent = "You have to treat me for this...";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}