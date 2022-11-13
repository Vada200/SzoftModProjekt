module.exports = (sequelize, Sequelize) => {
  return sequelize.define("action", {
    id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    keyId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    when: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    actionType: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    comment: {
      allowNull: true,
      type: Sequelize.STRING,
    },
  });
};
