const expect = require('expect');

// Model imports
const Course = require('../models/courseContent/course');
const Module = require('../models/courseContent/module');
const Lesson = require('../models/courseContent/lesson');
const Document = require('../models/courseContent/document');


describe('Create Elements in Database', function () {
    
    // // Create individual Documents in DB
    it('creates a Course', async function () {
        let course = new Course({
            title: 'My first Course',
            summary: 'My first summary'
        });
        course = await course.save();
        expect(Course.findById(course.id)).toBeTruthy();
    });
    it('creates a Module', async function () {
        let mod = new Module({
            title: 'My first Module',
            summary: 'My first summary'
        });
        mod = await mod.save();
        
        expect(Module.findById(mod.id)).toBeTruthy();
    });
    it('creates a Lesson', async function () {
        let lesson = new Lesson({
            title: 'My first Lesson',
            summary: 'My first summary'
        });
        lesson = await lesson.save();
        expect(Lesson.findById(lesson.id)).toBeTruthy();
    });
    it('creates a Document', async function () {
        let document = new Document({
            title: 'My first Document',
            summary: 'My first summary'
        });
        document = await document.save();
        expect(Document.findById(document.id)).toBeTruthy();
    });
    
    // Create multiple Documents in DB
    it('creates multiple Courses in DB', async function () {
        let course1, course2, course3;
        course1 = new Course({
            title: 'Course1',
            summary: 'My summary 1'
        });
        course2 = new Course({
            title: 'Course2',
            summary: 'My summary 2'
        });
        course3 = new Course({
            title: 'Course3',
            summary: 'My summary 3'
        });
        // Save models to DB
        await Course.create([course1, course2, course3]);
        // Assert
        expect(Course.findOne({title: 'Course1'})).toBeTruthy();
        expect(Course.findOne({title: 'Course2'})).toBeTruthy();
        expect(Course.findOne({title: 'Course3'})).toBeTruthy();
    });
    // Multiple Modules
    it('creates multiple Modules in DB', async function () {
        let mod1, mod2, mod3;
        mod1 = new Module({
            title: 'mod1',
            summary: 'My summary 1'
        });
        mod2 = new Module({
            title: 'mod2',
            summary: 'My summary 2'
        });
        mod3 = new Module({
            title: 'mod3',
            summary: 'My summary 3'
        });
        // Save models to DB
        await Module.create([mod1, mod2, mod3]);
        // Assert
        expect(Module.findOne({title: 'mod1'})).toBeTruthy();
        expect(Module.findOne({title: 'mod2'})).toBeTruthy();
        expect(Module.findOne({title: 'mod3'})).toBeTruthy();
    });
    // Multiple Lessons
    it('creates multiple Lessons in DB', async function () {
        let lesson1, lesson2, lesson3;
        lesson1 = new Lesson({
            title: 'lesson1',
            summary: 'My summary 1'
        });
        lesson2 = new Lesson({
            title: 'lesson2',
            summary: 'My summary 2'
        });
        lesson3 = new Lesson({
            title: 'lesson3',
            summary: 'My summary 3'
        });
        // Save models to DB
        await Lesson.create([lesson1, lesson2, lesson3]);
        // Assert
        expect(Lesson.findOne({title: 'lesson1'})).toBeTruthy();
        expect(Lesson.findOne({title: 'lesson2'})).toBeTruthy();
        expect(Lesson.findOne({title: 'lesson3'})).toBeTruthy();
    });
    // Multiple Documents
    it('creates multiple Documents in DB', async function () {
        let doc1, doc2, doc3;
        doc1 = new Document({
            title: 'doc1',
            summary: 'My summary 1'
        });
        doc2 = new Document({
            title: 'doc2',
            summary: 'My summary 2'
        });
        doc3 = new Document({
            title: 'doc3',
            summary: 'My summary 3'
        });
        // Save models to DB
        await Document.create([doc1, doc2, doc3]);
        // Assert
        expect(Document.findOne({title: 'doc1'})).toBeTruthy();
        expect(Document.findOne({title: 'doc2'})).toBeTruthy();
        expect(Document.findOne({title: 'doc3'})).toBeTruthy();
    });
})