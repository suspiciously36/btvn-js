const sortableList = document.getElementById("sortable-list");
let draggedItem;

function handleDragStart(e) {
  draggedItem = e.target;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", draggedItem.innerHTML);
  e.target.style.opacity = "0.5";
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  const targetItem = e.target;
  if (
    targetItem !== draggedItem &&
    targetItem.classList.contains("list-item")
  ) {
    const boundingRect = targetItem.getBoundingClientRect();
    const offset = boundingRect.y + boundingRect.height / 2;

    if (
      targetItem !== draggedItem &&
      targetItem.classList.contains("list-item")
    ) {
      if (
        e.clientY >
        targetItem.getBoundingClientRect().top + targetItem.offsetHeight / 2
      ) {
        targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
      } else {
        targetItem.parentNode.insertBefore(draggedItem, targetItem);
      }
    }
  }
}

function handleDrop(e) {
  e.preventDefault();
  const targetItem = e.target;
  if (
    targetItem !== draggedItem &&
    targetItem.classList.contains("list-item")
  ) {
    if (
      e.clientY >
      targetItem.getBoundingClientRect().top + targetItem.offsetHeight / 2
    ) {
      targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
    } else {
      targetItem.parentNode.insertBefore(draggedItem, targetItem);
    }
  }
  targetItem.style.borderTop = "";
  targetItem.style.borderBottom = "";
  draggedItem.style.opacity = "";
  draggedItem = null;
  autoIndex(false);
}

const autoIndex = function (isFirstLoad) {
  const modules = [...document.querySelectorAll(".list-item.active")];
  modules.forEach((module, index) => {
    if (isFirstLoad) {
      module.innerHTML = `Module: <span>${index + 1}</span>: ${
        module.innerText
      }`;
    } else {
      module.children[0].innerText = index + 1;
    }
  });

  const items = [...document.querySelectorAll(".list-item:not(.active)")];
  items.forEach((item, index) => {
    if (isFirstLoad) {
      item.innerHTML = `Bài: <span>${index + 1}</span>: ${item.innerText} `;
    } else {
      item.children[0].innerText = index + 1;
    }
  });
};
autoIndex(true);

sortableList.addEventListener("dragstart", handleDragStart);
sortableList.addEventListener("dragover", handleDragOver);
sortableList.addEventListener("drop", handleDrop);
