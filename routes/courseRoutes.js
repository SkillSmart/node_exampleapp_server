// Course Routes defines all routes related to handling 
// the Course Collection
const _ = require('lodash');

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.send("Welcome to the Page!")
    });

    // Basic CRUD for Courses
    app.get('/api/courses', (req, res) => {
        res.send('A list of courses')
    });
    app.post('/api/course', (req, res) => {
        console.log(JSON.stringify(req));
    });


};