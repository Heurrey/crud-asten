const express = require("express")
const mysql = require("mysql")
const BodyParser = require("body-parser")


const app = express()

app.use(BodyParser.urlencoded({extended: true} ))

app.set("view engine", "ejs")
app.set("views,", "views")

const db= mysql.createConnection({
    host: "localhost",
    database: "asten",
    user: "root",
    password: "",
})

db.connect((err) => {
    if(err) throw err
    console.log("database connected...");

    app.get("/", (req, res)=>{
        const sql = "SELECT * FROM barudak"
        db.query(sql, (err, result) => {
            const asten = JSON.parse(JSON.stringify(result))
            res.render("index", {asten: asten, title: "DATA BARUDAK ASTEN ASU"})
        })
    })

    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO barudak (nama, kelas) VALUES ('${req.body.nama}', '${req.body.kelas}');`
        db.query(insertSql, (err, result) =>{
            if (err) throw err
            res.redirect("/")
        })
    })

    
    
})


app.listen(8000, () =>{
    console.log("server ready...")
})