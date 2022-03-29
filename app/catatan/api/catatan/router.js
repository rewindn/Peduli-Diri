var express = require("express");
const multer = require("multer");
const os = require("os");
const { isLoginUser } = require("../../../Middleware/auth");
var router = express.Router();
const { landingPage, detailPage, signup, signin, getCatatan, postCatatan, updateCatatan, deleteCatatan } = require("./controller");
router.get("/",isLoginUser,getCatatan);
router.post("/",isLoginUser,postCatatan);
router.put("/:id",isLoginUser,updateCatatan);
router.delete("/:id",isLoginUser,deleteCatatan);

// router.post("/signup", signup);

module.exports = router;
