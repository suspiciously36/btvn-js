import React, { useState } from "react";
import TodoEdit from "./TodoEdit";

export default function TodoList({ list, onDeleteTodo, onEditTodo }) {
  const [editingId, setEditingId] = useState(null);
  const onConfirmEdit = (changes) => {
    onEditTodo({
      ...changes,
      id: editingId,
    });
    setEditingId(null);
  };
  const linkPattern =
    /(http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?)/gi;
  return (
    <div>
      {list.map(({ _id, todo, isCompleted }) =>
        _id === editingId ? (
          <div className="todo-container center" id="cloud" key={_id}>
            <TodoEdit
              key={_id}
              todo={todo}
              isCompleted={isCompleted}
              onConfirm={onConfirmEdit}
              onCancel={() => setEditingId(null)}
              onDelete={() => onDeleteTodo(_id)}
            />
          </div>
        ) : (
          <div key={_id} className="todo-container center" id="cloud">
            <div className={isCompleted ? "completed-todo" : ""}>
              <div className="todo-innerContent">
                {todo.match(linkPattern) ? (
                  <a
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
                  >
                    Click here!!!
                  </a>
                ) : (
                  todo
                )}
              </div>
              <div className="todo-innerButtons">
                <button onClick={() => onDeleteTodo(_id)}>Delete</button>
                <button onClick={() => setEditingId(_id)}>Edit</button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
