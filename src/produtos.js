const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) 

let produtos = []

app.get('/produto', (req, res) => {
    console.log("Requisição recebida no /produto")
    console.log("Todos os produtos cadastrados:")
    console.log(produtos)
    console.log("---------------------------------------- /produtos/get")
    res.send(produtos)
});

app.get('/produto/:codigo', (req, res) => {
    const { codigo } = req.params
    const produto = produtos.find(x => x.codigo === codigo)
    if (produto) {
        res.send(produto)
        console.log(`Produto com código ${codigo} foi encontrado!`)
        console.log(produto)
    } else {
        res.status(404).send('Produto não encontrado!')
    }
    console.log("---------------------------------------- /produto/get/:codigo")
})


app.post('/produto', (req, res) => {
    const { codigo, produto, valor_unitario, peso, quantidade } = req.body
    if (!codigo || !produto || !valor_unitario || !peso || !quantidade) {
        return res.status(400).send('Todos os campos são obrigatórios.')
    }

    const produtoExistente = produtos.find(x => x.codigo === codigo)
    if (produtoExistente) {
        return res.status(400).send('Produto com esse código já existe.')
    }

    const produto_Novo = { 
        codigo, 
        produto,
        valor_unitario,
        peso,
        quantidade 
    }

    produtos.push(produto_Novo)
    res.status(201).send(produto_Novo)
  
    console.log("---------------------------------------- /produto/post")
    console.log(produto_Novo)
})

app.delete('/produto/:codigo', (req, res) => {
    const { codigo } = req.params
    const index = produtos.findIndex(x => x.codigo === codigo)
    if (index !== -1) {
        produtos.splice(index, 1)
        res.send(`Produto com código ${codigo} deletado!`)
        console.log(`O produto com código ${codigo} foi deletado com sucesso!`)
    } else {
        res.status(404).send('Produto não encontrado!')
    }
    console.log("---------------------------------------- /produto/delete")
})

app.put('/produto/:codigo', (req, res) => {
    const { codigo } = req.params
    const { valor_unitario, quantidade } = req.body
    const index = produtos.findIndex(x => x.codigo === codigo)
    if (index !== -1) {
        if (!valor_unitario || !quantidade) {
            return res.status(400).send('Os campos valor_unitario e quantidade são obrigatórios.')
        }
        produtos[index].valor_unitario = valor_unitario
        produtos[index].quantidade = quantidade
        res.send(`Produto com código ${codigo} foi atualizado com sucesso!`)
        console.log(`Produto com código ${codigo} foi atualizado com sucesso!`)
    } else {
        res.status(404).send('Produto não encontrado!')
    }
    console.log("---------------------------------------- /produto/put")
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor ativo na Porta: ${port}`)
})


/* 
Body JSON
{
    "codigo": "123",
    "produto": "Arroz",
    "valor_unitario": 10.99,
    "peso": 1.5,
    "quantidade": 100
}
*/

/*
Como testar a aplicação em outro computador:
http://<IP_do_computador_do_servidor>:3000/produto

/*
Como testar a aplicação em outro computador:
http://<IP_do_computador_do_servidor>:3000/produto

Como testar no Thunder Client:

http://localhost:3000/produto
*/