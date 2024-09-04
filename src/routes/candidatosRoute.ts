import { Router } from 'express';
import ConsultaCandidatosController from '../controllers/ConsultaCandidatosController';

const router = Router();

router.get('/:cidade/:cargo', ConsultaCandidatosController.consultaDeCandidatos);

export default router;
