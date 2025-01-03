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
    }
}