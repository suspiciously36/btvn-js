// Selecting elements

const boldBtn = document.querySelector(".bold");
const underlineBtn = document.querySelector(".underline");
const italicBtn = document.querySelector(".italic");

const contentBox = document.querySelector(".content");
const title = document.querySelector("#title");

const colorPicker = document.querySelector("#color-picker");

const counter = document.querySelector(".counter");

const character = document.querySelector("#showCharacter");
const word = document.querySelector("#showCount");

// Functions

const getCount = () => {
  const text = contentBox.innerHTML;
  let count = 0;
  let split = text.split(" ");
  for (let i = 0; i < split.length; i++) {
    if (split[i] != "") {
      count++;
    }
  }
  word.innerHTML = count;
};

const getCharacter = function () {
  const count = contentBox.textContent.length;
  character.innerHTML = count;
};

colorPicker.addEventListener("input", function (e) {
  selectedObj = window.getSelection();
  let selection = window.getSelection().getRangeAt(0);
  let selectedText = selection.extractContents();
  let span = document.createElement("span");
  span.style.color = e.target.value;
  span.className = "selected-text";
  span.appendChild(selectedText);
  selection.insertNode(span);
});

contentBox.addEventListener("paste", function (e) {
  e.preventDefault();
  const text = (e || e.originalEvent).clipboardData.getData("text/plain");
  document.execCommand("insertHTML", false, text);
});

const downloadFileTxt = (value) => {
  if (value.value == "2") {
    const link = document.createElement("a");
    const content = contentBox.innerHTML;
    const file = new Blob([content], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = title.value;
    link.click();
    URL.revokeObjectURL(link.href);
  }
};

const downloadFilePdf = (value) => {
  if (value.value == "3") {
    const link = document.createElement("a");
    const content = contentBox.innerHTML;
    const file = new Blob([content], { type: "application/pdf" });
    link.href = URL.createObjectURL(file);
    link.download = title.value;
    link.click();
    URL.revokeObjectURL(link.href);
  }
};

const newFile = (value) => {
  if (value.value == "1") {
    contentBox.innerHTML = "";
    character.innerHTML = 0;
    word.innerHTML = 0;
  }
};
