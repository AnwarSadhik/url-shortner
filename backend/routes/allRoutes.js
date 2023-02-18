const express = require("express");
const router = express.Router();
const controller = require("../controllers/urlController");

router.route("/url").post(controller.mainController);
module.exports = router;
