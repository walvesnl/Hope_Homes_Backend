"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      conversation.belongsTo(models.user, {
        foreignKey: "hostId",
        as: "host",
      });
      conversation.belongsTo(models.user, {
        foreignKey: "seekerId",
        as: "seeker",
      });
      conversation.hasMany(models.message, { foreignKey: "conversationId" });
    }
  }

  conversation.init(
    {
      hostName: { type: DataTypes.STRING, allowNull: false },
      hostImage: { type: DataTypes.STRING, allowNull: true },
      seekerName: { type: DataTypes.STRING, allowNull: false },
      seekerImage: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "conversation",
    }
  );
  return conversation;
};
