import { Router } from 'express';
import { findAll, endMatch, updateMatch, creatNewMatch } from '../controller/Matches.controller';
import { tokenValidation } from '../middlewares/token.validator';

const matchesRoutes = Router();

matchesRoutes.get('/', findAll);
matchesRoutes.patch('/:id/finish', tokenValidation, endMatch);
matchesRoutes.patch('/:id', tokenValidation, updateMatch);
matchesRoutes.post('/', tokenValidation, creatNewMatch);

export default matchesRoutes;
