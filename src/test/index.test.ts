import request from 'supertest';
// import { testApp } from '..';
import { Application } from 'express';
import { loadApp } from '../loaders/app';

describe('testing application', () => {
  let server: Application;
  const baseUrl: string = `/api`;

  beforeAll(async () => {
    (async () => {
      const app = await loadApp();

      app.listen(3001);
    })();
    // server = await testApp();
  });

  // afterAll(() => {
  //   // process.exit();
  //   // server.stop();
  // });

  it('GET / should return 400 status code for bad request ', async () => {
    const user = {
      firstName: 'testExample',
      lastName: 'testExample',
      title: 'testExample',
      summary: 'testExample',
      email: 'testExample@example.com',
      password: 'testExample',
    };

    const response = await request(server).post(`${baseUrl}/auth/register`).send(user);

    expect(response.status).toBe(400);
  });

  it('GET / should return 400 status code for wrong credentials  ', async () => {
    const loginParams = {
      email: 'wrongEmail@example.com',
      password: 'wrongPassword',
    };

    const response = await request(server).post(`${baseUrl}/auth/login`).send(loginParams);

    expect(response.status).toBe(400);
  });

  it('GET / should return 403 status code for wrong user role  ', async () => {
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVXNlciIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.c6uPnDsonDMfyVj8EtQ05mBWwspcoHOhiFzQn85lTH4';

    const response = await request(server)
      .get(`${baseUrl}/users`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(response.status).toBe(401);
  });

  it('GET / should return 401 status code unauthenticated users', async () => {
    const response = await request(server).get(`${baseUrl}/users`);

    expect(response.status).toBe(401);
  });

  it('GET / should return 403 status code for wrong user role  ', async () => {
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVXNlciIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.c6uPnDsonDMfyVj8EtQ05mBWwspcoHOhiFzQn85lTH4';

    const response = await request(server)
      .get(`${baseUrl}/users`)
      .set('Authorization', `Bearer ${jwt}`);

    expect(response.status).toBe(401);
  });
});
