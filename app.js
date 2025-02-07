const express = require('express')
const morgan = require('morgan')

// express app
const app = express()

// register view engine
app.set('view engine', 'ejs')

// listen for request
app.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000'); // Log statement added
});

// middleware  and static files
app.use(express.static('public'))
app.use(morgan('dev'))



app.get('/', (req, res) => {
    const blogs = [
        {title: 'Blog 1', snippet: 'this is kolo blog one for the word'},
        {title: 'Blog 2', snippet: 'another blog to work on by kolo'},
        {title: 'blog 3', snippet: 'this is blog three that can be work on'}
    ]
    res.render('index', {title: 'Home page', blogs})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About page'})
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'create new blod'})
})

app.use((req, res) => {
    res.status(404).render('404', {title: '404 page'}); // Uncommented fallback route for 404 errors
})
