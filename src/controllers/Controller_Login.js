const config = require('../configs/db');

let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    login(req, res) {
        res.render("login", {
            url: 'http://localhost:3000/',
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
    loginAuth(req, res) {
        let usernameOrEmail = req.body.username;
        let password = req.body.password;
        let role = req.body.role;

        if (usernameOrEmail && password) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;

                let query = '';
                let params = [];

                if (role === 'admin') {
                    query = `SELECT * FROM admin WHERE username = ? AND password = SHA2(?,512)`;
                    params = [usernameOrEmail, password];
                } else if (role === 'user') {
                    query = `SELECT * FROM user WHERE email = ? AND pw_user = SHA2(?,512)`;
                    params = [usernameOrEmail, password];
                }

                connection.query(query, params, function (error, results) {
                    if (error) throw error;

                    if (results.length > 0) {
                        req.session.loggedin = true;
                        req.session.userid = results[0].id || results[0].id_user;
                        req.session.username = results[0].username || results[0].email;
                        req.session.role = role;

                        if (role === 'admin') {
                            res.redirect('/');
                        } else if (role === 'user') {
                            res.redirect('/peminjaman');
                        }
                    } else {
                        req.flash('color', 'danger');
                        req.flash('status', 'Oops..');
                        req.flash('message', 'Akun tidak ditemukan');
                        res.redirect('/login');
                    }

                });

                connection.release();
            });

        } else {
            req.flash('color', 'danger');
            req.flash('status', 'Oops..');
            req.flash('message', 'Username/Email dan Password wajib diisi!');
            res.redirect('/login');
            res.end();
        }
    },

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            res.clearCookie('secretname');
            res.redirect('/login');
        });
    },
}