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

router.post("/", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({error: "Provide a title and content"})
    } else {
        db.insert(req.body)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: "Error occurred"})
        })
    }
})

router.post("/:id/comments", (req, res) => {
    if(!req.body.text) {
        res.status(400).json({message: "No text"})
    } else {
        db.insertComment(req.body)
        .then(item => {
            if(item) {
                res.status(201).json(item)
            } else {
                res.status(404).json({ message: "Comment not found"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: "Error occurred"})
        })
    }
})

router.delete("/:id", (req,res) => {
    db.remove(req.params.id)
    .then(item => {
        if(item) {
            res.status(204).json({ item })
        } else {
            res.status(404).json({message: "Post not found"})
        }
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json({message: "Error occurred"})
    })
});

// PUT    | /api/posts/:id  

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const post = req.body;

    if(!post.title || !post.contents) {
        res.status(400).json( {message: "Provide data"})
    } else {
        db.update(id, post)
        .then(item => {
                if(item) {
                    res.status(200).json(post)
                } else {
                    res.status(404).json({message: "not found"})
                }
            
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: "Error occurred"})
        })
    }
})






//Guided project example
// router.put("/:id", (req, res) => {
//     const changes = req.body;
//     Hubs.update(req.params.id, changes)
//         .then(hub => {
//             if (hub) {
//                 res.status(200).json(hub);
//             } else {
//                 res.status(404).json({ message: "The hub could not be found" });
//             }
//         })
//         .catch(error => {
//             // log error to database
//             console.log(error);
//             res.status(500).json({
//                 message: "Error updating the hub",
//             });
//         });
// });







module.exports = router;
