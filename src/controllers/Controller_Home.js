const config = require('../configs/db')

let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports ={
    home_admin(req,res){

        pool.getConnection(function (err, connection) {
            if (err) throw err;

            // Query untuk mengambil data buku
            connection.query('SELECT * FROM buku', function (error, results) {
                if (error) {
                    console.error(error);
                    res.send('Gagal mengambil data buku');
                    return;
                }

                res.render('home_admin', {
                    url: 'http://localhost:5000/',
                    buku: results
                });

                connection.release();
            });
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
                        res.redirect('/');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },
}