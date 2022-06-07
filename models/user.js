"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.request, { foreignKey: "receiverId" });
      user.hasMany(models.request, { foreignKey: "senderId" });
    }
  }
  user.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      image: {
        type: DataTypes.STRING,
        defaultValue: "Images/blank-profile-picture.png",
      },
      description: { type: DataTypes.TEXT, allowNull: false },
      address: DataTypes.TEXT,
      city: DataTypes.STRING,
      country: { type: DataTypes.STRING, allowNull: false },
      isHost: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
