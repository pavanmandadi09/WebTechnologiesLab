// Simple form validation
const form = document.getElementById("registrationForm");
const successBox = document.getElementById("successBox");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop form from submitting

    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const gmail = document.getElementById("gmail").value.trim();

    // Name
    if (name === "") {
        alert("Please enter your Name.");
        return;
    }

    // Roll number: 2 digits, 3 letters, 4 digits (e.g., 23BCE9456)
    const rollPattern = /^\d{2}[A-Za-z]{3}\d{4}$/;
    if (!rollPattern.test(roll)) {
        alert("Roll Number must be in the format 23BCE9456 (2 digits, 3 letters, 4 digits).");
        return;
    }

    // Mobile: 10 digits
    if (mobile === "" || isNaN(mobile) || mobile.length !== 10) {
        alert("Please enter a valid 10-digit Mobile Number.");
        return;
    }

    // Gmail pattern
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (gmail === "" || !gmailPattern.test(gmail)) {
        alert("Please enter a valid Gmail ID (example@gmail.com).");
        return;
    }

    // If everything is valid:
    // hide form, show success box with tick
    form.style.display = "none";
    successBox.style.display = "block";
});
