"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      request.belongsTo(models.user, {
        foreignKey: "receiverId",
        as: "receiver",
      });
      request.belongsTo(models.user, { foreignKey: "senderId", as: "sender" });
    }
  }
  request.init(
    {
      senderName: { type: DataTypes.STRING, allowNull: false },
      senderImage: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "request",
    }
  );
  return request;
};
