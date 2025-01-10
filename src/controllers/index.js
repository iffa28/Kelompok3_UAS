const login = require("./Controller_Login");
const register = require("./Controller_Register");
const home = require("./Controller_Home");
const Admin = require("./Controller_Admin");
const peminjaman = require("./Controller_Peminjaman");
const report = require("./Controller_Report");

module.exports = {
    login,
    register,
    home,
    Admin,
    peminjaman,
    report

};