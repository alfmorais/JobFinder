const express = require("express");
const app = express();
const PORT = 3000;
const database = require("./database/connection");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));

app.listen(PORT, function () {
    console.log(`O express esta rodando na porta ${PORT}`);
});

// database connection
database.authenticate().then(() => {
    console.log("Conectou ao banco com sucesso");
}).catch(error => {
    console.log("Ocorreu um erro ao conectar: ", error);
});


// routes
app.get("/", (request, response) => {
    response.send("Está funcionando");
});

app.use("/jobs", require("./routers/jobs"));