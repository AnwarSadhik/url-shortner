const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const Url = require("./models/urlModel");
const subdomain = require("express-subdomain-handler");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  subdomain({ baseUrl: "shot-ly.onrender.com", prefix: "myprefix", logger: true })
);

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
connectDB();

app.use("/api", require("./routes/allRoutes"));

app.get("/myprefix/:thesubdomain", async function (req, res, next) {
  try {
    const shortID = req.params.thesubdomain;
    console.log(shortID);
    const url = await Url.findOne({shortID})
    if (!url) {
      return res.status(404).send("Not found");
    }

    res.redirect(url.originalURL);
  } catch (err) {
    console.log(err);
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}



app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
