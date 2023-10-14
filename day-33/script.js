"use strict";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "vi-VN";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const output = document.querySelector(".output");
const outputHope = document.querySelector(".output_hope");
const outputShow = document.querySelector(".output_show");

recognition.onresult = (event) => {
  let text = event.results[0][0].transcript.toLowerCase();

  let isSuccess = true;
  output.textContent = `You just said: ${text}`;

  switch (text) {
    case "youtube":
      window.open("https://youtube.com", "_blank");
      break;
    case "google":
      window.open("https://google.com", "_blank");
      break;
    case "facebook":
      window.open("https://facebook.com", "_blank");
      break;
    case "google drive":
      window.open("https://drive.google.com", "_blank");
      break;
    case "google maps":
    case "bản đồ":
      window.open("https://maps.google.com", "_blank");
      break;

    default:
      isSuccess = false;
      if (
        text.includes("chỉ đường") ||
        text.includes("tới") ||
        text.includes("đường tới") ||
        text.includes("chỉ đường tới")
      ) {
        text = text
          .replace(/.*?\b(đường|tới)\b\s*/, "")
          .split(" ")
          .join("+");

        window.open(`https://www.google.com/maps/search/${text}`, "_blank");
        isSuccess = true;
        break;
      }

      if (
        text.includes("bài hát") ||
        text.includes("mở bài hát") ||
        text.includes("nghe bài hát")
      ) {
        text = text
          .replace(/.*?\b(hát)\b\s*/, "")
          .split(" ")
          .join("+");

        window.open(`https://zingmp3.vn/tim-kiem/tat-ca?q=${text}`, "_blank");
        isSuccess = true;
        break;
      }

      if (
        text.includes("video") ||
        text.includes("mở video") ||
        text.includes("xem video")
      ) {
        text = text
          .replace(/.*?\b(video)\b\s*/, "")
          .split(" ")
          .join("+");

        window.open(
          `https://www.youtube.com/results?search_query=${text}`,
          "_blank"
        );
        isSuccess = true;
        break;
      }
  }

  outputHope.classList.remove("hidden");
  outputShow.classList.remove("hidden");

  if (isSuccess) {
    outputShow.innerHTML = `Processed! Searching for: ${text}`;
  } else {
    outputShow.innerHTML = `Failed! Try again.`;
  }
};

const btn = document.querySelector(".btn");
let recording = false;

const recordStarter = () => {
  recording = true;
  recognition.start();
  btn.innerHTML = `Listening to you, tap to stop`;
  output.classList.remove("hidden");
};

const recordEnder = () => {
  recording = false;
  recognition.stop();
  btn.innerHTML = `Tap here and say sumthin'`;
  output.classList.add("hidden");
  outputHope.classList.add("hidden");
  outputShow.classList.add("hidden");
};

const handleSpeechEnder = () => {
  recording = false;
  recognition.stop();
  btn.innerHTML = `Tap here and say sumthin'`;
};

btn.addEventListener("click", () => {
  if (!recording) {
    recordStarter();
  } else recordEnder();
});

recognition.onspeechend = () => {
  handleSpeechEnder();
};

recognition.onaudioend = () => {
  handleSpeechEnder();
};
