module.exports = function(sequelize, DataTypes)	{

	var Template = sequelize.define("Template", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false
		},
		filename: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false
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
