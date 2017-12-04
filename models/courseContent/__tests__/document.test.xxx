const mongoose = require('mongoose');
const request = require('supertest');

// Model to Test
const Document = require('../document');

const intializeTestDatabase = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/document_test', { useMongoClient: true });
    mongoose.connection
        .once('openUri', () => console.log("Good to go"))
        .on('error', (err) => console.log(err));
};

const clearTestDatabase = async () => {
    let {documents} = mongoose.connection.collections;
    await documents.drop();
}


// General Test Setup Steps

beforeAll(() => {
    return intializeTestDatabase();
});

afterAll(() => {
    return clearTestDatabase();
});


// Testing suite
describe('Managing Documents', function () {
    test('a single Doc can be stored on the server', async () => {
        let doc = new Document({
            title: 'test title',
            author: 'test author',
            body: 'test body',
            language: 'test langugage'
        });

        doc = await doc.save();
        let svdDoc = await Document.findById(doc.id);
        
        expect(doc.id).toEqual(svdDoc.id);
    })
})