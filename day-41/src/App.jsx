import React, { useEffect, useState } from "react";

import { add, getList, deleteTodo, updateTodo } from "./script/todo";

import AddNewTodo from "./components/AddNewTodo";
import TodoEdit from "./components/TodoEdit";
import TodoList from "./components/TodoList";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  //
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [list, setList] = useState(null);
  const notify = () =>
    toast("🦄 Todo needs at least 2 words", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  //   FETCH_LIST
  const fetchList = () => {
    setIsLoadingTodos(true);
    getList()
      .then((list) => {
        setList(list);
        setIsLoadingTodos(false);
      })
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    fetchList();
  }, []);

  const addNew = async (text) => {
    if (text.length < 2) {
      notify();
    } else {
      await add(text);
      fetchList();
    }
  };

  const removeTodo = async (id) => {
    toast("🦄 Todo deleting...", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    await deleteTodo(id);
    toast("🦄 Todo deleted!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    fetchList();
  };

  const editTodo = async (changes) => {
    await updateTodo(changes);
    fetchList();
  };

  //   RENDERING
  return (
    <div>
      <ToastContainer />
      <AddNewTodo addNew={addNew} />
      {isLoadingTodos ? (
        <div className="center">Loading todo...</div>
      ) : (
        <TodoList list={list} onDeleteTodo={removeTodo} onEditTodo={editTodo} />
      )}
    </div>
  );
}
