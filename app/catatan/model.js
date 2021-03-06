const mongoose = require("mongoose");
let catatanSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required: [true, "email nya jang kosong lah "],

        },
        tanggal:{
            type:String,
            required: [true, "tanggal nya jang kosong lah "],
        },
        jam:{
            type:String,
             required: [true, "jam nya jang kosong lah "],
        },
        lokasi:{
            type:String,
            required: [true, "lokasi nya jang kosong lah "],
        },

        suhu: {
            type: Number,
            required: [true, "nama nya jang kosong lah "],
        },
        
    },
    { timestamps: true }
);

catatanSchema.path('suhu').validate(async function (value) {
  return value < 37.2
},(attr)=> `suhu anda terlalu panas untuk manusia normal` )


module.exports = mongoose.model("catatan", catatanSchema);
