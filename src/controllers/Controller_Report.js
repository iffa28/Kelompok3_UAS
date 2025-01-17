const config = require('../configs/db')

let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    getReport(req, res) {
        
        pool.getConnection(function (err, connection) {
            if (err) throw err;
    
            const query = `
                SELECT 
                    buku.judul_buku,
                    COUNT(peminjaman.id_buku) AS jumlah_peminjaman
                FROM peminjaman
                JOIN buku ON peminjaman.id_buku = buku.id_buku
                WHERE tgl_pinjam >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)  -- Hanya 1 bulan terakhir
                GROUP BY peminjaman.id_buku, buku.judul_buku
                ORDER BY jumlah_peminjaman DESC;
            `;
    
            connection.query(query, function (error, results) {
                if (error) {
                    console.error(error);
                    res.send('Gagal mengambil laporan bulanan');
                    return;
                }
    
                res.render('report', { laporan: results });
                connection.release();
            });
        });
    }

};