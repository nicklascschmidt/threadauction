module.exports = function(sequelize, DataTypes) {
  const sequelizeTransforms = require('sequelize-transforms');
 
  const Auction = sequelize.define("Auction", {
 
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
 
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
    description: {
      type: DataTypes.TEXT("tiny"),
      allowNull: false,
    },
 
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
    startingPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
 
    minBidIncrement: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
 
  });
 
  sequelizeTransforms(Auction);
 
 
  Auction.associate = function(models) {
 
      Auction.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
 
  return Auction;
};