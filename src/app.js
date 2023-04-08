import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const users = [];
const tweets = [];
const user = "";
const userAvatar = "";
const userTweet = "";

app.post ("/sing-up", (req, res) => {
    const {username, avatar} = req.body;
    if (!username || !avatar || typeof(username) !== "string" || typeof(avatar) !== "string"){
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    users.push(username);
    user = username;
    userAvatar = avatar;
    res.send("OK");
})

app.listen (PORT, () => `Servidor rodando na porta ${PORT}`);