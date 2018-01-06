$(document).ready(function () {

    /*------------------------
    Page load: disable #prev shift+Tab
    --------------------------*/
    $('#prev').on('keydown', function () { // disable shift+tab behavior on prev
        if (event.shiftKey && event.keyCode == 9) {
            return false;
        }
    });

    /*--------------------------------
    Form Button Click Event Listener
    ---------------------------------*/
    $('.formButton').click(function (e) { // clicking form button
        var clicked = e.currentTarget.id, // define id of clicked button
            showingDiv = $('.visible'),
            pageName;

        if (clicked === 'next') { // if clicking next button
            if ($('.visible .successBorder').length === $('.visible').children('input, select').length) { // determine if the number of fields with successBorder === number of fields on page
                pageName = $(showingDiv).next().attr('class').split(' ')[0]; // define first class name of next sibling container
                loadNewPage('increase', $(showingDiv).next(), pageName); // if success === field total then run loadNextPage
            }
        } else { // if clicking prev
            pageName = $(showingDiv).prev().attr('class').split(' ')[0]; // define first class name of next sibling container
            loadNewPage('decrease', $(showingDiv).prev(), pageName); // load previous page
        }

        enableButtons(pageName); // enable or disable next/prev buttons if needed
    });

    /*---------------------
    Enable/disable next/prev buttons
    -----------------------*/
    function enableButtons(pageName) {
        if (pageName === 'Confirmation') {
            $('#next').addClass('disabled');
        } else {
            $('#next').removeClass('disabled');
        }
        if (pageName === 'Login') {
            $('#prev').addClass('disabled');
        } else {
            $('#prev').removeClass('disabled');
        }
    }

    /*-------------------------
    Load next/previous page
    -----------------------*/
    function loadNewPage(direction, pageToShow, pageName) {
        if (direction === 'increase') { // if increaseing progress
            $(pageToShow).prev().removeClass('visible'); // page previous to pageToShow is visible: hide it            
        } else { // if decreasing progress
            $(pageToShow).next().removeClass('visible'); // page after pageToShow is visible: hide it            
        }
        changeProgressBar(direction, pageName); // change progress bar accordingly
        $(pageToShow).addClass('visible'); // add visibility to pageToShow
    }

    /*----------------------
    Change progress bar
    ----------------------*/
    function changeProgressBar(direction, pageName) {
        if (direction === 'increase') {
            if (pageName === 'Personal') {
                $('#progBar').css('backgroundColor', '#f27011');
                $('#progBar').css({
                    'transform': 'translateX(55%)'
                });
            } else if (pageName === 'Confirmation') {
                $('#progBar').css('backgroundColor', '#86e01e');
                $('#progBar').css({
                    'transform': 'translateX(104.25%)'
                });
            }
        } else if (direction === 'decrease') {
            if (pageName === 'Personal') {
                $('#progBar').css('backgroundColor', '#f27011');
                $('#progBar').css({
                    'transform': 'translateX(50%)'
                });
            } else if (pageName === 'Login') {
                $('#progBar').css('backgroundColor', 'transparent');
                $('#progBar').css({
                    'transform': 'translateX(-200%)'
                });
            }
        }

        changeCategory(direction, pageName);
    }

    /*-----------------------------------
    Change Category Highlight Function
    ------------------------------------*/
    function changeCategory(direction, pageName) {
        if (direction === 'increase') {
            if (pageName === 'Personal') {
                $('#categoryLogin').removeClass('categoryHighlight');
                $('#categoryPersonal').addClass('categoryHighlight');
            } else if (pageName === 'Confirmation') {
                $('#categoryPersonal').removeClass('categoryHighlight');
                $('#categoryConfirmation').addClass('categoryHighlight');
            }
        } else if (direction === 'decrease') {
            if (pageName === 'Personal') {
                $('#categoryConfirmation').removeClass('categoryHighlight');
                $('#categoryPersonal').addClass('categoryHighlight');
            } else if (pageName === 'Login') {
                $('#categoryPersonal').removeClass('categoryHighlight');
                $('#categoryLogin').addClass('categoryHighlight');
            }
        }
    }

    /*-----------------------------
        Last Input Tab Event Listener
    -----------------------------*/
    $('.lastInput').on('keydown', function (e) { // keydown on last input on page
        if (event.shiftKey && event.keyCode == 9) { // if tab+shift
            return true; // run event as normal
        } else if (e.keyCode === 9) { // if tab (no shift)
            e.preventDefault(); // prevent default behavior
            $('#next').focus(); // and move focus to next button
        }
    });


    /*----------------------
    Info icon event and behavior
    ----------------------------*/
    $('#infoIcon').click(function () {
        $('#passwordError').text('Mix 8 upper/lowercase letters & numbers');
    });
}); // end document.ready/jquery

/*---------------------
Validate Check Field
-----------------------*/
function checkField(id, userEntry, elementName) {
    var elementError = id + 'Error';

    if (userEntry === '' || userEntry === 'blank') {
        $('#' + elementError + '').html('Please be sure to complete the ' + elementName + ' field.').addClass('warningText');
        $('#' + id + '').removeClass('successBorder').addClass('warningBorder');
    } else {
        switch (id) {
            case 'emailAddress':
                var emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (emailPattern.test(userEntry)) {
                    $('#' + elementError + '').html(elementName + ': <span class="requiredField">*</span>').removeClass('warningText');
                    $('#' + id + '').removeClass('warningBorder').addClass('successBorder');

                } else {
                    $('#' + elementError + '').html('Please enter a valid email address for your login.  Thanks!').addClass('warningText');
                    $('#' + id + '').removeClass('successBorder').addClass('warningBorder');
                }
                break;

            case 'dob':
                var currentYear = new Date().getFullYear(),
                    yob = $('#dob').val().substring(0, 4),
                    yobNum = parseInt(yob),
                    userAge = currentYear - yobNum;

                if (userAge < 0) {
                    $('#dob').removeClass('successBorder').addClass('warningBorder');
                    $('#dobError').html('Unless you truly are from the future, please check your birth year.  Thanks!').addClass('warningText');
                } else if (userAge < 18) {
                    $('#dob').removeClass('successBorder').addClass('warningBorder');
                    $('#dobError').html('This could be a warning if there is an age restriction to register').addClass('warningText');
                } else {
                    $('#dob').removeClass('warningBorder').addClass('successBorder');
                    $('#dobError').html('Birthdate: <span class="requiredField">*</span>').removeClass('warningText');
                }
                break;

            case 'password':
                var passwordPattern = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/; //min 8 chars.  upper/lower/number

                if (passwordPattern.test(userEntry)) {
                    $('#' + elementError + '').html(elementName + ' (please mix exactly 8 upper/lowercase letters and numbers): <span class="requiredField">*</span>').removeClass('warningText');
                    $('#' + id + '').removeClass('warningBorder').addClass('successBorder');
                } else {
                    $('#' + elementError + '').html('Please make sure your password is exactly 8 numbers and/or upper/lowercase letters.').addClass('warningText');
                    $('#' + id + '').removeClass('successBorder').addClass('warningBorder');
                }
                break;

            case 'verifyPassword':
                var password = $('#password').val(),
                    vp = $('#verifyPassword').val();

                if (password !== '' && vp !== '') {
                    if (password === vp) {
                        $('#' + elementError + '').html('Verify password: <span class="requiredField">*</span>').removeClass('warningText');
                        $('#' + id + '').removeClass('warningBorder').addClass('successBorder');
                    } else {
                        $('#' + elementError + '').html('Please make sure this matches your password').addClass('warningText');
                        $('#' + id + '').removeClass('successBorder').addClass('warningBorder');
                    }
                }
                break;
            case 'firstName':
            case 'lastName':
            case 'state':
                $('#' + elementError + '').html(elementName + ': <span class="requiredField">*</span>').removeClass('warningText');
                $('#' + id + '').removeClass('warningBorder').addClass('successBorder');
                break;
        }
    }
}