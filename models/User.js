module.exports = function(sequelize, DataTypes) {
    const sequelizeTransforms = require('sequelize-transforms');
 
    const User = sequelize.define("User", {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,35]
      },
      trim: true
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,35]
      },
      trim: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, 
      },
      trim: true,
      lowercase: true
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3,20],
      },
      trim: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,20],
      },
      trim: true
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },

    stateUSA: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2],
      },
      trim: true
    },

    zip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
      },
      trim: true
    },
   
  });

  User.associate = function(models) {
    User.hasMany(models.Auction, {
      foreignKey: {
        allowNull: false
      }
    });
  }; 

  sequelizeTransforms(User);


  return User;
};
