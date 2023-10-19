const express = require("express"); // Memanggil library express
const bodyParser = require("body-parser"); // Memanggil library express
const cors = require("cors"); // Memanggil library cors
const mysql = require("mysql")
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Membuat koneksi ke database "penyewaan_kendaraan"
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "penyewaan_kendaraaan"
})

db.connect(error => {
    if (error) {
        // Jika terjadi error
        console.log(error.message)
    } else {
        // Jika database berhasil connect
        console.log('Koneksi ke database berhasil')
    }
})

// PENYEWA
app.get("/penyewa", (req, res) => {
    let sql = "SELECT * FROM penyewa";

    db.query(sql, (error, results) => {
        let response = null;
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                JumlahData: results.length,
                Data: results
            }
        }
        res.json(response)
    })
})

app.post("/penyewa" , (req, res) => {
    let response = {
        NIK_Penyewa : req.body.NIK_Penyewa,
        Nama : req.body.Nama,
        Alamat : req.body.Alamat,
        No_Telepon : req.body.No_Telepon,
        Username : req.body.Username,
        Password : req.body.Password
    }
    let sql = `INSERT INTO penyewa SET ?`;
    db.query(sql, response, (error, result) => {
        let response = null;
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: "Berhasil menambahkan " + result.affectedRows + " data",
                data: req.body
            }
        }
        res.json(response)
    })
})

app.put("/penyewa" , (req, res) => {
    let response = [
        {
            Nama : req.body.Nama,
            Alamat : req.body.Alamat,
            No_Telepon : req.body.No_Telepon,
            Username : req.body.Username,
            Password : req.body.Password
        },
        {
            NIK_Penyewa : req.body.NIK_Penyewa
        }
    ]
    let sql = "UPDATE penyewa SET ? WHERE ?";
    db.query(sql, response, (error, result) => {
        let response = null;
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: "Berhasil mengupdate " + result.affectedRows + " data",
                update: "Data penyewa " + req.body.Nama + " berhasil diupdate"
            }
        }
        res.json(response)
    })
})

app.delete("/penyewa/:NIK", (req, res) => {
    let penyewa = {
        NIK_Penyewa: req.params.NIK
    }
    let sql = "DELETE FROM penyewa WHERE ?";
    db.query(sql, penyewa, (error, result) => {
        let response = null;
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: "Berhasil menghapus " + result.affectedRows + " data",
                delete: "Data NIK: " + req.params.NIK + " berhasil dihapus"
            }
        }
        res.json(response)
    })
})



// PEMILIK
app.get("/pemilik", (req, res) => {
    let sql = "SELECT * FROM pemilik";

    db.query(sql, (error, results) => {
        let response = null;
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                JumlahData: results.length,
                Data: results
            }
        }
        res.json(response)
    })
})

app.post("/pemilik" , (req, res) => {
    let response = {
        NIK_Pemilik : req.body.NIK_Pemilik,
        Nama : req.body.Nama,
        Username : req.body.Username,
        Password : req.body.Password
    }
    let sql = `INSERT INTO pemilik SET ?`;
    db.query(sql, response, (error, result) => {
        let response = null;
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: "Berhasil menambahkan " + result.affectedRows + " data",
                data: req.body
            }
        }
        res.json(response)
    })
})

app.put("/pemilik" , (req, res) => {
    let response = [
        {
            Nama : req.body.Nama,
            Username : req.body.Username,
            Password : req.body.Password
        },
        {
            NIK_Pemilik : req.body.NIK_Pemilik
        }
    ]
    let sql = "UPDATE pemilik SET ? WHERE ?";
    db.query(sql, response, (error, result) => {
        let response = null;
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: "Berhasil mengupdate " + result.affectedRows + " data",
                update: "Data pemilik " + req.body.Nama + " berhasil diupdate"
            }
        }
        res.json(response)
    })
})

app.delete("/pemilik/:NIK", (req, res) => {
    let pemilik = {
        NIK_Pemilik: req.params.NIK
    }
    let sql = "DELETE FROM pemilik WHERE ?";
    db.query(sql, pemilik, (error, result) => {
        let response = null;
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: "Berhasil menghapus " + result.affectedRows + " data",
                delete: "Data NIK: " + req.params.NIK + " berhasil dihapus"
            }
        }
        res.json(response)
    })
})


// KENDARAAN
app.get("/kendaraan", (req, res) => {
    let sql = "SELECT * FROM kendaraan";

    db.query(sql, (error, results) => {
        let response = null;
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                JumlahData: results.length,
                Data: results
            }
        }
        res.json(response)
    })
})

app.post("/kendaraan" , (req, res) => {
    let response = {
        Plat_Nomor: req.body.Plat_Nomor,
        Merk_Kendaraan: req.body.Merk_Kendaraan
    }
    let sql = `INSERT INTO kendaraan SET ?`;
    db.query(sql, response, (error, result) => {
        let response = null;
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: "Berhasil menambahkan " + result.affectedRows + " data",
                data: req.body
            }
        }
        res.json(response)
    })
})

app.put("/kendaraan" , (req, res) => {
    let response = [
        {
            Merk_Kendaraan: req.body.Merk_Kendaraan
        },
        {
            Plat_Nomor: req.body.Plat_Nomor
        }
    ]
    let sql = "UPDATE kendaraan SET ? WHERE ?";
    db.query(sql, response, (error, result) => {
        let response = null;
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: "Berhasil mengupdate " + result.affectedRows + " data"
            }
        }
        res.json(response)
    })
})

app.delete("/kendaraan/:plat", (req, res) => {
    let kendaraan = {
        Plat_Nomor: req.params.plat
    }
    let sql = "DELETE FROM kendaraan WHERE ?";
    db.query(sql, kendaraan, (error, result) => {
        let response = null;
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: "Berhasil menghapus " + result.affectedRows + " data",
                delete: "Data Plat_Nomor: " + req.params.plat + " berhasil dihapus"
            }
        }
        res.json(response)
    })
})


app.listen(8000, ()=> {
    console.log(`Server berjalan pada port 8000`)
})