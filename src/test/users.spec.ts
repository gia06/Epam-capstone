import request from 'supertest';
import { loadApp } from '../loaders/app';
import { Application, response } from 'express';
import stoppable, { StoppableServer } from 'stoppable';
import { Server, createServer } from 'http';
jest.useFakeTimers();

describe('/users', () => {
  // let server: Application;
  let server: StoppableServer;
  let app: Application;
  let adminToken: string;
  const baseUrl = '/api';

  beforeAll(async () => {
    app = await loadApp();
    // server = await loadApp();
    server = stoppable(app.listen(3001));
  });

  afterAll(async () => {
    server.stop();
  });

  it('GET / should not grant access without authorization', async () => {
    const response = await request(server).get(`${baseUrl}/users`);

    expect(response.status).toBe(401);
  });

  it('GET / should not grant access to default user', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJyb2xlIjoiVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.PTl53thhEymdO0DTaBcXrCWEz0OPYlF08pqsaH5tf9g';

    const response = await request(server)
      .get(`${baseUrl}/users`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
  });

  it('POST / should successfully login admin', async () => {
    const loginParams = { email: 'admin@example.com', password: 'admin' };

    const response = await request(app).post(`${baseUrl}/auth/login`).send(loginParams);

    expect(response.status).toBe(200);
  });

  // it('GET / should  grant access to Admin', async () => {
  //   const token =
  //     'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI5MTczYzgyLTBiMzgtMTFnZC05Mjg0LTd0NzQ1NGM4Yzg5MSIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2OTk5NzI3NTUsImV4cCI6MTY5OTk4NzE1NX0.zMtzLeBOJbFbWIDdC5T5MYpyBrtvVfMc9TyYEdicp08UpenWav2aFbSURV2wGitoJhDo32ztzRPjd-gY2lfpXQ';

  //   const response = await request(server)
  //     .get(`${baseUrl}/users`)
  //     .set('Authorization', `Bearer ${token}`);

  //   expect(response.status).toBe(200);
  // });
});
