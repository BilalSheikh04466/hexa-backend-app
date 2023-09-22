'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userList = [];
    userList.push(
      {
        firstName: 'ASM',
        lastName: 'Taseen',
        email: 'test@g.com',
        password: '123435',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Hamza',
        lastName: 'Yusuff',
        email: 'test2@g.com',
        password: '123435',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Yasir',
        lastName: 'Mohiuddin',
        email: 'test3@g.com',
        password: '123435',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );
    await queryInterface.bulkInsert('users', userList, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
