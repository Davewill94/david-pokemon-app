'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Players', [
      {
        name:'Ash K',
        username: 'Num1',
        password: 'num1',
        teamId: 1
    },
    {
        name:'Misty B',
        username: 'supergirl',
        password: `thebest`,
        teamId: 2
    },
    {
        name:'Brock L',
        username: 'brocktherock',
        password: 'br23',
        teamId: 3
    }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Players', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
