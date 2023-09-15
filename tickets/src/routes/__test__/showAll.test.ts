import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ title: 'Valid ticket title', price: 20 });
};

describe('show all tickets', () => {
  it('can fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const { body } = await request(app).get('/api/tickets').send().expect(200);
    expect(body.length).toEqual(3);
  });

  it('returns an empty list if no tickets exist', async () => {
    const { body } = await request(app).get('/api/tickets').send().expect(200);
    expect(body.length).toEqual(0);
  });

  // it('can fetch a list of tickets', () => {});
});
