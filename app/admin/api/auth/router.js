var express = require("express");
const multer = require("multer");
const os = require("os");
var router = express.Router();
const { landingPage, detailPage, signup, signin } = require("./controller");
router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;
