$(document).ready(function() {

    var library = {
        Front: {
            html: {
                default: ['html']
            },
            css: {
                cdn: ['Bootstrap', 'MDL', 'Skeleton', 'Bulma'],
                reset: ['Meyerweb', 'HTML5Doctor', 'Normalize']
            },
            javascript: {
                jquery: ['jQuery', 'UI', 'Mobile']
            }
        },
        Back: {
            node: {
                server: ['HTTP', 'Express'],
                database: ['MySql', 'MongoDB']
            }
        }
    }

    var testObj = {
        html: '<!DOCTYPE html>\n\n<html>\n\t<head>\n\t\t<title> test title biatch{--title--} </title>\n\n\t\t<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"><link href="http://mdl.com">{--style--}\n\n\t\t<script>http://www.test.com/js.js</script>{--script--}\n\n\t</head>\n\t\n\t<body>\n\n\n\t</body>\n</html>',
        node: '//test var express=require("express"){--require--}'
    }

    var count = 0;
    var roadmap = {};
    var panelToggle = true;
    var allForms = [];

    // $('.tiers').hide();
    $('.preview').hide();
    $('.post-container').hide();

    // $(document).on('click', '.create', function() {
    //     $(this).hide();
    //     // $('.tiers').show();
    //     start();
    // })

//     function start() {
//         $.each(library, function(category, object) {
//             var toggle = $('<button>').attr('class', 'btn btn-default').html(category);
//             $('.toggle').append(toggle);
//     })
// }

    $.get('/tree', function(tree) {
        start(tree);
    })

    function start(tree) {

        $.each(tree, function(category, object) {

            var option = $('<input>').attr('type', 'checkbox').attr('id', count).attr('class', 'checkbox').attr('name', category).attr('value', category);
            var optionLabel = $('<label>').attr('class', 'toggle-button option btn btn-info').attr('for', count).html(category);
            count++;
            $('.toggle-options').append(option).append(optionLabel);

            $.each(object, function(key, subOption) {
                // var tier = $('<div>').attr('class', 'tier');
                var newPanel = $('<div>').attr('class', category + ' tier panel panel-primary');
                var panelHead = $('<div>').attr('class', 'panel-heading').html(key);
                var panelBody = $('<div>').attr('class', 'panel-body');
                var form = $('<form>').attr('class', 'project-form');

                $.each(subOption, function(option, array) {
                    var subPanel = $('<div>').attr('class', 'subPanel panel panel-primary');
                    var subHead = $('<div>').attr('class', 'subHead panel-heading').html(option);
                    var subBody = $('<div>').attr('class', 'subBody panel-body');
                    subHead.prepend('<span class="glyphicon glyphicon-plus"></span>');
                    $.each(array, function(index, value) {
                        var option = $('<input>').attr('type', 'checkbox').attr('id', count).attr('class', 'checkbox').attr('name', category).attr('value', value);
                        var optionLabel = $('<label>').attr('class', 'option btn btn-info').attr('for', count).html(value);
                        subBody.append(option).append(optionLabel);
                        count++;
                    })
                    panelBody.append(subPanel.append(subHead).append(subBody));
                })

                // tier.append(newPanel.append(panelHead).append(panelBody))
                $('.tiers-form').append(newPanel.append(panelHead).append(panelBody));
                newPanel.hide();
                // var option = $('<input>').attr('type', 'checkbox').attr('id', count).attr('class', 'checkbox').attr('name', key).attr('value', key);
                // var optionLabel = $('<label>').attr('class', 'option btn btn-info').attr('for', count).html(key);
                // panelBody.append(option).append(optionLabel);
                // count++;
            })
        })
        // form.append(newPanel.append(panelHead).append(panelBody));
        // tier.append(form);
        // $('.tiers').append(tier);
        $('.subBody').hide();
        // $('.tiers-form').hide();

    }

    // start();


    $(document).on('click', '.toggle-button', function() {

        $('.project-icon').hide();

        var category = $(this).html();
        $('.' + category).children().find('input[type=checkbox]:checked').prop('checked', false);
        $('.' + category).toggle();
    })

    $(document).on('change', 'form', function() {
        roadmap = {};
        var choices = $('.tiers-form').serializeArray();
        for (var i = 0; i < choices.length; i++) {
            roadmap[choices[i].value.toLowerCase().replace(/\s/g, '')] = true;
        }
        console.log(roadmap);
        if (!$.isEmptyObject(roadmap)) {
            $('.post-container').show();
        }
    })

    $(document).on('click', '.subHead', function() {
        $(this).parent().children('.subBody').toggle();
    })

    $(document).on('click', '.preview-button', function() {
        $('.toggle').toggle();
        $('.tiers').toggle();
        $('.preview-pane').empty();
        $('.preview').toggle();

        $.post('/', roadmap).done(function(object) {
            console.log('Success');
            console.log(object);
            $.each(object, function(key, value) {
                var newPanel = $('<div>').attr('class', 'preview-box panel panel-primary');
                var panelHead = $('<div>').attr('class', 'panel-heading').html(key);
                var panelBody = $('<div>').attr('class', 'panel-body');
                var form = $('<form>').attr('class', 'preview-form');
                var editor = $('<textarea>').attr('name', key).text(value);

                panelBody.append(form.append(editor));
                newPanel.append(panelHead).append(panelBody);

                $('.preview-pane').append(newPanel);
            })
        })


    })

    $(document).on('click', '.confirm-button', function() {
        var updates = $('.preview-form').serializeArray();
        var newObj = {};
        for (var i = 0; i < updates.length; i++) {
            newObj[updates[i].name] = updates[i].value;
        };

        console.log(newObj);

        $.ajax({
            url: '/zip',
            data: newObj,
            type: 'POST',
            success: function(msg) {
              console.log(msg);
              window.location = msg;
            }
        });
    })


    // EDIT SNIPPETS TABLE

    $('#row-add').hide();

    $(document).on('click', '.add', function() {
        $('#row-add').show();
    })

    $(document).on('click', '.cancel-add', function() {
        $('#row-add').hide();
        $('#row-name-add').text('');
        $('#row-template-add').text('');
        $('#row-stack-add').text('');
        $('#row-category-add').text('');
        $('#row-marker-add').text('');
        $('#row-snip-add').text('');
    })


    $(document).on('click', '.create', function(event) {

      var newSnip = {
        name: $('#row-name-add').text(),
        template: $('#row-template-add').find('input').val(),
        stack: $('#row-stack-add').find('input').val(),
        category: $('#row-category-add').find('input').val(),
        marker: $('#row-marker-add').text(),
        snippet_text: $('#row-snip-add').text()
      }

      console.log(newSnip);

      $.post('/snippet', newSnip, function(res) {
        console.log(res);

        window.location.href = '/snippet';

      })
    });

    $(document).on('click', '.delete', function(event) {

      $.post('/deleteSnip', {id: event.target.value}, function(res) {
        console.log(res);

        window.location.href = '/snippet';

      })
    });

    $(document).on('click', '.edit', function(event) {
      //  event.preventDefault();

        var id = event.target.value;

        $('#row-' + id).children().css('color', 'red');

        $('#row-' + id).attr('contenteditable', 'true');
        $('#row-edit-' + id).css('display', 'none');
        $('#row-delete-' + id).css('display', 'initial');
        $('#row-save-' + id).css('display', 'initial');
        $('#row-cancel-' + id).css('display', 'initial');
    });


    $(document).on('click', '.save', function(event) {
        //event.preventDefault();

        var id = event.target.value;

        $('#row-' + id).children().css('color', 'black');
        $('#row-' + id).attr('contenteditable', 'false');

        $('#row-edit-' + id).css('display', 'initial');
        $('#row-save-' + id).css('display', 'none');
        $('#row-delete-' + id).css('display', 'none');
        $('#row-cancel-' + id).css('display', 'none');

        var obj = {
          id: id,
          name: $('#row-name-' + id).text(),
          template: $('#row-template-' + id).text(),
          stack: $('#row-stack-' + id).text(),
          category: $('#row-category-' + id).text(),
          marker: $('#row-marker-' + id).text(),
          snippet_text: $('#row-snip-' + id).text()
        }

        console.log(obj);

        $.post('/update', obj, function(res) {
          console.log(res);
        })
    })


    $(document).on('click', '.cancel', function(event) {
      //  event.preventDefault();

        var id = event.target.value;

        $('#row-' + id).children().css('color', 'black');
        $('#row-' + id).attr('contenteditable', 'false');

        $('#row-edit-' + id).css('display', 'initial');
        $('#row-save-' + id).css('display', 'none');
        $('#row-delete-' + id).css('display', 'none');
        $('#row-cancel-' + id).css('display', 'none');

        $.get('/snipjson', {id: id}, function(res) {

          var snip = $('<text>').text(res[0].snippet_text);

          $('#row-name-' + id).text( res[0].name );
          $('#row-template-' + id).text( res[0].template );
          $('#row-stack-' + id).text( res[0].stack );
          $('#row-category-' + id).text( res[0].category );
          $('#row-marker-' + id).text( res[0].marker );
          $('#row-snip-' + id).text(snip);
        });

    });



    //LOGINS

    $(document).on('click', '.login1', function() {
        var email = $('.email1').val();
        var pw = $('.password1').val();
        var login = [email, pw];
        $.post('/login', login).done(function() {
            console.log('Success');
        })
    })

    $(document).on('click', '.login2', function() {
        var email = $('.email2').val();
        var pw = $('.password2').val();
        var login = [email, pw];
        $.post('/login', login).done(function() {
            console.log('Success');
        })
    })



})
