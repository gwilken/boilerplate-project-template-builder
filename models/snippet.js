module.exports = function(sequelize, DataTypes) {

	var Snippet = sequelize.define("Snippet", {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		template: {
			type: DataTypes.STRING,
			allowNull: false
		},
		stack: {
			type: DataTypes.STRING,
			allowNull: false
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false
		},
		snippet_text: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		marker: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		timestamps: false
	});

	return Snippet;
}
