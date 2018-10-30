module.exports = function(sequelize, DataTypes) {
  const sequelizeTransforms = require('sequelize-transforms');

  const Auction = sequelize.define("Auction", {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    title: {
      type: DataTypes.STRING,
      validate: {
        len: [1,100]
      },
      allowNull: false,
      trim: true
    },

    description: {
      type: DataTypes.TEXT("tiny"),
      allowNull: false,
      validate: {
        len: [1,1000]
      },
      trim: true
    },

    imgLink: {
      type: DataTypes.STRING,
      validate: {
        len: [1,255]
      },
      allowNull: false,
      trim: true
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
    },

    createdAt: {
      type: DataTypes.DATE,
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

