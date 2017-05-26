module.exports = function(sequelize, DataTypes)	{

	var Layout = sequelize.define("Layout", {

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
		text: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		timestamps: false
		});

	return Layout;

}
