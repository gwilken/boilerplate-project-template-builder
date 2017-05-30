$(document).ready(function(){
	var adminContainer = $(".admin-container");
	var snippetCategorySelect = $("#category");

	$(document).on("click", "button.delete", handleSnippetDelete);
	$(document).on("click", "button.edit", handleSnippetEdit);

	var snippets;

	var url = window.location.search;
	var bundleId;
	if(url.indexOf("?bundle_id=") !== -1){
		bundleId = url.split("=")[1];
		getSnippets(bundleId);
	}

	else {
		getSnippets();
	}

	function getSnippets(bundle){
		bundleId = bundle || "";
		if (bundleId){
			bundleId = "/?bundle_id=" + bundleId;
		}
		$.get("/api/bundle/" + bundleId, data=>{
			console.log("Snippets", data);
			snippets = data;
			if(!snippets || !snippets.length){
				displayEmpty(bundle);
			}else{
				initializeRows();
			}
		});
	}

	function deleteSnippet(id){
		$.ajax({
			method: "DELETE",
			url: "/api/snippets/" + id
		}).done(function(){
			getSnippets(snippetCategorySelect.val());
		});
	}

	function initializeRows(){
		adminContainer.empty();
		var snippetsToAdd = [];
		for(var i = 0; i < snippets.length; i++){
			snippetsToAdd.push(createNewRow(snippets[i]));
		}
		adminContainer.append(snippetsToAdd);
	}

	function createNewRow(snippet){
		var formattedDate = new Date(snippet.createdAt);
		formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
		var newSnippetPanel = $("<div>");
		newSnippetPanel.addClass("panel panel-default");
		var newSnippetPanelHeading = $("<div>");
		newSnippetPanelHeading.addClass("panel-heading");
		var deleteBtn = $("<button>");
		deleteBtn.addClass("delete btn btn-danger");
		var editBtn = $("<button>");
		editBtn.addClass("edit btn btn-info");
		var newSnippetTitle = $("<h2>");
		var newSnippetDate = $("<small>");
		var newSnippetBundle = $("<h5>");
		newSnippetBundle.text("Bundle: " + snippet.Bundle.name);
		newSnippetBundle.css({
			float: "right",
			color: "blue",
			"margin-top": "-10px"
		});
		var newSnippetPanelBody = $("<div>");
		newSnippetPanelBody.addClass("panel-body");
		var newSnippetBody = $("<p>");
		newSnippetTitle.text(snippet.title + " ");
		newSnippetBody.text(snippet.body);
		newSnippetDate.text(formattedDate);
		newSnippetTitle.append(newSnippetDate);
		newSnippetPanelHeading.append(deleteBtn);
		newSnippetPanelHeading.append(editBtn);
		newSnippetPanelHeading.append(newSnippetTitle);
		newSnippetPanelHeading.append(newSnippetAuthor);
		newSnippetPanelBody.append(newSnippetBody);
		newSnippetPanel.append(newSnippetPanelHeading);
		newSnippetPanel.append(newSnippetPanelBody);
		newSnippetPanel.data("snippet", snippet);
		return newSnippetPanel;
	}

	function handleSnippetDelete() {
		var currentSnippet = $(this)
		.parent()
		.parent()
		.data("snippet");
		deleteSnippet(currentSnippet.id);
	}

	
	function handleSnippetEdit() {
		var currentSnippet = $(this)
		.parent()
		.parent()
		.data("snippet");
		window.location.href = "/cms?snippet_id=" + currentSnippet.id;
	}
	
	function displayEmpty(id) {
		var query = window.location.search;
		var partial = "";
		if (id) {
		partial = " for Author #" + id;
		}
		blogContainer.empty();
		var messageh2 = $("<h2>");
		messageh2.css({ "text-align": "center", "margin-top": "50px" });
		messageh2.html("No snippets yet" + partial + ", navigate <a href='/cms" + query +
		"'>here</a> in order to get started.");
		blogContainer.append(messageh2);
	}


});