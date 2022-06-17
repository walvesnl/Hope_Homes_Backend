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
        image: "Images/wil-intro.jpeg",
        description: "I'm Wilson",
        address: "This address",
        city: "Amsterdam",
        country: "Netherlands",
        isHost: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Andrea",
        email: "a@a.com",
        password: bcrypt.hashSync("a", SALT_ROUNDS),
        image: "Images/women-fashion.jpg",
        description: "I'm A",
        address: null,
        city: null,
        country: "Brazil",
        isHost: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bernard",
        email: "b@b.com",
        password: bcrypt.hashSync("b", SALT_ROUNDS),
        image: "Images/women-fashion.jpg",
        description: "My name is Bernard",
        address: null,
        city: null,
        country: "Venezuela",
        isHost: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Clarence",
        email: "c@c.com",
        password: bcrypt.hashSync("c", SALT_ROUNDS),
        image: "Images/wil-intro.jpeg",
        description: "I swear that I'm a nice guy",
        address: "This address",
        city: "Lisbon",
        country: "Portugal",
        isHost: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
