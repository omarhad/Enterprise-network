module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "USER",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg : "Email already exists" },
        validate: {
          notEmpty: { msg: "Email is not valid" },
          notNull: { msg: "Email is required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
          min : {
            args: [6],
            msg: "Password must be at least 6 characters long"
          }
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "First name is not valid" },
          notNull: { msg: "First name is required" },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Last name is not valid" },
          notNull: { msg: "Last name is required" },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        validate: {
          isUrl: { msg: "Picture must be an URL" },
          notNull: { msg: "Picture is required" },
        },
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      likes: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
          return this.getDataValue("likes").split(",");
        },
        set(likes) {
          this.setDataValue("likes", likes.join());
        }
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      job: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
