import request from 'supertest';
import { app } from '../../app';

it('clear the cookies after signing out', async () => {
    await request(app).post('/api/users/signup').send({
        email: 'test@test.com',
        password: 'password'
    });

    const response = await request(app).post('/api/users/signout').send({}).expect(200);

    console.log(response.get('Set-Cookie'));
})