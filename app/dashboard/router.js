const express = require("express");
const router = express.Router();

const {
    index,
    viewCreate,
    create,
    viewEdit,
    edit,
    actionDelete,
    actionStatus,
    actionSignin,
    actionLogOut,
} = require("./controller");

/* GET home page. */

router.get("/", index);

// router.post("/create", create);

// router.put(`/edit/:id`, edit);
// router.delete(`/delete/:id`, actionDelete);
// router.put(`/status/:id`, actionStatus);

module.exports = router;
