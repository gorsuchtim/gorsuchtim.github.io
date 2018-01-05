$(document).ready(function () {
    var cookieCheck = readCookie('cookieCheck');
    if (cookieCheck) {
        $('.cookieCheck__container--cookie').fadeIn();
    } else {
        $('.cookieCheck__container--noCookie').fadeIn();
    }

    var setCookie__button = document.querySelector('.cookieCheck__button--setCookie');
    setCookie__button.addEventListener('click', function (ev) {
        createCookie('cookieCheck', 'userexperience', 365);
        $('.howToSeeCookie').fadeIn();
    });

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    var deleteCookie__button = document.querySelector('.cookieCheck__button--deleteCookie');
    deleteCookie__button.addEventListener('click', function () {
        deleteCookie('cookieCheck');
        $('.cookieDeletedContent').fadeIn();
    });

    function deleteCookie(name) {
        createCookie(name, "", -1);
    }
});