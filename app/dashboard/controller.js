
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { Message: alertMessage, status: alertStatus };

            if (req.session.user === null || req.session.user === undefined) {
                res.redirect('/')
            } else {
                res.render('admin/dashboard/index',{  name: req.session.user.name,title:"halaman admin"})
            }
        } catch (error) {
            req.flash("alertMessage", ` ${error.message}`);
            req.flash("alertStatus", `alert-danger`);
            res.redirect("/");
            console.log(error);
        }
    },
   
};
