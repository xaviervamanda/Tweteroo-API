import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const users = [];
let tweets = [];
let userName = ""


app.post ("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    if (!username || !avatar){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    if (typeof(username) !== "string" || typeof(avatar) !== "string"){
        res.sendStatus(400);
    }
    userName = username;
    users.push({username, avatar});
    console.log(users);
    res.status(201).send("OK");
});

app.post ("/tweets", (req, res) => {
    const {tweet} = req.body;
    const {user} = req.headers;
    if (user !== userName){
        return res.sendStatus(401);
    }
    if (!tweet){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    if (typeof(tweet) !== "string"){
        res.sendStatus(400);
    }
    tweets.push({username: user, tweet});
    console.log(tweets)
    res.status(201).send("OK");
});

app.get ("/tweets", (req, res) => {
    const {page} = parseInt(req.query);
    const updateTweets = [];
    tweets = tweets.reverse();
    if (tweets.length !== 0){
       tweets.map ((t) => {
            const element = users.find ((u) => u.username === t.username)
            t.avatar = element.avatar
            updateTweets.push(t)
        }); 
    }
    if (tweets.length === 0){
        return res.send(tweets);
    }
    if (page !== undefined){
        const startIndex = (page - 1)*10;
        const endIndex = startIndex + 10;
        res.send(tweets.slice(startIndex, endIndex));
    }
    if (page === undefined){
        res.send(updateTweets.slice(0, 10));
    }
});

app.get ("/tweets/:USERNAME", (req, res) => {
    const {USERNAME} = req.params;
    const userData = users.find (u => u.username === USERNAME);
    const userTweets = tweets.filter(t => t.username === USERNAME);
    userTweets.forEach(t => t.avatar = userData.avatar);
    res.send(userTweets);
});

app.listen (PORT, () => `Servidor rodando na porta ${PORT}`);