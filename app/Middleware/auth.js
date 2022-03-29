const jwt = require('jsonwebtoken')
const User = require('../admin/model')
module.exports = {
    isLoginAdmin : async function (req,res,next) {
        if (req.session.user === null || req.session.user === undefined) {
            req.flash("alertMessage", `maaf session anda telah habis`);
            req.flash("alertStatus", `alert-danger`);
            
            res.redirect('/')
        }else{
            next()
        }
    },
    isLoginUser: async (req, res, next) => {
        try {

            //hapus bearer di tokennya

            const token = req.headers.authorization
                ? req.headers.authorization.replace("Bearer ", "")
                : null;

              
                //verify tokennya untuk dapet datanya

            const data = jwt.verify(token,"SECRET");
     
            const user = await User.findById(data.user.id);
           
            if (!user) { 
                
               
                throw new Error();
               
            }

            req.user = user;
            req.token = token;
            next();
        } catch (error) {
            res.status(401).json({
                message: error.message,
                error: "not authorized to access this resource",
            });
        }
    },
};



