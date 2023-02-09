import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('return a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app).put(`/api/tickets/${id}`).set('Cookie', global.signin()).send({
        title: 'asheno',
        price: 30
    }).expect(404);
});

it('return a 401 if the user is not authenticated', async () => {
    const response = await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: 'hsijfj',
        price: 20
    });

    await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie', global.signin()).send({
        title: "iehrejf",
        price: 1000
    }).expect(401);
});

it('return a 400 if the user does not own the ticket', async () => {
    const cookie = global.signin();

    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title: 'hsijfj',
        price: 20
    });

    await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie', cookie).send({
        title: '',
        price: 20
    }).expect(400);

    await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie', cookie).send({
        title: 'wuewue',
        price: -10
    }).expect(400);
});

it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signin();

    const response = await request(app).post('/api/tickets').set('Cookie', cookie).send({
        title: 'hsijfj',
        price: 20
    });

    await request(app).put(`/api/tickets/${response.body.id}`).set('Cookie', cookie).send({
        title: 'new title',
        price: 100
    }).expect(200);

    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send();

    expect(ticketResponse.body.title).toEqual('new title');
    expect(ticketResponse.body.price).toEqual(100);
});