const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    db.query("SELECT * FROM pp_category", (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

router.get('/getWithName/:name', (req, res) => {
    const name = req.params.name;

    db.query("SELECT * FROM pp_category WHERE name = ?", name, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

router.post('/create', (req, res) => {
    const name = req.body.name;
    const imagePath = req.body.imagePath;

    db.query("INSERT INTO pp_category (name, image) VALUES(?, ?)", [name, imagePath], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

router.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM pp_category WHERE id= ?", id, (err, result) => {
        if(err){
            console.log(err);
        }
    });
});

module.exports = router;