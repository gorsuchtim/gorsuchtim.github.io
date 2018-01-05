// Set defaults
var activeShape = $('#shape1'); // set activeShape to shape 1 on page load
document.getElementById('dropdown1').selected = true; // and set its selected status to true on page load

// JQUERY UI to make shapes draggable
$('.shape').draggable();

//Event listeners on input sliders
var inputs = document.querySelectorAll(".controls input");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', handleUpdate);
    inputs[i].addEventListener('mousemove', handleUpdate);
}

// Setting current shape inline on the html <select> element when user changes to a different shape
function setCurrentShape(obj) {
    activeShape = $('#' + obj + '');
    setCurrentDropdown();
}

// Setting current dropdown <option> when user changes to different shape OR when new shape is added
function setCurrentDropdown() {
    var activeOptionNumber = activeShape[0].id.slice(-1); // get the active option number (last char of all shapes/dropdown id)
    var options = document.querySelectorAll('.selector__existingOptions'); // define all <option> elements
    for (var i = 0; i < options.length; i++) { // iterate them
        options[i].selected = false; // set them all to selected = false
    }
    activeDropdown = document.getElementById('dropdown' + activeOptionNumber); // define the active <option> by id
    activeDropdown.selected = true; // set its selected state to true
}

// Dynamically updating the css variables on the sliders or input/text boxes
function handleUpdate() {
    var suffix = this.dataset.suffix || ''; // if a suffix exists on the css element
    $('#' + this.name + 'Text').val(this.value);
    $('#' + this.name + 'Range').val(this.value);
    $(activeShape).css(this.name, this.value + suffix);
}

var viewInputs = document.querySelector('.button__viewInputs');
viewInputs.addEventListener('click', toggleInputVisibility);

function toggleInputVisibility() {
    document.querySelector('.inputs__wrap').classList.toggle('hidden');
}


// Event listener and function to append new shape
var addShape = document.querySelector('.button__addShape');
var totalShapes = 1;
addShape.addEventListener('click', appendShape);

function appendShape() {
    totalShapes++;
    document.querySelector('.shapeContainer').innerHTML += '<div class="shape" id="shape' + totalShapes + '"></div>'; // add the shape to the container
    document.getElementById('selectorExisting').innerHTML += '<option class="selector__existingOption" value="shape' + totalShapes + '" id="dropdown' + totalShapes + '">Shape ' + totalShapes + '</option>';
    currentShape = document.getElementById('shape' + totalShapes);
    activeShape = $('#shape' + totalShapes + '');
    // JQUERY UI to make shapes draggable
    $('.shape').draggable();
    setCurrentDropdown();
}

// Category Button listeners to swap input containers
var buttonCategory = document.querySelectorAll('.button__category');
for (var i = 0; i < buttonCategory.length; i++) {
    buttonCategory[i].addEventListener('click', swapInputContainer);
}
var flaggedButton;

// Event listener and function to remove shapes and toggle remove confirmation visibility
var removeShape = document.querySelector('.button__removeShape');
removeShape.addEventListener('click', function () {
    flaggedButton = 'removeShape';
    toggleConfirmContent();

});

var clearShapes = document.querySelector('.button__clearShapes');
clearShapes.addEventListener('click', function () {
    flaggedButton = 'clearShapes';
    toggleConfirmContent();
});

var noDeleteButton = document.querySelector('.button__noDelete');
noDeleteButton.addEventListener('click', toggleConfirmContent);

function toggleConfirmContent() {
    var confirmDeleteContent = document.querySelectorAll('.confirmDeleteContent');
    for (var i = 0; i < confirmDeleteContent.length; i++) {
        confirmDeleteContent[i].classList.toggle('hidden');
    }
}


var yesDeleteButton = document.querySelector('.button__yesDelete');
yesDeleteButton.addEventListener('click', function () { // here we need to know if remove or clear is selected and we pass it to delete shape//test if confirmdelete !hasclass hidden and which button is flagged/selected
    var confirmDeleteContent = document.querySelectorAll('.confirmDeleteContent');
    for (var i = 0; i < confirmDeleteContent.length; i++) {
        toggleConfirmContent();
    }
    deleteShape();
});

function deleteShape() {
    if (flaggedButton === 'removeShape') {
        $(activeShape).remove(); // remove the shape from container
        totalShapes--;
        activeDropdown.remove(); // remove the option from <select>
        if (document.querySelector('.selector__existing').firstElementChild) { // if dropdown has a shape in it
            document.querySelector('.selector__existing').firstElementChild.selected = true; // set dropdown to first shape in it
        }
    } else if (flaggedButton === 'clearShapes') {
        document.querySelector('.shapeContainer').innerHTML = '';
        document.querySelector('.shapeContainer').innerHTML += '<div class="shape" id="shape1"></div>';
        document.querySelector('.selector__existing').innerHTML = '';
        document.querySelector('.selector__existing').innerHTML += '<option class="selector__existingOption" value="shape1" id="dropdown1">Shape 1</option>';
        // JQUERY UI to make shapes draggable
        $('.shape').draggable();
    }
    activeShape = document.querySelector('.shapeContainer').firstElementChild; // set activeShape to first shape/child of container        
    toggleConfirmContent();
}

function swapInputContainer() {
    for (var i = 0; i < buttonCategory.length; i++) { // Change selected button   
        buttonCategory[i].classList.remove('button__category--selected');
    }
    this.classList.add('button__category--selected');

    // Swap Containers
    var inputsContainers = document.querySelectorAll('.inputs__container');
    for (var i = 0; i < inputsContainers.length; i++) {
        if (inputsContainers[i].dataset.category !== this.dataset.category) {
            inputsContainers[i].classList.add('inputs__container--hidden');
        } else {
            inputsContainers[i].classList.remove('inputs__container--hidden');
        }
    }
}

// Checkbox listeners to add transparency to border
var borderCheckbox = document.querySelectorAll('.inputBox__checkbox--borderCheckbox');
for (var i = 0; i < borderCheckbox.length; i++) {
    borderCheckbox[i].addEventListener('click', addTransparency);
}

function addTransparency() {
    var input = this.querySelector('input');
    var trimInput = input.name.substring(0, input.name.length - 11);
    var inputColor = trimInput + 'Color';
    document.documentElement.style.setProperty('--' + inputColor, 'transparent');
}


/*
// Shape click and drag and drop functionality
$(document).ready(function () {
    var $dragging = null;

    $('.shapeContainer').on("mousemove", function (e) {
        if ($dragging) {
            $dragging.offset({
                top: e.pageY,
                left: e.pageX
            });
        }
    });


    $('.shapeContainer').on("mousedown", "div", function (e) {
        $dragging = $(e.target);
    });

    $('.shapeContainer').on("mouseup", function (e) {
        $dragging = null;
    });
});
*/