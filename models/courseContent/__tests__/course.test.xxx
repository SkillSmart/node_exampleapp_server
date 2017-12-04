const mongoose = require('mongoose');
const request = require('supertest');

// Model to Test
const Course = require('../course');

const intializeTestDatabase = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/test_webserver', { useMongoClient: true });
    mongoose.connection
        .once('openUri', () => console.log("Good to go"))
        .on('error', (err) => console.log(err));
};

const clearTestDatabase = async () => {
    let {courses} = mongoose.connection.collections;
    await courses.drop();
}


// General Test Setup Steps

beforeAll(() => {
    return intializeTestDatabase();
});

afterAll(() => {
    return clearTestDatabase();
});

// Test basic Crud
// Create One
test('Course can be saved to Database', async () => {
    let course = new Course({
        title: "a",
        summary: 'b'
    });

    course = await course.save();
    svdCourse = await Course.findById(course.id);

    expect(course.id).toEqual(svdCourse.id);
});
// Create multiple
test('Multiple courses can be saved to Database', async () => {
    let course1, course2, course3;
    // Setup courses
    course1 = {
        title: 'first',
        summary: 'first summary',
        body: 'first body'
    };
    course2 = {
        title: 'second',
        summary: 'second summary',
        body: 'second body'
    };
    course3 = {
        title: 'third',
        summary: 'third summary',
        body: 'third body'
    };
    // Store list of courses to the DB
    courses = await Course.create([course1, course2, course3]);
    expect(courses).toHaveLength(3);
});
// Delete
test('Course can be deleted from the Database', async() => {
    let course = new Course({
        title: 'first',
        summary: 'first summary',
        body: 'first body'
    });
    // Store to DB
    course = await course.save();
    await Course.findByIdAndRemove(course.id);
    expect(await Course.findById(course.id)).toBeNull();
});
// Update
test('Updated Course values are set and returned', async () => {
    let course = new Course({
        title: 'first',
        summary: 'first summary',
        description: 'first body'
    });
    // update to
    let upd = {
        title: 'new title',
        summary: 'new summary',
        description: 'new body'
    };
    let updCourse = await Course.findOneAndUpdate(course.id, upd, {new: true});
    expect(updCourse.title).toEqual('new title');
    expect(updCourse.summary).toEqual('new summary');
    expect(updCourse.description).toEqual('new body');
})





