
var db = require("../models");
var builder = require('../controllers/builder.js');
var writer = require('../controllers/writer.js');
var zipper = require('../controllers/zipper.js');
var path = require('path');

//var template = require("./templates.js");

var router = function(app){

	app.get("/", function(req, res) {

		res.render('index' );

	});

	app.post("/", (req, res) => {
		var obj = req.body;
		var args = builder.parseOptions(obj);

		builder.build(args, function(data) {

		  builder.scrubMarkers(data, function(result) {

		    builder.beautify(result, function(resp) {

					res.send(resp);

		    })
		  })
		})
	});

	app.post("/zip", (req, res) => {

		var obj = req.body;

		writer.writeZipFile(obj, function() {

		  console.log('Zip file written.');

			var msg = '/zips/files.zip';

			res.send(msg);

		});
	});

	app.get("/snippet/:id?", (req, res) => {
		console.log('snippet id route hit...');

		if(!req.params.id) {

			db.Snippet.findAll({
				order: [['id', 'DESC']]
			}).then(snips => {

				res.render('update', { 'snippets': snips  });

			})
		} else {

			db.Snippet.findAll({
					order: [['id', 'DESC']],
				where: {
					id: req.params.id
				}
			}).then(snip => {
				console.log(snip);

				res.render('update', { 'snippets': snip} );

			})
		}
	});

	app.get("/snipjson", (req, res) => {
		console.log('snippet json route hit...');

		if(!req.query.id) {

			db.Snippet.findAll({}).then(snips => {

				res.json(snips);

			})
		} else {

			db.Snippet.findAll({
				where: {
					id: req.query.id
				}
			}).then(snip => {
				console.log(snip);

				res.json(snip);

			})
		}

	});


	app.get("/edit/:id?", (req, res) => {
		console.log('snippet edit route hit...');

		console.log(req.params.id);

		db.Snippet.findAll({
			where: {
				id: req.params.id
			}
		}).then(snip => {

			res.json(snip);

		});

	});

	app.post("/snippet", (req, res) => {
		db.Snippet.create(req.body).then(dbSnippet => {

			console.log(dbSnippet);
			console.log("-----------------------");
			res.json(dbSnippet);

		}).catch(err => {

			console.error(err);
			res.json(err);
		});
	});


	app.delete("/snippet/:id", (req, res) => {
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

	app.post("/update", (req, res) => {

		db.Snippet.update(
			req.body,
			{
				where: {
					id: req.body.id
				}
			}).then(dbSnippet => {

				console.log(dbSnippet);
				res.json(dbSnippet);

			}).catch(err=>{

				console.error(err);
				res.json(err);

			});
		});

		app.post("/deleteSnip", (req, res) => {

			db.Snippet.destroy(
				{
					where: {
						id: req.body.id
					}
				}).then(dbSnippet => {

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
