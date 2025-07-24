// for questions
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "High-level Text Machine Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which tag is used to insert a line break in HTML?",
    options: ["<break>", "<br>", "<lb>", "<line>"],
    answer: "<br>",
  },
  {
    question: "Which attribute is used in HTML to open a link in a new tab?",
    options: ["new_tab", "target='_blank'", "href='_blank'", "open='new'"],
    answer: "target='_blank'",
  },
  {
    question: "Which property is used in CSS to change text color?",
    options: ["font-color", "text-color", "color", "text-style"],
    answer: "color",
  },
  {
    question: "How do you select an element with the id 'header' in CSS?",
    options: ["#header", ".header", "header", "*header"],
    answer: "#header",
  },
  {
    question: "Which CSS property makes text bold?",
    options: ["font-weight", "font-bold", "text-style", "weight"],
    answer: "font-weight",
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["v", "variable", "var", "int"],
    answer: "var",
  },
  {
    question: "What is the correct syntax for a function in JavaScript?",
    options: [
      "function:myFunc()",
      "function = myFunc()",
      "function myFunc()",
      "def myFunc()",
    ],
    answer: "function myFunc()",
  },
  {
    question: "Which method adds an element at the end of an array in JS?",
    options: ["push()", "add()", "append()", "insert()"],
    answer: "push()",
  },
  {
    question: "What will `typeof []` return in JavaScript?",
    options: ["array", "object", "list", "undefined"],
    answer: "object",
  },
  {
    question: "Which HTML tag is used to display an image?",
    options: ["<img>", "<image>", "<pic>", "<src>"],
    answer: "<img>",
  },
  {
    question: "What tag is used to create a hyperlink in HTML?",
    options: ["<link>", "<a>", "<href>", "<nav>"],
    answer: "<a>",
  },
  {
    question: "Which tag is used to make text bold?",
    options: ["<i>", "<strong>", "<b>", "<bold>"],
    answer: "<b>",
  },
  {
    question: "What does the <head> tag contain?",
    options: [
      "Visible page content",
      "Page title and metadata",
      "Footer content",
      "Header content",
    ],
    answer: "Page title and metadata",
  },

  // CSS Questions
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size",
  },
  {
    question: "How do you add background color in CSS?",
    options: [
      "background-color",
      "bgcolor",
      "color-background",
      "background-style",
    ],
    answer: "background-color",
  },
  {
    question: "Which selector selects all elements of a specific tag?",
    options: [".class", "#id", "tagname", "*"],
    answer: "tagname",
  },
  {
    question: "How to center a div horizontally using Flexbox?",
    options: [
      "justify-content: center;",
      "align-items: center;",
      "text-align: center;",
      "margin: auto;",
    ],
    answer: "justify-content: center;",
  },

  // JavaScript Questions
  {
    question: "What does JS stand for?",
    options: ["JavaStyle", "JustScript", "JavaScript", "JoinScript"],
    answer: "JavaScript",
  },
  {
    question: "Which method is used to print something in the console?",
    options: ["print()", "echo()", "log()", "console.log()"],
    answer: "console.log()",
  },
  {
    question: "How do you write an IF statement in JavaScript?",
    options: ["if i = 5", "if i == 5 then", "if (i == 5)", "if i = 5 then"],
    answer: "if (i == 5)",
  },
  {
    question: "What will `typeof []` return?",
    options: ["object", "array", "list", "undefined"],
    answer: "object",
  },
  {
    question: "Which symbol is used for comments in JS?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//",
  },
  {
    question: "Which function converts a string to an integer?",
    options: ["parseString()", "int()", "parseInt()", "convertToInt()"],
    answer: "parseInt()",
  },
  {
    question: "What is the result of `2 + '2'`?",
    options: ["4", "22", "NaN", "undefined"],
    answer: "22",
  },
  {
    question: "How to create an array in JavaScript?",
    options: ["let arr = {}", "let arr = []", "let arr = ()", "let arr = <>"],
    answer: "let arr = []",
  },
  {
    question: "Which method is used to add an item at the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()",
  },
];
// for quiz logic
let currentquestionindex = 0;
let score = 0;
let timer;
let timeLeft = 15;
let optionClicked = false;

// ========== DOM Elements ==========
const questionElement = document.querySelector(".question");
const optionElement = document.querySelector(".options");
const nextbutton = document.querySelector(".btn");
const scoreValue = document.querySelector(".score-value");
const scoreText = document.querySelector(".score");

// ========== Audio Elements ==========
const bgMusic = document.getElementById("bg-music");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

// ========== Start Quiz Function ==========
function startQuiz() {
  try {
    if (bgMusic.paused) {
      bgMusic.currentTime = 0;
      bgMusic
        .play()
        .catch((e) => console.log("Background music play failed:", e));
    }
  } catch (e) {
    console.log("Background music error:", e);
  }
  loadquestion();
  scoreValue.innerText = score;
}

// ========== Load Question ==========
function loadquestion() {
  clearInterval(timer); // stop any previous timer
  timeLeft = 15;
  document.querySelector(".time").innerText = timeLeft;
  nextbutton.innerText = "Next";
  optionClicked = false;

  const currentquestion = questions[currentquestionindex];
  questionElement.innerText = currentquestion.question;
  optionElement.innerHTML = "";

  currentquestion.options.forEach((option) => {
    const optionDiv = document.createElement("div");
    optionDiv.innerText = option;
    optionDiv.classList.add("option");

    optionDiv.addEventListener("click", () => {
      if (optionClicked) return;
      optionClicked = true;
      clearInterval(timer);

      const allOptions = document.querySelectorAll(".option");
      allOptions.forEach((o) => o.classList.add("disabled"));

      if (option === currentquestion.answer) {
        score++;

        optionDiv.classList.add("correct");
        playCorrectSound();
      } else {
        score = Math.max(0, score - 1);
        console.log(score);
        optionDiv.classList.add("incorrect");
        playWrongSound();
        allOptions.forEach((opt) => {
          if (opt.innerText === currentquestion.answer) {
            opt.classList.add("correct");
          }
        });
      }

      scoreValue.innerHTML = score;
    });

    optionElement.appendChild(optionDiv);
  });

  startTimer();
}

// ========== Timer ==========
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.querySelector(".time").innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      handleTimeout();
      autoSubmit();
    }
  }, 1000);
}

// ========== Auto Submit on Timeout ==========
function autoSubmit() {
  const currentquestion = questions[currentquestionindex];
  const allOptions = document.querySelectorAll(".option");

  allOptions.forEach((option) => {
    option.classList.add("disabled");
    if (option.innerText === currentquestion.answer) {
      option.classList.add("correct");
    }
  });
}

// ========== Timeout Penalty ==========
function handleTimeout() {
  score = Math.max(0, score - 1);
  scoreValue.innerText = score;
}

// ========== Button Logic ==========
nextbutton.addEventListener("click", () => {
  if (nextbutton.innerText === "Play again") {
    resetQuiz();
    startQuiz();
    return;
  }

  currentquestionindex++;

  if (currentquestionindex < questions.length) {
    startQuiz();
  } else {
    questionElement.innerText = `Quiz completed! Your score is ${score}/${questions.length}`;
    optionElement.innerHTML = "";
    nextbutton.innerText = "Play again";
    stopMusic();
  }
});

// ========== Audio Controls ==========
function playCorrectSound() {
  try {
    correctSound.currentTime = 0;
    correctSound.play().catch((e) => console.log("Audio play failed:", e));
  } catch (e) {
    console.log("Audio error:", e);
  }
}

function playWrongSound() {
  try {
    wrongSound.currentTime = 0;
    wrongSound.play().catch((e) => console.log("Audio play failed:", e));
  } catch (e) {
    console.log("Audio error:", e);
  }
}

function stopMusic() {
  bgMusic.pause();
  bgMusic.currentTime = 0;
}

function resetQuiz() {
  currentquestionindex = 0;
  score = 0;
  scoreValue.innerText = score;
  nextbutton.innerText = "Next";
  optionClicked = false;
  clearInterval(timer);

  try {
    bgMusic.currentTime = 0;
    bgMusic
      .play()
      .catch((e) => console.log("Background music play failed:", e));
  } catch (e) {
    console.log("Background music error:", e);
  }
}
