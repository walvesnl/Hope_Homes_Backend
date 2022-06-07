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
      request.belongsTo(models.user, { foreignKey: "receiverId" });
      request.belongsTo(models.user, { foreignKey: "senderId" });
    }
  }
  request.init(
    {},
    {
      sequelize,
      modelName: "request",
    }
  );
  return request;
};
