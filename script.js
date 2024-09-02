const elements = ['Earth', 'Fire', 'Wind', 'Water', 'Heart'];
const elementColors = {
    'Earth': '#8B4513',
    'Fire': '#FF4500',
    'Wind': '#87CEEB',
    'Water': '#1E90FF',
    'Heart': '#FF69B4'
};

let ecoPoints = 100;
let summonCount = 0;
let collectedElements = [];

const ecoPointsElement = document.getElementById('eco-points');
const summonCountElement = document.getElementById('summon-count');
const elementsContainer = document.getElementById('elements-container');
const summonBtn = document.getElementById('summon-btn');
const battleBtn = document.getElementById('battle-btn');
const messageElement = document.getElementById('message');

function updateStats() {
    ecoPointsElement.textContent = ecoPoints;
    summonCountElement.textContent = summonCount;
}

function displayElements() {
    elementsContainer.innerHTML = '';
    elements.forEach(element => {
        const elementDiv = document.createElement('div');
        elementDiv.className = 'element';
        elementDiv.style.backgroundColor = elementColors[element];
        elementDiv.textContent = collectedElements.includes(element) ? element[0] : '?';
        elementsContainer.appendChild(elementDiv);
    });
}

function summon() {
    if (ecoPoints >= 10) {
        ecoPoints -= 10;
        summonCount++;
        const summonedElement = elements[Math.floor(Math.random() * elements.length)];
        if (!collectedElements.includes(summonedElement)) {
            collectedElements.push(summonedElement);
        }
        updateStats();
        displayElements();
        messageElement.textContent = `You summoned ${summonedElement}!`;
        
        if (collectedElements.length === 5) {
            messageElement.textContent += " You've collected all elements! Captain Planet joins your team!";
        }
    } else {
        messageElement.textContent = "Not enough Eco-Points!";
    }
}

function battle() {
    const winChance = 0.5 + (collectedElements.length * 0.1);
    if (Math.random() < winChance) {
        const reward = 20 + (collectedElements.length * 5);
        ecoPoints += reward;
        messageElement.textContent = `You won the battle! Earned ${reward} Eco-Points.`;
        if (collectedElements.length === 5) {
            messageElement.textContent += " Captain Planet helped you!";
        }
    } else {
        messageElement.textContent = "You lost the battle. Try summoning more elements!";
    }
    updateStats();
}

summonBtn.addEventListener('click', summon);
battleBtn.addEventListener('click', battle);

displayElements();
updateStats();
