const _ = require('lodash');

const Quiz = require('../models/courseContent/quiz/quiz');

module.exports = (app) => {

    // CREATE
    app.post('/api/quizzes', async (req, res) => {
        let quizzes = await Quiz.create(req.body).catch(err => res.status(400).send(err));
        res.send(quizzes);
    });

    // READ
    app.get('/api/quizzes', async (req, res) => {
        let quizzes = await Quiz.find().catch(err => res.status(400).send(err));
        res.send(quizzes);
    });
    app.get('/api/quizzes/:id', async (req, res) => {
        let quiz = await Quiz.findById(req.params.id).catch(err => res.status(400).send(quiz));
        res.send(quiz);
    });

    // UPDATE
    app.put('/api/quizzes', async (req, res) => {
        let quizzes = await Quiz.find(
            {_id: { $in: req.body.moduleIDs}}, 
            {$set: req.body.params}, 
            {new: true}).catch(err => res.status(400).send(err));
        res.send(quizzes);
    });
    app.put('/api/quizzes/:id', async (req, res) => {
        let quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .catch(err => res.status(400).send(err));
        res.send(quiz);
    });
    // DELETE
    app.delete('/api/quizzes', async (req, res) => {
        let quizzes = await Quiz.remove().catch(err => res.status(400).send(err));
        res.send(quizzes);
    });
    app.delete('/api/quizzes/:id', async (req, res) => {
        let quizzes = await Quiz.findByIdAndRemove(req.params.id).catch(err => res.status(400).send(err));
        res.send(quizzes);
    });


}