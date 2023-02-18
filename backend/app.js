const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function connectDB() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);

    console.log("mongoDB connected!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
connectDB()

app.use("/api/", require("./routes/allRoutes"));
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
