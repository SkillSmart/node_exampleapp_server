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
        if (!course) return res.status(500).send("Unable to create Course. Please store your changes locally and try again later.");
        // Successfully created
        res.send(course);
    });
    app.delete('/api/courses/', async (req, res) => {
        let courses = await Course.remove({}).catch(err => res.status(404).send("Unable to drop collection of Courses.", err));
        res.send(courses);
    });
    app.put('/api/courses/', async (req, res) => {
        // console.log(req.body.courseIDs);
        // Update multiple objects
        let courses = await Course.update(
            {_id: {$in: req.body.courseIDs}},
            {$set: req.body.params},
            {multi: true}
        ).catch(err => res.send(err));
        
        res.status(200).send(courses);
    })

    // Work with individual Course
    app.get('/api/courses/:id', async (req, res) => {
        let course = await Course.findById(req.params.id).catch(err => res.status(404).send(err));
        res.send(course);
    });
    app.put('/api/courses/:id', async (req, res) => {
        let body = _.pick(req.body, [
            'title',
            'summary',
            // TODO: Complete this part
        ])
        let course = Course.findByIdAndUpdate(req.params.id, body,
            { new: true },
            (err, course) => { if (err) return res.status(400).send(err) })
    });
    app.delete('/api/courses/:id', async (req, res) => {
        let course = await Course.findByIdAndRemove(req.params.id).catch(err => res.status(500).send("Unable to delete Course from Database."));
        res.send(course);
    });


    //COURSE MANAGEMENT - STUDENT
    /**Enable the STUDENT to manage their COURSES*/

    // List all my enrolled courses
    app.get('/api/student/:userName/courses/', async (req, res) => {
        res.send('Course List for Student ' + req.params.userName);
    })

    // List all my faved courses
    app.get('/api/student/:userName/courses/favorites', async (req, res) => {
        res.send('Favorite Courses for the Student', + req.params.userName)
    })

    // List all my archived courses


};