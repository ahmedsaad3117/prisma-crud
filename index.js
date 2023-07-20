const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.use(express.json());

app.get("/user", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

app.post("/user", async (req, res) => {
  const newUser = await prisma.user.create({ data: req.body });
  res.json(newUser);
});

app.put("/user/:id", async (req, res) => {
  const id = req.params.id;
  const newAge = req.body.age;
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { age: newAge },
  });
  res.json(updatedUser);
});

app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  const deletedUser = await prisma.user.delete({ where: { id: parseInt(id) } })
  res.json(deletedUser);
});

app.listen(3000, () => console.log("server runningg on port 3000"));
