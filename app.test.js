const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let patients = [];
let currentId = 1;

app.get('/patients', (req, res) => {
    res.json(patients);
});

app.get('/patients/:id', (req, res) => {
    const patientId = parseInt(req.params.id, 10);
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
        return res.status(404).send('Patient not found');
    }
    res.json(patient);
});

app.post('/patients', (req, res) => {
    const newPatient = {
        id: currentId++,
        name: req.body.name,
        age: req.body.age,
        condition: req.body.condition
    };
    patients.push(newPatient);
    res.status(201).json(newPatient);
});

app.put('/patients/:id', (req, res) => {
    const patientId = parseInt(req.params.id, 10);
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
        return res.status(404).send('Patient not found');
    }
    patient.name = req.body.name || patient.name;
    patient.age = req.body.age || patient.age;
    patient.condition = req.body.condition || patient.condition;
    res.json(patient);
});

app.delete('/patients/:id', (req, res) => {
    const patientId = parseInt(req.params.id, 10);
    const patientIndex = patients.findIndex(p => p.id === patientId);
    if (patientIndex === -1) {
        return res.status(404).send('Patient not found');
    }
    patients.splice(patientIndex, 1);
    res.status(204).send();
});

describe('Patients API', () => {
    beforeEach(() => {
        // Reset patients array before each test
        patients = [];
        currentId = 1;
    });

    test('GET /patients - should return an empty array', async () => {
        const res = await request(app).get('/patients');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    test('POST /patients - should create a new patient', async () => {
        const newPatient = { name: 'John Doe', age: 30, condition: 'Flu' };
        const res = await request(app)
            .post('/patients')
            .send(newPatient);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({ id: 1, ...newPatient });
    });

    test('GET /patients/:id - should return a specific patient by ID', async () => {
        const newPatient = { name: 'John Doe', age: 30, condition: 'Flu' };
        await request(app)
            .post('/patients')
            .send(newPatient);

        const res = await request(app).get('/patients/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ id: 1, ...newPatient });
    });

    test('PUT /patients/:id - should update an existing patient', async () => {
        const newPatient = { name: 'John Doe', age: 30, condition: 'Flu' };
        await request(app)
            .post('/patients')
            .send(newPatient);

        const updatedPatient = { name: 'Jane Doe', age: 31, condition: 'Cold' };
        const res = await request(app)
            .put('/patients/1')
            .send(updatedPatient);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ id: 1, ...updatedPatient });
    });

    test('DELETE /patients/:id - should delete a patient by ID', async () => {
        const newPatient = { name: 'John Doe', age: 30, condition: 'Flu' };
        await request(app)
            .post('/patients')
            .send(newPatient);

        const res = await request(app).delete('/patients/1');
        expect(res.statusCode).toEqual(204);

        const getRes = await request(app).get('/patients/1');
        expect(getRes.statusCode).toEqual(404);
    });

    test('GET /patients/:id - should return 404 if patient not found', async () => {
        const res = await request(app).get('/patients/999');
        expect(res.statusCode).toEqual(404);
    });

    test('PUT /patients/:id - should return 404 if patient not found', async () => {
        const res = await request(app)
            .put('/patients/999')
            .send({ name: 'Non-existent' });
        expect(res.statusCode).toEqual(404);
    });

    test('DELETE /patients/:id - should return 404 if patient not found', async () => {
        const res = await request(app).delete('/patients/999');
        expect(res.statusCode).toEqual(404);
    });
});