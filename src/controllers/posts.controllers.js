import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class PostsController {
  getAllPosts(req, res) {
    try {
      const filePosts = fs.readFileSync("./src/models/posts.json", "utf8");
      const listPosts = JSON.parse(filePosts);

      res.json(listPosts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  getPostById(req, res) {
    const id = req.params.id;

    try {
      const filePosts = fs.readFileSync("./src/models/posts.json", "utf8");
      const listPosts = JSON.parse(filePosts);
      const post = listPosts.find((item) => item.id == id);

      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  createPost(req, res) {
    const newPost = req.body;
    newPost.id = uuidv4();

    try {
      const filePosts = fs.readFileSync("./src/models/posts.json", "utf8");
      const listPosts = JSON.parse(filePosts);
      listPosts.push(newPost);

      fs.writeFileSync("./src/models/posts.json", JSON.stringify(listPosts));
      res.json({
        status: 200,
        message: "Ok",
        data: newPost,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  deletePost(req, res) {
    const id = req.params.id;

    try {
      const filePosts = fs.readFileSync("./src/models/posts.json", "utf8");
      const listPosts = JSON.parse(filePosts);
      const newListPosts = listPosts.filter((item) => item.id != id);

      fs.writeFileSync("./src/models/posts.json", JSON.stringify(newListPosts));
      res.json(newListPosts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  updatePost(req, res) {
    const id = req.params.id;

    try {
      const filePosts = fs.readFileSync("./src/models/posts.json", "utf8");
      const listPosts = JSON.parse(filePosts);

      listPosts.forEach((item, index) => {
        if (item.id == id) {
          listPosts.splice(index, 1, req.body);
          return;
        }
      });

      fs.writeFileSync("./src/models/posts.json", JSON.stringify(listPosts));
      res.json({
        status: 200,
        message: "Ok",
        data: listPosts,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default PostsController;
