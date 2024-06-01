// script.js
const eventDate = new Date('2024-06-15T10:00:00'); // Example event date

function updateCountdown() {
    const now = new Date();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('countdown').textContent = `${days} days ${hours} hours ${minutes} minutes`;
}

setInterval(updateCountdown, 1000);
