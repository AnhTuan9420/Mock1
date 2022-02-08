const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const UserToken = require("../models/userToken_Model");
const UserAnswer = require("../models/userAnswer_Model");
const Score = require("../models/scoreModel");

const User = db.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.TEXT,
    unique: {
      args: true,
      msg: 'Email already in use!'
    },
  },
  username: {
    type: DataTypes.TEXT,
  },
  password: {
    type: DataTypes.TEXT,
  },
  fullname: {
    type: DataTypes.TEXT,
  },
  phone: {
    type: DataTypes.INTEGER,
  },
  role: {
    type: DataTypes.ENUM(["user", "admin"]),
    defaultValue: "user",
  }
});
User.hasMany(Score, {
  targetKey: "user_id",
  foreignKey: "user_id",
});
User.hasMany(UserAnswer, {
  targetKey: "user_id",
  foreignKey: "user_id",
});
User.hasMany(UserToken, {
  targetKey: "user_id",
  foreignKey: "user_id",
});

module.exports = User;
