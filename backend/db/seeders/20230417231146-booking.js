'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName='Bookings';
   await queryInterface.bulkInsert(options,[
    {  
      "spotId":1,
      "userId":1,
      "startDate":new Date("2022,01,15"),
      "endDate":new Date("2022,01,20")
    },
    
    {  
      "spotId":2,
      "userId":2,
      "startDate":new Date("2023,07,14"),
      "endDate":new Date("2023,07,22")
    },
    { 
      "spotId":3,
      "userId":3,
      "startDate":new Date("2023,05,17"),
      "endDate":new Date("2023,05,23")
    },

   ],{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName='Reviews';
    await queryInterface.bulkDelete(options)
  }
};
