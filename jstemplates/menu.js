$(document).ready(function () {
    if (document.querySelectorAll('.meganav__desktop, .meganav__mobile')) { // if meganav exists on the page
        initNav();
        setActive__paths();

        function setActive__paths() {
            var currentURL = window.location.href; // retrieve current href
            var paths = currentURL.substring(currentURL.lastIndexOf('host') + 5, currentURL.length); // retrieve URL path directly after ".com/"                 
            var path__sections = paths.split('/'); // split to array                     
            setActive__elements(path__sections, $('.navItem__button--main'), 'section'); // set the active section
            setActive__elements(path__sections, $('.navItem__button--submenu'), 'subsection'); // set the active subsection (mobile)
            setActive__elements(path__sections, $('.navItem').not('.meganav__global--li .navItem'), 'page'); // set the current page
        }

        function setActive__elements(toMatch, toIterate, spanText) {
            if (spanText !== 'page') { // if not setting current page
                if (spanText === 'section') { // and setting current section                    
                    if (toMatch.length === 1) {
                        toMatch[0] = toMatch[0].substring(toMatch[0], toMatch[0].lastIndexOf('.'));
                    }
                    toMatch = toMatch[0];
                } else if (spanText === 'subsection') { // of if setting current subsection
                    if (toMatch.length === 2) {
                        toMatch[1] = toMatch[1].substring(toMatch[1], toMatch[1].lastIndexOf('.'));
                        toMatch = toMatch[1];
                    } else if (toMatch.length === 3) {
                        toMatch = toMatch[1];
                    }
                }

                for (var i = 0; i < toIterate.length; i++) {
                    if (toIterate[i].getAttribute('data-section') === toMatch) { // if not at root level look at data-section match
                        $(toIterate[i]).addClass('current--section').attr('aria-current', 'true');
                        $(toIterate[i]).append('<span class="current--srtext">Current ' + spanText + '</span>');
                    }
                }
            } else { // if setting current page
                var beforeHTM = window.location.href.substring(window.location.href.lastIndexOf('/') + 1, window.location.href.lastIndexOf('.')); // get all between last / and .htm
                var pageName = beforeHTM.toLowerCase().replace(/[\s-]+/g, ''); // set it to lowercase and remove any spaces and dashes                
                for (var i = 0; i < toIterate.length; i++) { // iterate all links nested in submenu            
                    if (toIterate[i].getAttribute('href')) { // Ways to Invest does not have href attribute as a <p>
                        var toIterateHREF = toIterate[i].getAttribute('href'); // grab the href of each item in this submenu
                        var y = toIterateHREF.substring(toIterateHREF.lastIndexOf('/') + 1, toIterateHREF.lastIndexOf('.')); // and strip it to everything between last slash and .htm
                        var linkName = y.toLowerCase().replace(/[\s-]+/g, ''); // and remove spaces and dashes                       
                        if (linkName === pageName) {
                            $(toIterate[i]).addClass('current--page').attr('aria-current', 'page').append('<span class="current--srtext">Current ' + spanText + '</span>'); // set as current page/attr the aria and append the sr text 
                        }
                    }
                }
            }
        }

        function initNav() {
            var isMobileView, timeout;
            $(window).resize(function () {
                clearTimeout(timeout);
                timeout = setTimeout(resizeDone, 200);
            });

            function browser__width(width) {
                if (width < 768) {
                    $('.meganav__desktop, .meganav__global').addClass('hidden').attr('aria-hidden', 'true');
                    $('.meganav__mobile').removeClass('hidden').attr('aria-hidden', 'false');
                    isMobileView = true;
                } else {
                    $('.meganav__desktop, .meganav__global').removeClass('hidden').attr('aria-hidden', 'false');
                    $('.meganav__mobile').addClass('hidden').attr('aria-hidden', 'true');
                    isMobileView = false;
                }
            }
            browser__width(window.innerWidth);

            function resizeDone() {
                nav.menu__reset();
                browser__width(window.innerWidth);
            }

            var deviceTest = false; //initiate as false, test against list of devices on page load            
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
                deviceTest = true;
            }

            /*--------------------
            Event listner: click & keydown
            ---------------------*/
            var interactiveElements = document.querySelectorAll('.navItem, .showOnFocus');
            for (var i = 0; i < interactiveElements.length; i++) {
                interactiveElements[i].addEventListener('keydown', function (ev) {
                    nav.defineElementLevel(ev, this); // defineElementLevel defines what type of element (mainNav, subHeading, etc) and what key was pressed
                });
                interactiveElements[i].addEventListener('click', function (ev) {
                    nav.defineElementLevel(ev, this); // defineElementLevel defines what type of element (mainNav, subHeading, etc) and what key was pressed                 
                });
            }
            var body = document.querySelector('body'); // for offmenu click/body click event        
            body.addEventListener('click', function (ev) {
                if (isMobileView) {
                    if ($('.meganav__mobile--wrap').hasClass('hidden') === false) { // if menu is open
                        nav.offMenuClick(ev); // close menu on mobile off-menu click
                    }
                }
            });

            /*--------------------
            Event listner: hover
            ---------------------*/
            var meganav__desktop = $('.meganav__desktop')[0];
            var navItem__button = $('.navItem__button');
            var meganavDelay;
            meganav__desktop.addEventListener('mouseenter', function () { // goal: set delay of 305ms when user hovers over meganav to avoid submenus showing immediately/unwanted                
                clearTimeout(meganavDelay); // clear the timeout delay
                if ($(meganav__desktop).hasClass('hover') === false) { // if meganav isn't currently being hovered over                    
                    meganavDelay = setTimeout(function () {
                        $(meganav__desktop).addClass('hover'); // then apply hover class after a 310ms delay
                    }, 305);
                }
            });
            meganav__desktop.addEventListener('mouseleave', function (ev) { // when leaving meganav
                clearTimeout(meganavDelay); // clear the timeout delay
                $(meganav__desktop).removeClass('hover'); // and remove the hover class
                nav.mouseleave(ev.target);
            });

            if (!deviceTest) { // if not on a device add hover events
                for (var i = 0; i < navItem__button.length; i++) { // navItem__button button hover                           
                    navItem__button[i].addEventListener('mouseenter', function (ev) { // touch screen devices register 1st touch as mouseenter, subsequent touches as clicks    
                        if (!isMobileView) {
                            nav.mouseenter(ev.target);
                        }
                    });
                    navItem__button[i].addEventListener('onmouseout', function (ev) {
                        nav.mouseleave(ev.target);
                    });
                }
            }

            /*---------------------
            Nav object & methods
            ----------------------*/
            var nav = {
                defineElementLevel: function (ev, element) {
                    var classList = element.classList, // all classes tied to element
                        key = ev.which, // using which instead of keyCode because button keydown registers as click (ev.which = 1) and not as keyCode in FF                        
                        level; // Determine what level of element the keydown event occured on (navItem, navItem__button)

                    if (classList.length < 2 && classList.contains('navItem') || classList.contains('current--page')) {
                        level = 'navItem';
                    } else if (classList.contains('navItem__button')) {
                        level = 'navItem__button';
                    } else {
                        if (classList.contains('showOnFocus')) {
                            $('#heading').attr('tabindex', '-1').focus();
                        }
                    }
                    nav.eventFilter(ev, element, level, key);
                },
                eventFilter: function (ev, element, level, key) {
                    switch (key) {
                        case 1: // click                            
                            if (isMobileView) {
                                if (key === 1) {
                                    nav.click__mobile(element);
                                }
                            } else {
                                nav.toggle__submenu(element);
                            }
                            break;
                        case 9: // tab
                            if (!isMobileView) {
                                nav.keyboard__tab(ev, element);
                            }
                            break;
                        case 27: // escape       
                            nav.keydown__escape(element);
                            break;
                        case 37: // left arrow,
                        case 39: // right arrow,                                
                            if (!isMobileView) { // if on the desktop menu
                                ev.preventDefault();
                                nav.keyboard__leftRight(ev, element, level, key);
                            }
                            break;
                        case 38: // up    
                            ev.preventDefault();
                            nav.keyboard__up(element, level);
                            break;
                        case 40: // down     
                            ev.preventDefault();
                            nav.keyboard__down(element, level);
                            break;
                    }
                },
                offMenuClick: function (ev) {
                    if (ev.target.offsetParent.classList.contains('meganav__mobile--wrap') === false) { // if not clicking within the menu  
                        if (ev.target.classList.contains('navItem__button--mobileMenuButton') === false) {
                            nav.toggle__mobileMenuButton($('.navItem__button--mobileMenuButton'));
                        }
                    }
                },
                menu__reset: function () {
                    $('.meganav__text--alignLeft').parent().removeClass('hidden'); // unhide left aligned items (find advisor/open account)
                    $('.navItem__button').removeClass('navItem__button--expanded green gray hover--gray').attr('aria-expanded', 'false'); // "unexpand" and reset attr's on all navItem__buttons
                    $('.navItem__button').next().addClass('hidden').attr('aria-hidden', 'true'); // hide submenus and reset all attrs of all navItem__buttons
                    $('.navItem__button--main').removeClass('hidden').next().children().removeClass('hidden'); // unhide all of the main nav item buttons and their children
                    nav.arrow__swap();
                    nav.toggle__mainMenu();
                },
                click__mobile: function (element) {
                    if ($(element).hasClass('navItem__button--mobileMenuButton')) {
                        nav.toggle__mobileMenuButton(element);
                    } else if ($(element).hasClass('navItem__button--mainMenu')) { // if clicking on "Main Menu" 
                        nav.menu__reset();
                        $('.navItem__button--mobileMenuButton').focus();
                    } else { // if clicking on button other than "Main Menu"                            
                        if ($(element).hasClass('navItem__button--main')) { // if on a main nav item
                            if ($(element).hasClass('navItem__button--expanded')) { // if the main nav item is currently expanded
                                if ($(element).next().find('.navItem__button--submenu').hasClass('navItem__button--expanded')) { // if a submenu within the main nav item is expanded                                    
                                    $(element).next().children().removeClass('hidden');
                                    nav.toggle__submenu($(element).next().find('.navItem__button--submenu'));
                                    nav.toggle__aria($(element).next().find('.navItem__button--submenu'));
                                } else { // if no submenus within the main nav item are expanded
                                    nav.menu__reset(); // reset 
                                }
                            } else { // if the main nav item is currently collapsed/hidden
                                $('.meganav__text--alignLeft').parent().addClass('hidden'); // hide left aligned items (find advisor/open account)
                                $('.navItem__button--main').not($(element)).addClass('hidden'); // hide all other main nav items and left aligned items (find advisor/open account)
                                nav.toggle__submenu(element);
                                nav.toggle__aria(element);
                            }
                        } else if ($(element).hasClass('navItem__button--submenu')) {
                            $(element).closest('.submenu__level--1').children().not($(element).parent()).toggleClass('hidden');
                            if ($(element).hasClass('navItem__button--expanded')) {
                                $(element).removeClass('navItem__button--expanded').next().addClass('hidden');
                            } else {
                                $(element).addClass('navItem__button--expanded').next().removeClass('hidden');
                            }
                            nav.toggle__aria(element);
                        }
                    }
                    nav.toggle__mainMenu();
                    nav.toggle__activeColor(element);
                    nav.arrow__swap(element);
                },
                toggle__aria: function (element) {
                    if ($(element).hasClass('navItem__button--expanded')) {
                        $(element).attr('aria-expanded', 'true').next().attr('aria-hidden', 'false');
                    } else {
                        $(element).attr('aria-expanded', 'false').next().attr('aria-hidden', 'true');
                    }
                },
                toggle__submenu: function (element) {
                    if ($('.navItem__button').hasClass('navItem__button--expanded')) { // if any menus are expanded
                        if ($(element).hasClass('navItem__button--expanded')) { // if current menu is expanded)    
                            $(element).removeClass('navItem__button--expanded hover--gray').next().addClass('hidden');
                        } else { // if the current menu is NOT the expanded button
                            $('.navItem__button').removeClass('navItem__button--expanded hover--gray').next().addClass('hidden'); // close all menus
                            $(element).addClass('navItem__button--expanded hover--gray').next().removeClass('hidden'); // open this one
                        }
                    } else { // if no menus are expanded
                        $(element).addClass('navItem__button--expanded hover--gray').next().removeClass('hidden'); // open this one
                    }
                    nav.toggle__aria(element);
                    nav.arrow__swap(element);
                },
                toggle__mobileMenuButton: function (element) {
                    nav.menu__reset(); // reset the menu attributes/arrows
                    if ($(element).next().hasClass('hidden')) {
                        $(element).attr('aria-expanded', 'true').next().removeClass('hidden').attr('aria-hidden', 'false');
                        setTimeout(function () {
                            $(element).next().removeClass('offScreen--right'); // toggle offscreen
                        }, 100);
                    } else {
                        $(element).attr('aria-expanded', 'false').next().addClass('offScreen--right').attr('aria-hidden', 'true'); // toggle offscreen
                        setTimeout(function () {
                            $(element).next().addClass('hidden');
                        }, 300);
                    }
                },
                toggle__mainMenu: function () {
                    if ($('.navItem__button--expanded').length > 0) { // if any main nav item button is expanded   
                        $('.mainMenu').removeClass('hidden');
                    } else {
                        $('.mainMenu').addClass('hidden');
                    }
                },
                toggle__activeColor: function (element) {
                    $('.navItem__button').removeClass('gray green'); // remove green and gray from all navItem__button
                    $('.navItem__button--expanded').addClass('green').last().addClass('gray'); // add green to expanded buttons|add gray to last expanded (gray is below green in css so will over-ride green)
                },
                arrow__swap: function (element) {
                    $('.navItem__button').not('.navItem__button--expanded').children().removeClass('meganav__arrow--rotate');
                    $(element).children().addClass('meganav__arrow--rotate');
                },
                keydown__escape: function (element) {
                    nav.menu__reset();
                    if (isMobileView) {
                        $('.navItem__button--mobileMenuButton').focus()
                        $('.meganav__mobile--wrap').addClass('offScreen--right');
                    } else {
                        $(element).closest('.submenu__level--1').prev().focus();
                    }
                },
                keyboard__tab: function (ev, element) {
                    if (!ev.shiftKey) { // if not pressing shift key           
                        if ($(element).parent().next().length === 0) { // if there is no next menu item
                            if ($(element).next().length === 0) { // if there is no nested submenu                              
                                if ($(element).closest('.submenu__col').next().length === 0 || $(element).closest('.submenu__col').next().hasClass('submenu__bottomImage')) { // if there is no next column
                                    $('.navItem__button').removeClass('hover--gray');
                                    nav.toggle__submenu($(element).closest('.submenu__level--1').prev()); // toggle all menus closed  
                                }
                            }
                        }
                    } else { // if pressing shift key
                        if ($(element).hasClass('navItem__button--expanded')) { // if on the main nav item and it is expanded and pressing shift + tab
                            $('.navItem__button').removeClass('hover--gray');
                            nav.toggle__submenu(element); // close the open submenu
                        }
                    }
                },
                keyboard__up: function (element, level) {
                    if ($(element).parent().prev().length > 0) { // if there is a previous element
                        if ($(element).hasClass('navItem__button--main')) { // if currently on a main nav item
                            if ($('.mainMenu').hasClass('hidden') === false) { // if "Main Menu" is visible
                                $('.navItem__button--mainMenu').focus(); // focus on "Main Menu"
                            } else { // if on a main nav item and "Main Menu" is NOT visible
                                if ($(element).parent().prev().hasClass('mainMenu')) { // if the previous item IS main menu and "Main Menu" is not visible                                    
                                    $(element).parent().prev().prev().children()[0].focus(); // focus on the item previous to "Main Menu"
                                } else {
                                    if (isMobileView) { // if on the mobile menu
                                        $(element).parent().prev().children()[0].focus();
                                    }
                                }
                            }
                        } else { // if not currently on a main nav item
                            if ($(element).hasClass('navItem__button--mainMenu')) { // if on "Main Menu"
                                $('.navItem__button--mobileMenuButton').focus(); // focus on the Menu button
                            } else {
                                if ($(element).parent().prev().hasClass('hidden') === false) { // if previous item is not hidden
                                    if ($(element).parent().prev().hasClass('spacerBar__nav--topSpace') || $(element).parent().prev().hasClass('navItem__noLink')) { // if previous item is a spacerBar or noLink
                                        if (!isMobileView) { // if desktop
                                            $(element).closest('.submenu__col').prev().find('.navItem').last().focus(); // focus on the last nav item of the previous column
                                        } else { // if mobile
                                            $(element).parent().prev().prev().children()[0].focus();
                                        }
                                    } else {
                                        $(element).parent().prev().children()[0].focus(); // CREATE CONDITION FOR DOING THIS AS LONG AS ELEMENT ISNT A MAIN NAV ITEM IN DESKTOP TO AVOID PRESSING UP TO CLOSE MENU AND MOVE TO PREV ITEM
                                    }
                                } else { // if previous item is hidden then on a submenu button that is expanded
                                    $(element).closest('.submenu__level--1').prev().focus(); // focus on main nav item
                                }
                            }
                        }
                    } else { // if no previous element
                        if ($(element).parent().parent().hasClass('meganav__mobile--wrap')) {
                            $('.navItem__button--mobileMenuButton').focus();
                        } else if ($(element).parent().parent().hasClass('submenu')) { // if at first item within submenu
                            $(element).closest('.submenu').prev().focus(); // focus on the closest subheading|main nav item
                        } else if ($(element).hasClass('subheading')) { // else if on the subheading
                            if ($(element).parent().parent().prev().length > 0) { // if there is a previous column
                                $(element).closest('.submenu__col').prev().find('.navItem').last().focus(); // focus on the last nav item of the previous column
                            } else { // if there is no previous column
                                $(element).closest('.submenu__level--1').prev().focus(); // focus on the main nav item
                            }
                        }
                    }
                },
                keyboard__down: function (element, level) {
                    if ($(element).hasClass('navItem__button--mobileMenuButton')) { // if pressing down on the mobile menu button
                        if ($('.mainMenu').hasClass('hidden')) { // if "Main Menu" is hidden
                            $(element).next().find('.navItem')[0].focus(); // focus on first nav item
                        } else { // if "Main Menu" is visible
                            $('.navItem__button--mainMenu').focus(); // focus on main menu
                        }
                    } else { // if not pressing down on mobile menu button
                        if ($(element).next().length > 0) { // if there is a nested submenu
                            if (!isMobileView) { // if on desktop
                                $(element).next().find('.navItem')[0].focus(); // drop into it and focus on the first navItem
                            } else { // if on mobile menu
                                if ($(element).hasClass('navItem__button--expanded')) { // if current element is expanded
                                    $(element).next().children().not('.hidden').find('.navItem')[0].focus(); // find the first NOT HIDDEN menu item and focus on it
                                } else { // if the current element is not expanded                                                  
                                    if ($(element).parent().next().not('.hidden').find('.navItem__button').length > 0) { // if there is a next submenu button
                                        $(element).parent().next().not('.hidden').find('.navItem__button')[0].focus(); // focus on it
                                    } else { // if there is not a next submenu button
                                        if ($(element).parent().next().hasClass('submenu__bottomImage') === false) {
                                            $(element).parent().next().not('.hidden').find('.navItem')[0].focus(); // focus on the next navItem
                                        }
                                    }
                                }
                            }
                        } else { // if there is not a nested submenu
                            if ($(element).parent().next().length > 0) { // if there is a next item    
                                if ($(element).hasClass('navItem__button--mainMenu')) { // if on "Main Menu"
                                    $('.navItem__button--expanded').first().focus(); // find first expanded button and focus on it
                                } else {
                                    $(element).parent().nextAll().not('.hidden').find('.navItem')[0].focus(); // look over all the next siblings and focus on the first not hidden navItem
                                }
                            } else { // if there is not a next item
                                if (!isMobileView) { // if in the desktop menu
                                    if ($(element).closest('.submenu__col').next().length > 0); { // if there is a next column level element in line
                                        if ($(element).closest('.submenu__col').next().hasClass('submenu__bottomImage') === false) {
                                            $(element).closest('.submenu__col').next().find('.navItem')[0].focus(); // focus on the first nav item of the next column
                                        } else if ($(element).closest('.submenu__col').next().hasClass('submenu__bottomImage')) { // else if it IS the submenu__bottomImage
                                            if ($(element).closest('.submenu__level--1').prev().parent().next().length !== 0); { // if there is a next main nav button item in line   
                                                $('.navItem__button').removeClass('hover--gray');
                                                $(element).closest('.submenu__level--1').prev().parent().next().children()[0].focus(); // focus on next menu item
                                                nav.toggle__submenu($(element).closest('.submenu__level--1').prev()); // toggle all menus closed
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                keyboard__leftRight: function (ev, element, level, key) {
                    if (level !== 'navItem__button') { // if not on a main nav item                        
                        element = $(element).closest('.submenu__level--1').prev(); // then set element equal to the nearest main nav item
                    }
                    if ($(element).hasClass('navItem__button--expanded')) { // if the submenu is open
                        nav.toggle__submenu(element); // close the submenu
                    }
                    if (key === 39) { // if right arrow (or down: see keyboard__down() for reference)                                 
                        if ($(element).parent().next().length > 0) { // if there is a next main nav item
                            $(element).parent().next().children()[0].focus(); // focus on it
                        } else { // if there is no next item
                            $(element).focus(); // focus on the current main nav element
                        }
                    } else if (key === 37) { // if left arrow
                        if ($(element).parent().prev().length > 0) { // if there is a prev main nav item
                            $(element).parent().prev().children()[0].focus(); // focus on it
                        } else { // if there is no prev item
                            $(element).focus(); // focus on the current main nav element
                        }
                    }
                    nav.toggle__submenu();
                },
                leaveTimeout: '',
                mouseenter: function (element) {
                    $('.navItem__button').removeClass('pinned');
                    clearTimeout(nav.leaveTimeout); // hide all other submenus when entering target submenu                                             
                    if ($('.meganav__desktop').hasClass('hover')) { // if currently hovering in meganav         
                        nav.toggle__submenu(element);
                    } else { // if not currently hovering in meganav
                        nav.mainNavDelay = setTimeout(function () { // then set a 300ms delay before opening submenu
                            nav.toggle__submenu(element);
                        }, 500);
                    }
                },
                mouseleave: function (element) {
                    if ($('.navItem__button').hasClass('pinned') === false) {
                        clearTimeout(nav.mainNavDelay);
                        nav.leaveTimeout = setTimeout(function () {
                            nav.toggle__submenu();
                        }, 300);
                    }
                },
            }
        }
    }
});
/* KEEP FOR PINNING MENU OPEN - FUTURE ENHANCEMENT.  WORKS EVERYWHERE BUT SAFARI/DESKTOP
                                if (level === 'navItem__button') { // if a main nav button
                                    if (!deviceTest) { // if not a device   
                                        console.log('not a device and event logged as ' + ev);
                                        if ((ev.mozInputSource === 1) || // test Firefox for mouse-triggered event                                        
                                            (ev.screenX !== 0 && ev.mozInputSource == undefined && ev.pointerId === undefined) || // test Chrome and avoid conflict w/ Firefox & IE
                                            (ev.screenX !== 0 && ev.mozInputSource == undefined && ev.pointerId === 1)) { // test IE and avoid conflicts with Chrome and Firefox
                                            $(element).toggleClass('pinned');
                                        } else {
                                            nav.toggle__submenu(element);
                                        }
                                    } else { // if a device      
                                        console.log('registering as device and logged event as ' + ev);
                                        nav.toggle__submenu(element);
                                    }
                                }
                                */