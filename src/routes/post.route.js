// Lấy về dữ liệu của một post
app.get("/api/v1/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  const post = posts.find((post) => post.id === postId);
  if (post) {
    return res.json(post);
  } else {
    return res.status(404).json({ error: "Post not found" });
  }
});

// Lấy về dữ liệu của toàn bộ posts
app.get("/api/v1/posts", (req, res) => {
  return res.json(posts);
});

// Thêm mới dữ liệu về 1 post vào CSDL
app.post("/api/v1/posts", (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  // Lưu dữ liệu vào tệp JSON (nếu cần)
  // fs.writeFileSync('./posts.json', JSON.stringify(posts));
  return res.status(201).json(newPost);
});

// Chỉnh sửa dữ liệu của 1 post (theo postId)
app.put("/api/v1/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  const updatedPostData = req.body;
  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    // Cập nhật dữ liệu post
    posts[postIndex] = { ...posts[postIndex], ...updatedPostData };
    // Lưu dữ liệu vào tệp JSON (nếu cần)
    // fs.writeFileSync('./posts.json', JSON.stringify(posts));
    return res.json(posts[postIndex]);
  } else {
    return res.status(404).json({ error: "Post not found" });
  }
});

// Xoá dữ liệu về một post
app.delete("/api/v1/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    // Lưu dữ liệu vào tệp JSON (nếu cần)
    // fs.writeFileSync('./posts.json', JSON.stringify(posts));
    return res.json({ message: "Post deleted successfully" });
  } else {
    return res.status(404).json({ error: "Post not found" });
  }
});

// Lấy về toàn bộ post của 1 user với id nhất định
app.get("/api/v1/users/:userId/posts", (req, res) => {
  const userId = req.params.userId;
  const userPosts = posts.filter((post) => post.userId === userId);
  return res.json(userPosts);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
