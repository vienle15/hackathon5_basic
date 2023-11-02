import express from "express";
import UsersController from "./controllers/users.controllers.js";
import PostsController from "./controllers/posts.controllers.js";

const app = express();
const port = 3000;

const usersController = new UsersController();
const userRouter = express.Router();
const postRouter = express.Router();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.get("/api/v1/users", usersController.getAllUsers);

app.get("/api/v1/users/:id", usersController.getUsersById);

app.post("/api/v1/users", usersController.createUser);

app.put("/api/v1/users/:id", usersController.updateUser);

app.delete("/api/v1/users/:id", usersController.deleteUser);
const postsController = new PostsController();

app.get("/api/v1/posts", postsController.getAllPosts);

app.get("/api/v1/posts/:id", postsController.getPostById);

app.post("/api/v1/posts", postsController.createPost);

app.put("/api/v1/posts/:id", postsController.updatePost);

app.delete("/api/v1/posts/:id", postsController.deletePost);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
