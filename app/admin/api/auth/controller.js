
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../../model')


module.exports = {
    signup: async (req, res, next) => {
        try {
            const payload = req.body;
           
                let user = new User(payload);
                await user.save();

                delete user._doc.password;

                res.status(201).json({ data: user });
            
        } catch (error) {
            if (error && error.name === "ValidationError") {
                return res.status(422).json({
                    error: 1,
                    message: error.message,
                    fields: error.errors,
                });
            }
            next(error);
        }
    },

    signin: (req, res, next) => {
        const { email, password } = req.body;
        User.findOne({ email: email })
            .then((user) => {
                if (user) {
                    const checkPassword = bcrypt.compareSync(
                        password,
                        user.password
                    );

                    if (checkPassword) {
                        const token = jwt.sign(
                            {
                                user: {
                                    id: user.id,
                                    email: user.email,
                                    nama: user.nama,
                                   
                                },
                            },
                           "SECRET"
                        );

                        res.status(200).json({
                            data: { token },
                        });
                    } else {
                        res.status(403).json({
                            message: `kata sandi yang anda masukan salah`,
                        });
                    }
                } else {
                    res.status(403).json({
                        message: `email yang anda masukan belum tersedia`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message || `internal server error`,
                });
                next();
            });
    },
};
