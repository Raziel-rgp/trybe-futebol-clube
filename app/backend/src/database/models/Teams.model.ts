import { DataTypes, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  public id!:number;
  public teamName!:string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'Team',
  tableName: 'teams',
});

export default Teams;
