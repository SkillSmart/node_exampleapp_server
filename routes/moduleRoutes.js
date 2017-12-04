const _ = require('lodash');

const Module = require('../models/courseContent/module');

module.exports = (app) => {

    // READ
    app.get('/api/modules', async (req, res) => {
        let modules = await Module.find().catch(err => res.status(400).send(err));
        res.send(modules);
    });
    app.get('/api/modules/:id', async (req, res) => {
        let module = await Module.findById(req.params.id).catch(err => res.status(400).send(err));
        res.send(module);
    })


    // CREATE 
    app.post('/api/modules', async (req, res) => {
        let modules = await Module.create(req.body).catch(err => res.status(400).send(err));
        res.send(modules);
    });

    // UPDATE
    app.put('/api/modules/:id', async (req, res) => {
        let course = await Module.create(req.body)
            .catch(err => res.status(400).send('Unable to create object', err));
        res.send(course);
    });
    app.put('/api/modules', async (req, res) => {
        let courses = await Modules.find(
            { _id: { $in: req.body.courseIDs } },
            { $set: req.body.params },
            { new: true }
        ).catch(err => res.status(400).send("Unable to update the selected Courses", err));
        res.send(courses);
    });

    // DELETE
    app.delete('/api/modules', async (req, res) => {
        let modules = await Module.remove().catch(err => res.status(400).send('Unable to completly remove Modules from Database', err));
        res.send(modules);
    });
    app.delete('/api/modules/:id', async (req, res) => {
        let module = Module.findByIdAndRemove(req.params.id).catch(err => res.status(400).send('Unable to delete the Module', err));
        res.send(module);
    });

}