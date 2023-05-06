import { Router } from 'express';
import LoginController from '../controller/Login.controller';
import fieldsValidator from '../middlewares/fields.validator';
import { tokenValidator } from '../middlewares/token.validator';

const loginController = new LoginController();
const loginRouter = Router();

loginRouter.post('/', fieldsValidator, loginController.loginController);
loginRouter.get('/role', tokenValidator, loginController.findRole);

export default loginRouter;
