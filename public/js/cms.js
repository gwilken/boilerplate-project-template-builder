$(document).ready(function() {
  var nameInput = $("#name");
  var textInput = $("#text");
  var markerInput = $("#marker");
  var templateInput = $("#template");
  var typeInput = $("#type");
  var cmsForm = $("#cms");
  $(cmsForm).on("submit", handleFormSubmit);

  var url = window.location.search;
  var snippetId;
  var bundleId;
  var updating = false;
  if (url.indexOf("?snippet_id=") !== -1) {
    snippetId = url.split("=")[1];
    getSnippetData(snippetId, "snippet");
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the snippet if we are missing a text, name, or bundle
    if (!nameInput.val().trim() || !textInput.val().trim()) {
      return;
    }
    // Constructing a newSnippet object to hand to the database
    var newSnippet = {
      name: nameInput.val().trim(),
      snippet_text: textInput.val().trim(),
      marker: markerInput.val().trim(),
      template: templateInput.val().trim(),
      type: typeInput.val().trim(),
    };

    console.log(newSnippet);

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
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.BundleId || data.id)
        // If this snippet exists, prefill our cms forms with its data
        nameInput.val(data.name);
        textInput.val(data.text);
        bundleId = data.BundleId || data.id;
        // If we have a snippet with this id, set a flag for us to know to update the snippet
        // when we hit submit
        updating = true;
      }
    });
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
