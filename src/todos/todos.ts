import { Hono } from "hono";

let todoList = [
  { id: "1", title: "Leaning Programming.", completed: false },
  { id: "2", title: "Watch Netflix.", completed: false },
  { id: "3", title: "Go shopping.", completed: false },
];

const app = new Hono();

// Todoの全件表示
app.get("/", (context) => context.json(todoList));

// Todoの追加
app.post("/", async (context) => {
  const param = await context.req.json<{ title: string }>();
  const newTodo = {
    id: String(todoList.length + 1),
    title: param.title,
    completed: false,
  };
  todoList = [...todoList, newTodo];

  return context.json(newTodo, 201);
});

// Todoの更新
app.put("/:id", async (context) => {
  const id = context.req.param("id");
  const todo = todoList.find((todo) => todo.id === id);
  if (!todo) {
    return context.json({ message: "not found" }, 404);
  }
  const param = (await context.req.json()) as {
    title?: string;
    completed?: boolean;
  };
  todoList = todoList.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        ...param,
      };
    } else {
      return todo;
    }
  });
  return new Response(null, { status: 204 });
});

// Todoの削除
app.delete("/:id", async (context) => {
  const id = context.req.param("id");
  const todo = todoList.find((todo) => todo.id === id);
  if (!todo) {
    return context.json({ message: "Not Found" }, 404);
  }
  todoList = todoList.filter((todo) => todo.id !== id);

  return new Response(null, { status: 204 });
});

export default app;
