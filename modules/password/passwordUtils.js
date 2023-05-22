const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js")
const User = require("../../schema/User");

const SALT_ROUNDS = 10;

async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePassword(email, password) {
    const user = await User.findOne({email});
    return await bcrypt.compare(password, user.password);
}

function encrypt(text) {
    return CryptoJS.AES.encrypt(text, process.env.SECRET).toString()
}

function decrypt(text) {
    return CryptoJS.AES.decrypt(text, process.env.SECRET).toString(CryptoJS.enc.Utf8)
}

module.exports = {
    hashPassword,
    comparePassword,
    encrypt,
    decrypt
};
