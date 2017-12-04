const _ = require('lodash');

// Model
const Lesson = require('../models/courseContent/lesson');


module.exports = (app) => {

    // CREATE
    app.post('/api/lessons/', async (req, res) => {
        let body = _.pick([
            'title',
            'summary',
        ]);
        lessons = await Lesson.create(body)
            .catch(err => res.status(400).send(err));
        res.send(lessons);
    })

    // READ
    app.get('/api/lessons', async (req, res) => {
        let lessons = await Lesson.find().catch(err => res.status(400).send(err));
        res.send(lessons);
    });
    app.get('/api/lessons/:id', async (req, res) => {
        let lesson = await Lesson.findById(req.params.id).catch(err => res.status(400).send(err));
        res.send(lesson);
    });
    // UPDATE 
    app.put('/api/lessons', async (req, res) => {
        let lessons = await Lesson.find(
            {_id: { $in: req.body.lessonIDs}}, 
            {$set: req.body.params}, 
            {new: true})
            .catch(err => res.status(400).send(err));
        res.send(lessons);
    });
    app.put('/api/lessons/:id', async (req, res) => {
        let lesson = await Lesson.findByIdAndUpdate( req.params.id, req.body)
            .catch(err => res.status(400).send(err));
        res.send(lesson);
    });
    // DELETE
    app.delete('/api/lesson', async (req, res) => {
        let status = await Lesson.remove().catch(err => res.status(400).send(err));
        res.send(status);
    });
    app.delete('/api/lesson/:id', async (req, res) => {
        let status = await Lesson.findByIdAndRemove(req.params.id).catch(err => res.status(400).send(err));
        res.send(status);
    });

}