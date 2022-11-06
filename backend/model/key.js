module.exports = (sequelize, Sequelize) => {
  return sequelize.define("key", {
    keyId: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.STRING,
    },
    availability: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },
    floor: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    remote_available: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    },
  });
};
