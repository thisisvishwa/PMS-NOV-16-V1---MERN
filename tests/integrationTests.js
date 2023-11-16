```javascript
const request = require('supertest');
const app = require('../server/server.js');
const User = require('../server/models/User.js');
const Password = require('../server/models/Password.js');

describe('Integration Tests', () => {
  let testUser;
  let testPassword;

  beforeAll(async () => {
    testUser = new User({
      name: 'Test User',
      email: 'testuser@gmail.com',
      password: 'TestPassword123',
      mfaStatus: false,
    });

    await testUser.save();

    testPassword = new Password({
      userId: testUser._id,
      password: 'TestPassword123',
      passwordStrength: 'Strong',
    });

    await testPassword.save();
  });

  afterAll(async () => {
    await User.deleteMany();
    await Password.deleteMany();
  });

  test('User Registration', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({
        name: 'New User',
        email: 'newuser@gmail.com',
        password: 'NewPassword123',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('registrationSuccess');
  });

  test('User Authentication', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'testuser@gmail.com',
        password: 'TestPassword123',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('loginSuccess');
  });

  test('Password Storage', async () => {
    const response = await request(app)
      .post('/passwords/store')
      .send({
        userId: testUser._id,
        password: 'NewPassword123',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('passwordUpdateSuccess');
  });

  test('Password Retrieval', async () => {
    const response = await request(app)
      .get(`/passwords/retrieve/${testPassword._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.password).toBe('TestPassword123');
  });

  test('Password Update', async () => {
    const response = await request(app)
      .put(`/passwords/update/${testPassword._id}`)
      .send({
        password: 'UpdatedPassword123',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('passwordUpdateSuccess');
  });

  test('Password Deletion', async () => {
    const response = await request(app)
      .delete(`/passwords/delete/${testPassword._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('passwordDeleteSuccess');
  });

  test('Password Reset', async () => {
    const response = await request(app)
      .post('/users/reset-password')
      .send({
        email: 'testuser@gmail.com',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('passwordResetSuccess');
  });

  test('Password Sharing', async () => {
    const response = await request(app)
      .post(`/passwords/share/${testPassword._id}`)
      .send({
        email: 'newuser@gmail.com',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('passwordShareSuccess');
  });

  test('Password Generation', async () => {
    const response = await request(app)
      .get('/passwords/generate');

    expect(response.statusCode).toBe(200);
    expect(response.body.password).toBeDefined();
  });

  test('Password Strength Checker', async () => {
    const response = await request(app)
      .post('/passwords/check-strength')
      .send({
        password: 'TestPassword123',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.strength).toBe('Strong');
  });

  test('Password Expiry Notifications', async () => {
    const response = await request(app)
      .get(`/users/notify-expiry/${testUser._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('passwordExpiryNotificationSuccess');
  });

  test('Multi-factor Authentication Setup', async () => {
    const response = await request(app)
      .post(`/users/setup-mfa/${testUser._id}`)
      .send({
        mfaStatus: true,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('mfaSetupSuccess');
  });
});
```