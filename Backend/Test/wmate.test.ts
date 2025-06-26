import request from 'supertest';
import app from '../server'


describe('GET /api/getTrainStationInfo', () => {

     it('should return a hello message', async () => {
         const payload = {
           "code": "A01"
         }
         const res = await request(app).get('/api/wmata/getStationsInfo').send(payload);
         expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe('success got stations info');
     })
   
})

