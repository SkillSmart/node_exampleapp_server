const request = require('supertest');
const app = require('./../../server');

// Model
const Course = require('../../models/courseContent/course');


describe('Server Routes for Course API', function () {

    let course1, course2, course3;
    
    beforeEach(async () => {

        course1 = new Course({
            title: 'test',
            summary: 'test'
        });
        course2 = new Course({
            title: 'test',
            summary: 'test'
        });
        course3 = new Course({
            title: 'test',
            summary: 'test'
        });

        await Promise.all([course1.save(), course2.save(), course3.save()])
    });

    // GET Route tests
    test('GET api/courses returns a list of courses', async () => {
        request(app)
            .get('/api/courses')
            .expect(200)
            .expect((res) => {
                expect(res.body).haveLength(2);
            })
    })

    // POST Route tests
    test('should update multiple courses in a batch', async () => {

        let query = {
            courseIDs: [course1.id, course2.id, course3.id],
            params: {
                title: "A fancy new title",
                summary: "A fancy new summary"
            }
        }
        await request(app)
            .put('/api/courses')
            .send(query)
            .expect(res => {
                expect(res.body.n).toEqual(3);
                expect(res.body.nModified).toEqual(3);
                expect(res.body.ok).toEqual(1);
            })
        // .end()
    });
    test('should create an individual course', async () => {
        let course = {
            title: 'Test course',
            summary: 'Test summary'
        };
        request(app)
            .post('/api/courses')
            .send(course)
            .expect(200)
            .expect(course => {
                expect(course.title).toBe('Test course');
                expect(course.summary).toBe('Test summary');
            })
            .end((err, result) => err ? console.log(err) : undefined);
    });
    test('should not create an invalid course', async () => {
        request(app)
            .post('/api/courses')
            .send({})
            .expect(200)
            .expect(course => {
                expect(course).toBeFalsy();
            })
            .end(err => console.log(err))
    });



    // PUT Route Tests

})