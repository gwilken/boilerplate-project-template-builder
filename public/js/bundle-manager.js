$(document).ready(function(){

	var nameInput = $("#bundle-name");
	var bundleList = $("tbody");
	var bundleContainer = $(".bundle-container");

	$(document).on("submit", "#bundle-form", handleBundleFormSubmit);
	$(document).on("click", "#.delete-bundle", handleDeleteButtonPress);

	getBundles();

	function handleBundleFormSubmit(event){
		event.preventDefault();

		if(!nameInput.val().trim()){
			return;
		}

		upsertBundle({
			name: nameInput.val().trim()
		});
	}

	function upsertBundle(bundleData){
		$.post("/api/bundles", bundleData).then(getBundles);
	}

	function createBundleRow(bundleData){
		var newTr = $("<tr>");
		newTR.data("bundle", bundleData);
		newTr.append("<td>" + bundleData.name + "</td>");
		newTr.append("<td>" + bundleData.Snippets.length + "</td>");
		newTr.append("<td><a href='/admin?bundle_id" + bundleData.id + "''>Go to Snippets</a></td>");
		newTr.append("<td><a href='/cms?bundle_id" + bundleData.id + "''>Create a Snippet</a></td>");
		newTr.append("<td><a style='cursor:pointer;color:red' class='delete-bundle>Delete Bundle</a></td>");
		return newTr;
	}

	function getBundles(){
		$.get("/api/bundles", data=>{
			var rowsToAdd = [];
			for(var i = 0; i < data.length; i++){
				rowsToAdd.push(createBundleRow(data[i]));
			}
			renderBundleList(rowsToAdd);
			nameInput.val("");
		});
	}

	function renderBundleList(rows){
		bundleList.children().not(":last").remove();
		bundleContainer.children(".alert").remove();
		if(rows.length){
			console.log(rows);
			bundleList.prepend(rows);
		}
		else{
			renderEmpty();
		}
	}

	function renderEmpty(){
		var alertDiv = $("<div>");
		alertDiv.addClass("alert alert-danger");
		alertDiv.html("You must create a Bundle before you can create a Snippet");
		bundleContainer.append(alertDiv);
	}

	function handleDeleteButtonPress(){
		var listItemData = $(this).parent("td").parent("tr").data("bundle");
		var id = listItemData.id;
		$.ajax({
			method: "DELETE",
			url: "/api/bundles/" + id
		}).done(getBundles)
	}
});