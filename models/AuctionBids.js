module.exports = function(sequelize, DataTypes) {
  var AuctionBids = sequelize.define("AuctionBids", {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

      bids: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    bidSubmitTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    
  });

  AuctionBids.associate = function(models) {
      
      AuctionBids.belongsTo(models.Auction, {
        foreignKey: {
          allowNull: false
        }
      }),
      AuctionBids.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    };

  return AuctionBids;
};
