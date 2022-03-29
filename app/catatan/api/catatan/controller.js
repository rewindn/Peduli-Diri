
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Catatan = require('../../model')


module.exports = {
    getCatatan: async (req, res) => {
        try {
                const email = req.user.email
                console.log(email);
                const data = await Catatan.find(
                  {email}
                );

                res.status(201).json({
                    data
                      
                    
                });
            
        } catch (err) {
            if (err && err.name === "validationError") {
                res.status(500).json({
                    message: err.message,
                    fields: err.errors,
                });
            }
            res.status(500).json({
                message: err.message || "terjadi kesalahan pada server",
            });
        }
    },
    postCatatan: async (req, res) => {
        try {
            const { suhu,lokasi } = req.body;
            const email = req.user.email
            const  jam  = new Date().toLocaleTimeString()
            const tanggal = new Date().toLocaleDateString()
            const catatan = await Catatan({ email,suhu,lokasi,tanggal,jam });
            catatan.save();

                res.status(201).json({
                    data: catatan
                });
            
        } catch (err) {
            if (err && err.name === "validationError") {
                res.status(500).json({
                    message: err.message,
                    fields: err.errors,
                });
            }
            res.status(500).json({
                message: err.message || "terjadi kesalahan pada server",
            });
        }
    },
    updateCatatan: async (req, res) => {
        try {
            const {id} = req.params
            const { suhu,lokasi } = req.body;
           
            const catatan = await Catatan.findByIdAndUpdate(id,{ suhu,lokasi });


               
            
            res.status(201).json({
                    data: catatan
                });
            
        } catch (err) {
            if (err && err.name === "validationError") {
                res.status(500).json({
                    message: err.message,
                    fields: err.errors,
                });
            }
            res.status(500).json({
                message: err.message || "terjadi kesalahan pada server",
            });
        }
    },
    deleteCatatan: async (req, res) => {
        try {
            const {id} = req.params
          const catatan = await Catatan.findByIdAndDelete(id);
    

               
            
            res.status(201).json({
                    data: catatan
                });
            
        } catch (err) {
            if (err && err.name === "validationError") {
                res.status(500).json({
                    message: err.message,
                    fields: err.errors,
                });
            }
            res.status(500).json({
                message: err.message || "terjadi kesalahan pada server",
            });
        }
    },
};


