import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  public id!:number;
  public teamName!:string;
}

Team.init({
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

export default Team;
