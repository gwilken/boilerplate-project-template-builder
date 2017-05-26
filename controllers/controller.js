
var db = require("../models");
var template = require("./template.js");

var router = function(app){
	app.get("/api/bundles", (req, res)=>{
		db.Bundle.findAll({
			include: [db.Snippet]
		}).then(dbBundle=>res.json(dbBundle));
	});

	app.get("/api/bundles/:id", (req, res)=>{

		db.Bundle.findOne({
			include: [db.Snippet],
			where: {
				id: req.params.id
			}
		}).then(dbBundle=>{
			console.log(dbBundle);
			res.json(dbBundle);
		}).catch(err=>{
			console.error(err);
			res.json(err);
		});
	});

	app.get("/api/dependency/:id", (req, res)=>{
		db.Bundle.findAll({
			include: [db.Snippet],
			where: {
				dependency: req.params.id
			}
		});
	});

	app.post("/api/bundles", (req, res)=>{

		db.Bundle.create(req.body).then(dbBundle=> {
			console.log(dbBundle);
			res.json(dbBundle);
		}).catch(err=>{
			console.error(err);
			res.json(err);
		});
	});

	app.delete("/api/bundles/:id", (req, res)=>{
		db.Bundle.destroy({
			where: {
				id: req.params.id
			}
		}).then(dbBundle=>{
			console.log(dbBundle);
			res.json(dbBundle)
		}).catch(err =>{
			console.error(err);
			res.json(err);
		});
	});

	app.get("/api/snippets", (req, res)=>{
		var query = {};
		if(req.query.bundle_id){
			query.BundleId = req.query.bundle_id;
		}

		db.Snippet.findAll({
			include: [db.Bundle],
			where: query
		}).then(dbSnippet=>res.json(dbSnippet));
	});

	app.get("/api/snippets/:id", (req, res)=>{
		db.Snippet.findOne({
			include: [db.Bundle],
			where: {
				id: req.params.id
			}
		}).then(dbSnippet=>{
			console.log(sbSnippet)
			res.json(dbSnippet)
		}).catch(err=>{
			console.error(err);
			res.json(err);
		});
	});

	app.post("api/snippets", (req, res)=>{
		db.Snippet.create(req.body).then(dbSnippet=>{
			console.log(dbSnippet);
			res.json(dbSnippet);
		}).catch(err=>{
			console.error(err);
			res.json(err);
		});
	});



	app.delete("/api/snippets/:id", (req, res)=>{
		db.Snippet.destroy({
			where: {
				id: req.params.id
			}
		}).then(dbSnippet=>{
			console.log(dbSnippet);
			res.json(dbSnippet);
		}).catch(err=>{
			console.error(err);
			res.json(err);
		});
	});

	app.put("/api/snippets", (req, res)=>{
		db.Snippet.update(
			req.body,
			{
				where: {
					id: req.body.id
				}
			}).then(dbSnippet=>{
				console.log(dbSnippet);
				res.json(dbSnippet);
			}).catch(err=>{
				console.error(err);
				res.json(err);
			});
		}
	);
}

module.exports = router;
