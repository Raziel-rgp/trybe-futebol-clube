'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTERGER
      },
      home_team_id: {
        type: Sequelize.INTERGER
      },
      home_team_goals: {
        type: Sequelize.INTERGER
      },
      away_team_id: {
        type: Sequelize.INTERGER
      },
      away_team_goals: {
        type: Sequelize.INTERGER
      },
      in_progress: {
        type: Sequelize.BOOLEAN
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches')
  }
};
