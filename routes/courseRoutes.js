// Course Routes defines all routes related to handling 
// the Course Collection
const _ = require('lodash');

// Module imports
const Course = require('../models/courseContent/course');

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.send("Welcome to the Page!")
    });

    // Basic CRUD for Courses
    app.get('/api/courses', async (req, res) => {
        courses = await Course.find().catch(err => res.status(400).send("Unable to fetch list of courses from the server. Please try again"));
        res.send(courses);
    });
    app.post('/api/courses', async (req, res) => {
        // Creates a new course
        let course = await Course.create(req.body);
        if(!course) return res.status(500).send("Unable to create Course. Please store your changes locally and try again later.");
        // Successfully created
        course = await course.save().catch(err => res.status(400).send(err));
        res.send(course);
    });
    app.delete('/api/course/:id', (req, res) => {
        Course.findByIdAndRemove(req.params.id, (err) => {
            if (err) return res.status(400).send(`Unable to the Course with ID ${req.body.id}`);
            // Course was successfully deleted.
        });
    });
    app.put('/api/course/:id', async (req, res) => {
        let body = _.pick(req.body, [
            'title',
            'summary',
            // TODO: Complete this part
        ])

        let course = Course.findByIdAndUpdate(req.params.id, body,
            { new: true },
            (err, course) =>{ if (err) return res.status(400).send(err)})
    })


};