"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        name: "Wilson",
        email: "w@w.com",
        password: bcrypt.hashSync("w", SALT_ROUNDS),
        image: null,
        description: "I'm Wilson",
        address: "This address",
        city: "Amsterdam",
        country: "Netherlands",
        isHost: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "AAAAAAAA",
        email: "a@a.com",
        password: bcrypt.hashSync("a", SALT_ROUNDS),
        image: null,
        description: "I'm A",
        address: "",
        city: "",
        country: "Netherlandia",
        isHost: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
