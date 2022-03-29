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
    viewSignup,
    signup,
} = require("./controller");

/* GET home page. */

router.get("/", index);
router.get("/signup", viewSignup);
router.post("/signup", signup);
router.post('/',actionSignin)
router.delete('/logout',actionLogOut)


// router.put(`/edit/:id`, edit);
// router.delete(`/delete/:id`, actionDelete);
// router.put(`/status/:id`, actionStatus);

module.exports = router;
