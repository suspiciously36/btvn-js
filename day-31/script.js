"use strict";

const btn = document.querySelector(".btn");
const counterEl = document.querySelector(".counter");

let timer = 31;
let startTime = 0;

const decreaser = () => {
  timer--;
  counterEl.textContent = timer;
};

const rePaint = (currentTime) => {
  if (startTime <= currentTime) {
    decreaser();
    startTime = currentTime + 1000;
  }

  if (timer > 0) {
    requestAnimationFrame(rePaint);
  } else {
    btn.removeAttribute("disabled");
    btn.classList.add("pointer");
    btn.addEventListener("click", () => {
      window.location.href = "https://fullstack.edu.vn/";
      btn.classList.add("hover-opacity");
    });
  }
};

window.requestAnimationFrame(rePaint);
