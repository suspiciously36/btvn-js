import React, { useState } from "react";
import Heart from "react-heart";
import SearchTodo from "./SearchTodo";
import { toast } from "react-toastify";

export default function AddNewTodo({ addNew }) {
  const [text, setText] = useState("");
  const [placeHolder, setPlaceHolder] = useState(
    "Press Heart Button to add..."
  );
  const [active, setActive] = useState(false);

  const onAddClick = () => {
    addNew(text);
    setText("");
    setActive(!active);
    setPlaceHolder("Press Heart Button to add...");
  };

  const switchToSearch = () => {
    setPlaceHolder("Type keyword to search...");
    toast("🦄 Switch to search mode!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlaceHolder("Press Heart Button to add...");
    addNew(text);
    setText("");
    setActive(!active);
  };

  return (
    <div className="big-container">
      <form className="container" onSubmit={handleSubmit}>
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
            placeholder={placeHolder}
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
      </form>
      <SearchTodo switchToSearch={switchToSearch} />
    </div>
  );
}
