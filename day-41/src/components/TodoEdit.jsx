import React, { useState } from "react";
import { toast } from "react-toastify";

export default function TodoEdit({
  todo,
  isCompleted,
  onConfirm,
  onCancel,
  onDelete,
}) {
  const [todoText, setTodoText] = useState(todo);
  const [isChecked, setChecked] = useState(isCompleted);

  const onOkClick = () => {
    toast("🦄 Updated Todo!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    onConfirm({ todo: todoText, isCompleted: isChecked });
  };
  const onCheckClick = () => {
    setChecked(!isChecked);
  };

  return (
    <div className={isChecked ? "completed-edit-todo" : ""}>
      <div className="todo-innerContentEdit">
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <label htmlFor="completed">
          Completed
          <input
            type="checkbox"
            id="completed"
            checked={isChecked}
            onChange={onCheckClick}
          />
        </label>
      </div>

      <div className="todo-innerButtons">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onOkClick}>Update</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
