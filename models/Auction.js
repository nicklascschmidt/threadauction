module.exports = function(sequelize, DataTypes) {
    var Auction = sequelize.define("Auction", {
  
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
  
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
        
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      bid_increment: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      startingPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

    });

    Auction.associate = function(models) {
        
        Auction.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
  
    return Auction;
  };
  