const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello from student get all resources api")
})

router.get('/:studentid', (req, res) => {
    res.send("Hello from student" + req.params.studentid +  "get all resources api")
})

router.post('/', (req, res) => {
    res.sendStatus(204);
})

router.put('/:id', (req, res) => {
    res.send("Hello from student update" + req.params.studentid +  "get all resources api")
})

router.delete('/:id', (req, res) => {
    res.send("Hello from student delete" + req.params.studentid +  "get all resources api")
})

module.exports = router;