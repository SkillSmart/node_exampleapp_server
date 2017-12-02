const assert = require('assert');

// Model imports
const Course = require('../models/courseContent/course');
const Module = require('../models/courseContent/module');
const Lesson = require('../models/courseContent/lesson');
const Document = require('../models/courseContent/document');


describe('Create Elements in Database', function () {
    
    // Create individual Documents in DB
    it('creates a Course', async function () {
        let course = new Course({
            title: 'My first Course',
            summary: 'My first summary'
        });
        course = await course.save();
        assert(Course.findById(course.id));
    });
    it('creates a Module', async function () {
        let mod = new Module({
            title: 'My first Module',
            summary: 'My first summary'
        });
        mod = await mod.save();
        assert(Module.findById(mod.id));
    });
    it('creates a Lesson', async function () {
        let lesson = new Lesson({
            title: 'My first Lesson',
            summary: 'My first summary'
        });
        lesson = await lesson.save();
        assert(Lesson.findById(lesson.id));
    });
    it('creates a Document', async function () {
        let document = new Document({
            title: 'My first Document',
            summary: 'My first summary'
        });
        document = await document.save();
        assert(Document.findById(document.id));
    });


    // Create multiple Documents in DB



    // 
})