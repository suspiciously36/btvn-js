import React, { useState } from "react";
import Heart from "react-heart";

export default function AddNewTodo({ addNew }) {
  const [text, setText] = useState("");
  const [active, setActive] = useState(false);

  const onAddClick = () => {
    addNew(text);
    setText("");
    setActive(!active);
  };

  return (
    <div className="container">
      <h1>Welcome to Todo App!</h1>
      <div className="input-heart">
        <input
          style={{
            minWidth: "333px",
            minHeight: "20px",
            padding: "6px",
          }}
          type="text"
          value={text}
          placeholder="Press Heart Button to add..."
          onChange={(e) => setText(e.target.value)}
        />
        {/* <button onClick={onAddClick}>Add</button> */}
        <div
          className="heart"
          style={{
            width: "25px",
            display: "inline-block",
            padding: "10px",
          }}
        >
          <Heart
            isActive={active}
            onClick={onAddClick}
            animationScale={1.2}
            animationTrigger="both"
            animationDuration={1.2}
            className={`customHeart${active ? "active" : ""}`}
          />
        </div>
      </div>
      <hr />
    </div>
  );
}
