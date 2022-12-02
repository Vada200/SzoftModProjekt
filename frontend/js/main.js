import { generateTables } from "./generateTables";
import { generateStatsTable } from "./statsPageQuery";
import { filterDatas } from "./statsPageQuery";

// Questions Array
const questions = [{ question: "Enter Your Name" }];

// Transition Times
const shakeTime = 100; // Shake Transition Time

// Init Position At First Question
let position = 0;

// Element indexes
const keyIdIndex = 1;
const availabilityIndex = 2;
const remoteAvailabilityIndex = 3;

// Key taken sign
const unavailableSign = "✖";
const availableSign = "✔";

// Init DOM Elements
const formBox = document.querySelector("#form-box");
const prevBtn = document.querySelector("#prev-btn");
const inputGroup = document.querySelector("#input-group");
const inputField = document.querySelector("#input-field");
const inputLabel = document.querySelector("#input-label");
const inputProgress = document.querySelector("#input-progress");
const progress = document.querySelector("#progress-bar");
const actionBtn = document.getElementById("action-btn");
const nameField = document.getElementById("input-field");
const filterBtn = document.getElementById("filter-btn");
let selectedRow = null;

// EVENTS

// Get Question On DOM Load
document.addEventListener("DOMContentLoaded", getQuestion);

// FUNCTIONS

// Get Question From Array & Add To Markup
function getQuestion() {
  // Get Current Question
  inputLabel.innerHTML = questions[position].question;
  // Get Current Answer
  inputField.value = questions[position]?.answer || "";
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
  inputGroup.style.opacity = "1";
  inputProgress.style.transition = "";
  inputProgress.style.width = "100%";
}

// Transform To Create Shake Motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Reverse validate Field
function reverseValidate() {
  // Make Sure Pattern Matches If There Is One
  if (inputField.value.length < 1) {
    reverseInputPass();
  } else {
    reverseInputFail();
  }
}

// Validate Field
function validate() {
  // Make Sure Pattern Matches If There Is One
  if (inputField.value.length < 1) {
    inputFail();
  } else {
    inputPass();
  }
}

// Field Reverse Input Fail
function reverseInputFail() {
  formBox.className = "error";
  formBox.className = "error";
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
  console.log("input fail");
  return;
}

// Field Input Fail
function inputFail() {
  formBox.className = "error";
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
  console.log("input fail");
  return;
}

// Field Reverse Input Passed
function reverseInputPass() {
  formBox.className = "";
  setTimeout(transform, 0, 0, 10);
  setTimeout(transform, shakeTime, 0, 0);
  $("#CommentModal").modal("toggle");
  console.log("reverse input pass");
}

// Field Input Passed
function inputPass() {
  formBox.className = "";
  setTimeout(transform, 0, 0, 10);
  setTimeout(transform, shakeTime, 0, 0);
  $("#CommentModal").modal("toggle");
}

// All Fields Complete - Show h1 end
function formComplete(admitKey) {
  const h1 = document.createElement("h1");
  h1.classList.add("end");
  if (admitKey) {
    // Check if name is filled
    validate();
    h1.appendChild(
      document.createTextNode(
        `Thanks ${inputField.value}. You successfully took over a key!`
      )
    );
  } else {
    h1.appendChild(
      document.createTextNode(
        `Thanks ${inputField.value}. You successfully returned the key!`
      )
    );
  }
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => (h1.style.opacity = "1"), 50);
  }, 1000);
}

//go to stats page (hide keys page)
$("#statsPageButton")
  .off("click")
  .on("click", function () {
    $(".keyscontainer").hide(100);
    $("#statsPageButton").hide(100);
    $("#keysPageButton").show(100);
    $(".statscontainer").show(100);
    $(".filter_tag").show(100);
  });

//go to keys page (hide stats page)
$("#keysPageButton")
  .off("click")
  .on("click", function () {
    $(".keyscontainer").show(100);
    $("#statsPageButton").show(100);
    $("#keysPageButton").hide(100);
    $(".statscontainer").hide(100);
    $(".filter_tag").hide(100);
  });

//generateStatsTable();

generateTables().then(() => {
  const clickableRows = document.querySelectorAll(".clickable");

  for (const clickable of clickableRows) {
    clickable.addEventListener("click", () => {
      if (selectedRow !== null) {
        selectedRow.style.backgroundColor = "";
        if (selectedRow === clickable) {
          selectedRow = null;
          return;
        }
        selectedRow = null;
      }

      const collection = clickable.getElementsByTagName("td");
      selectedRow = clickable;

      if (collection[availabilityIndex].innerHTML === unavailableSign) {
        clickable.style.backgroundColor = "#FF5734"; // light-red
        return;
      }

      clickable.style.backgroundColor = "#90EE90"; //light-green
    });
  }
});

$("#action-btn").on("mousemove", function (e) {
  const x = e.pageX - e.target.offsetLeft;
  const y = e.pageY - e.target.offsetTop;

  e.target.style.setProperty("--x", x + "px");
  e.target.style.setProperty("--y", y + "px");
}); /* 
  .on("click", function () {
    if ($("#input-field").val() !== "") {
      $("#CommentModal").modal("toggle");
    }
  }); */

$(".button").on("mousemove", function (e) {
  const x =
    e.pageX -
    e.target.offsetLeft -
    e.target.offsetParent.offsetParent.offsetLeft -
    e.target.offsetParent.offsetLeft;
  const y =
    e.pageY -
    e.target.offsetTop -
    e.target.offsetParent.offsetParent.offsetTop -
    e.target.offsetParent.offsetTop;

  e.target.style.setProperty("--x", x + "px");
  e.target.style.setProperty("--y", y + "px");
});

actionBtn.addEventListener("click", () => {
  if (selectedRow === null) {
    alert("No key was selected!");
    return;
  }


  const collection = selectedRow.getElementsByTagName("td");
  console.log(collection);

  if (collection[availabilityIndex].innerHTML === availableSign) {
    validate();
  }

  if (collection[availabilityIndex].innerHTML === unavailableSign) {
    reverseValidate();
    if (collection[remoteAvailabilityIndex].innerHTML === unavailableSign) {
      console.log(
        collection[remoteAvailabilityIndex].innerHTML === unavailableSign
      );
      document.getElementById(
        "commentModalTitle3"
      ).innerHTML = `Did you bring back the remote?
                    <label>
                       <input type="checkbox" id="remote-checkbox">
                   </label>`;
    } else {
      document.getElementById("commentModalTitle3").innerHTML =
        "The remote was not taken!";
    }
  } else if (collection[remoteAvailabilityIndex].innerHTML === availableSign) {
    document.getElementById(
      "commentModalTitle3"
    ).innerHTML = `Do you want to take the remote? 
                   <label>
                       <input type="checkbox" id="remote-checkbox">
                   </label>`;
  }
});

var generated = false;
document.getElementById("filter-btn").addEventListener("click", () => {
  if (!generated) {
  generated = true;
  generateStatsTable();
  }
  filterDatas();
  return;
});


document.getElementById("show-all-btn").addEventListener("click", () => {
  if (!generated) {
    generated = true;
  generateStatsTable();
  }
  return;
});

document.getElementById("submit-btn").addEventListener("click", () => {
  const actionType =
    selectedRow.getElementsByTagName("td")[availabilityIndex].innerHTML ===
    availableSign
      ? "take"
      : "give";

  handleDatabaseActions(actionType);

  selectedRow.style.backgroundColor = "";
  selectedRow = null;

  // Form Complete
  formComplete(true);
});

const handleDatabaseActions = (actionType) => {
  const collection = selectedRow.getElementsByTagName("td");

  const keyData = {
    keyAvailability:
      collection[availabilityIndex].innerHTML === unavailableSign,
    remoteAvailability: getRemoteAvailability(actionType),
    keyId: collection[keyIdIndex].innerHTML,
  };

  const actionData = {
    name: nameField.value,
    keyId: keyData.keyId,
    comment: document.getElementById("comment-textarea").value,
  };

  console.log(!document.getElementById("remote-checkbox")?.checked);
  console.log(actionType);
  console.log(keyData);
  console.log(actionData);

  postToAPI(keyData, "modifyKey").then(() => {
    if (actionType === "take") {
      postToAPI(actionData, "insertAction").then(() => {
        window.location.reload();
      });
    } else {
      postToAPI(actionData, "modifyAction").then(() => {
        window.location.reload();
      });
    }
  });
};

const getRemoteAvailability = (actionType) => {
  if ($("#remote-checkbox").length > 0) {
    return actionType === "take"
      ? !document.getElementById("remote-checkbox").checked
      : document.getElementById("remote-checkbox").checked;
  }
  return actionType !== "take";
};

const postToAPI = async (data, address) => {
  const response = await fetch(`/api/${address}`, {
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
  }).catch((err) => {
    console.log(err);
  });
  return response.json();
};
