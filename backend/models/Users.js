const { user_type_subscriber } = require("../config/constants");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      userName: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      phone: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: user_type_subscriber,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      refreshAccessToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      otp: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    { tableName: "Users" }
  );
  users.associate = (models) => {};

  return users;
};
