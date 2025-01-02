const login = require("./Controller_Login");
const register = require("./Controller_Register");
const home_admin = require("./Controller_Home");
const peminjaman = require("./Controller_Peminjaman");
const buku = require("./Controller_Buku");

module.exports = {
    login,
    register,
    home_admin,
    peminjaman,
    buku

};