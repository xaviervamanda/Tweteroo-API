import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const users = [];
const tweets = [];
// let userName = "";
const userName = "amanda";


app.post ("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    if (!username || !avatar){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    if (typeof(username) !== "string" || typeof(avatar) !== "string"){
        res.sendStatus(400);
    }
    // userName = username;
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
    const arrayTweets = tweets.slice(-10);
    const updateTweets = [];
    if (tweets.length === 0){
        return res.send(tweets);
    }
    arrayTweets.map ((t) => {
        const element = users.find ((u) => u.username === t.username)
        t.avatar = element.avatar
        updateTweets.push(t)
    });
    res.send (updateTweets);
});

app.listen (PORT, () => `Servidor rodando na porta ${PORT}`);