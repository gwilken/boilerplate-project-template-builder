$(document).ready(function() {

    var library = {
        start: ['Front', 'Back'],
        front: ['HTML', 'CSS CDN'],
        back: ['Node', 'Database'],
        html: ['CSS', 'JavaScript', 'Vanilla'],
        csscdn: ['Bootstrap', 'Material Design Lite', 'Skeleton', 'Bulma'],
        css: ['Reset'],
        javascript: ['jQuery', 'Empty'],
        node: ['Express', 'HTTP'],
        database: ['MySql', 'MongoDB']
    }

    var inputCount = 0;

    $('.tiers').hide();

    $(document).on('click', '.create', function() {
        $(this).hide();
        $('.tiers').show();
        start();
    })

    /*var panel = $('<div>').attr('class', 'panel panel-primary');
    var panelHead = $('<div>').attr('class', 'panel-heading');
    var panelBody = $('<div>').attr('class', 'panel-body');*/

    function start() {
        var newPanel = $('<div>').attr('class', 'tier panel panel-primary');
        var panelHead = $('<div>').attr('class', 'panel-heading').html('Begin');
        var panelBody = $('<div>').attr('class', 'panel-body');
        var nextButton = $('<button>').attr('class', 'next btn btn-default').html('Next');
        var form = $('<form>');
        for (var i = 0; i < library.start.length; i++) {
            var option = $('<input>').attr('type', 'checkbox').attr('id', inputCount).attr('class', 'checkbox').attr('name', i).attr('value', library.start[i]);
            var optionLabel = $('<label>').attr('class', 'option btn btn-info').attr('for', inputCount).html(library.start[i]);
            form.append(option).append(optionLabel);
            inputCount++;
        }
        form.append(nextButton);
        panelBody.append(form);
        newPanel.append(panelHead).append(panelBody);
        $('.tiers').append(newPanel);

    }

    $(document).on('click', '.next', function(event) {
        event.preventDefault();
        var formResults = $(this).parent().serializeArray();
        console.log(formResults);

        var newPanel = $('<div>').attr('class', 'tier panel panel-primary');
        var panelHead = $('<div>').attr('class', 'panel-heading').html('Options');
        var panelBody = $('<div>').attr('class', 'panel-body');
        var nextButton = $('<button>').attr('class', 'next btn btn-default').html('Next');
        var form = $('<form>');

        for (var i = 0; i < formResults.length; i++) {
            var result = formResults[i].value.toLowerCase();
            result = result.replace(/\s/g, '');
            form.append('<span>' + formResults[i].value + '</span>')
            console.log(library[result].length);
            for (var z = 0; z < library[result].length; z++) {
                var option = $('<input>').attr('type', 'checkbox').attr('id', inputCount).attr('class', 'checkbox').attr('name', inputCount).attr('value', library[result][z]);
                var optionLabel = $('<label>').attr('class', 'option btn btn-info').attr('for', inputCount).html(library[result][z]);
                form.append(option).append(optionLabel);
                inputCount++;
            }
        }
        form.append(nextButton);
        panelBody.append(form);
        newPanel.append(panelHead).append(panelBody);
        $('.tiers').append(newPanel);
    })







})
