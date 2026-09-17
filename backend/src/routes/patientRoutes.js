import express from 'express';
import { lookupPatient } from '../controllers/patientController.js';

const router = express.Router();

router.get('/lookup', lookupPatient);

export default router;
