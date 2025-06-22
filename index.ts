import express, { Express } from 'express';
import formidable from 'formidable';

const app: Express = express();
const users = [{ name: "phu", password: "1234" }]

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('index.pug', { title: 'Hey', message: 'Hello there!' })
})

app.get('/login', (req, res) => {
    res.render('login.pug', { title: 'Hey', message: 'Hello there!' })
})

app.get('/home', (req, res) => {
    const { name } = req.query;
    if (!name) {
        res.render('home.pug')
        return;
    }
    res.render('home.pug', { name: name })
})

app.post('/api/login', async (req, res) => {
    const form = formidable({ multiples: true });
    const [fields] = await form.parse(req);

    const { name, password } = fields;

    if (!name || !password) {
        res.status(400).send("Name and password are required");
        return;
    }
    for (const user of users) {
        if (name[0] === user.name && password[0] === user.password) {
            res.redirect(`/home/?name=${encodeURIComponent(name[0])}`);
            return;
        }
    }
    res.redirect(`/home/`);

})


app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))
