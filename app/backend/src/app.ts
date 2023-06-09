import * as express from 'express';
import * as teamController from './database/controller/Teams.controller';
import loginRouter from './database/routes/Login.routes';
import matchesRoutes from './database/routes/Matches.routes';
import leaderBoardRouter from './database/routes/leaderboards.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.get('/teams', teamController.findAll);
    this.app.get('/teams/:id', teamController.findOne);
    this.app.use('/login', loginRouter);
    this.app.use('/matches', matchesRoutes);
    this.app.use('/leaderboard', leaderBoardRouter);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
