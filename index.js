const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2')
const port = 3000

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbescola"
})

app.get('/', (req, res) => {
    res.json({ message: "API funcionando" })
})

//rotas

//GET alunos
app.get('/alunos', (req, res) => {
    db.query('SELECT FROM tbalunos', (err, results) => {
        if (err) return res.status(500).json(err)
        res.json(results)
    })
})
//POST alunos
app.post('/alunos', (req, res) => {
    const { nome, idade } = req.body
    db.query('INSERT INTO tbAlunos(nome,idade)VALUES(?,?)',
        [nome, idade],
        (err, results) => {
            if (err) return res.status(500).json(err)
            res.json({ id: results, insertId, nome, idade })
        }
    )
})
//PUT alunos
app.put('/alunos/:id', (req, res) => {
    const { nome, idade } = req.body
    db.query('UPDATE tbAlunos SET nome=?, idade=? WHERE id=?',
        [nome, idade, req.params.id],
        (err, results) => {
            if (err) return res.status(500).json(err)
            res.json({ id: req.params.id, nome, idade })
        }
    )
})
//DELETE alunos
app.put('/alunos/:id', (req, res) => {
    db.query('DELETE FROM tbAlunos WHERE id=?',
        [req.params.id],
        err => {
            if (err) return res.status(500).json(err)
            res.json({ message: "Aluno removido" })
        }
    )
})
app.listen(port, () => {
    console.log(`API rodando na porta ${port}`)
})