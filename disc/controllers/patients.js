"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const apiKeyValidation_1 = __importDefault(require("../middlewares/apiKeyValidation"));
let patients = [];
let currentId = 1;
// Retrieve all patients
router.get('/', (req, res, next) => {
    try {
        res.json(patients);
    }
    catch (error) {
        next(error);
    }
});
// Retrieve a specific patient by ID
router.get('/:id', (req, res, next) => {
    try {
        const patientId = parseInt(req.params.id, 10);
        if (!patientId) {
            return res.status(400).send({ error: 'Missing ID param' });
        }
        const patient = patients.find(p => p.id === patientId);
        if (!patient) {
            return res.status(404).send({ error: 'Patient not found' });
        }
        res.json(patient);
    }
    catch (error) {
        next(error);
    }
});
// Create a new patient
router.post('/', (req, res, next) => {
    try {
        const { name, age, diagnosis } = req.body;
        if (!name) {
            return res.status(400).send({ error: 'Missing name param' });
        }
        if (!age) {
            return res.status(400).send({ error: 'Missing age param' });
        }
        if (!diagnosis) {
            return res.status(400).send({ error: 'Missing diagnosis param' });
        }
        const existingPatient = patients.find(p => p.name === name);
        if (existingPatient) {
            return res.status(400).send({ error: 'This patient\'s already a registered' });
        }
        const newPatient = {
            id: currentId++,
            name,
            age,
            diagnosis
        };
        patients.push(newPatient);
        res.status(201).json(newPatient);
    }
    catch (error) {
        next(error);
    }
});
// Update an existing patient
router.put('/:id', (req, res, next) => {
    try {
        const patientId = parseInt(req.params.id, 10);
        const patient = patients.find(p => p.id === patientId);
        if (!patient) {
            return res.status(404).send({ error: 'Patient not found' });
        }
        const { name, age, diagnosis } = req.body;
        patient.name = name || patient.name;
        patient.age = age || patient.age;
        patient.diagnosis = diagnosis || patient.diagnosis;
        res.json(patient);
    }
    catch (error) {
        next(error);
    }
});
// Delete a patient by ID
router.delete('/:id', apiKeyValidation_1.default, (req, res, next) => {
    try {
        const patientId = parseInt(req.params.id, 10);
        const patientIndex = patients.findIndex(p => p.id === patientId);
        if (patientIndex === -1) {
            return res.status(404).send({ error: 'Patient not found' });
        }
        patients.splice(patientIndex, 1);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
