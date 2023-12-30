import React, { memo, useEffect, useRef, useState } from "react";

import { Handle } from "reactflow";
import "./textUpdaterNode.css";

export default memo(({ data, isConnectable }) => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");
  const handleStyle = {
    border: "1px solid #fff",
    borderRadius: "2px",
    padding: "6px 11px",
    background: "blue",
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (data.isEditable) {
      inputRef.current.focus();
    }
  }, [data.isEditable]);

  return data.isFatherNode ? (
    <div className="text-updater-node">
      <div className="container">
        <input
          style={{ background: "green" }}
          disabled={!data.isEditable}
          ref={inputRef}
          onBlur={data.onNodesBlur}
          onKeyDown={data.onNodesSubmit}
          onChange={handleChange}
          className="nodrag"
          type="text"
          id="text"
          value={inputValue}
        />
      </div>
      <Handle
        type="source"
        position="bottom"
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
    </div>
  ) : (
    <div className="text-updater-node">
      <Handle
        type="target"
        position="top"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <div className="container">
        <input
          style={{ background: "green" }}
          disabled={!data.isEditable}
          onBlur={data.onNodesBlur}
          onKeyDown={data.onNodesSubmit}
          ref={inputRef}
          onChange={handleChange}
          className="nodrag"
          type="text"
          id="text"
          value={inputValue}
        />
      </div>

      <Handle
        type="source"
        position="bottom"
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
    </div>
  );
});
