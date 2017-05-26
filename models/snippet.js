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
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		snippet_text: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		directory_path: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		file_name: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		marker: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		timestamps: false,
		classMethods: {
			associate: function(models){
				Snippet.belongsTo(models.Bundle, {
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	});

	return Snippet;
}
