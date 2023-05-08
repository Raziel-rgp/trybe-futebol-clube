import { Router } from 'express';
import { logAll } from '../controller/Leaderboard.controller';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', logAll);

export default leaderBoardRouter;
