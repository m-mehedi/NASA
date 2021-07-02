const request = require('supertest');
const app = require('../../app');

describe('Test GET /launch', ()=>{
    test('It should respond 200 success', async () => {
        const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    })
});



describe('Test POST /launch', () => {
    const completeLaunchData = {
        mission: 'XI 1',
        rocket: 'NCC 170',
        target: 'Kepler-144b',
        launchDate: 'January 4, 3038'
    };

    const launchDataWithoutDate = {
        mission: 'XI 1',
        rocket: 'NCC 170',
        target: 'Kepler-144b'
    };

    const launchDataWithInvalidDate = {
        mission: 'XI 1',
        rocket: 'NCC 170',
        target: 'Kepler-144b',
        launchDate: 'Mee'
    };

    test('It should respond with 201 created', async () => {
        const response = await request(app)
        .post('/launches')
        .send({
           mission: 'XI 1',
           rocket: 'NCC 170',
           target: 'Kepler-144b',
           launchDate: 'January 4, 3038'
        })
        .expect('Content-type', /json/)
        .expect(201);
        

    const requestData = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestData);
    
    expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('It should catch missing required properties', async () => {
        
        const response = await request(app)
        .post('/launches')
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property',
        });
    });
    test('It should catch invalid dates', async () => {
        const response = await request(app)
        .post('/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid launch date',
        });
    });
});