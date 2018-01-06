$(window).on('load', function () { // when page loads, spinner will load and spin until all resources are loaded
    init(); // when all resources are loaded run init
});

function init() {
    $('.portfolio__overlay--loader').fadeOut(100); // when page resources load/init runs, fade out the loader overlay screen

    /*----------------------------
    Events and behavior for setting background image
    -----------------------------------
    var backgroundImages = ['arthill.jpg', 'bevo.jpg', 'buschstadium.jpg', 'insidearch.jpg', 'oldcourthouse.jpg', 'pageant.gif', 'powellhall.jpg', 'soulardmarket.jpg', 'stlskyline.jpg', 'towergrove.jpg', 'unionstation.jpg', 'voltron.jpeg', 'zoo.jpg'];
    var currentElement;
    var infoClick = false;

    $('.dynamicBackground__button').click(function () {
        infoClick = true;
        getCurrentBackgroundImage(currentElement);
    });

    function getCurrentBackgroundImage(currentElement) {
        var currentImage = $('.portfolio__container--demo').css('background-image'); // get current background image
        var x = currentImage.lastIndexOf('/'); // find last '/'
        var y = currentImage.substring(x + 1); // find all chars after last /
        currentElement = y.substring(y, y.length - 2); // // remove last 2 chars of currentElement
        if (infoClick === true) {
            getNextBackgroundImage(currentElement);
        } else {
            setDynamicBackgroundText(currentElement);
        }
    }

    function getNextBackgroundImage(currentElement) {
        var index;
        var next;
        for (var i = 0; i < backgroundImages.length; i++) { // iterate over array of images
            if (backgroundImages[i] === currentElement) { // find element that matches background image
                index = backgroundImages.indexOf(backgroundImages[i]); // define its index via var index
            }
            if (index + 1) { // if the array has an index AFTER the existing array
                next = backgroundImages[index + 1]; // define next as that next array element
            }
        }
        if (next) { // if not on the last element of the array            
            $('.portfolio__container--demo').css('background-image', 'url(images/portfolioIcons/' + next + ''); // set background image equal to next
        } else { // if on the last element of the array
            next = backgroundImages[0]; // set next equal to value of first array element
            $('.portfolio__container--demo').css('background-image', 'url(images/portfolioIcons/' + backgroundImages[0] + ''); // set background image to first element index of array
        }
        setDynamicBackgroundText(next); // dynamically set the main info p text
    }

    function setDynamicBackgroundText(element) {
        var dynamicBackground__text;
        switch (element) {
            case 'arthill.jpg':
                dynamicBackground__text = "Art Museum";
                break;
            case 'bevo.jpg':
                dynamicBackground__text = "Bevo Mill";
                break;
            case 'buschstadium.jpg':
                dynamicBackground__text = "Busch Stadium";
                break;
            case 'insidearch.jpg':
                dynamicBackground__text = "Inside the Arch";
                break;
            case 'pageant.gif':
                dynamicBackground__text = "The Pageant";
                break;
            case 'powellhall.jpg':
                dynamicBackground__text = "Powell Hall";
                break;
            case 'oldcourthouse.jpg':
                dynamicBackground__text = "The Old Courthouse";
                break;
            case 'soulardmarket.jpg':
                dynamicBackground__text = "Soulard Market";
                break;
            case 'stlskyline.jpg':
                dynamicBackground__text = "St. Louis Skyline";
                break;
            case 'towergrove.jpg':
                dynamicBackground__text = "Tower Grove Park";
                break;
            case 'unionstation.jpg':
                dynamicBackground__text = "St. Louis Union Station";
                break;
            case 'voltron.jpeg':
                dynamicBackground__text = "Voltron, Central West End";
                break;
            case 'zoo.jpg':
                dynamicBackground__text = "St. Louis Zoo";
                break;
        }
        $('.dynamicBackground__text').text(dynamicBackground__text);
    }
    */
    /*----------------------------------------------------
    Test viewport size on page load: If mobile apply .mobileView    
    ------------------------------------------------------------*/
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

    function emptyDemoContainer() {
        $('#dynamicCSS').attr('href', ''); // reset dynamic css to blank
        $('.portfolio__container--demo').css('filter', 'grayscale(100%)'); // re-apply grayscale to image
        $('.portfolio__overlay--demo').empty(); // empty existing content from overlay --demo
        $('.portfolio__container--code').addClass('offScreenTop'); // move code container offscreen
        $('.codeChoiceTabs li').removeClass('codeChoice__highlight'); // remove highlight from all code choice tabs
        $('#html').addClass('codeChoice__highlight'); // reset default code container view to add highlight to html element
    }

    function moveContent(moveIn) { // dynamically shift code content according to what user selects to view     
        $('.portfolio__menu').fadeIn(); // fade in portfolio menu
        $('.portfolio__container').addClass('offScreenLeft visuallyHidden'); // move all portfolio containers out of view
        setTimeout(function () {
            $('.portfolio__container--' + moveIn + '').removeClass('offScreenLeft visuallyHidden'); // move moveIn container in to view
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
                sequenceFade('.portfolio__projectCard', 'out'); // fade out portfolio cards
                $('.portfolio__container--demo').removeClass('backgroundLeft backgroundRight');
                $('.portfolio__menu').fadeOut(); // fade out portfolio menu        
                $('.portfolio__container--dynamicBackground').fadeIn();
                break;
            case 'profile':
                sequenceFade('.portfolio__projectCard', 'out'); // fade out portfolio cards
                setupProfileContainer(); // set up profile container behavior
                $('.portfolio__container--demo').removeClass('backgroundRight').addClass('backgroundLeft'); // slide background image left
                if ($('.portfolio__wrap').hasClass('mobileView')) { // keep mainInfo off screen in mobile (save real estate)
                    $('.mainInfo').fadeOut();
                } else {
                    $('.portfolio__container--dynamicBackground').fadeIn();
                }
                break;
            case 'projects':
                sequenceFade('.portfolio__projectCard', 'in'); // fade in portfolio cards
                $('.portfolio__container--demo').removeClass('backgroundLeft').addClass('backgroundRight'); // slide background image right
                if ($('.portfolio__wrap').hasClass('mobileView')) { // keep mainInfo off screen in mobile (save real estate)
                    $('.mainInfo').fadeOut();
                } else {
                    $('.portfolio__container--dynamicBackground').fadeIn();
                }
                break;
            case 'demo':
                $('.portfolio__container--demo').removeClass('backgroundLeft backgroundRight').css('filter', 'grayscale(0%)'); // remove slide from background image, remove grayscale from container so demo colors show
                $('.portfolio__container--dynamicBackground').fadeOut();
                sequenceFade('.portfolio__projectCard', 'out'); // fade out portfolio cards               
                break;
        }
    }

    /*-------------------------
    Portfolio menu events|behaviors
    ---------------------------*/
    $('.portfolio__control').click(function (e) {
        var clicked = e.currentTarget.id;
        if ($(this).attr('id') !== 'control__mobile') { // it not clicking on the mobile menu button
            $('.portfolio__overlay--demo').removeClass('allWhite'); // remove allWhite from the demo overlay so show the arch
        }

        switch (clicked) {
            case 'control__mobile':
                if (!$('.portfolio__control').hasClass('showing')) { // if control tabs currently DONT have class showing
                    sequenceFade('.portfolio__control', 'in'); // sequentially fade them in
                    $('.portfolio__control--mobile').css('background-image', 'url("images/portfolioIcons/close_mobile.svg")');
                } else { // if control tabs DO have class showing
                    sequenceFade('.portfolio__control', 'out'); // sequentially fade them out
                    $('.portfolio__control--mobile').css('background-image', 'url("images/portfolioIcons/menu.png")');
                }
                break;
            case 'control__home':
                moveContent('title'); // move in title container            
                break;
            case 'control__profile':
                if ($('.portfolio__container--profile').hasClass('offScreenLeft')) { // if profile container is not currently visible AND menu IS visible 
                    moveContent('profile'); // move profile container in to view                    
                }
                break;
            case 'control__projects':
                if ($('.portfolio__wrap').hasClass('mobileView')) { // test if viewport is in mobile view
                    $('.portfolio__projectCard').each(function (i) { // iterate over each portfolio card
                        if ($('.portfolio__projectCard').eq(i).hasClass('flipped')) { // determine if any card is flipped
                            $('.portfolio__projectCard').show(); // show all cards previously hidden on flip
                            $('.portfolio__projectCard').eq(i).removeClass('flipped fullCard'); // and remove flipped and fullCard class to restore grid view to normal
                        }
                    });
                    sequenceFade('.portfolio__control', 'out'); // sequentially fade them in
                }
                if ($('.portfolio__container--projects').hasClass('offScreenLeft')) { // if projects container is not currently visible AND menu IS visible   
                    moveContent('projects'); // move projects container in to view
                }
                break;
            case 'control__source':
                if ($('.portfolio__overlay--demo').children().length > 0) { // if a project has been loaded into the demoOverlay container                          
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
        $('.profile__categories--item').removeClass('profile__categories--active'); // remove active from all categories
        $('#profileCategorySkills').addClass('profile__categories--active'); // reset career as the default option/choice       
        $('.profile__list').removeClass('showList'); // reset all lists to be hidden
        $('.profile__list--skills').addClass('showList'); // and show career list 
        setTimeout(function () { // use timing  function to fade in each list item one-by-one over 250ms
            $('.profile__list--skills li').each(function (i) {
                setTimeout(function () {
                    $('.profile__list--item').eq(i).addClass('showing');
                }, 100 * (i + 1));
            });
        }, 250);
    }

    $('.profile__categories--item').click(function (e) { // on clicking to a new category
        $('.profile__list--item').removeClass('showing'); // hide all list items in all categories
        var clicked = e.currentTarget.id; // define ID of clicked category        
        changeProfileCategory($(this)); // run changeProfileCategory w/ the profile category element as argument
        changeProfileContent(clicked); // run changeProfileCategory w/ the profile category element id as argument
    });

    function changeProfileCategory(category) {
        if (!$(category).hasClass('profile__categories--active')) { // if the clicked category is NOT the current active category
            $('.profile__categories--item').removeClass('profile__categories--active'); // remove active class from all profile categories
            $(category).addClass('profile__categories--active'); // add active class to current clicked category
        }
    }

    function changeProfileContent(clicked) {
        $('.profile__list').removeClass('showList'); // remove showing from all content lists
        switch (clicked) { // determine which category was clicked & show the appropriate list
            case 'profileCategoryCareer':
                $('.profile__list--career').addClass('showList');
                break;
            case 'profileCategorySkills':
                $('.profile__list--skills').addClass('showList');
                break;
            case 'profileCategoryContact':
                $('.profile__list--contact').addClass('showList');
                break;
        }
        $('.profile__list--item').each(function (i) { // sequentially show all previously hidden content list items over 1ms
            setTimeout(function () {
                $('.profile__list--item').eq(i).addClass('showing');
            }, 100 * (i + 1));
        });
    }

    /*-------------------------
    Projects container events|behaviors
    ---------------------------*/
    $('.portfolio__projectCard').click(function () { // flip portfolio cards when clicked
        $(this).find('.portfolio__projectCard--front').toggleClass('hidden');
        if ($('.portfolio__wrap').hasClass('mobileView')) { // test for mobile behavior
            $('.portfolio__projectCard').not($(this)).hide(); // hide all cards except the clicked card
            $(this).toggleClass('flipped').find('.portfolio__projectCard--back').toggleClass('hidden'); // flip the clicked card
            if ($(this).hasClass('flipped')) { // if the card is flipped
                $(this).find('.projectCard__demoButton').focus(); // focus on the demo button
                $(this).addClass('fullCard'); // assign it a width and height of 100%                    
            } else { // if the card is not flipped 
                $(this).find('.projectCard__frontButton').focus();
                $('.portfolio__projectCard').show(); // show all portfolio cards                    
                $(this).removeClass('fullCard'); // reset this card back to original width and height (33%, 33.5%)
            }
        } else { // if desktab behavior
            $(this).toggleClass('flipped').find('.portfolio__projectCard--back').toggleClass('hidden'); // flip/unflip the clicked card
            if ($(this).hasClass('flipped')) { // if the card is flipped
                $(this).find('.projectCard__demoButton').focus(); // focus on the demo button
            } else {
                $(this).find('.projectCard__frontButton').focus();
            }
            $(this).find('.portfolio__projectCard--back').toggleClass('ieBackface'); // Toggle special class to reveal "back of card" for IE
        }
    });

    var projectChoice, stylesheet, projectName;

    $('.projectCard__demoButton').click(function (e) { // on clicking the demo button
        $('.portfolio__container--demo').css('z-index', '3'); // set z-index of demo container to 3 so user can interact with demo
        $('.portfolio__overlay--demo').addClass('allWhite'); // set background of demo overlay to all white to block out portfolio background image
        projectChoice = e.currentTarget.id; // define ID of demo clicked
        stylesheet = 'csstemplates/' + projectChoice + '.css'; // combine with csstemplates string                
        moveContent('demo'); // move projects container out of view        
        loadDemo(projectChoice, stylesheet); // dynamically populate demo content  
        $('.portfolio__control--mobile').css('background-image', 'url("images/portfolioIcons/menu.png")');
        sequenceFade('.portfolio__control', 'out'); // sequentially fade them out
    });

    function loadDemo(project, stylesheet) {
        projectName = project.replace(/\s/g, '').toLowerCase(); // remove spaces and set string to lowercase        
        $('.portfolio__overlay--demo').load('htmltemplates/' + projectName + '.htm'); // load html file into --demo
        $('#dynamicCSS').attr('href', stylesheet); // set dynamicCSS via stylesheet value passed in projectCard__demoButton click event        

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
        $('.codeChoice').removeClass('codeChoice__highlight'); // remove highlight from all tabs
        $(this).addClass('codeChoice__highlight'); // add highlight to selected element
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
        $('.portfolio__menu, .mobile__menu').toggle();
    });
}