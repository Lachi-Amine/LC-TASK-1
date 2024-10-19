const terms = [
    { term: "MAC Address", definition: "A unique identifier assigned to network interfaces for communications." },
    { term: "IP Address", definition: "A numerical label assigned to each device connected to a computer network." },
    { term: "Django", definition: "A high-level Python web framework that encourages rapid development." },
    { term: "HTTP", definition: "The foundation of data communication on the web, defining how messages are formatted and transmitted." },
    { term: "Cache", definition: "A hardware or software component that stores data so future requests can be served faster." },
    { term: "Firewall", definition: "A network security system that monitors and controls incoming and outgoing network traffic." },
    { term: "Algorithm", definition: "A step-by-step procedure or formula for solving a problem." },
    { term: "Cloud Computing", definition: "The delivery of computing services over the internet, including storage, servers, and databases." },
    { term: "Encryption", definition: "The process of converting data into a code to prevent unauthorized access." },
    { term: "Proxy Server", definition: "An intermediary server separating end users from the websites they browse." },
    { term: "DNS", definition: "The system that translates domain names to IP addresses so browsers can load websites." },
    { term: "TCP/IP", definition: "A suite of communication protocols used to interconnect network devices on the internet." }
];

let currentDefinitionIndex = 0;
let correctAnswers = 0;
let shuffledTerms = [];

// Shuffle the terms array to randomize the order of the questions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Start the game with shuffled terms
function startGame() {
    shuffleArray(terms);
    loadNextQuestion();
}

// Load the next random question
function loadNextQuestion() {
    if (currentDefinitionIndex >= terms.length) {
        document.getElementById('definition').textContent = "Game Over!";
        document.getElementById('options-container').innerHTML = '';
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('result').textContent = `Your total score: ${correctAnswers} out of ${terms.length}`;
        return;
    }

    const currentDefinition = terms[currentDefinitionIndex].definition;
    document.getElementById('definition').textContent = currentDefinition;

    shuffledTerms = [...terms];
    shuffleArray(shuffledTerms);

    // Get the correct term and two incorrect terms for the options
    const correctTerm = terms[currentDefinitionIndex].term;
    const incorrectTerms = shuffledTerms.filter(item => item.term !== correctTerm).slice(0, 2);
    const options = [correctTerm, ...incorrectTerms.map(item => item.term)];
    shuffleArray(options);  // Shuffle the correct and incorrect terms

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    options.forEach((term) => {
        const button = document.createElement('button');
        button.textContent = term;
        button.classList.add('btn', 'btn-outline-primary', 'btn-block');
        button.addEventListener('click', () => checkAnswer(term));
        optionsContainer.appendChild(button);
    });

    document.getElementById('result').textContent = '';
    document.getElementById('next-btn').disabled = true;
    document.getElementById('score').textContent = `Correct answers: ${correctAnswers} / ${terms.length}`;
}

function checkAnswer(selectedTerm) {
    const correctTerm = terms[currentDefinitionIndex].term;
    const result = document.getElementById('result');

    if (selectedTerm === correctTerm) {
        result.textContent = 'Correct!';
        result.style.color = 'green';
        correctAnswers++;
        document.getElementById('next-btn').disabled = false;
    } else {
        result.textContent = 'Incorrect! Try again.';
        result.style.color = 'red';
    }
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentDefinitionIndex++;
    loadNextQuestion();
});

window.onload = startGame;
