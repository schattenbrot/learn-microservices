import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

describe('create', () => {
  it('has a route handler listening to /api/tickets for post requests', async () => {
    const { status } = await request(app).post('/api/tickets').send({});
    expect(status).not.toEqual(404);
  });

  it('can only be accessed if the user is signed in', async () => {
    request(app).post('/api/tickets').send({}).expect(401);
  });

  it('returns a status other than 401 if the user is signed in', async () => {
    const { status } = await request(app)
      .post('/api/tickets')
      .set('Cookie', signin())
      .send({});
    expect(status).not.toEqual(401);
  });

  it('returns an error if an invalid title is provided', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', signin())
      .send({
        title: '',
        price: 10,
      })
      .expect(400);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', signin())
      .send({
        price: 10,
      })
      .expect(400);
  });

  it('returns an error if an invalid price is provided', async () => {
    await request(app)
      .post('/api/tickets')
      .set('Cookie', signin())
      .send({
        title: 'lariseintsiars',
        price: -10,
      })
      .expect(400);

    await request(app)
      .post('/api/tickets')
      .set('Cookie', signin())
      .send({
        title: 'erantnarestar',
      })
      .expect(400);
  });

  it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = 'Valid title';

    await request(app)
      .post('/api/tickets')
      .set('Cookie', signin())
      .send({
        title,
        price: 20,
      })
      .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(title);
    expect(tickets[0].price).toEqual(20);
  });
});
