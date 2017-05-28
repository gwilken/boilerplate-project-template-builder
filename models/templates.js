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
		family: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false
		},
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
