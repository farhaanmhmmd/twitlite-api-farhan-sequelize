const {DataTypes, Model} = require("sequelize");
const sequelize = require("../config/database");

class Address extends Model {}

Address.init(
  {
    addressId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "userId",
      },
    },
    name: {
      type: DataTypes.STRING(200),
    },
  },
  {
    sequelize,
    modelName: "Address",
    tableName: "addresses",
  }
);

Address.associate = (models) => {
  Address.belongsTo(models.User, {foreignKey: "userId", as: "addresses"});
};

module.exports = Address;
