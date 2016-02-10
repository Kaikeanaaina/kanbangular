module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    title: DataTypes.STRING,
    priority: DataTypes.STRING,
    created_by: DataTypes.STRING,
    assigned_to: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Task.belongsTo(models.User);
      }
    }
  });

  return Task;
};