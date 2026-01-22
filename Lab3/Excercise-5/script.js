// 1. Temporary storage for user input
let formData = {
    username: "",
    email: "",
    password: ""
};

let currentStage = 1;
const totalStages = 4;

// DOM Elements
const stages = document.querySelectorAll('.form-stage');
const progressBar = document.getElementById('progress-bar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('multiStageForm');

// 2. Navigation Control
nextBtn.addEventListener('click', () => {
    if (validateCurrentStage()) {
        saveData();
        if (currentStage < totalStages) {
            currentStage++;
            updateUI();
        }
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStage > 1) {
        currentStage--;
        updateUI();
    }
});

// 3. Validation Logic per Stage
function validateCurrentStage() {
    const errorMsg = document.getElementById(`err-${currentStage}`);
    if (errorMsg) errorMsg.textContent = ""; // Reset error

    if (currentStage === 1) {
        const val = document.getElementById('username').value;
        if (val.length < 5) {
            errorMsg.textContent = "Username must be at least 5 characters.";
            return false;
        }
    } 
    else if (currentStage === 2) {
        const val = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
            errorMsg.textContent = "Please enter a valid email address.";
            return false;
        }
    } 
    else if (currentStage === 3) {
        const val = document.getElementById('password').value;
        if (val.length < 8) {
            errorMsg.textContent = "Password must be at least 8 characters.";
            return false;
        }
    }
    return true;
}

// 4. Temporary Data Storage
function saveData() {
    if (currentStage === 1) formData.username = document.getElementById('username').value;
    if (currentStage === 2) formData.email = document.getElementById('email').value;
    if (currentStage === 3) formData.password = document.getElementById('password').value;
    
    // Populate summary for Stage 4
    if (currentStage === 3) {
        document.getElementById('summary').innerHTML = `
            <p><strong>Username:</strong> ${formData.username}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
        `;
    }
}

// 5. DOM Manipulation: Show/Hide Stages and Update Progress
function updateUI() {
    // Toggle Stage Visibility
    stages.forEach(stage => {
        stage.classList.toggle('active', parseInt(stage.dataset.stage) === currentStage);
    });

    // Update Progress Bar
    const progressPercent = (currentStage / totalStages) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Button Visibility Logic
    prevBtn.disabled = (currentStage === 1);
    
    if (currentStage === totalStages) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
}

// 6. Final Submission Prevention
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Form Submitted Successfully!\n" + JSON.stringify(formData, null, 2));
});