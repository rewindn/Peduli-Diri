const User = require("./model");
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { Message: alertMessage, status: alertStatus };

            if (req.session.user === null || req.session.user === undefined) {
                res.render("admin/view_signin.ejs", {
                    alert,

                    title: "Halaman SignIn",
                });
            } else {
                res.redirect("/dashboard");
            }
        } catch (error) {
            req.flash("alertMessage", ` ${error.message}`);
            req.flash("alertStatus", `alert-danger`);
            res.redirect("/");
            console.log(error);
        }
    },

    viewSignup: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { Message: alertMessage, status: alertStatus };

           
                res.render("admin/view_signup.ejs", {
                    alert,

                    title: "Halaman SignIn",
                });
           
        } catch (error) {
            req.flash("alertMessage", ` ${error.message}`);
            req.flash("alertStatus", `alert-danger`);
            res.redirect("/");
            console.log(error);
        }
    },

    signup: async (req, res) => {
        try {
            const payload = req.body;
            
                let user = new User(payload);
              const oengguna = await user.save();
            console.log(oengguna);
                delete user._doc.password;

               res.redirect('/')
            }
        catch (error) {
            if (error && error.name === "ValidationError") {
                req.flash("alertMessage", ` ${error.message}`);
            req.flash("alertStatus", `alert-danger`);
            res.redirect("/");
            }
        
        }
    },
    actionSignin: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(email);
            const check = await User.findOne({ email: email });
            // console.log(check.email);
            if (check) {
                if (check.status === "Y") {
                    const checkPassword = bcrypt.compare(
                        password,
                        check.password
                    );
                  
                    if (checkPassword) {
                        req.session.user = {
                            id: check._id,
                            email: check.email,
                            status: check.status,
                            name: check.name,
                        };
                        res.redirect("/dashboard");
                    } else {
                        req.flash(
                            "alertMessage",
                            `mohon maaf password anda salah`
                        );
                        req.flash("alertStatus", `alert-danger`);
                        res.redirect("/");
                        // console.log(error);
                    }
                } else {
                    // console.log(check.status);
                    req.flash("alertMessage", `mohon maaf anda tidak aktif`);
                    req.flash("alertStatus", `alert-danger`);
                    res.redirect("/");
                    // console.log(error);
                }
            } else {
                req.flash("alertMessage", `email yang anda input salah`);
                req.flash("alertStatus", `alert-danger`);
                res.redirect("/");
                // console.log(error);
            }
        } catch (error) {
            req.flash("alertMessage", ` ${error.message}`);
            req.flash("alertStatus", `alert-danger`);
            // res.redirect("/");
            console.log(error);
        }
    },
    actionLogOut: (req, res) => {
        req.session.destroy();
        res.redirect("/");
    },
};
