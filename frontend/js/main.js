import { generateTables } from "./generateTables";

// Questions Array
const questions = [{ question: "Enter Your Name" }];

// Transition Times
const shakeTime = 100; // Shake Transition Time
const switchTime = 200; // Transition Between Questions

// Init Position At First Question
let position = 0;

// Element indexes
const floorIndex = 0;
const keyIdIndex = 1;
const availabilityIndex = 2;
const remoteAvailabilityIndex = 3;
const commentIndex = 4;

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
const adminBtn = document.getElementById("admit-btn");
const submitBtn = document.getElementById("submit-btn");
const nameField = document.getElementById("input-field");
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
  setTimeout(transform, 0, 0, 10);
  setTimeout(transform, shakeTime, 0, 0);

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

$(".button")
  .off("mousemove")
  .on("mousemove", function (e) {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;

    e.target.style.setProperty("--x", x + "px");
    e.target.style.setProperty("--y", y + "px");
  });

//go to stats page (hide keys page)
$("#statsPageButton")
  .off("click")
  .on("click", function () {
    $(".keyscontainer").hide(100);
    $("#statsPageButton").hide(100);
    $("#keysPageButton").show(100);
    $(".statscontainer").show(100);
  });

//go to keys page (hide stats page)
$("#keysPageButton")
  .off("click")
  .on("click", function () {
    $(".keyscontainer").show(100);
    $("#statsPageButton").show(100);
    $("#keysPageButton").hide(100);
    $(".statscontainer").hide(100);
  });

adminBtn.onmousemove = function (e) {
  const x = e.pageX - e.target.offsetLeft;
  const y = e.pageY - e.target.offsetTop;

  e.target.style.setProperty("--x", x + "px");
  e.target.style.setProperty("--y", y + "px");
};

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
  } else if (collection[availabilityIndex].innerHTML !== keyAvailable) {
    alert("This key is not available!");
    return;
  }

  handleDatabaseActions(collection, "admit");

  previousRow.style.backgroundColor = "";
  previousRow.getElementsByTagName("td")[availabilityIndex].innerHTML =
    keyTaken;

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
  } else if (collection[availabilityIndex].innerHTML !== keyTaken) {
    alert("This key is not taken!");
    return;
  }

  handleDatabaseActions(collection, "submit");

  previousRow.style.backgroundColor = "";
  previousRow.getElementsByTagName("td")[availabilityIndex].innerHTML =
    keyAvailable;

  formComplete(false);
});

const handleDatabaseActions = (collection, typeOfButton) => {
  const keyData = {
    keyAvailability: collection[availabilityIndex] === keyTaken,
    remoteAvailability: collection[remoteAvailabilityIndex].firstChild.checked,
    keyId: collection[keyIdIndex].innerHTML,
  };

  const actionData = {
    userEmail: nameField.value,
    keyId: keyData.keyId,
    actionType: typeOfButton,
    // TODO: Get comment value
    //comment: collection.nextSibling.firstChild.textContent,
    comment: null,
  };

  console.log(keyData);

  // TODO: Handle non-existent user email
  syncToDatabase(keyData).then((result) => {
    console.log(result);
    insertAction(actionData).then((res) => {
      console.log(res);
      previousRow = null;
    });
  });
};

const syncToDatabase = async (data) => {
  const response = await fetch("/api/modifyKey", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",

    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  }).catch((error) => {
    console.log("ERROR MODIFY:", error);
  });
  return response.json();
};

const insertAction = async (data) => {
  const response = await fetch("/api/insertAction", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",

    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  }).catch((error) => {
    console.log("ERROR INSERT:", error);
  });
  return response.json();
};

generateTables().then(() => {
  const clickableRows = document.querySelectorAll(".clickable");
  console.log(clickableRows);

  // TODO: Select multiple rows, deselect rows
  for (const clickable of clickableRows) {
    clickable.addEventListener("click", () => {
      const collection = clickable.getElementsByTagName("td");
      //const commentLine = clickable.nextSibling;
      if (previousRow !== null) {
        previousRow.style.backgroundColor = "";
        previousRow = null;
      }
      previousRow = clickable;
      if (collection[availabilityIndex].innerHTML === keyTaken) {
        clickable.style.backgroundColor = "#FF5734"; // light-green
        return;
      }
      clickable.style.backgroundColor = "#90EE90"; //light-red
    });
  }
});

