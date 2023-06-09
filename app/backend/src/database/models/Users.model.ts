import { DataTypes, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  declare readonly id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {

  underscored: true,
  sequelize: db,
  tableName: 'users',
  timestamps: false,
});

export default Users;
