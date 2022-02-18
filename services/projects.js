let dbCon = require("../db/connection");

let projectCollection;

setTimeout(() => {
    projectCollection = dbCon.getDb().collection('projectData')
}, 2000);

//Create function that collects all projects in database
const allProjects = (res) => {
    projectCollection.find({}).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
}


//Create function that returns project matching a given ID
const getProjectById = (id, res) => {
    projectCollection.find({projectID : id}).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

//Create function that isnerts a project into the database
const insertProject = (project, res) => {
    projectCollection.insertOne(project, (err, result) => {
        if (err) throw err;
        res.send({result : 204 });
    });
}

//Create function that deletes a project from the database
const deleteProject = (id, res) => {
    projectCollection.deleteOne({projectID: id}, (err, result) => {
        if (err) throw err;
        res.send({result : 204 });
    });
}

//Export all functions
module.exports = {
    allProjects,
    getProjectById,
    insertProject,
    deleteProject
}