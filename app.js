const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const PORT = 3000;
const path = require("path");
const database = require("./database/connection");
const bodyParser = require("body-parser");
const Job = require("./models/Job");
const Sequilize = require("sequelize");
const Op = Sequilize.Op;

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, function () {
    console.log(`O express esta rodando na porta ${PORT}`);
});

// handlebars
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs.engine({ "defaultLayout": "main" }));
app.set("view engine", "handlebars");

// static folder
app.use(express.static(path.join(__dirname, "public")));

// database connection
database.authenticate().then(() => {
    console.log("Conectou ao banco com sucesso");
}).catch(error => {
    console.log("Ocorreu um erro ao conectar: ", error);
});


// routes
app.get('/', (req, res) => {

    let search = req.query.job;
    let query = '%' + search + '%';

    if (!search) {
        Job.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(jobs => {

                res.render('index', {
                    jobs
                });

            })
            .catch(err => console.log(err));
    } else {
        Job.findAll({
            where: { title: { [Op.like]: query } },
            order: [
                ['createdAt', 'DESC']
            ]
        })
            .then(jobs => {
                console.log(search);
                console.log(search);

                res.render('index', {
                    jobs, search
                });

            })
            .catch(err => console.log(err));
    }


});

app.use("/jobs", require("./routers/jobs"));