module.exports = function(sequelize, DataTypes) {

//gw - added type in snippet
//gw - dependecy_id is STRING

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
		template: {
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
		timestamps: false
	});

	return Snippet;
}
