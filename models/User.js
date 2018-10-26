module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,35],
        isAlpha: true
      }
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,35],
        isAlpha: true
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, 
      }
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3,20],
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,20],
        }
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    stateUSA: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2],
      }
    },

    zip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
      }
    },
   
  });

  User.associate = function(models) {
    User.hasMany(models.Auction, {
      foreignKey: {
        allowNull: false
      }
    });
  }; 

  return User;
};
