const request = require('supertest');
const app = require('../server');

describe('GET /api/list', () => {
    it('should return a successful object response', async () => {
        const res = await request(app)
        .get('/api/statistic');

        expect(res.statusCode).toEqual(200);
        expect(res.body.isSuccessful).toEqual(true);
        expect(res.body.result).toEqual([]);
    })    
});

describe('POST /api/encode', () => {
    it('should shorten a url passed', async () => {
        const result = await request(app)
            .post('/api/encode')
            .send({
                url: 'https://google.com'
            });

            expect(result.statusCode).toEqual(200);
            expect(result.body.isSuccessful).toEqual(true);
    });
});

describe('POST /api/encode', () => {
    it('should fail on empty url', async () => {
        const result = await request(app)
            .post('/api/encode')
            .send({
                url: ''
            });

        expect(result.statusCode).toEqual(200);
        expect(result.body.isSuccessful).toEqual(false);
        expect(result.body.message).toEqual('Url not supplied');
    });
});

describe('POST /api/encode', () => {
    it('should fail on invalid url', async () => {
        const result = await request(app)
            .post('/api/encode')
            .send({
                url: 'test'
            });

        expect(result.statusCode).toEqual(200);
        expect(result.body.isSuccessful).toEqual(false);
        expect(result.body.message).toEqual('Invalid url');
    });
});


describe('DELETE /api/remove/:id', () => {
    it('should fail to delete url', async () => {
        const result = await request(app)
            .delete('/api/remove/dwew');

        expect(result.statusCode).toEqual(200);
        expect(result.body.isSuccessful).toEqual(false);
        expect(result.body.message).toEqual('Url with given id does not exist')
    });
});

describe('GET /api/decode/:id', () => {
    it('should not return any data', async () => {
        const result = await request(app)
            .get('/api/decode/dwee');

        expect(result.statusCode).toEqual(200);
        expect(result.body.isSuccessful).toEqual(false);
        expect(result.body.url).toEqual(undefined);
    })
});