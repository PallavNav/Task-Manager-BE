const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const taskRoutes = require("./routes/TaskRoutes");

const app = express();
const PORT = process.env.PORT || 9000;
const databaseURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wzdr4vx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log("databaseURL", databaseURL);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "******" : "Not found");
console.log("DB_NAME:", process.env.DB_NAME);
app.use(express.json());
app.use(cors());

mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("? Connected to MongoDB Atlas"))
  .catch((err) => console.error("? MongoDB connection error:", err));

app.use("/nav/taskify", taskRoutes);

app.listen(PORT, () => {
  console.log(`?? Server running on http://localhost:${PORT}`);
});
