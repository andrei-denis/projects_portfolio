const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    db.query("SELECT * FROM pp_user", (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

router.get('/getWithId/:id', (req, res) => {
    const id = req.params.id;

    console.log("incerc")

    db.query("SELECT * FROM pp_user WHERE id = ?", id, (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result);
        res.send(result);
    });
});

router.get('/getWithName/:name', (req, res) => {
    const username = req.params.name;

    db.query("SELECT * FROM pp_user WHERE name = ?", username, (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

router.post('/create', (req, res) => {
    const username = req.body.username;

    db.query("INSERT INTO pp_user (name) VALUES(?)", [username], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send({"id": result.insertId, "name": username});
    });
});

router.delete('/delete/:id', (req,res)=>{
    const user_id = req.params.id;

    db.query("DELETE FROM pp_user WHERE id= ?", id, (err, result) => {
        if(err){
            console.log(err);
        }
    });
});

module.exports = router;