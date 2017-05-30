
var db = require("../models");
var builder = require('../controllers/builder.js');
var writer = require('../controllers/writer.js');
var zipper = require('../controllers/zipper.js');
var path = require('path');

//var template = require("./templates.js");

var router = function(app){

	app.get("/", function(req, res) {

		res.sendFile('index.html', function(err) {
			if(err) console.log(err);
				else console.log('ok');
		})

	});

<<<<<<< HEAD
	app.get("/api/bundles/name/:name", (req,res)=>{
		db.Bundle.findOne({
			include: [db.Snippet],
			where: {
				name: req.params.name
			}
		}).then(dbBundle=>{res.json(dbBundle)})
	});

	app.get("/api/bundles/id/:id", (req, res)=>{
=======

	app.get("/api/bundles/:id", (req, res)=>{

>>>>>>> master
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

	app.get("/api/dependency/id/:id", (req, res)=>{
		db.Bundle.findAll({
			include: [db.Snippet],
			where: {
				dependency: req.params.id
			}
		});
	});

	app.post("/", (req, res) => {

		var obj = req.body;

		//console.log('body obj:', obj);

		var args = builder.parseOptions(obj);

		//console.log('parsed array:', args);


		builder.build(args, function(data) {

		  builder.scrubMarkers(data, function(result) {

		    builder.beautify(result, function(resp) {

		      // writer.writeZipFile(res, function() {
		      //   console.log('Zip file written.');
		      // });

					res.send(resp);

		    })
		  })
		})

	});

	app.post("/zip", (req, res) => {

		var obj = req.body;

		console.log('zip obj post:', obj);

		writer.writeZipFile(obj, function() {

		  console.log('Zip file written.');

			var msg = '/zips/files.zip';

			res.send(msg);

		});

	});

<<<<<<< HEAD
	app.delete("/api/bundles/id/:id", (req, res)=>{
=======

	app.delete("/api/bundles/:id", (req, res)=>{
>>>>>>> master
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

	app.get("/api/snippets/id/:id", (req, res)=>{
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

	app.post("/api/snippets", (req, res)=>{
		db.Snippet.create(req.body).then(dbSnippet=>{
			console.log("-----------------------");
			console.log(dbSnippet);
			console.log("-----------------------");
			res.json(dbSnippet);
		}).catch(err=>{
			console.error(err);
			res.json(err);
		});

	});

	app.delete("/api/snippets/id/:id", (req, res)=>{
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
