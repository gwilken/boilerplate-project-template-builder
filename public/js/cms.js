$(document).ready(function() {
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var bundleSelect = $("#bundle");
  $(cmsForm).on("submit", handleFormSubmit);
  var url = window.location.search;
  var snippetId;
  var bundleId;
  var updating = false;
  if (url.indexOf("?snippet_id=") !== -1) {
    snippetId = url.split("=")[1];
    getSnippetData(snippetId, "snippet");
  }
  else if (url.indexOf("?bundle_id=") !== -1) {
    bundleId = url.split("=")[1];
  }

  getBundles();

  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the snippet if we are missing a body, title, or bundle
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !bundleSelect.val()) {
      return;
    }
    // Constructing a newSnippet object to hand to the database
    var newSnippet = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      BundleId: bundleSelect.val()
    };

    // If we're updating a snippet run updateSnippet to update a snippet
    // Otherwise run submitSnippet to create a whole new snippet
    if (updating) {
      newSnippet.id = snippetId;
      updateSnippet(newSnippet);
    }
    else {
      submitSnippet(newSnippet);
    }
  }

  // Submits a new snippet and brings user to admin page upon completion
  function submitSnippet(snippet) {
    $.post("/api/snippets", snippet, function() {
      window.location.href = "/admin";
    });
  }

  
  function getSnippetData(id, type) {
    var queryUrl;
    switch (type) {
      case "snippet":
        queryUrl = "/api/snippets/" + id;
        break;
      case "bundle":
        queryUrl = "/api/bundles/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.BundleId || data.id)
        // If this snippet exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        bundleId = data.BundleId || data.id;
        // If we have a snippet with this id, set a flag for us to know to update the snippet
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Bundles and then render our list of Bundles
  function getBundles() {
    $.get("/api/bundles", renderBundleList);
  }
  // Function to either render a list of bundles, or if there are none, direct the user to the page
  // to create an bundle first
  function renderBundleList(data) {
    if (!data.length) {
      window.location.href = "/bundles";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createBundleRow(data[i]));
    }
    bundleSelect.empty();
    console.log(rowsToAdd);
    console.log(bundleSelect);
    bundleSelect.append(rowsToAdd);
    bundleSelect.val(bundleId);
  }

  // Creates the bundle options in the dropdown
  function createBundleRow(bundle) {
    var listOption = $("<option>");
    listOption.attr("value", bundle.id);
    listOption.text(bundle.name);
    return listOption;
  }

  // Update a given snippet, bring user to the admin page when done
  function updateSnippet(snippet) {
    $.ajax({
      method: "PUT",
      url: "/api/snippets",
      data: snippet
    })
    .done(function() {
      window.location.href = "/admin";
    });
  }
});
