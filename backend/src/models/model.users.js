const { set } = require("../../app");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define( 'USER', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture : {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    bio : {
      type: DataTypes.STRING,
      allowNull: true,
    },
    likes : {
      type: DataTypes.STRING,
      allowNull: true,
      get(){
        return this.getDataValue('likes').split(',');
      },
      set(likes){
        this.setDataValue('likes', likes.join());
      }
    },
    birthday : {
      type: DataTypes.DATE,
      allowNull: true,
    },
    job : {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  });
};

