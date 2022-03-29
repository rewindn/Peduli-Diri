const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema(
    {
        email: {
            type: String,

            require: [true, "nama pembayaran harus di isi"],
        },
        name: {
            type: String,

            require: [true, "nama  harus di isi"],
        },

        password: {
            type: String,

            require: [true, "kata sandi harus di isi"],
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "admin",
        },
        status: {
            type: String,
            enum: ["Y", "N"],
            default: "Y",
        },
       
    },
    { timestamps: true }
);

userSchema.path('email').validate(async function (value) {
        const count = await mongoose.model("User",userSchema).countDocuments({email:value})
        console.log(count);
        return !count
},(attr)=> `${attr.name} sudah terdaftar` )


userSchema.pre('save',function (next) {
    this.password = bcrypt.hashSync(this.password,10)
    next()
})



module.exports = mongoose.model("User", userSchema);
