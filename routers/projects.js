const express = require('express');
const router = express.Router();

const projectService = require('../services/projects');

router.get('/', (req, res) => {
    projectService.allProjects(res);
})

router.get('/:id', (req, res) => {
    projectService.getProjectById(req.params.id, res);
})

router.post('/', (req, res) => {
    projectService.insertProject(req.body, res);
})

router.put('/:id', (req, res) => {
    res.send("Hello from project update" + req.params.projectid +  "get all resources api")
})

router.delete('/:id', (req, res) => {
    projectService.deleteProject(req.params.id, res);
})

module.exports = router;