module.exports = function(sequelize, DataTypes)	{

	var Template = sequelize.define("Template", {

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
		// group: {
		// 	type: DataTypes.STRING,
		// 	allowNull: false,
		// 	unique: true
		// },
		path: {
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

	return Template;

}
