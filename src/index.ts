import { Hono } from "hono";
import todos from "./todos/todos";

const app = new Hono();

app.route("/todos", todos);

app.get("/", (context) => {
  return context.json({
    message: "Hello! Hono🔥",
  });
});

export default app;
