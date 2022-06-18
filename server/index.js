const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")
const bcrypt = require('bcrypt')
const saltRounds = 10

// conexão com db

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Pedro2030@",
    database:"agenda" 
});

app.use(cors())
app.use(express.json())

//CRIAR USUÁRIO
app.post("/register", (req, res) => {
   const {email} = req.body
   const {password} = req.body

    let SQL = "SELECT * FROM usuarios WHERE email = ?";
        db.query(SQL, [email], (err, result) => {
            if(err) {
                res.send(err)
            }
            if (result.length == 0) {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    db.query("INSERT INTO usuarios(email, password) VALUES(? , ?)", [email, hash], (err, result) => {
                        if (err) {
                            res.send(err);

                        }
                        res.send({ msg: "Cadastrado com sucesso!" })
                    })
                })

            } else {
                res.send({ msg: "Usuário já cadastrado" })
            }
        });
    });
//CRIAR USUÁRIO;;



//LOGIN USUÁRIO
app.post("/login", (req, res) => {
    const {email} = req.body;
    const {password} = req.body;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email],
        (err, result) => {
            if (err) {  
                res.send(err)
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password,
                    (erro, resultado) => {
                        if (resultado) {
                            res.send(result)
                        } else {
                            res.send({ msg: "Senha incorreta!" })
                        }
                    })

            } else {
                res.send({ msg: "Conta não encontrada" })
            }
        })
})
//LOGIN USUÁRIO;;

//ADICIONAR ATIVIDADES
app.post("/atividades", (req, res) => {
    const {nome} = req.body
    const {ref} = req.body
    const {descricao} = req.body
    const inicioData = new Date(req.body.inicioData) 
    const terminoData = new Date(req.body.terminoData)
    const {status} = req.body


    db.query("INSERT INTO atividades(nome,descricao,inicioData,terminoData,status, ref) VALUES (?, ?, ?, ?, ?, ?)", [nome, descricao, inicioData, terminoData, status, ref],
    (err, result) => {
        if(err) {
            res.send(err) 
        }
        res.send(result)
    }) 
    
})
//ADICIONAR ATIVIDADES

//pegar atividades de determinado usuário
app.get("/atividades/:id", (req, res) => {

    const ref = req.params.id  

    db.query("SELECT * FROM atividades WHERE ref = ?", [ref],
    (err, result) => {
        if(err) {
            res.send(err)
        }
        
        res.send(result)
    })
})


//pegar atividades de determinado usuário;;


//EDITAR ATIVIDADES 
app.put("/edit", (req, res) => {
    const { id } = req.body;
    const {status} = req.body; 

    SQL = "UPDATE atividades SET status = ? WHERE idatividades = ?";

           db.query(SQL,[status, id],(err,result) => {
           if(err) console.log(err)
                else{
                   res.send(result)  
                   
                } 
    })
})

//DELETAR ATIVIDADE

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let SQL = "DELETE FROM atividades WHERE idatividades = ?";
    db.query(SQL, id, (err, result) => {
      if(err) console.log(err);
        else{
            res.send(result);
        } 
    });
  });

app.listen(3001, () => {
    console.log("SERVIDOR RODANDO NA PORTA 3001")
}) 