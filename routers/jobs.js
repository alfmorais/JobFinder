const express = require("express");
const router = express.Router();
const Job = require("../models/Job");


router.get("/test", (request, response) => {
    response.send("Deu bom!");
})


router.get('/add', (req, res) => {
    res.render('add');
})


router.post("/add", (request, response) => {
    let title = request.body.title;
    let description = request.body.description;
    let salary = request.body.salary;
    let company = request.body.company;
    let email = request.body.email;
    let new_job = request.body.new_job;

    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
        .then(() => response.redirect("/"))
        .catch(error => console.log(error));
});

module.exports = router