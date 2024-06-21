var currentQuestionIndex = 0;
var score = 0;
var rounds = 0;

const question = document.getElementById("question");
const answer = document.getElementById("answer"); // Must be text input of some sort
const stats = document.getElementById("stats");

function newRound(reset=false) {
    rounds += 1;

    currentQuestionIndex = Math.floor(Math.random() * Object.keys(dictionary).length);
    // currentQuestionIndex = Date.now() % Object.keys(dictionary).length;
    
    answer.value = "";
    question.innerHTML = Object.values(dictionary)[currentQuestionIndex];
    stats.innerHTML = `${score} / ${rounds} (${(score / rounds * 100).toFixed(0)}%)`;

    if (reset) {
        rounds = 0;
        score = 0;
        stats.innerHTML = "";
    }
}

answer.addEventListener("keydown", e => {
    var ans = answer.value.trim();

    if (caseInsensitive) ans = ans.toLowerCase();

    if (e.key == "Enter") {
        if (ans in dictionary && dictionary[ans] == question.innerHTML) {
            score += 1;
            newRound();
        }
        else { // If wrong, show correct answer
            var correctAns = `<br>${question.innerHTML} = ${Object.keys(dictionary)[currentQuestionIndex]}`;
            newRound();
            stats.innerHTML += correctAns;
        }
    }
});

answer.focus();
answer.setAttribute('autocomplete', 'off')
answer.setAttribute('autocorrect', 'off')
answer.setAttribute('autocapitalize', 'off')
answer.setAttribute('spellcheck', false)
newRound(true);