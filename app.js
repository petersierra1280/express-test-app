const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let patients = [];
let currentId = 1;

// Retrieve all patients
app.get('/patients', (req, res) => {
    res.json(patients);
});

// Retrieve a specific patient by ID
app.get('/patients/:id', (req, res) => {
    const patientId = parseInt(req.params.id, 10);
    if (!patientId) {
        return res.status(400).send('Missing ID param');
    }
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
        return res.status(404).send('Patient not found');
    }
    res.json(patient);
});

// Create a new patient
app.post('/patients', (req, res) => {
    const { name, age, diagnosis } = req.body;

    if (!name) {
        return res.status(400).send('Missing name param');
    }
    
    if (!age) {
        return res.status(400).send('Missing age param');
    }

    if (!diagnosis) {
        return res.status(400).send('Missing diagnosis param');
    }

    const existingPatient = patients.find(p => p.name === name);

    if (existingPatient) {
        return res.status(400).send('This patient\'s already a registered');
    }
    
    const newPatient = {
        id: currentId++,
        name,
        age,
        diagnosis
    };
    patients.push(newPatient);
    res.status(201).json(newPatient);
});

// Update an existing patient
app.put('/patients/:id', (req, res) => {
    const patientId = parseInt(req.params.id, 10);
    const patient = patients.find(p => p.id === patientId);
    if (!patient) {
        return res.status(404).send('Patient not found');
    }
    const { name, age, diagnosis } = req.body;
    patient.name = name || patient.name;
    patient.age = age || patient.age;
    patient.diagnosis = diagnosis || patient.condition;
    res.json(patient);
});

// Delete a patient by ID
app.delete('/patients/:id', (req, res) => {
    const patientId = parseInt(req.params.id, 10);
    const patientIndex = patients.findIndex(p => p.id === patientId);
    if (patientIndex === -1) {
        return res.status(404).send('Patient not found');
    }
    patients.splice(patientIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});