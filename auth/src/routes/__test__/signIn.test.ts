import request from 'supertest';
import { app } from '../../app';

describe('signin route', () => {
  it('fails when a email that does not exist is used', async () => {
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(400);
  });

  it('fails when an incorrect password is used', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'passwor',
      })
      .expect(400);
  });

  it('responds with a cookie when given valid credentials', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    const response = await request(app).post('/api/users/signin').send({
      email: 'test@test.com',
      password: 'password',
    });

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
