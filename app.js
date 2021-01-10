const express = require('express')
const todos = require('./todos.json')
const app = express()

app.set('view engine', 'pug')

app.use((req, res, next) => {
    let date = new Date(Date.now())
    console.log(`${date}: ${req.method} - ${req.url}`)
    next()
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'TODOs List',
        todos
    })
})

app.get('/todos/:id', (req, res) => {
    const id = +req.params.id
    const todo = todos.find(todo => todo.id === id)
    if (!todo) res.status(404).send('Не найдено')
    res.render('todo', {
        title: 'TODO Item',
        todo
    })
}) 

app.get('/api/todos', (req, res) => {
    if (req.query.completed) {
        return res.json(todos.filter(todo => todo.completed.toString() === req.query.completed))
    }
    res.json(todos)
})

app.get('/api/todos/:id', (req, res) => {
    const id = +req.params.id
    const todo = todos.find(todo => todo.id === id)
    if (!todo) res.status(404).send('Не найдено')
    res.send(todo)
}) 

app.listen(3002, 'localhost', () => console.log('Сервер работает'))