module.exports = function(sequelize, DataTypes) {
  
  const AuctionBid = sequelize.define("AuctionBid", {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    bidAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    bidSubmitTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    
  });


  AuctionBid.associate = function(models) {
      
      AuctionBid.belongsTo(models.Auction, {
        foreignKey: {
          allowNull: false
        }
      }),
      AuctionBid.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    };

  return AuctionBid;
};
