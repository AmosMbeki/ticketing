import request from 'supertest';
import { app } from '../../app';

it('fails when email that does not exist is supplied', async() => {
    await request(app).post('/api/users/signin').send({
        email: 'test@test.com',
        password: 'password'
    }).expect(400);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'password'
    });

    await request(app).post('/api/users/signin').send({
        email: 'test@test.com',
        password: 'etryuyifh'
    }).expect(400);
});

it('responds with a cookie when given valid credetials', async () => {
    await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'password'
    });

    const response = await request(app).post('/api/users/signin').send({
        email: 'test@test.com',
        password: 'password'
    });

    expect(response.get('Set-Cookie'));
})