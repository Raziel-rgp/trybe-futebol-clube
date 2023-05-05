import { Request, Response } from 'express';
import { tokenGenerator } from '../auth/JWTGenerator';
import LoginService from '../service/Login.service';

export default class LoginController {
  private _service: LoginService;
  constructor() {
    this._service = new LoginService();
  }

  public loginController = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const result = await this._service.findEmail(email, password);
    if (!result) return res.status(401).json({ message: 'Invalid email or password' });
    const token = tokenGenerator(email);
    return res.status(200).json({ token });
  };

  public findRole = async (req: Request, res: Response) => {
    const { role } = req.body.user;
    res.status(200).json({ role });
  };
}
