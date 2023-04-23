const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const User = require('../../models/user');

const { DB_HOST_TEST, PORT, SECRET_KEY } = process.env;
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  email: 'test@mail.com',
  password: '12345',
  // token: jwt.sign({ _id: userOneId }, SECRET_KEY),
};

describe('test /api/users/login route', () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User(userOne);
    await user.save();
  });

  afterEach(async () => {});

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
    const res = await request(app).post('/api/users/login').send(loginData);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.email).toBe(loginData.email);
    expect(res.body.subscription).toBeDefined();
    const user = await User.findOne({ email: loginData.email });
    expect(res.body.email).toBe(loginData.email);
  });
});
