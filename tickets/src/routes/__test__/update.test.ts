import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

const createTicket = (cookie = signin()) => {
  return request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({ title: 'Valid ticket title', price: 20 });
};

describe('update ticket', () => {
  it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', signin())
      .send({ title: 'arstarstra', price: 20 })
      .expect(404);
  });

  it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({ title: 'arstarstra', price: 20 })
      .expect(401);
  });

  it('returns a 401 if the user does not own the ticket', async () => {
    const {
      body: { id },
    } = await createTicket();
    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', signin())
      .send({ title: 'arstarstra', price: 20 })
      .expect(401);
  });

  it('returns a 400 if the id is invalid', async () => {
    const id = 'rietnarientseirt';
    await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', signin())
      .send({ title: 'atastar', price: 20 })
      .expect(400);
  });

  it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = signin();
    const {
      body: { id },
    } = await createTicket(cookie);

    const testCases = [
      { title: '', price: 20 },
      { price: 20 },
      { title: 'arstarstar', price: -20 },
      { title: 'arstarstar', price: '' },
      { title: 'arstartsrt' },
    ];
    testCases.forEach(async testCase => {
      await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', cookie)
        .send(testCase)
        .expect(400);
    });
  });

  it('updates the ticket provided valid inputs', async () => {
    const cookie = signin();
    const {
      body: { id },
    } = await createTicket(cookie);
    const newTicket = { title: 'arstarstra', price: 20 };
    const { body: updatedTicket } = await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', cookie)
      .send(newTicket)
      .expect(200);
    expect(newTicket.title).toEqual(updatedTicket.title);
    expect(newTicket.price).toEqual(updatedTicket.price);
  });
});
