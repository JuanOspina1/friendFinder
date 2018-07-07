$(document).ready(function() {
    var questions = [
        'The glass is half full.',
        'I like dogs more than people.',
        'It is fun to laugh at the expense of others.',
        'I would rather have pasta than pizza.',
        'I enjoy outdoor activities.',
        'I have a good relationship with my family.',
        'I like to go out and party on the weekends.',
        'I am a vegan.',
        'I like my job more than my freinds.',
        'I do not know how to swim.'
    ];

    var choices = [
        '1 (Strongly Disagree)',
        '2 (Disagree)',
        '3 (Neutral)',
        '4 (Agree)',
        '5 (Strongly Agree)'
    ];

    // div where questions will be inserted start with counter at 0.
    var questionDiv = $('#questions');
    i = 0;

    // make a div for each question 
    questions.forEach(function (question) {
        i++;
        var item = $('<div class="question">');
        var headline = $('<h4>').text('Question ' + i);
        var questionText = $('<p>').text(question);
        var dropDown = $('<div class="form-group">');
        var select = $('<select class="form-control selector">');
        // options for each choice.
        choices.forEach(function(choice) {
            var option = $('<option>').text(choice);
            select.append(option);
        });
        select.attr('id', 'select' + i);
        // add dropdown to the item, then add to questions div.
        dropDown.append(select);
        item.append(headline, questionText, dropDown);
        var br = $('<br>');
        questionDiv.append(item, br);
    });

    //listener for form is submitted.
    $('#submit').on('click', function(event) {

        // preventing page reload.
        event.preventDefault();

        // grab username and image link values.
        var userName = $('#userName').val();
        var imageLink = $('#imageLink').val();

        // if statement for if user does name and image grab other answers and submit
        if (userName.length > 0 && imageLink.length >0) {
            var answers = [];

            // response for each selector add to the array of answers
            Object.keys($('.selector')).forEach(function(key) {
                if (answers.length < questions.length) {
                    // grabbing frist character of users answer (the number value 1-5)
                    answers.push($('.selector')[key].value.charAt(0));
                }
            });

            // making answers in object form.
            var surveyData = {
                name: userName,
                photo: imageLink,
                answers: answers
            };

            // POST to /api/friends.
            $.post('/api/friends', surveyData, function(data) {

                // data callback to show result
                if (data) {

                    // clear modal data
                    $('#modalContent').empty();
                    $('#userName').val('');
                    $('#imageLink').val('');

                    // grab the name and URL for each object from the results array.
                    data.forEach(function(profile) {
                        var profileDiv = $('<div class="profile">');
                        var name = profile.name;
                        var photoURL = profile.photo;
                        // name in header
                        var nameHeader = $('<h3>').text(name);
                        // photo
                        var photo = $('<img>').attr('src', photoURL);
                        profileDiv.append(nameHeader, photo);

                        // put above stuff in modal 
                        $('#modalContent').append(profileDiv);
                    });

                    // if statement handling ties
                    if (data.length > 1) {
                        $('.modal-title').text('Your best matches!');
                    } else {
                        $('.modal-title').text('Your best match!');
                    }

                    // show result modal
                    $('#resultModal').modal();
                }
            });
        // user doesnt add name or photo show the error modal
        } else {
            $('#errorModal').modal();
            //timer for error modal (will go away after 5 sec)
            setTimeout(function() {
                $('#errorModal').modal('hide');
            }, 5000);
        }
    });
});
