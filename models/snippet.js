module.exports = function(sequelize, DataTypes) {

	var Snippet = sequelize.define("Snippet", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		template: {
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

	});

	return Snippet;
}
