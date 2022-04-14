const express = require("express");
const Catatan = require("./model");

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = { Message: alertMessage, status: alertStatus };
            console.log(alert);
        
      const email = req.session.user.email
            const catatan =  await Catatan.find({email:email})
            console.log(catatan)
            res.render("admin/catatan/view-catatan.ejs", {
                catatan,
                alert,
                name: req.session.user.name,
                title: "Halaman Catatan",
            });
        } catch (error) {
            req.flash("alertMessage", ` ${error.message}`);
            req.flash("alertStatus", `alert-danger`);
            res.redirect("/");
            console.log(error);
        }
    },
    viewCreate: async (req, res) => {
        try {
            const  jam  = new Date().toLocaleTimeString()
            const tanggal = new Date().toLocaleDateString()
            res.render("admin/catatan/create.ejs", {
                jam,tanggal,
                name: req.session.user.name,
                title: "Tambah Catatan",
            });
        } catch (error) {
            req.flash("alertMessage", ` ${error.message}`);
            req.flash("alertStatus", `alert-danger`);
            res.redirect("/catatan");
            console.log(error);
        }
    },
    create: async (req, res) => {
        try {
            const { suhu,lokasi } = req.body;
            const email = req.session.user.email
            const  jam  = new Date().toLocaleTimeString()
            const tanggal = new Date().toLocaleDateString()
            const catatan =  Catatan({ email,suhu,lokasi,tanggal,jam });
           await  catatan.save();
            req.flash("alertMessage", `Berhasil menambahkan kategori`);
            req.flash("alertStatus", `alert-success`);

            res.redirect("/catatan");
        } catch (error) {
            if (error && error.name === "ValidationError") {
                req.flash("alertMessage", ` ${error.message}`);
            req.flash("alertStatus", `alert-danger`);
        
            }else{
                 req.flash("alertMessage", ` ${error.message}`);
            req.flash("alertStatus", `alert-danger`);
            }
           
            res.redirect("/catatan");
        }
    },
    viewEdit: async (req, res) => {
        try {
            const _id = req.params.id;
            const catatan = await Catatan.findById(_id);
            const  jam  = new Date().toLocaleTimeString()
            const tanggal = new Date().toLocaleDateString()
            res.render("admin/catatan/edit.ejs", {
                jam,
                tanggal,
                catatan,
                name: req.session.user.name,
                title: "Halaman Tambah Edit",
            });
        } catch (error) {
            req.flash("alertMessage", ` ${error.message}`);
            req.flash("alertStatus", `alert-danger`);
            res.redirect("/catatan");
            console.log(error);
        }
    },
    edit: async (req, res) => {
        try {
            const id = req.params.id;
            const { suhu,lokasi } = req.body;
          const catatan =   await Catatan.findOneAndUpdate({ _id: id }, { suhu,lokasi });
            req.flash(
                "alertMessage",
                `Berhasil mungubah catatan`
            );
            req.flash("alertStatus", `alert-success`);
            res.redirect("/catatan");
        } catch (error) {
            req.flash("alertMessage", ` ${error.message}`);
            req.flash("alertStatus", `alert-danger`);
            res.redirect("/catatan");
            console.log(error);
        }
    },
    actionDelete: async (req, res) => {
        try {
            const id = req.params.id;
            await Catatan.findOneAndDelete({ _id: id });
            req.flash("alertMessage", `Berhasil menghapus kategori`);
            req.flash("alertStatus", `alert-success`);
            res.redirect("/catatan");
        } catch (error) {
            req.flash("alertMessage", ` ${error.message}`);
            req.flash("alertStatus", `alert-danger`);
            res.redirect("/catatan");
            console.log(error);
        }
    },
};
