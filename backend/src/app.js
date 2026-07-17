import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { connectToSocket } from "./controllers/socketManager.js";

import userRoutes from "./routes/usersRoute.js";

import mongoose from "mongoose";
import cors from "cors";

const app = express();

const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ limit: "40mb", extended: true }));

app.use("/api/v1/users", userRoutes);
// app.get("/home", (req, res) => {
//   res.send({ message: "Hello World!" });
// });

const start = async () => {
  app.set("mongo_user");
  //  const mongoURI = "mongodb://ZoomClone:<db_password>@ac-slfv5ea-shard-00-00.nb67i74.mongodb.net:27017,ac-slfv5ea-shard-00-01.nb67i74.mongodb.net:27017,ac-slfv5ea-shard-00-02.nb67i74.mongodb.net:27017/?ssl=true&replicaSet=atlas-ozoth7-shard-0&authSource=admin&appName=Cluster0";

  const connectionDB = await mongoose.connect(
    "mongodb://ZoomClone:ZoomClone2026@ac-slfv5ea-shard-00-00.nb67i74.mongodb.net:27017,ac-slfv5ea-shard-00-01.nb67i74.mongodb.net:27017,ac-slfv5ea-shard-00-02.nb67i74.mongodb.net:27017/?ssl=true&replicaSet=atlas-ozoth7-shard-0&authSource=admin&appName=Cluster0",
  );
  console.log(`MongoDB Connected: ${connectionDB.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("Server is running on port ");
  });
};

start();
