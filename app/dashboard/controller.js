
const bcrypt = require("bcryptjs");
const res = require("express/lib/response");
const Catatan  = require('../catatan/model')
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { Message: alertMessage, status: alertStatus };
            let totalPerjalanan = await Catatan.distinct('email')
            console.log(totalPerjalanan);
            let count = await Catatan.aggregate([
                {
                    $match: { email: req.session.user.email },
                },
                {
                    $group: {
                        _id: "$email",
                        suhuAvg: { $avg:  "$suhu"  },
                        lastLokasi:{$last:'$lokasi'},
                        lokasi : {$addToSet:'$lokasi'},
                        lokasiCount: { $sum:1} 
                    },
                    

                },
                
             
            ]);
            const geli = 0;
            if (count.length === 0) {
               count = [{suhuAvg:0}]
            }
            console.log(req.session.user.email);
            console.log(count);
            const catatan =  await Catatan.find({email:req.session.user.email})
            if (req.session.user === null || req.session.user === undefined) {
                res.redirect('/')
            } else {
                res.render('admin/dashboard/index',{ count,catatan, name: req.session.user.name,title:"halaman admin"})
            }
        } catch (error) {
            req.flash("alertMessage", ` ${error.message}`);
            req.flash("alertStatus", `alert-danger`);
            res.redirect("/");
            console.log(error);
        }
    },
   
};
