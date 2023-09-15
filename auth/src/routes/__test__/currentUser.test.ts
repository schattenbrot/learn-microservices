import request from 'supertest';
import { app } from '../../app';

describe('current user route', () => {
  it('responds with details of the current user', async () => {
    const cookie = await global.signup();

    const { body } = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie)
      .send()
      .expect(200);

    expect(body.currentUser.email).toEqual('test@test.com');
  });

  it('responds with a 401 if not authenticated', async () => {
    const { body } = await request(app)
      .get('/api/users/currentuser')
      .send()
      .expect(200);
    expect(body.currentUser).toBeNull();
  });
});
