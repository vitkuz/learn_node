/**
 * Created by vitku on 23.05.2018.
 */
const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('currentDate', () => {
    return new Date().getFullYear();
});
const port = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'hbs');

app.use((req,res,next) => {
    const now = new Date().toDateString();
    console.log(`${now} ${req.method} ${req.url}`);
    const log = `${now} ${req.method} ${req.url}`;
    fs.appendFile('server.log', log+'\n', (err) => {
        if (err) {
            console.log(`Unable to append to server log`);
        }
    });
    next();
});

// app.use((req,res,next) => {
//     res.render('maintenance')
// });

app.use(express.static(__dirname+'/public'));

app.get('/', (req,res) => {
    res.render('index', {title:'Index form title'});
});

app.get('/about', (req,res) => {
    res.render('about', {title:'About title'});
});

app.get('/contact', (req,res) => {
    res.render('about', {title:'About title'});
});

app.get('/api/form', (req,res) => {
    res.send({
        pageName: 'Form',
        
        
    })
});

const entities = [
    {
        machineName:'article',
        createPath:'/admin/create/article',
        pageTitle:'Create article',
        viewName: 'article',
    },
    {
        machineName:'book',
        createPath:'/admin/create/book',
        pageTitle:'Create book',
        viewName: 'book',
    },
    {
        machineName:'course',
        createPath:'/admin/create/course',
        pageTitle:'Create course',
        viewName: 'course',
    },
    {
        machineName:'exercise',
        createPath:'/admin/create/exercise',
        pageTitle:'Create exercise',
        viewName: 'exercise',
    },
    {
        machineName:'idea',
        createPath:'/admin/create/idea',
        pageTitle:'Create idea',
        viewName: 'idea',
    },
    {
        machineName:'inphogra',
        createPath:'/admin/create/inphogra',
        pageTitle:'Create inphogra',
        viewName: 'inphogra',
    },
    {
        machineName:'movie',
        createPath:'/admin/create/movie',
        pageTitle:'Create movie',
        viewName: 'movie',
    },
    {
        machineName:'quote',
        createPath:'/admin/create/quote',
        pageTitle:'Create quote',
        viewName: 'quote',
    },
    {
        machineName:'story',
        createPath:'/admin/create/story',
        pageTitle:'Create story',
        viewName: 'story',
    },
    {
        machineName:'tool',
        createPath:'/admin/create/tool',
        pageTitle:'Create tool',
        viewName: 'tool',
    },
    {
        machineName:'video',
        createPath:'/admin/create/video',
        pageTitle:'Create video',
        viewName: 'video',
    }
]

for (let i = 0; i < entities.length; i++) {
    app.get(entities[i].createPath, (req,res) => {
        res.render(entities[i].viewName, { title: entities[i].pageTitle});
    });
}

// app.get('/admin/create/article', (req,res) => {
//     res.render('article', {title:'article title'});
// });
//
// app.get('/admin/create/book', (req,res) => {
//     res.render('book', {title:'article title'});
// });
//
// app.get('/admin/create/course', (req,res) => {
//     res.render('course', {title:'article title'});
// });
//
// app.get('/admin/create/exercise', (req,res) => {
//     res.render('article', {title:'article title'});
// });
//
// app.get('/admin/create/idea', (req,res) => {
//     res.render('idea', {title:'article title'});
// });
//
// app.get('/admin/create/inphogra', (req,res) => {
//     res.render('inphogra', {title:'article title'});
// });
//
// app.get('/admin/create/movie', (req,res) => {
//     res.render('movie', {title:'article title'});
// });
//
// app.get('/admin/create/quote', (req,res) => {
//     res.render('quote', {title:'article title'});
// });
//
// app.get('/admin/create/story', (req,res) => {
//     res.render('story', {title:'article title'});
// });
//
// app.get('/admin/create/tool', (req,res) => {
//     res.render('tool', {title:'article title'});
// });
//
// app.get('/admin/create/video', (req,res) => {
//     res.render('video', {title:'article title'});
// });

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});