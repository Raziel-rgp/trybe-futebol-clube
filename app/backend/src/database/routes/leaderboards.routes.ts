import { Router } from 'express';
import { logAllHome, logAllAway, logAll } from '../controller/Leaderboard.controller';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', logAllHome);
leaderBoardRouter.get('/away', logAllAway);
leaderBoardRouter.get('/', logAll);

export default leaderBoardRouter;
