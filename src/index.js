const express = require("express");
const app = express();
const port = 2104;
const bearerToken = require("express-bearer-token");
const cors = require("cors");

const usersRouter = require("./routers/users");
const postsRouter = require("./routers/posts");
const likesRouter = require("./routers/likes");
const commentsRouter = require("./routers/comments");

app.use(cors());
app.use(bearerToken());
app.use("/public", express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Secure");
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/likes", likesRouter);
app.use("/comments", commentsRouter);

app.use((error, req, res, next) => {
  console.log({error});

  const errorObj = {
    status: "Error",
    message: error.message,
    detail: error,
  };

  const httpCode = typeof error.code == "number" ? error.code : 500;
  res.status(httpCode).send(errorObj);
});

app.listen(port, (error) => {
  if (error) return console.log({err: error.message});
  console.log(`API is running in port ${port}`);
});
