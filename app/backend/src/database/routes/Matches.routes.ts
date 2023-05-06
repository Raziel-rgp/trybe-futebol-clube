import { Router } from 'express';
import findAll from '../controller/Matches.controller';

const matchesRoutes = Router();

matchesRoutes.get('/', findAll);

export default matchesRoutes;
