const config = require('../configs/db');
let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    formRegister(req, res) {
        res.render("register", {
            url: 'http://localhost:3000/',
        });
    },
    saveRegister(req, res) {
        let email = req.body.email;
        let pw_user = req.body.pw_user;
        if (email && pw_user) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO user (email,pw_user) VALUES (?,SHA2(?,512));`
                    , [email, pw_user], function (error, results) {
                        if (error) throw error;
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Registrasi berhasil');
                        res.redirect('/login');
                    });
                connection.release();
            })
        } else {
            res.redirect('/login');
            res.end();
        }
    }
}