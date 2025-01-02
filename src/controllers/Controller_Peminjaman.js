const config = require('../configs/db')
const moment = require('moment');

let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});


module.exports = {
    getPeminjaman(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM peminjaman;', function (error, results) {
                if (error) throw error;

                if (results.length > 0) {
                    res.render('peminjaman', {
                        url: 'http://localhost:3000/',
                        peminjaman: results
                    });
                } else {
                    res.render('peminjaman', {
                        url: 'http://localhost:3000/',
                        peminjaman: []
                    });
                }
            });
            connection.release();
        });

    },

    peminjaman(req, res) {
        res.render("peminjaman", {
            url: 'http://localhost:3000/peminjaman/',
            flash: {
                color: req.flash('color'),
                status: req.flash('status'),
                message: req.flash('message')
            }
        })
    },

    savePinjam(req, res) {
        let { judul_buku, tgl_pinjam, tgl_kembali } = req.body;
        console.log(judul_buku, tgl_pinjam, tgl_kembali);
        if (judul_buku && tgl_pinjam && tgl_kembali) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO peminjaman (judul_buku, tgl_pinjam, tgl_kembali) VALUES (?, ?, ?);`,
                    [judul_buku, tgl_pinjam, tgl_kembali],
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Data berhasil disimpan');
                        res.redirect('/peminjaman');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },
}