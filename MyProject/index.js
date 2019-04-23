const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const sequelize = new Sequelize("yimiApplets", "root", "ph123456", {
  host: "localhost",
  dialect: "mariadb",
  define: {
    // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
    // This was true by default, but now is false by default
    freezeTableName: true
  }
});
const User = sequelize.define(
  "user",
  {
    // attributes
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    }
  },
  {
    freezeTableName: true
  }
);
