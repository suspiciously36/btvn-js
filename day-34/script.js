"use strict";

const addBtn = document.querySelector(".add-btn");
const todosAdder = document.querySelector(".todos-adder");
const overlay = document.querySelector(".overlay");
const todoSearch = document.querySelector("#text");
const todoInput = document.querySelector("#adder");

const cancelBtn = document.querySelector(".cancel");
const saveBtn = document.querySelector(".save");

const deleterBtn = document.querySelector(".deleter");
const editerBtn = document.querySelector(".editer");
const checkerBtn = document.querySelector(".checker");

const todos = document.querySelector(".todos");

const righterIcon = document.querySelector(".righter-icon");

const dropdownBtn = document.querySelector(".drop-down_list");
const dropdownWrapper = document.querySelector(".drop-down_list__wrapper");

const serverApi = `http://localhost:3000`;

import axios from "axios";

function getTodosAPI() {
  return axios.get("/todos");
}

let todoTasks = [];

async function getTodos() {
  try {
    const res = await getTodosAPI();
    todoTasks = res.data;

    renderUI(todos);
  } catch (error) {
    console.log(error);
  }
}

getTodos();

function renderUI(arr) {
  // todos.innerHTML = "";

  if (arr.length === 0) {
    todos.innerHTML = "Không có việc gì làm.";
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    const t = arr[i];
    todos.innerHTML += `
    <span class="todos-content">${t.title}</span>
    <div class="right-icon">
      <i class="fa-solid fa-trash deleter"></i>
      <i class="fa-solid fa-pen-to-square editer"></i>
      <i class="fa-solid fa-check-to-slot checker"></i>
    </div>
  `;
  }
}

window.onload = () => {
  getTodos();
};

function createId() {
  return Math.floor(Math.random() * 100000);
}

function createTodoAPI(title) {
  return fetch(`${serverApi}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    id: createId(),
    title: title,
    status: false,
  });
}

async function createTodo(title) {
  try {
    const res = await createTodoAPI(title);
    console.log(res);
    console.log(todoTasks);
    todoTasks.push(`hihi`);

    renderUI(todos);
  } catch (error) {
    console.log(error);
  }
}

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let todoTitle = todoInput.value;
  if (todoTitle === "") {
    alert("Tiêu đề không để trống");
    return;
  }

  createTodo(todoTitle);
  todoInput.value = "";
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  todosAdder.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  todosAdder.classList.add("hidden");
  overlay.classList.add("hidden");
});

deleterBtn.addEventListener("click", (e) => {
  e.preventDefault();
  todos.classList.add("hidden");
});

const handleClickingOn = () => {
  dropdownBtn.style.backgroundColor = "green";
  righterIcon.style.rotate = "90deg";
  dropdownWrapper.classList.remove("hidden");
};

const handleClickingOff = () => {
  dropdownBtn.style.backgroundColor = "#666";
  righterIcon.style.rotate = "0deg";
  dropdownWrapper.classList.add("hidden");
};

dropdownBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (dropdownBtn.classList.contains("off")) {
    dropdownBtn.classList.remove("off");
    dropdownBtn.classList.add("on");
    handleClickingOn();
  } else if (dropdownBtn.classList.contains("on")) {
    dropdownBtn.classList.remove("on");
    dropdownBtn.classList.add("off");
    handleClickingOff();
  }
});

checkerBtn.addEventListener("click", () => {
  dropdownWrapper.appendChild(todos);
});
