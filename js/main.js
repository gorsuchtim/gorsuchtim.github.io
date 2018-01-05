window.onload = function () {
    viewport__test();
    portfolioInit();
}

function viewport__test() {
    if (window.innerWidth <= 768) { // if < 768 add mobile class to project container
        $('.portfolio__wrap').addClass('mobileView');
    } else if (window.innerWidth > 768) { // if > 768
        $('.portfolio__wrap').removeClass('mobileView');
    }

    /*---------------------------
    Test viewport size after window resizing
    ------------------------------*/
    var resizeTimeout;
    $(window).resize(function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(windowResize, 200);
    });

    function windowResize() {
        if (window.innerWidth <= 768) { // when resizing from desktop to mobile
            $('.portfolio__wrap').addClass('mobileView');
        } else if (window.innerWidth > 768) { // if resizing to desktop
            $('.portfolio__wrap').removeClass('mobileView');
        }
    }
}

function portfolioInit() {
    $('.portfolio__container--loader').fadeOut(100); // when page resources load/, fade out the loader overlay screen

    /*-------------------------------
    Background image events and behaviors
    --------------------------------*/
    var infoButton = document.querySelector('.portfolio__button--info');
    infoButton.addEventListener('click', function () {
        $('.text__background--options').fadeToggle(); // toggle fade image info text
    });

    var background__view = document.querySelectorAll('.viewBackground');  // define both "view image" and the back/view image close button
    for (var i = 0; i < background__view.length; i++) {
        background__view[i].addEventListener('click', function () {
            toggle__backgroundView();
        });
    }

    function toggle__backgroundView() {
        $('.portfolio__container--demoOverlay').toggleClass('noOverlay').parent().toggleClass('removeFilter');
        $('.backgroundImage__container, .text__title, .titleButtons').fadeToggle();
        $('.viewBackgroundClose').fadeToggle();
    }

    var background__change = document.querySelector('.changeImage');
    background__change.addEventListener('click', function () {
        var x = $('.portfolio__container--demo').css('background-image');
        var currentBackground = getCurrentBackgroundImage(x); // send current background image to function for slicing
        var nextBackground = getNextBackgroundImage(currentBackground); // define next background image
        setNewBackgroundImage(nextBackground);
        setBackgroundTitle(nextBackground);
    });

    function getCurrentBackgroundImage(current) {
        var x = current.split("/").pop();
        var result = x.substr(x, x.length - 2);
        return result;
    }

    function getNextBackgroundImage(current) { // es6 this into a better solution
        var next,
            backgroundImages = ['arthill.jpg', 'bevo.jpg', 'buschstadium.jpg',
                'insidearch.jpg', 'oldcourthouse.jpg', 'pageant.gif',
                'powellhall.jpg', 'soulardmarket.jpg', 'stlskyline.jpg',
                'towergrove.jpg', 'unionstation.jpg', 'voltron.jpeg', 'zoo.jpg'];
        if (current === backgroundImages[backgroundImages.length - 1]) { // if current is the last array item
            next = backgroundImages[0]; // set current = to 1st array item to "loop"
        } else {
            for (var i = 0; i < backgroundImages.length; i++) { // iterate the array
                if (backgroundImages[i] === current) { // if an array item matches current
                    next = backgroundImages[i + 1]; // set next = to the next array item
                }
            }
        }
        return next;
    }

    function setNewBackgroundImage(nextBackground) {
        $('.portfolio__container--demo').css('background-image', 'url(images/portfolioIcons/' + nextBackground + '');
    }

    function setBackgroundTitle(nextBackground) {
        var backgroundTitle__text;
        switch (nextBackground) {
            case 'arthill.jpg':
                backgroundTitle__text = "Art Museum";
                break;
            case 'bevo.jpg':
                backgroundTitle__text = "Bevo Mill";
                break;
            case 'buschstadium.jpg':
                backgroundTitle__text = "Busch Stadium";
                break;
            case 'insidearch.jpg':
                backgroundTitle__text = "Inside the Arch";
                break;
            case 'pageant.gif':
                backgroundTitle__text = "The Pageant";
                break;
            case 'powellhall.jpg':
                backgroundTitle__text = "Powell Hall";
                break;
            case 'oldcourthouse.jpg':
                backgroundTitle__text = "The Old Courthouse";
                break;
            case 'soulardmarket.jpg':
                backgroundTitle__text = "Soulard Market";
                break;
            case 'stlskyline.jpg':
                backgroundTitle__text = "St. Louis Skyline";
                break;
            case 'towergrove.jpg':
                backgroundTitle__text = "Tower Grove Park";
                break;
            case 'unionstation.jpg':
                backgroundTitle__text = "St. Louis Union Station";
                break;
            case 'voltron.jpeg':
                backgroundTitle__text = "Voltron, Central West End";
                break;
            case 'zoo.jpg':
                backgroundTitle__text = "St. Louis Zoo";
                break;
        }
        $('.text__background--title').text(backgroundTitle__text);
    }


    /*------------------------
    Global function declarations
    ---------------------*/
    function sequenceFade(element, state) { // sequentially fade in/out portfolio cards in projects container        
        $('' + element + '').each(function (i) { // sequentially fade in each portfolio grid card
            setTimeout(function () {
                if (state === 'in') {
                    $('' + element + '').eq(i).addClass('showing');
                } else if (state === 'out') {
                    $('' + element + '').eq(i).removeClass('showing');
                }
            }, 100 * (i + 1));
        });
    }
    /*
    function emptyDemoContainer() {
        $('#dynamicCSS').attr('href', ''); // reset dynamic css to blank
        $('.portfolio__container--demo').css('filter', 'grayscale(100%)'); // re-apply grayscale to image
        $('.portfolio__container--demoOverlay').empty(); // empty existing content from overlay --demo
        $('.portfolio__container--code').addClass('offScreenTop'); // move code container offscreen
        $('.codeChoiceTabs li').removeClass('ccActive, tabHighlightA'); // remove highlight from all code choice tabs
        $('#html').addClass('ccActive tabHighlightA'); // reset default code container view to add highlight to html element
    }

    function moveContent(moveIn) { // dynamically shift code content according to what user selects to view     
        $('.portfolio__container--menu').fadeIn(); // fade in portfolio menu
        $('.portfolio__container').addClass('offScreenTop').addClass('hidden__none'); // move all portfolio containers out of view
        setTimeout(function () {
            $('.portfolio__container--' + moveIn + '').removeClass('offScreenTop hidden__none'); // move moveIn container in to view
        }, 500);

        /*--------------------
        Conditionals
        -----------------*/
    if (moveIn !== 'demo') { // if moveIn is NOT demo
        $('.portfolio__container--demo').css('z-index', '1'); // reset z-index of demo container to 1
        emptyDemoContainer(); // empty the demo container  
    }

    /*-----------------------
    Custom container behaviors
    -------------------------*/
    switch (moveIn) {
        case 'title':
            sequenceFade('.portfolioCard', 'out'); // fade out portfolio cards
            $('.portfolio__container--demo').removeClass('backgroundLeft backgroundRight');
            $('.portfolio__container--menu').fadeOut(); // fade out portfolio menu        
            $('.mainInfo').fadeIn();
            break;
        case 'profile':
            sequenceFade('.portfolioCard', 'out'); // fade out portfolio cards
            setupProfileContainer(); // set up profile container behavior
            $('.portfolio__container--demo').removeClass('backgroundRight').addClass('backgroundLeft'); // slide background image left
            if ($('.portfolio__wrap').hasClass('mobileView')) { // keep mainInfo off screen in mobile (save real estate)
                $('.mainInfo').fadeOut();
            } else {
                $('.mainInfo').fadeIn();
            }
            break;
        case 'projects':
            sequenceFade('.portfolioCard', 'in'); // fade in portfolio cards
            $('.portfolio__container--demo').removeClass('backgroundLeft').addClass('backgroundRight'); // slide background image right
            if ($('.portfolio__wrap').hasClass('mobileView')) { // keep mainInfo off screen in mobile (save real estate)
                $('.mainInfo').fadeOut();
            } else {
                $('.mainInfo').fadeIn();
            }
            break;
        case 'demo':
            $('.portfolio__container--demo').removeClass('backgroundLeft backgroundRight').css('filter', 'grayscale(0%)'); // remove slide from background image, remove grayscale from container so demo colors show
            $('.mainInfo').fadeOut();
            sequenceFade('.portfolioCard', 'out'); // fade out portfolio cards               
            break;
    }
}

/*-------------------------
Portfolio menu events|behaviors
---------------------------*/
$('.controlTabs').click(function (e) {
    var clicked = e.currentTarget.id;
    switch (clicked) {
        case 'control__mobile':
            if (!$('.controlTabs').hasClass('showing')) { // if control tabs currently DONT have class showing
                sequenceFade('.controlTabs', 'in'); // sequentially fade them in
                $('.control__mobile').css('background-image', 'url("images/portfolioIcons/close_mobile.svg")');
            } else { // if control tabs DO have class showing
                sequenceFade('.controlTabs', 'out'); // sequentially fade them out
                $('.control__mobile').css('background-image', 'url("images/portfolioIcons/menuIcon.svg")');
            }
            break;
        case 'control__home':
            moveContent('title'); // move in title container 
            break;
        case 'control__profile':
            if ($('.portfolio__container--profile').hasClass('offScreenTop')) { // if profile container is not currently visible AND menu IS visible 
                moveContent('profile'); // move profile container in to view                    
            }
            break;
        case 'control__projects':
            if ($('.portfolio__wrap').hasClass('mobileView')) { // test if viewport is in mobile view
                $('.portfolioCard').each(function (i) { // iterate over each portfolio card
                    if ($('.portfolioCard').eq(i).hasClass('flipped')) { // determine if any card is flipped
                        $('.portfolioCard').show(); // show all cards previously hidden on flip
                        $('.portfolioCard').eq(i).removeClass('flipped fullCard'); // and remove flipped and fullCard class to restore grid view to normal
                    }
                });
            }
            if ($('.portfolio__container--projects').hasClass('offScreenTop')) { // if projects container is not currently visible AND menu IS visible   
                moveContent('projects'); // move projects container in to view
            }
            break;
        case 'control__source':
            if ($('.portfolio__container--demoOverlay').children().length > 0) { // if a project has been loaded into the demoOverlay container                   
                $('.portfolio__container--code').toggleClass('offScreenTop');
            }
            break;
    }
});

/*-----------------------------
 Title container events|behaviors    
 -----------------------------*/
$('.portfolio__button').click(function (e) { // clicking title screen portfolio button
    var clicked = e.currentTarget; // get the element clicked
    if ($(clicked).hasClass('portfolio__button--profile')) { // if clicked element was profile button            
        moveContent('profile');
    } else if ($(clicked).hasClass('portfolio__button--projects')) { // if clicked element was projects button
        moveContent('projects');
    }
});

/*------------------------------
Profile container events|behaviors
---------------------------------*/
function setupProfileContainer() {
    $('.profileCategory').removeClass('profileCategoryActive'); // remove active from all categories
    $('#profileCategorySkills').addClass('profileCategoryActive'); // reset career as the default option/choice       
    $('.contentList').removeClass('showList'); // reset all lists to be hidden
    $('.skillsList').addClass('showList'); // and show career list 
    setTimeout(function () { // use timing  function to fade in each list item one-by-one over 250ms
        $('.skillsList li').each(function (i) {
            setTimeout(function () {
                $('.contentListItem').eq(i).addClass('showing');
            }, 100 * (i + 1));
        });
    }, 250);
}

$('.profileCategory').click(function (e) { // on clicking to a new category
    $('.contentListItem').removeClass('showing'); // hide all list items in all categories
    var clicked = e.currentTarget.id; // define ID of clicked category        
    changeProfileCategory($(this)); // run changeProfileCategory w/ the profile category element as argument
    changeProfileContent(clicked); // run changeProfileCategory w/ the profile category element id as argument
});

function changeProfileCategory(category) {
    if (!$(category).hasClass('profileCategoryActive')) { // if the clicked category is NOT the current active category
        $('.profileCategory').removeClass('profileCategoryActive'); // remove active class from all profile categories
        $(category).addClass('profileCategoryActive'); // add active class to current clicked category
    }
}

function changeProfileContent(clicked) {
    $('.contentList').removeClass('showList'); // remove showing from all content lists
    switch (clicked) { // determine which category was clicked & show the appropriate list
        case 'profileCategoryCareer':
            $('.careerList').addClass('showList');
            break;
        case 'profileCategorySkills':
            $('.skillsList').addClass('showList');
            break;
        case 'profileCategoryContact':
            $('.contactList').addClass('showList');
            break;
    }
    $('.contentListItem').each(function (i) { // sequentially show all previously hidden content list items over 1ms
        setTimeout(function () {
            $('.contentListItem').eq(i).addClass('showing');
        }, 100 * (i + 1));
    });
}

/*-------------------------
Projects container events|behaviors
---------------------------*/
$('.portfolioCard').click(function () { // flip portfolio cards when clicked
    if ($('.portfolio__wrap').hasClass('mobileView')) { // test for mobile behavior
        $('.portfolioCard').not($(this)).hide(); // hide all cards except the clicked card
        $(this).toggleClass('flipped'); // flip the clicked card
        if ($(this).hasClass('flipped')) { // if the card is flipped
            $(this).addClass('fullCard'); // assign it a width and height of 100%
        } else { // if the card is not flipped 
            $('.portfolioCard').show(); // show all portfolio cards
            $(this).removeClass('fullCard'); // reset this card back to original width and height (33%, 33.5%)
        }
    } else { // if desktab behavior            
        $(this).toggleClass('flipped'); // flip/unflip the clicked card            
    }
    $(this).find('.back').toggleClass('ieBackface hidden__none').find('.demoButton').focus(); // Toggle special class to reveal "back of card" for IE
});

var projectChoice, stylesheet, projectName;

$('.demoButton__back').click(function (ev) {
    $(this).closest('.back').prev().find('button').focus();
});

$('.demoButton__back').on('keydown', function (ev) {
    if (ev.keyCode === 9 && ev.shiftKey) {
        $(this).closest('.back').toggleClass('ieBackface hidden__none').parent().toggleClass('flipped');
        $(this).closest('.back').prev().find('button').focus();
    }
});
$('.test').click(function () {
    console.log('i am here');
})

$('.demoButton').click(function (e) {
    $('.portfolio__container--demo').css('z-index', '3'); // set z-index of demo container to 3 so user can interact with demo
    projectChoice = e.currentTarget.id; // define ID of demo clicked
    stylesheet = 'csstemplates/' + projectChoice + '.css'; // combine with csstemplates string                
    moveContent('demo'); // move projects container out of view
    loadDemo(projectChoice, stylesheet); // dynamically populate demo content  
});

function loadDemo(project, stylesheet) {
    projectName = project.replace(/\s/g, '').toLowerCase(); // remove spaces and set string to lowercase        
    $('.portfolio__container--demoOverlay').load('htmltemplates/' + projectName + '.htm'); // load html file into --demo
    $('#dynamicCSS').attr('href', stylesheet); // set dynamicCSS via stylesheet value passed in demoButton click event        

    $.ajax({ // load in appropriate javascript file via ajax call
        crossDomain: true, // allow browser to view script seperately in devtools
        url: 'jstemplates/' + projectName + '.js',
        dataType: 'script',
        cache: true
    });
    $('.codeDisplay').load('htmltemplates/' + projectName + '.htm'); // 
}

/*--------------------------
Demo container events|behaviors
---------------------------*/
$('.codeChoice').click(function (e) { // behavior for code display code choice
    var choice = e.currentTarget.id; // determine id of selected element
    $('.codeChoiceTabs li').removeClass('ccActive, tabHighlightA'); // remove highlight from all tabs
    $(this).addClass('tabHighlightA'); // add highlight to selected element
    loadSource(choice); // load associated code to text area
});

function loadSource(choice) {
    var suffix; // dynamically declare suffix (file extension)
    switch (choice) {
        case 'html': // set extension to match code tab choice
            suffix = '.htm';
            break;
        case 'css':
            suffix = '.css';
            break;
        case 'js':
            suffix = '.js';
            break;
    }
    var toLoad = '' + choice + 'templates/' + projectChoice + suffix; // set toLoad to file path using code choice tab
    $('.codeDisplay').load(toLoad); // load file in to codeDisplay
}

$('.mobileCodeClose').click(function () {
    $('.portfolio__container--code').toggle().toggleClass('offScreenTop'); // toggle code container in/out of view            
    $('.portfolio__container--menu, .mobile__menu').toggle();
});
    * /
}