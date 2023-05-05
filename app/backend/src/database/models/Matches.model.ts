import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './Teams.model';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: DataTypes.NUMBER,
  homeTeamGoals: DataTypes.NUMBER,
  awayTeamId: DataTypes.NUMBER,
  awayTeamGoals: DataTypes.NUMBER,
  inProgress: DataTypes.BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Teams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Matches.belongsTo(Matches, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Matches, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matches;
