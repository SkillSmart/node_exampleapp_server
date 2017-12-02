const assert = require('assert');
// Auth Model
const User = require('../models/auth/user');
// const Creator = require('../models/auth/creator');
// const Moderator = require('../models/auth/moderator');

// CourseContent Model
const Course = require('../models/courseContent/course');
const Module = require('../models/courseContent/module');
const Lesson = require('../models/courseContent/lesson');
const Rating = require('../models/courseContent/rating');
const Document = require('../models/courseContent/document');

describe('Read a CourseContent Entry from the Database', function () {

    let firstCourse, firstModule, firstLesson, firstRating, firstDocument;

    beforeEach(function (done) {
        // Create a sample of each Module
        firstCourse = new Course({
            title: "My first Course",
            summary: "First Course summary"
        });
        firstModule = new Module({
            title: "My first Module",
            summary: 'First Module summary',
        });
        firstLesson = new Lesson({
            title: "My first Lesson",
            body: 'First Lesson Body'
        });
        firstDocument = new Document({
            title: "My first Document",
            body: "My first Document Body"
        });
        // Second Set
        secondCourse = new Course({
            title: "My second Course",
            summary: "Second Course summary"
        });
        secondModule = new Module({
            title: "My second Module",
            summary: 'Second Module summary',
        });
        secondLesson = new Lesson({
            title: "My second Lesson",
            body: 'Second Lesson Body'
        });
        secondDocument = new Document({
            title: "My second Document",
            body: "My second Document Body"
        });
        secondRating = {
            rating: 5,
            feedbackBody: "A superb experience!!!"
        };

        Promise.all([firstCourse.save(), firstModule.save(), firstLesson.save(), firstDocument.save()])
            .then(() => done()).catch(err => console.log(err));
    })

    // Retrieve Element by ID
    it('retrieves a Course by ID', async function () {
        let course = await Course.findById(firstCourse._id);
        assert(course.id.toString() === firstCourse.id.toString());
    });
    it('retrieves a Module by ID', async function () {
        let mod = await Module.findById(firstModule._id);
        assert(mod.id.toString() === firstModule.id.toString());
    });
    it('retrieves a Lesson by ID', async function () {
        let lesson = await Lesson.findById(firstLesson.id);
        assert(lesson.id.toString() === firstLesson.id.toString());
    });
    it('retrieves a Document by ID', async function () {
        let document = await Document.findById(firstDocument.id);
        assert(document.id.toString() === firstDocument.id.toString());
    });

    // Retrieve Elements by Attribute
    it('retrieves a Course by Attribute', async function () {
        let course = await Course.findOne({title: "My first Course"});
        assert(course.summary === "First Course summary");
    });
    it('retrieves a Module by Attribute', async function () {
        let mod = await Module.findOne({title: "My first Module"});
        assert(mod.summary === 'First Module summary');
    });
    it('retrieves a Lesson by Attribute', async function () {
        let lesson = await Lesson.findOne({title: "My first Lesson"});
        assert(lesson.body === 'First Lesson Body');
    });
    it('retrieves a Document by Attribute', async function () {
        let document = await Document.findOne({body: 'My first Document Body'})
        assert(document.body === 'My first Document Body');
    });

    // Retrieve complete List of Elements
    it('retrieve a List of Courses', async function () {
        let courses = await Course.find();
        assert(courses.length === 2);
    });
    it('retrieve a List of Modules', async function () {
        let modules = await Module.find();
        assert(modules.length === 2);
    });
    it('retrieve a List of Lessons', async function () {
        let lessons = await Lesson.find();
        assert(lessons.length === 2);
    });
    it('retrieve a List of Documents', async function () {
        let documents = await Document.find();
        assert(documents.length === 2);
    });

})