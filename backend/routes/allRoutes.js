const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");
const Url = require("../models/urlModel")

router.route("/url").post(controller.mainController);
module.exports = router;
