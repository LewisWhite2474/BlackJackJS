function main() {
    console.log("Main function called.");
    window.location.href = 'game.html';
}

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', main);
    }
});
