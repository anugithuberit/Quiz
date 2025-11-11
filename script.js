const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "High Tech Modern Language",
            "HyperTransfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        correct: 1
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        options: [
            "<break>",
            "<lb>",
            "<br>",
            "<line>"
        ],
        correct: 2
    },
    {
        question: "Which attribute is used to provide alternative text for an image?",
        options: [
            "title",
            "src",
            "alt",
            "href"
        ],
        correct: 2
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 2
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "text-style"
        ],
        correct: 2
    },
    {
        question: "How do you select an element with id 'demo' in CSS?",
        options: [
            ".demo",
            "#demo",
            "demo",
            "*demo"
        ],
        correct: 1
    },
    {
        question: "Which CSS property is used to add space between elements?",
        options: [
            "spacing",
            "margin",
            "padding",
            "gap"
        ],
        correct: 1
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: [
            "var colors = (1:'red', 2:'green', 3:'blue')",
            "var colors = 'red', 'green', 'blue'",
            "var colors = ['red', 'green', 'blue']",
            "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"
        ],
        correct: 2
    },
    {
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        options: [
            "append()",
            "push()",
            "add()",
            "insert()"
        ],
        correct: 1
    },
    {
        question: "How do you write a comment in JavaScript?",
        options: [
            "// This is a comment",
            "<!-- This is a comment -->",
            "/* This is a comment */",
            "Both A and C"
        ],
        correct: 3
    },
    {
        question: "Which HTML5 semantic element is used for navigation links?",
        options: [
            "<nav>",
            "<navigation>",
            "<menu>",
            "<links>"
        ],
        correct: 0
    },
    {
        question: "What is the purpose of the <meta> tag in HTML?",
        options: [
            "To display metadata on the page",
            "To provide metadata about the document",
            "To create a table",
            "To link external stylesheets"
        ],
        correct: 1
    },
    {
        question: "Which CSS property is used to make text bold?",
        options: [
            "font-weight",
            "font-style",
            "text-weight",
            "bold"
        ],
        correct: 0
    },
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        options: [
            "<script href='script.js'>",
            "<script name='script.js'>",
            "<script src='script.js'>",
            "<script file='script.js'>"
        ],
        correct: 2
    },
    {
        question: "Which JavaScript method is used to select an element by its ID?",
        options: [
            "getElementById()",
            "getElementsById()",
            "selectById()",
            "findById()"
        ],
        correct: 0
    },
    {
        question: "What is the purpose of the CSS flexbox display property?",
        options: [
            "To create flexible layouts",
            "To make text flex",
            "To create animations",
            "To hide elements"
        ],
        correct: 0
    },
    {
        question: "Which HTML tag is used to define an unordered list?",
        options: [
            "<list>",
            "<ul>",
            "<ol>",
            "<li>"
        ],
        correct: 1
    },
    {
        question: "What does 'DOM' stand for in JavaScript?",
        options: [
            "Document Object Model",
            "Data Object Model",
            "Display Object Model",
            "Dynamic Object Method"
        ],
        correct: 0
    },
    {
        question: "Which CSS property is used to change the background color?",
        options: [
            "bg-color",
            "background-color",
            "color-background",
            "back-color"
        ],
        correct: 1
    }
];

// Quiz State
let currentQuestion = 0;
let userAnswers = new Array(quizQuestions.length).fill(null);
let userName = '';
let userEmail = '';

// DOM Elements
const registrationForm = document.getElementById('registrationForm');
const quizContainer = document.getElementById('quizContainer');
const resultsContainer = document.getElementById('resultsContainer');
const userForm = document.getElementById('userForm');
const displayName = document.getElementById('displayName');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const currentQuestionNum = document.getElementById('currentQuestionNum');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const finalScore = document.getElementById('finalScore');
const percentage = document.getElementById('percentage');
const downloadBtn = document.getElementById('downloadBtn');
const downloadMessage = document.getElementById('downloadMessage');

// Initialize Quiz
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userName = document.getElementById('userName').value.trim();
    userEmail = document.getElementById('userEmail').value.trim();
    
    if (userName && userEmail) {
        displayName.textContent = `Welcome, ${userName}!`;
        registrationForm.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        loadQuestion();
    }
});

// Load Question
function loadQuestion() {
    currentQuestionNum.textContent = currentQuestion + 1;
    const question = quizQuestions[currentQuestion];
    
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        if (userAnswers[currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'option';
        radio.value = index;
        radio.checked = userAnswers[currentQuestion] === index;
        
        const label = document.createElement('label');
        label.textContent = option;
        label.style.cursor = 'pointer';
        
        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        
        optionDiv.addEventListener('click', () => {
            selectOption(index);
        });
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update button states
    prevBtn.disabled = currentQuestion === 0;
    
    if (currentQuestion === quizQuestions.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

// Select Option
function selectOption(index) {
    userAnswers[currentQuestion] = index;
    loadQuestion();
}

// Previous Button
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});

// Next Button
nextBtn.addEventListener('click', () => {
    if (userAnswers[currentQuestion] === null) {
        alert('Please select an answer before proceeding to the next question!');
        return;
    }
    
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
});

// Submit Button
submitBtn.addEventListener('click', () => {
    if (userAnswers[currentQuestion] === null) {
        alert('Please select an answer before submitting the quiz!');
        return;
    }
    
    calculateScore();
    showResults();
});

// Calculate Score
function calculateScore() {
    let score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correct) {
            score++;
        }
    });
    
    const scorePercentage = Math.round((score / quizQuestions.length) * 100);
    finalScore.textContent = score;
    percentage.textContent = scorePercentage;
}

// Show Results
function showResults() {
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
}

// Download Score Card
downloadBtn.addEventListener('click', () => {
    const score = parseInt(finalScore.textContent);
    const scorePercentage = parseInt(percentage.textContent);
    
    // Create score card content
    let scoreCard = `
╔═══════════════════════════════════════════════════╗
║           WEB TECHNOLOGIES QUIZ - SCORE CARD      ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║  Candidate Name: ${userName.padEnd(35)}║
║  Email Address: ${userEmail.padEnd(36)}║
║                                                   ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║  Total Questions: 20                              ║
║  Correct Answers: ${score.toString().padEnd(37)}║
║  Score Percentage: ${scorePercentage.toString().padEnd(31)}%║
║                                                   ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║  DETAILED RESULTS:                                ║
║                                                   ║
`;
    
    quizQuestions.forEach((q, index) => {
        const isCorrect = userAnswers[index] === q.correct;
        const status = isCorrect ? '✓ Correct' : '✗ Incorrect';
        const userAnswer = q.options[userAnswers[index]] || 'Not Answered';
        const correctAnswer = q.options[q.correct];
        
        scoreCard += `║  Q${(index + 1).toString().padStart(2)}: ${status.padEnd(40)}║\n`;
        if (!isCorrect) {
            scoreCard += `║      Your Answer: ${userAnswer.substring(0, 35).padEnd(35)}║\n`;
            scoreCard += `║      Correct Answer: ${correctAnswer.substring(0, 33).padEnd(33)}║\n`;
        }
        scoreCard += `║                                                   ║\n`;
    });
    
    scoreCard += `╚═══════════════════════════════════════════════════╝
    
Generated on: ${new Date().toLocaleString()}
`;
    
    // Create blob and download
    const blob = new Blob([scoreCard], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${userName}_Quiz_ScoreCard.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show download message
    downloadMessage.textContent = '✓ Score card downloaded successfully!';
    downloadMessage.classList.remove('hidden');
    
    setTimeout(() => {
        downloadMessage.classList.add('hidden');
    }, 5000);
});
