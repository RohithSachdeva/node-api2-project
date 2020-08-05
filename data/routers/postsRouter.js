const express = require("express");
const db = require('../db.js');

const router = express.Router();

//3 get requests; find, findById, findPostComments

router.get("/", (req, res) => {
    db.find(req.query)
    .then(posts => res.status(200).json(posts))
    .catch(err => {
        console.log(err)
        res.status(500).json({error:"Posts can't be retrieved"})
    })
});

router.get("/:id", (req, res) => {
    db.findById(req.params.id)
    .then(item => {
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({message: "Not found"});
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving",
        });
    });
});

router.get("/:id/comments", (req, res) => {
    db.findPostComments(req.params.id)
    .then(item => {
        if(item) {
            res.status(200).json(item)
        } else {
            res.status(404).json({ message: "Comment not found"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json( { message: "Error"})
    });
});


//2 Post Requests; Post and comments by id

router.post("/", (req, res))
module.exports = router;
