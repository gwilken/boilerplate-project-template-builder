module.exports = function(sequelize, DataTypes)	{

	var Bundle = sequelize.define("Bundle", {

		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		dependency_id: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		timestamps: false
	});

	return Bundle;

}
