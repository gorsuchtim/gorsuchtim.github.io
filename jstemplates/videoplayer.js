function iOS() {
    var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
        'MacIntel'
    ];

    if (!!navigator.platform) {
        while (iDevices.length) {
            if (navigator.platform === iDevices.pop()) {
                return true;
            }
        }
    }
    return false;
}
videoInit();
function videoInit() {
    var vidList = document.getElementsByTagName('video'); // get all videos on page
    if (vidList.length > 0) { // if there are videos on page
        for (i = 0; i < vidList.length; i++) { // iterate them
            var source = vidList[i].getElementsByTagName('source')[0]; // get the <source> element of each video
            source = source.getAttribute("src").split("/"); // after the '/'
            source = source[source.length - 1]; // get to the end of the string
            source = source.substr(0, source.length - 4); // get before the .mp4
            vidList[i].setAttribute("id", source); // set the id of each video equal to its source name
            vidControls(vidList[i].id);
        }
    }
}
function vidControls(target) {
    var video = document.getElementById(target); // set video and event outside of iOS condition 
    if (iOS() && navigator.userAgent.toLowerCase().indexOf('chrome') == -1) { // if iOS and Safari
        $('.video-controls').children().hide(); // hide custom controls so native controls are active
        video.setAttribute('tabindex', '0'); // allow focus to go to video container
        video.addEventListener('click', function () { // allow user to click to play video 
            if (video.paused) { // not using playVideo() because playVideo() references elements not available in iOS
                video.play();
            } else {
                video.pause();
            }
        });
    } else { // if not iOS/safari
        video.removeAttribute("controls"); // remove controls="controls" to use custom controls if not iOS
        var buttons = document.getElementById(target).parentElement.querySelectorAll('.video-control');
        for (i = 0; i < buttons.length; i++) {
            buttons[i].id = buttons[i].id + "-" + target; // set an id for each button according to the video it's housed within            
        }

        // Video player variables
        var videoWrapper = video.parentNode;
        var videoControlButtons = document.querySelectorAll('.video-controls__button'); // set var's using target in case > 1 video on page
        var videoControls = document.querySelectorAll('.video-control');
        var playButton = document.getElementById("play-" + target);
        var seekBar = document.getElementById("seekBar-" + target);
        var volumeButton = document.getElementById("volumeButton-" + target);
        var volumeBar = document.getElementById("volumeBar-" + target);
        var subtitles = document.getElementById("subtitles-" + target);
        var fullScreenButton = document.getElementById("fs-" + target);
        var vidDuration = 0;
        var hoverFlag = false;
        /*------------------------
        Play/pause video click events
        -------------------------*/
        video.addEventListener('click', function () { // when not in iOS/safari, clicking on video runs functions
            playVideo(); // play/pause video and change aria attr's, focus on play button
            this.nextElementSibling.querySelector('.video-controls__button--play').focus(); // this triggers a small flash since focus moves off of video and onto video controls)
        });

        playButton.addEventListener('click', function () { // set click event on play button
            playVideo();
        });
        /*------------------------
        Video wrapper hover event
        -------------------------*/
        videoWrapper.addEventListener('mouseenter', function () { // on hovering into video wrapper
            if (this.querySelector('.video-controls').classList.contains('video-controls--hidden')) { // if video controls are hidden                
                this.querySelector('.video-controls').classList.remove('video-controls--hidden'); // show them                   
            }
        });
        videoWrapper.addEventListener('mouseleave', function () { // when mousing away from video player                        
            if (video.currentTime == 0) { // and the video current time is 0/video has not been started                       
                this.querySelector('.video-controls').classList.add('video-controls--hidden'); // hide the controls                  
            }
        });

        /*------------------------------
        Video controls container keyboard events
        ---------------------------------*/
        for (var i = 0; i < videoControls.length; i++) { // when tabbing/focusing to the video controls
            videoControls[i].addEventListener('focus', function () {
                if (this.parentElement.classList.contains('video-controls--hidden')) { // if this video's controls are hidden
                    this.parentElement.classList.remove('video-controls--hidden'); // show them                   
                }
            });
            videoControls[i].addEventListener('blur', function () { // when tabbing away from/blurring controls
                if (!this.parentElement.classList.contains('video-controls--hidden')) { // if this video's controls are showing
                    if (video.currentTime == 0) { // and the video current time is 0 || video has not been started         
                        this.parentElement.classList.add('video-controls--hidden'); // hide them     
                    }
                }
            });
        }

        /*----------------------
        Control button hover events
        --------------------------*/
        for (var i = 0; i < videoControlButtons.length; i++) {
            videoControlButtons[i].addEventListener('mouseenter', function () {
                var path = this.firstElementChild.getAttribute('src');
                if (document.getElementById(this.id).classList.contains('video-player__button--hover') === false) {
                    document.getElementById(this.id).classList.add('video-player__button--hover');
                    hoverFlag = true;
                    path = path.substr(0, path.length - 4) + '_gold'; // remove '.svg' and add _gold    
                    this.firstElementChild.setAttribute('src', path + '.svg'); // add '_gold.svg' to swap in gold file for hovering              
                }
            });
            videoControlButtons[i].addEventListener('mouseleave', function () {
                var path = this.firstElementChild.getAttribute('src');
                if (document.getElementById(this.id).classList.contains('video-player__button--hover') === true) {
                    document.getElementById(this.id).classList.remove('video-player__button--hover');
                    hoverFlag = false;
                    path = path.substr(0, path.length - 9); // source path will have had '_gold.svg' on it - remove those last 9 chars 
                    this.firstElementChild.setAttribute('src', path + '.svg'); // add '_gold.svg' to swap in gold file for hovering                                 
                }
            });
        }

        function playVideo() {
            var path;
            if (video.paused == true) { // if video is paused             
                video.play(); // play the video 
                videoAriaSwitch(playButton, 'Pause video');
                path = 'pause_bar_icon'; // set path to pause image
            } else { // if video is playing
                video.pause(); // pause the video          
                videoAriaSwitch(playButton, 'Play video');
                path = 'play_bar_icon'; // set path to play image
            }
            if (hoverFlag) { // if hovering over element
                path = path + '_gold'; // add _gold to file name in var path
            }
            playButton.firstElementChild.setAttribute('src', 'images/videoPlayerAssets/' + path + '.svg'); // change the src file of the play button
        }

        /*-------------------
        Volume button events
        ---------------------*/
        volumeButton.addEventListener("click", function () {
            clickVolumeImage(this.getAttribute('data-state'));
        });

        volumeBar.addEventListener('change', function () {
            keyVolumeImage(this.value);
        });

        var range = 'full';

        function clickVolumeImage(currentState) {
            var level, muteFlag, newState; // define variables
            if (currentState !== 'volume_off_bar_icon') { // if current state is NOT mute
                level = 0; // then set all to mute: level to 0
                newState = 'volume_off_bar_icon'; // off icon
                muteFlag = true; // video.mute
                videoAriaSwitch(volumeButton, 'Volume press to unmute');
            } else { // if current state IS mute
                if (range === 'full') {
                    newState = 'volume_full_bar_icon';
                    level = 1; // refactor later to find a way to reset level to exact volume it was instead of generic 1, 0.5, 0.25
                    muteFlag = false;
                } else if (range === 'half') {
                    newState = 'volume_half_bar_icon';
                    level = 0.5;
                    muteFlag = false;
                } else if (range === 'low') {
                    newState = 'volume_low_bar_icon';
                    level = 0.25;
                    muteFlag = false;
                } else if (range === 'off') {
                    return false;
                }
                videoAriaSwitch(volumeButton, 'Volume press to mute');
            }
            volumeImageSwap(level, newState, muteFlag, range);
        }

        function keyVolumeImage(level) {
            var newState, muteFlag;
            if (level < 0.01) { // define the volume range and set accordingly
                range = 'off';
            } else if (level > 0 && level <= 0.25) {
                range = 'low';
            } else if (level >= 0.26 && level <= 0.75) {
                range = 'half';
            } else if (level >= 0.76) {
                range = 'full';
            }
            if (range === 'off') {
                muteFlag = true;
            } else {
                muteFlag = false;
            }
            newState = 'volume_' + range + '_bar_icon'; // set new state accordingly using range as defined above
            volumeImageSwap(level, newState, muteFlag, range);
        }

        function volumeImageSwap(level, newState, muteFlag, range) {
            volumeButton.setAttribute('data-state', newState); // define new data-state for volumeButton                        
            volumeBar.setAttribute('data-state', newState); // define new data-state for volumeBar           

            if (hoverFlag) { // if hovering over element
                newState = newState + '_gold'; // add _gold to file name
            }

            volumeButton.firstElementChild.setAttribute('src', 'images/videoPlayerAssets/' + newState + '.svg'); // set the volumeButton image src using newState
            if (muteFlag) {
                videoAriaSwitch(volumeButton, 'Volume press to unmute');
            } else {
                volumeButton.firstElementChild.setAttribute('alt', 'Volume press to mute');
            }
            changeVideoVolume(level, muteFlag);
        }

        function changeVideoVolume(level, muteFlag) {
            video.volume = level;
            volumeBar.value = level;
            video.mute = muteFlag;
        }
        /*----------------------
        Closed caption button event
        --------------------------*/
        subtitles.addEventListener("click", function () {
            var path;
            if (video.textTracks[0].mode == "hidden" || video.textTracks[0].mode == "disabled") {
                video.textTracks[0].mode = "showing"
                path = 'closed_caption_active_bar_icon';
                videoAriaSwitch(subtitles, 'Hide captions');
            } else {
                video.textTracks[0].mode = "hidden";
                path = 'closed_caption_bar_icon';
                videoAriaSwitch(subtitles, 'Show captions');
            }
            if (hoverFlag) { // if hovering over element
                path = path + '_gold'; // add _gold to file name
            }
            this.firstElementChild.setAttribute('src', 'images/videoPlayerAssets/' + path + '.svg');
        });

        function videoAriaSwitch(element, state) {
            if (element.classList.contains('video-controls__button--play')) {
                element.setAttribute('aria-title', state);
            } else {
                element.setAttribute('aria-label', state);
            }
            element.firstElementChild.setAttribute('alt', state);
        }

        /*--------------------------
        Seek bar and buffering events
        ----------------------------*/
        seekBar.addEventListener('change', function () { // Event listener for seekBar
            var time = video.duration * (seekBar.value / 100); // Calculate the new time            
            video.currentTime = time; // Update the video time
        });

        video.addEventListener('timeupdate', function () { // Update the seek bar as the video plays            
            var value = (100 / video.duration) * video.currentTime; // Calculate the slider value            
            seekBar.value = value; // Update the slider value            
        });

        video.addEventListener('canplay', function () {
            $('#duration-' + this.id).text(timeCode(this.duration));
        });

        seekBar.addEventListener('mousedown', function () { // Pause the video when the slider handle is being dragged
            video.pause();
        });

        seekBar.addEventListener('mouseup', function () { // Play the video when the slider handle is dropped
            video.play();
        });
        $('#' + target).on('timeupdate', function (event) {
            onTrackedVideoFrame(target, this.currentTime, this.duration);
        });

        function onTrackedVideoFrame(item, currentTime, duration) {
            if (currentTime != null) {
                $('current-' + item).text(timeCode(currentTime));
            }
            if (duration != null && duration != vidDuration) {
                $('#duration-' + item).text(timeCode(duration));
                vidDuration = duration;
            }
        }

        function timeCode(time) {
            var minutes = Math.floor(time / 60) | 0;
            var seconds = (time - minutes * 60) | 0;
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var total = minutes + ":" + seconds;
            return total;
        }

        video.addEventListener('progress', function () {
            var duration = video.duration;
            if (duration > 0) {
                for (var i = 0; i < video.buffered.length; i++) {
                    if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
                        document.querySelector('.bufferBar').style.width = (video.buffered.end(video.buffered.length - 1 - i) / duration) * 100 + "%";
                        break;
                    }
                }
            }
        });

        /*--------------------------
        Full screen events
        --------------------------*/
        function isFullScreen() {
            return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
        }

        fullScreenButton.addEventListener("click", function () {
            if (isFullScreen()) {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
                else if (document.msExitFullscreen) document.msExitFullscreen();
            } else {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.mozRequestFullScreen) {
                    video.mozRequestFullScreen(); // Firefox                
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen(); // Chrome and Safari              
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
                video.classList.add("full");
                video.nextElementSibling.classList.add('video-controls--hidden');
            }
        });
        // Chrome, ff, IE, reserve the esc key in full screen mode so listen for the fullscreenchange event
        document.addEventListener('webkitfullscreenchange', removeVideoContainerFull, false);
        document.addEventListener('mozfullscreenchange', removeVideoContainerFull, false);
        document.addEventListener('fullscreenchange', removeVideoContainerFull, false);
        document.addEventListener('MSFullscreenChange', removeVideoContainerFull, false);

        function removeVideoContainerFull() { // use this to detect in each browser when full screen mode changes 
            if (!isFullScreen()) {
                if (video.classList.contains('full')) { // any time on the event if isFullScreen() is FALSE, and if video hasClass('full') it is safe to video removeClass('full')            
                    video.classList.remove('full');
                    video.nextElementSibling.classList.remove('video-controls--hidden'); // make sure video controls are visible
                }
            }
        }
    }
}
    // **** End Video Functions ****