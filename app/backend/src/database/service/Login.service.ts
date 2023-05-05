import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import Users from '../models/Users.model';

export default class LoginService {
  model: ModelStatic<Users> = Users;
  async findEmail(email: string, _password: string) {
    const result = await this.model.findOne({ where: { email } });
    if (!result) return null;
    const e = bcrypt.compareSync(_password, result.password);
    if (!e) return null;
    return result;
  }
}
export const findOEmail = async (email:string) => {
  const result = await Users.findOne({ where: { email } });
  if (!result) return null;
  return result;
};
