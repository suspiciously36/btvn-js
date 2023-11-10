import { client } from "./client.js";

export async function add(todo) {
  const res = await client.post("/todos", { todo });
  console.log(res);
}

export async function getList() {
  const res = await client.get("/todos");
  const { listTodo } = res.data.data;
  return listTodo;
}

export async function deleteTodo(id) {
  const res = await client.delete(`/todos/${id}`);
  console.log(res);
}

export async function updateTodo({ id, todo, isCompleted }) {
  const res = await client.patch(`/todos/${id}`, { todo, isCompleted });
  console.log(res);
}
