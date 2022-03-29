var express = require("express");
const { isLoginAdmin } = require("../Middleware/auth");
var router = express.Router();
const {
    index,
    viewCreate,
    create,
    viewEdit,
    edit,
    actionDelete,
} = require("./controller");
const Category = require("./model");
// const { isLoginAdmin } = require("../Middleware/auth");
// router.use(isLoginAdmin);
/* GET home page. */
router.use(isLoginAdmin)
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", create);
router.get(`/edit/:id`, viewEdit);
router.put(`/edit/:id`, edit);
router.delete(`/delete/:id`, actionDelete);

module.exports = router;
