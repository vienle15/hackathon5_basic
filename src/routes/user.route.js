function checkUserExists(req, res, next) {
  const email = req.body.email; // Giả sử email được gửi trong body request
  const user = usersData.find((user) => user.email === email);
  if (!user) {
    return res.status(404).json({ message: "Người dùng không tồn tại" });
  }
  next();
}

// GET - Lấy về dữ liệu của một user
app.get("/api/v1/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = usersData.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "Người dùng không tồn tại" });
  }
  res.json(user);
});

// GET - Lấy về dữ liệu của toàn bộ users
app.get("/api/v1/users", (req, res) => {
  res.json(usersData);
});

// POST - Thêm mới dữ liệu về 1 user vào CSDL
app.post("/api/v1/users", checkUserExists, (req, res) => {
  const newUser = req.body;
  usersData.push(newUser);

  res.status(201).json(newUser);
});

app.put("/api/v1/users", checkUserExists, (req, res) => {
  const email = req.body.email;
  const updatedUser = req.body; // Giả sử dữ liệu cần cập nhật được gửi trong body request
  const userIndex = usersData.findIndex((user) => user.email === email);
  if (userIndex === -1) {
    return res.status(404).json({ message: "Người dùng không tồn tại" });
  }
  usersData[userIndex] = updatedUser;

  res.json(updatedUser);
});

// DELETE - Xoá dữ liệu về một user
app.delete("/api/v1/users", checkUserExists, (req, res) => {
  const email = req.body.email;
  const userIndex = usersData.findIndex((user) => user.email === email);
  if (userIndex === -1) {
    return res.status(404).json({ message: "Người dùng không tồn tạii" });
  }
  usersData.splice(userIndex, 1);

  res.status(204).end();
});
