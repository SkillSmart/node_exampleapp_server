const request = require('supertest');
const app = require('./../../server');

// Model
const Module = require('../../models/courseContent/module');

describe('Server Routes for MODULE API', function () {

    afterEach(async () => {
        Module.collection.drop();
    })

    let module1, module2, module3;

    beforeEach(async () => {
        module1 = new Module({
            title: 'Test title1',
            summary: 'Test summary1'
        });
        module2 = new Module({
            title: 'Test title2',
            summary: 'Test summary2'
        });
        module3 = new Module({
            title: 'Test title3',
            summary: 'Test summary3'
        });

        await Module.create([module1, module2, module3]);
    });

    // // GET Route tests
    test('can read a list of all Modules on the Server', (req, res) => {
        request(app)
            .get('/api/modules')
            .expect(200)
            .expect((courses) => {
                // console.log("Logging courses:", courses);
                expect(courses.body).toHaveLength(3);
            })
            .end(err => res.send(err));

    });
    test('can read a single Module by its id', (req, res) => { 
        // console.log(module1);
     request(app)
        .get(`/api/modules/${module1._id}`)
        .expect(200)
        .end()
    })
})