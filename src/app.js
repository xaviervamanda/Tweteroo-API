import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const users = [];
const tweets = [];
let userName = "";
let userAvatar = "";
let userTweet = "";

app.post ("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    if (!username || !avatar || typeof(username) !== "string" || typeof(avatar) !== "string"){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    users.push(username);
    userName = username;
    userAvatar = avatar;
    res.status(201).send("OK");
})

app.post ("/tweets", (req, res) => {
    const {tweet} = req.body;
    const {user} = req.headers;
    if (user !== userName){
        return res.sendStatus(401);
    }
    if (!tweet){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    tweets.push(tweet);
    res.status(201).send("OK");
})

app.listen (PORT, () => `Servidor rodando na porta ${PORT}`);