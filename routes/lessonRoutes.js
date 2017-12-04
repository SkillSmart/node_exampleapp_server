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
        lessons = await Lesson.create(req.body)
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
        let body = _.pick([
            'title', 'summary', 'videoURL', 'body', 'documents'
        ])
        let lessons = await Lesson.find(
            { _id: { $in: req.body.lessonIDs } },
            { $set: req.body.params },
            { new: true })
            .catch(err => res.status(400).send(err));
        res.send(lessons);
    });
    app.put('/api/lessons/:id', async (req, res) => {
        let lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .catch(err => res.status(400).send(err));
        res.send(lesson);
    });
    
    // DELETE
    app.delete('/api/lessons', async (req, res) => {
        let lessons = await Lesson.remove()
            .catch(err => res.status(400).send(err));
        if (!lessons) res.status(404).send('Could not find any lessons. They might have already been deleted.');
        res.send(lessons);
    });
    app.delete('/api/lessons/:id', async (req, res) => {
        let rmvLesson = await Lesson.findByIdAndRemove(req.params.id).catch(err => res.status(400).send(err));
        if (!rmvLesson) res.status(404).send("File does not exist on Server. Might have already been deleted.");
        res.send(rmvLesson);
    });

}