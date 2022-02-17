let dbCon = require("../db/connection");

let projectCollection;

setTimeout(() => {
    projectCollection = dbCon.getDb().collection('projectData')
}, 2000);

const allProjects = (res) => {
    projectCollection.find({}).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

const getProjectById = (id, res) => {
    projectCollection.find({projectID : id}).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

const insertProject = (project, res) => {
    projectCollection.insertOne(project, (err, result) => {
        if (err) throw err;
        res.send({result : 204 });
    });
}

const deleteProject = (id, res) => {
    projectCollection.deleteOne({projectID: id}, (err, result) => {
        if (err) throw err;
        res.send({result : 204 });
    });
}

module.exports = {
    allProjects,
    getProjectById,
    insertProject,
    deleteProject
}