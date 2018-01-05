$(document).ready(function () {
    $('.accButton').click(function () {
        $(this).next().slideToggle(200); // slide down/up the panel from clicked element
        $('.panel').not($(this).next()).slideUp(200); // if any panel element is NOT associated with the clicked element, slide it up
    });
});