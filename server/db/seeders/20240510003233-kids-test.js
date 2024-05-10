/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const kidsData = [
      {
        userId: 1,
        name: "Петя",
        age: 5,
      },
      {
        userId: 1,
        name: "Оля",
        age: 14,
      },
      {
        userId: 1,
        name: "Вася",
        age: 10,
      },
    ];

    const kids = kidsData.map((kid) => ({
      ...kid,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Kids", kids);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Kids");
  },
};
