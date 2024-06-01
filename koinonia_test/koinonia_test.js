const targetDate = new Date("2024-12-31T23:59:59").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = `${days}d`;
    document.getElementById("hours").textContent = `${hours}h`;
    document.getElementById("minutes").textContent = `${minutes}m`;
    document.getElementById("seconds").textContent = `${seconds}s`;
}

setInterval(updateCountdown, 1000);