// Questions Array
const questions = [{ question: "Enter Your Name" }];

// Transition Times
const shakeTime = 100; // Shake Transition Time
const switchTime = 200; // Transition Between Questions

// Init Position At First Question
let position = 0;

// Third element index
const availability = 2;

// Key taken sign
const keyTaken = "✖";
const keyAvailable = "✔";

// Init DOM Elements
const formBox = document.querySelector("#form-box");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const inputGroup = document.querySelector("#input-group");
const inputField = document.querySelector("#input-field");
const inputLabel = document.querySelector("#input-label");
const inputProgress = document.querySelector("#input-progress");
const progress = document.querySelector("#progress-bar");
const adminBtn = document.querySelector(".button1");
const submitBtn = document.querySelector(".button2");
const clickableButtons = document.querySelectorAll(".clickable");
let previousRow = null;

// EVENTS

// Get Question On DOM Load
document.addEventListener("DOMContentLoaded", getQuestion);

// FUNCTIONS

// Get Question From Array & Add To Markup
function getQuestion() {
  // Get Current Question
  inputLabel.innerHTML = questions[position].question;
  // Get Current Type
  inputField.type = questions[position].type || "text";
  // Get Current Answer
  inputField.value = questions[position].answer || "";
  // Focus On Element
  inputField.focus();

  // Set Progress Bar Width - Variable to the questions length
  progress.style.width = (position * 100) / questions.length + "%";

  // Add User Icon OR Back Arrow Depending On Question
  prevBtn.className = position ? "fas fa-arrow-left" : "fas fa-user";

  showQuestion();
}

// Display Question To User
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = "";
  inputProgress.style.width = "100%";
}

// Hide Question From User
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = "none";
  inputGroup.style.border = null;
}

// Transform To Create Shake Motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate Field
function validate() {
  // Make Sure Pattern Matches If There Is One
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// Field Input Fail
function inputFail() {
  formBox.className = "error";
}

// Field Input Passed
function inputPass() {
  formBox.className = "";
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Store Answer In Array
  questions[position].answer = inputField.value;

  // Increment Position
  position++;

  // If New Question, Hide Current and Get Next
  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove If No More Questions
    hideQuestion();
    formBox.className = "close";
    progress.style.width = "100%";
  }
}

// All Fields Complete - Show h1 end
function formComplete(admitKey) {
  const h1 = document.createElement("h1");
  h1.classList.add("end");
  if (admitKey) {
    h1.appendChild(
      document.createTextNode(
        `Thanks ${questions[0].answer}. You successfully took over a key!`
      )
    );
  } else {
    h1.appendChild(
      document.createTextNode(
        `Thanks ${questions[0].answer}. You successfully returned the key!`
      )
    );
  }
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
}

document.querySelector(".button2").onmousemove = function (e) {
  var x = e.pageX - e.target.offsetLeft;
  var y = e.pageY - e.target.offsetTop;

  e.target.style.setProperty("--x", x + "px");
  e.target.style.setProperty("--y", y + "px");
};

document.querySelector(".button").onmousemove = function (e) {
  var x = e.pageX - e.target.offsetLeft;
  var y = e.pageY - e.target.offsetTop;

  e.target.style.setProperty("--x", x + "px");
  e.target.style.setProperty("--y", y + "px");
};

document.getElementById("statsPageButton").onclick = function () {
  location.href = "stats";
};

adminBtn.onmousemove = function (e) {
  var x = e.pageX - e.target.offsetLeft;
  var y = e.pageY - e.target.offsetTop;

  e.target.style.setProperty("--x", x + "px");
  e.target.style.setProperty("--y", y + "px");
};

clickableButtons.forEach((clickable) => {
  clickable.addEventListener("click", function () {
    const collection = clickable.getElementsByTagName("td");
    if (previousRow !== null) {
      previousRow.style.backgroundColor = "";
      previousRow = null;
    }
    previousRow = clickable;
    if (collection[availability].innerHTML === keyTaken) {
      clickable.style.backgroundColor = "#FF5734"; // light-green
      return;
    }
    clickable.style.backgroundColor = "#90EE90"; //light-red 90EE90
  });
});

adminBtn.addEventListener("click", function () {
  const collection = previousRow.getElementsByTagName("td");

  // Check if name is filled
  validate();
  if (inputField.value.length < 1) {
    inputFail();
    alert("Name field must be filled!");
    // Repeat Shake Motion -  Set i to number of shakes
    for (let i = 0; i < 6; i++) {
      setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
      setTimeout(transform, shakeTime * 6, 0, 0);
      inputField.focus();
    }
    return;
  } else if (previousRow === null) {
    alert("No key was selected!");
    return;
  } else if (collection[availability].innerHTML !== keyAvailable) {
    alert("This key is not available!");
    return;
  }

  previousRow.style.backgroundColor = "";
  previousRow.getElementsByTagName("td")[availability].innerHTML = keyTaken;
  previousRow = null;

  // Form Complete
  formComplete(true);
});

submitBtn.addEventListener("click", function () {
  const collection = previousRow.getElementsByTagName("td");

  // Check if name is filled
  validate();
  if (inputField.value.length < 1) {
    inputFail();
    alert("Name field must be filled!");
    // Repeat Shake Motion -  Set i to number of shakes
    for (let i = 0; i < 6; i++) {
      setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
      setTimeout(transform, shakeTime * 6, 0, 0);
      inputField.focus();
    }
    return;
  } else if (previousRow === null) {
    alert("No key was selected!");
    return;
  } else if (collection[availability].innerHTML !== keyTaken) {
    alert("This key is not taken!");
    return;
  }

  previousRow.style.backgroundColor = "";
  previousRow.getElementsByTagName("td")[availability].innerHTML = keyAvailable;
  previousRow = null;
  formComplete(false);
});
