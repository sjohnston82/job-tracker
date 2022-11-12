require("dotenv").config();

const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("environment    ", process.env.ENVIRONMENT);
console.log("PORT    ", process.env.PORT);

const PORT =
  process.env.ENVIRONMENT === "production" ? process.env.PORT || 8080 : 8000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "./frontend/build")));

const jobRoutes = require("./routes/jobRoutes");
app.use("/", jobRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const connectDatabase = async () => {
  const database = mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return database;
};

app.listen(PORT, async () => {
  await connectDatabase();
  console.log("listening on port " + PORT);
});
