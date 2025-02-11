const Blog = require('../models/blog')

//  blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
// blog index function
const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('blogs/index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
        console.log(err)
    })
}

// blog details function
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        if (!result) {
            return res.status(404).render('404', { title: 'Blog Not Found' });
        }
        res.render('blogs/details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
        console.log(err);
    });
}

// blog_create_get function

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'create new blog' })
}

// blog_create_ post function
const blog_create_post = (req, res) => {
   const blog = new Blog((req.body))
   
       blog.save()
       .then((result) => {
           res.redirect('/blogs')
       })
       .catch((err) => {
           console.log(err)
       })
}


// blog_delete function 
const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err)
        })
}



// export function
module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}