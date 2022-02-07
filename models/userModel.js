const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const UserToken = require("../models/userToken_Model");
const Question = require("../models/questionsModel");
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
User.hasMany(Question, {
  targetKey: "user_id",
  foreignKey: "user_id",
});
User.hasMany(UserToken, {
  targetKey: "user_id",
  foreignKey: "user_id",
});

module.exports = User;
