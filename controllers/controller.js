
var db = require("../models");
var builder = require('../controllers/builder.js');
var writer = require('../controllers/writer.js');
var zipper = require('../controllers/zipper.js');
var path = require('path');


var router = function(app){

	app.get("/", function(req, res) {

		res.render('index' );

	});

	app.get("/tree", function(req, res) {
		builder.buildOptionsTree(function(obj) {

			res.json(obj);

		})
	})

	app.post("/", (req, res) => {

		builder.parseOptions(req.body, function(args) {

			builder.build(args, function(data) {

		  	builder.scrubMarkers(data, function(result) {

		    	builder.beautify(result, function(resp) {

						res.send(resp);

		    	})
		  	})
			})
		});
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

					var templates = [];
					var obj = {};
					for (var i = 0; i < snips.length; i++) {
						var index = snips[i]['dataValues'].template;
						if (!obj[index]) {
							templates.push({template:snips[i]['dataValues'].template});
							obj[index] = true;
						}
					}

					console.log(templates);

					// console.log(snips);
					res.render('update', { 'snippets': snips, 'templates': templates });


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

	app.get("/template/:id?", (req, res) => {
		console.log('template id route hit...');

		if(!req.params.id) {

			db.Template.findAll({
				order: [['id', 'DESC']]
			}).then(snips => {

				res.render('createtemplate', { 'templates': snips  });

			})
		} else {

			db.Template.findAll({
					order: [['id', 'DESC']],
				where: {
					id: req.params.id
				}
			}).then(snip => {
				console.log(snip);

				res.render('createtemplate', { 'templates': snip} );

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

	app.post("/template", (req, res) => {

		console.log(req.body);

		db.Template.create(req.body).then(temp => {
		
			res.json(temp);

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
