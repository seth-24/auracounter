let auraVotes = [];  // Store the votes

const moodSlider = document.getElementById('mood');
const moodValue = document.getElementById('mood-value');
const auraColor = document.getElementById('aura-color');
const auraHistory = document.getElementById('aura-history');
const averageVote = document.getElementById('average-vote');
const userVoteInput = document.getElementById('user-vote');

// Handle mood slider change
moodSlider.addEventListener('input', function () {
    moodValue.textContent = moodSlider.value;
    updateAuraColor(moodSlider.value);
});

function updateAuraColor(value) {
    // Change aura color based on mood value
    if (value < 30) {
        auraColor.style.backgroundColor = 'red';  // Low mood (angry, stressed)
    } else if (value < 60) {
        auraColor.style.backgroundColor = 'yellow';  // Neutral mood (calm, balanced)
    } else {
        auraColor.style.backgroundColor = 'green';  // High mood (happy, energetic)
    }
}

// Save aura to history (optional)
function saveAura() {
    const aura = {
        mood: moodSlider.value,
        color: auraColor.style.backgroundColor,
        date: new Date().toLocaleString()
    };

    const listItem = document.createElement('li');
    listItem.textContent = `Date: ${aura.date} - Mood: ${aura.mood} - Color: ${aura.color}`;
    auraHistory.appendChild(listItem);

    // Optionally, you could save this in localStorage for persistence
    localStorage.setItem('auraHistory', JSON.stringify(auraHistory.innerHTML));
}

// Load saved auras on page load (if any)
window.onload = () => {
    const savedAuraHistory = localStorage.getItem('auraHistory');
    if (savedAuraHistory) {
        auraHistory.innerHTML = savedAuraHistory;
    }
};

// Submit vote for aura
function submitVote() {
    const userVote = parseInt(userVoteInput.value);

    if (isNaN(userVote) || userVote < 1 || userVote > 5) {
        alert('Please enter a valid vote between 1 and 5.');
        return;
    }

    // Store the vote in the array
    auraVotes.push(userVote);

    // Update the average vote
    const totalVotes = auraVotes.reduce((acc, vote) => acc + vote, 0);
    const average = totalVotes / auraVotes.length;
    averageVote.textContent = average.toFixed(1);  // Display average with one decimal place

    // Optionally save the votes to localStorage
    localStorage.setItem('auraVotes', JSON.stringify(auraVotes));
}

// Load the stored votes on page load
window.onload = () => {
    const storedVotes = localStorage.getItem('auraVotes');
    if (storedVotes) {
        auraVotes = JSON.parse(storedVotes);
        const totalVotes = auraVotes.reduce((acc, vote) => acc + vote, 0);
        const average = totalVotes / auraVotes.length;
        averageVote.textContent = average.toFixed(1);  // Display average with one decimal place
    }
};
