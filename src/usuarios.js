const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

let usuarios = []

app.get('/usuario', (req, res) => {
    console.log("Requisição recebida no /usuario")
    console.log("Todos os usuários cadastrados:")
    console.log(usuarios);
    console.log("---------------------------------------- /usuarios/get")
    res.send(usuarios)
});

app.get('/usuario/:login', (req, res) => {
    const { login } = req.params
    const usuario = usuarios.find(x => x.login === login)
    if (usuario) {
        res.send(usuario)
        console.log(`Usuário com login ${login} foi encontrado!`)
        console.log(usuario)
    } else {
        res.status(404).send('Usuário não encontrado!')
    }
    console.log("---------------------------------------- /usuario/get/:login")
});

app.post('/usuario', (req, res) => {
    const { login, data_cadastro, nome, email } = req.body
    if (!login || !data_cadastro || !nome || !email) {
        return res.status(400).send('Todos os campos são obrigatórios.')
    }

    const usuarioExistente = usuarios.find(x => x.login === login);
    if (usuarioExistente) {
        return res.status(400).send('Usuário com esse login já existe.')
    }

    const usuarioNovo = { 
        login, 
        data_cadastro,
        nome,
        email 
    };

    usuarios.push(usuarioNovo)
    res.status(201).send(usuarioNovo)
  
    console.log("---------------------------------------- /usuario/post")
    console.log(usuarioNovo)
});

app.delete('/usuario/:login', (req, res) => {
    const { login } = req.params;
    const index = usuarios.findIndex(x => x.login === login)
    if (index !== -1) {
        usuarios.splice(index, 1)
        res.send(`Usuário com login ${login} deletado!`);
        console.log(`O usuário com login ${login} foi deletado com sucesso!`)
    } else {
        res.status(404).send('Usuário não encontrado!');
    }
    console.log("---------------------------------------- /usuario/delete")
});

app.put('/usuario/:login', (req, res) => {
    const { login } = req.params
    const { nome, email } = req.body
    const index = usuarios.findIndex(x => x.login === login)
    if (index !== -1) {
        if (!nome && !email) {
            return res.status(400).send('Pelo menos um dos campos nome ou e-mail deve ser fornecido.')
        }
        if (nome) {
            usuarios[index].nome = nome
        }
        if (email) {
            usuarios[index].email = email
        }
        res.send(`Usuário com login ${login} foi atualizado com sucesso!`)
        console.log(`Usuário com login ${login} foi atualizado com sucesso!`)
    } else {
        res.status(404).send('Usuário não encontrado!')
    }
    console.log("---------------------------------------- /usuario/put")
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor ativo na Porta: ${port}`)
})

/* 
Body JSON para cadastrar um novo usuário
{
    "login": "user123",
    "data_cadastro": "2024-10-10",
    "nome": "João da Silva",
    "email": "joao.silva@example.com"
}
*/

/*
Como testar a aplicação em outro computador:
http://<IP_do_computador_do_servidor>:3000/usuario

Como testar no Thunder Client:

http://localhost:3000/usuario
*/

