CREATE TABLE `admin` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` text DEFAULT NULL,  
  PRIMARY KEY (`id`)
);


CREATE TABLE `user` (
  `id_user` int(8) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) DEFAULT NULL,
  `pw_user` text DEFAULT NULL,  
  PRIMARY KEY (`id_user`)
);

CREATE TABLE `buku` (
  `id_buku` int(8) NOT NULL AUTO_INCREMENT,
  `judul_buku` varchar(50) DEFAULT NULL,
  `pengarang_buku` varchar(50) DEFAULT NULL,
  `thn_terbit` date  DEFAULT NULL,
  PRIMARY KEY (`id_buku`)
);

CREATE TABLE `peminjaman` (
    `id_peminjaman` INT(8) NOT NULL AUTO_INCREMENT,
    `id_buku` INT(8) NOT NULL,
    `id_user` INT(8) NOT NULL,
    `judul_buku` VARCHAR(50) DEFAULT NULL,
    `tgl_pinjam` DATE DEFAULT NULL,
    `tgl_kembali` DATE DEFAULT NULL,
    PRIMARY KEY (`id_peminjaman`),
    FOREIGN KEY (`id_buku`) REFERENCES `buku`(`id_buku`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) 
