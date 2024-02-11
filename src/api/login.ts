import { Hono } from "hono";

const app = new Hono();

app.get("/", (context) => {
  return context.json({
    message: "Login Successed!",
  });
});

export default app;
