const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express()

// connect to mongoDB
const dbURI = 'mongodb+srv://kolobila:1111kwaku@nodetuta.migci.mongodb.net/'
mongoose.connect(dbURI)
.then((result) => app.listen(8080, () => {
    console.log('Server is listening on http://localhost:3000'); // Log statement added
}))
.catch((err) => console.log('err'))

// register view engine
app.set('view engine', 'ejs')

// middleware and static files
app.use(express.urlencoded({ extended: true })) // A middleware that handles the post request
app.use(express.static('public'))
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About page' })
})

// blog route
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404 page' }); // Fallback route for 404 errors
})
