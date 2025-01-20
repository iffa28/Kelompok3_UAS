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

            const reportQuery = `
                SELECT 
                    buku.judul_buku, 
                    COUNT(peminjaman.id_buku) AS jumlah_peminjaman
                FROM peminjaman
                JOIN buku ON peminjaman.id_buku = buku.id_buku
                WHERE tgl_pinjam >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)  -- Hanya 1 bulan terakhir
                GROUP BY peminjaman.id_buku, buku.judul_buku
                ORDER BY jumlah_peminjaman DESC;
            `;

            const peminjamanQuery = `
                SELECT 
                    id_peminjaman,
                    id_buku,
                    judul_buku, 
                    tgl_pinjam, 
                    tgl_kembali,
                    id_user
                FROM peminjaman;
            `;

            connection.query(reportQuery, function (reportError, reportResults) {
                if (reportError) {
                    console.error(reportError);
                    res.send('Gagal mengambil laporan bulanan');
                    return;
                }

                connection.query(peminjamanQuery, function (peminjamanError, peminjamanResults) {
                    if (peminjamanError) {
                        console.error(peminjamanError);
                        res.send('Gagal mengambil data peminjaman');
                        return;
                    }

                    // Memformat tanggal menggunakan toLocaleDateString
                    peminjamanResults.forEach(peminjaman => {
                        peminjaman.tgl_pinjam = new Date(peminjaman.tgl_pinjam).toLocaleDateString('id-ID');  // Format tanggal Indonesia
                        peminjaman.tgl_kembali = new Date(peminjaman.tgl_kembali).toLocaleDateString('id-ID');  // Format tanggal Indonesia
                    });

                    res.render('report', {
                        laporan: reportResults,
                        peminjaman: peminjamanResults,
                    });
                    connection.release();
                });
            });
        });
    }

};