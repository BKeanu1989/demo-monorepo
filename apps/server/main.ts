import dotenv from 'dotenv'
dotenv.config()
console.log("process env", process.env)
import express from "express";
import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const app = express();

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    // where: { published: true },
    // include: { author: true },
  });
  res.json(users);
});


// for demo reasons we are just using GET
app.get("/user", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.internet.userName(),
    },
  });
  res.json(user);
});

// app.put("/publish/:id", async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.update({
//     where: { id },
//     data: { published: true },
//   });
//   res.json(post);
// });

// app.delete("/user/:id", async (req, res) => {
//   const { id } = req.params;
//   const user = await prisma.user.delete({
//     where: {
//       id,
//     },
//   });
//   res.json(user);
// });

const server = app.listen(process.env.SERVER_PORT);
