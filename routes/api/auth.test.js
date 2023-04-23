const mongoose = require('mongoose');
const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../../app');
const User = require('../../models/user');

const { DB_HOST_TEST, PORT } = process.env;

describe('test /api/users/ routes', () => {
  let server = null;

  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    await User.deleteMany({});
    server.close();
    await mongoose.connection.close();
  });

  test('test register route with correct data', async () => {
    const registerData = {
      email: 'mmm@mail.com',
      password: '12345',
    };

    const res = await request(app)
      .post('/api/users/register')
      .send(registerData);
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(registerData.email);
    expect(res.body.subscription).toBeDefined();

    const user = await User.findOne({ email: registerData.email });
    expect(res.body.email).toBe(registerData.email);
  });

  test('test login route with correct data', async () => {
    const loginData = {
      email: 'test@mail.com',
      password: '12345',
    };

    const hashPassword = await bcrypt.hash(loginData.password, 10);
    const testUser = {
      email: loginData.email,
      password: hashPassword,
    };
    await new User(testUser).save();

    const res = await request(app).post('/api/users/login').send(loginData);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(loginData.email);
    expect(res.body.user.subscription).toBeDefined();
  });
});
