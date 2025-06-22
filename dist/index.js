"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formidable_1 = __importDefault(require("formidable"));
const app = (0, express_1.default)();
const users = [{ name: "phu", password: "1234" }];
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', (req, res) => {
    res.render('index.pug', { title: 'Hey', message: 'Hello there!' });
});
app.get('/login', (req, res) => {
    res.render('login.pug', { title: 'Hey', message: 'Hello there!' });
});
app.get('/home', (req, res) => {
    const { name } = req.query;
    if (!name) {
        res.render('home.pug');
    }
    res.render('home.pug', { name: name });
});
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = (0, formidable_1.default)({ multiples: true });
    const [fields] = yield form.parse(req);
    const { name, password } = fields;
    if (!name || !password) {
        res.status(400).send("Name and password are required");
        return;
    }
    console.log("name:", name);
    console.log("password:", password);
    for (const user of users) {
        if (name[0] === user.name && password[0] === user.password) {
            res.redirect(`/home/?name=${encodeURIComponent(name[0])}`);
            return;
        }
    }
    res.status(400).send("User not exist");
}));
app.listen(3000, () => console.log(`Example app listening on port ${3000}!`));
