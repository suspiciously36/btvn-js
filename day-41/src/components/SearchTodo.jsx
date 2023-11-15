import React from "react";

export default function SearchTodo({ switchToSearch }) {
  return (
    <div>
      <button className="todo-search" onClick={switchToSearch}>
        Search Todo
      </button>
    </div>
  );
}
