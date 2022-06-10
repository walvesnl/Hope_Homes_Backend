"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      message.belongsTo(models.conversation, {
        foreignKey: "conversationId",
      });
      message.belongsTo(models.user, {
        foreignKey: "senderId",
      });
    }
  }
  message.init(
    {
      body: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "message",
    }
  );
  return message;
};
