const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name:  {type: String, required: true },
    username: {type: String, required: true, unique:true },
    email:  {type: String, required: true, unique:true },
    password:  {type: String, required: true }
})

userSchema.statics.hashPassword =  async function(plainPassword){
    try {
        const hash = await bcrypt.hash(plainPassword, 7);
        console.log(hash);
        return hash;        
    } catch (err) {
        throw(err);
    }
}

userSchema.statics.comparePasswords =  async function(plainPassword, hashedPassWordFromDB){
    return await bcrypt.compare(plainPassword, hashedPassWordFromDB);
}

var User = mongoose.model('User', userSchema);

module.exports = User;