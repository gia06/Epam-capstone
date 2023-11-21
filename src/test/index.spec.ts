import request from 'supertest';
import { loadApp } from '../loaders/app';
import { Application } from 'express';
import stoppable, { StoppableServer } from 'stoppable';
import { Server, createServer } from 'http';
jest.useFakeTimers();

describe('GET /', () => {
  // let server: Application;
  let server: StoppableServer;
  let app: Application;
  const baseUrl = '/api';

  beforeAll(async () => {
    app = await loadApp();
    // server = await loadApp();
    server = stoppable(app.listen(3000), 1000);
  });

  afterAll(() => {
    server.stop((err) => {
      if (err) {
        console.error('Error occurred while stopping the server:', err);
      } else {
        console.log('Server stopped');
      }
    });
  });

  it('', async () => {
    const response = await request(server).get(`${baseUrl}/users`);

    expect(response.status).toBe(401);
  });

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
