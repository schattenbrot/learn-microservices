import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

describe('show', () => {
  it('returns a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app).get(`/api/tickets/${id}`).send().expect(404);
  });

  it('returns the ticket if the ticket is found', async () => {
    const ticket = {
      title: 'Valid Title',
      price: 20,
    };
    const {
      body: { id },
    } = await request(app)
      .post('/api/tickets')
      .set('Cookie', signin())
      .send(ticket)
      .expect(201);

    const { body } = await request(app)
      .get(`/api/tickets/${id}`)
      .send()
      .expect(200);
    expect(body.title).toEqual(ticket.title);
    expect(body.price).toEqual(ticket.price);
  });

  // it('returns the ticket if the ticket is found', async () => {});
});
