import request from 'supertest';
import { app } from '../../app';

it('return a 201 on successful signup', async () => {
    return request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'password'
    });
});

it('return a 400 with an invalid email', async () => {
    return request(app).post('/api/users/signup').send({
        email: 'test.com',
        password: 'password'
    });
});

it('return a 400 with an invalid password', async () => {
    return request(app).post('/api/users/signup').send({
        email: 'test.com',
        password: 'p'
    });
});

it('return a 400 with missing email and password', async () => {
    return request(app).post('/api/users/signup').send({
       });
});

it('return a 400 with missing email or password', async () => {
    await request(app).post('/api/users/signup').send({
        email: "test@test.com"
    });
    await request(app).post('/api/users/signup').send({
        password: "password"
    });
});

it('disallow duplicate emails   ', async () => {
    await request(app).post('/api/users/signup').send({
        email: "test@test.com",
        password: 'password'
    });
    await request(app).post('/api/users/signup').send({
        email: "test@test.com",
        password: "password"
    }).expect(400);
});

it('set a cookie after successful signup', async () => {
    const response = await request(app).post('/api/users/signup').send({
        email: "test@test.com",
        password: 'password'
    });

    expect(response.get('Set-Cookie'));
});