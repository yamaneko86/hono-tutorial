import { Hono } from "hono";
import login from "./api/login";

const app = new Hono();

app.route("/login", login);

app.get("/hello", (context) => {
  return context.json({
    message: "Hello! Hono🔥",
  });
});

export default app;
