const config = require('../configs/db')

let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    getBuku(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM buku;', function (error, results) {
                if (error) throw error;

                if (results.length > 0) {
                    res.render('buku', {
                        url: 'http://localhost:3000/',
                        buku: results
                    });
                } else {
                    res.render('buku', {
                        url: 'http://localhost:3000/',
                        buku: []
                    });
                }
            });
            connection.release();
        });

    },

    formBuku(req, res) {
        res.render("addBuku", {
            url: 'http://localhost:3000/',
        });
    },

    saveBuku(req, res) {
        let { judul_buku, pengarang_buku, thn_terbit } = req.body;
        console.log(judul_buku, pengarang_buku, thn_terbit);
        if (judul_buku && pengarang_buku && thn_terbit) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO buku (judul_buku, pengarang_buku, thn_terbit) VALUES (?, ?, ?);`,
                    [judul_buku, pengarang_buku, thn_terbit],
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Data berhasil disimpan');
                        res.redirect('/buku');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },

    editBuku(req, res) {
        const { id_buku } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM buku WHERE id_buku = ?', [id_buku], function (error, results) {
                if (error) throw error;
                if (results.length > 0) {
                    res.render('editBuku', {
                        url: 'http://localhost:3000/',
                        buku: results[0]
                    });
                } else {
                    res.redirect('/buku');
                }
            });
            connection.release();
        });
    },

    updateBuku(req, res) {
        const { id_buku } = req.params;
        const { judul_buku, pengarang_buku, thn_terbit } = req.body;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                'UPDATE buku SET judul_buku = ?, pengarang_buku = ?, thn_terbit = ? WHERE id_buku = ?',
                [judul_buku, pengarang_buku, thn_terbit, id_buku],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/buku');
                }

            );
            connection.release();
        });
    },

    deleteBuku(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            const query = 'DELETE FROM buku WHERE id = ?';
            connection.query(query, [id], function (error, results) {
                if (error) throw error;
                res.redirect('/buku'); // Redirect ke halaman buku setelah berhasil menghapus
            });
            connection.release();
        });
    }
}


