const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    db.query("SELECT pp_project.id, pp_project.title, pp_project.image, pp_project.description, pp_project.link, pp_user.name AS creator " + 
        "FROM pp_project INNER JOIN pp_user ON pp_user.id=pp_project.id_user", (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

router.get('/getWithPattern/:patern', (req, res) => {
    const patern = "%" + req.params.patern + "%";

    db.query("SELECT pp_project.id, pp_project.title, pp_project.image, pp_project.description, pp_project.link, pp_user.name AS creator " + 
        "FROM pp_project INNER JOIN pp_user ON pp_user.id=pp_project.id_user WHERE pp_project.title LIKE ? OR pp_project.description LIKE ? OR pp_project.link LIKE ?", 
        [patern, patern, patern], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

router.get('/getWithCategory/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;

    db.query("SELECT pp_project.id, pp_project.title, pp_project.image, pp_project.description, pp_project.link, pp_user.name AS creator " + 
        "FROM pp_project INNER JOIN pp_user ON pp_user.id=pp_project.id_user INNER JOIN pp_category_project ON pp_project.id=pp_category_project.id_project " +
        "INNER JOIN pp_category ON pp_category_project.id_category=pp_category.id WHERE  pp_category.id = ?", categoryId, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

router.get('/getWithOwner/:ownerId', (req, res) => {
    const owner_id = req.params.ownerId;

    db.query("SELECT pp_project.id, pp_project.title, pp_project.image, pp_project.description, pp_project.link, pp_user.name AS creator " + 
        "FROM pp_project INNER JOIN pp_user ON pp_user.id=pp_project.id_user WHERE pp_user.id = ?", owner_id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

router.post('/create', (req, res) => {
    const title = req.body.title;
    const imagePath = req.body.imagePath;
    const description = req.body.description;
    const link = req.body.link;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const id_user = req.body.id_user;

    db.query("INSERT INTO pp_project (title, image, description, link, start_date, end_date, id_user) VALUES(?, ?, ?, ?, ?, ?, ?)", 
                                                                [title, imagePath, description, link, start_date, end_date, id_user], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send({"id": result.insertId});
    });
});

router.post('/addCategory', (req, res) => {
    const idProject = req.body.idProject;
    const category = req.body.category;

    db.query("INSERT INTO pp_category_project SELECT ?, id FROM pp_category WHERE name = UPPER(?)", 
                                                                [idProject, category], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send({"id": result.insertId});
    });
});

router.get('/category/getWithid/:id', (req, res) => {
    const id = req.params.id;

    db.query("SELECT pp_category.name FROM pp_category INNER JOIN pp_category_project ON pp_category.id = pp_category_project.id_category WHERE pp_category_project.id_project = ?",
                                                                    id, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});


router.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM pp_project WHERE id= ?", id, (err, result) => {
        if(err){
            console.log(err);
        }
    });
});

module.exports = router;