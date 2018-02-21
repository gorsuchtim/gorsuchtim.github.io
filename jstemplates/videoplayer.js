function iOS() {
    var iDevices = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod', 'MacIntel'];
    if (!!navigator.platform) {
        while (iDevices.length) {
            if (navigator.platform === iDevices.pop()) {
                return true;
            }
        }
    }
    return false;
}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}


var videoPlayer = {
    videoAriaSwitch: function (element, state) {
        if (element.classList.contains('video-controls__button--play')) {
            element.setAttribute('aria-label', state);
        } else {
            element.setAttribute('aria-label', state);
        }
        element.firstElementChild.setAttribute('alt', state);
    },
    createModal: function () {
        // create page modal overlay
        var modalOverlay = document.createElement('div');
        setAttributes(modalOverlay, {
            class: 'modal__video--hidden',
            id: 'modalOverlay',
            tabindex: '0'
        });
        // create video modal containing div
        var modal__video = document.createElement('div');
        setAttributes(modal__video, {
            tabindex: '-1',
            class: 'modal__video modal__video--hidden',
            role: 'dialog',
        });

        // create and append video modal first row
        var modalFirstRow = '<div class="modal__video--row"><img src="images/wf-advisors-rgb-54px.png" alt="Wells Fargo Advisors"/><button class="modal__video--close" aria-label="close modal">Close</button></div>';
        $(modalFirstRow).appendTo(modal__video);
        // append modal and video modal to page (class hidden)
        $('body').append(modalOverlay);
        $('body').append(modal__video);
    },
    modalEvents: function () {
        // Set events for all video modal close buttons
        var videoModalClose = document.querySelectorAll('.modal__video--close');
        for (var i = 0; i < videoModalClose.length; i++) {
            videoModalClose[i].addEventListener('click', function () {
                videoPlayer.videoModalClose(trigger);
            });
            videoModalClose[i].addEventListener('keydown', function (ev) {
                if (ev.shiftKey && ev.which === 9) {
                    ev.preventDefault();
                    $(this).parent().next().next().children().focus();
                }
            });
        }

        // Set keydown|tab events for all modal video transcripts
        var modalVideoTranscript = $('.transcript').children();
        for (var i = 0; i < modalVideoTranscript.length; i++) {
            modalVideoTranscript[i].addEventListener('keydown', function (ev) {
                if (!ev.shiftKey && ev.which === 9) {
                    ev.preventDefault();
                    $(this).parent().prev().prev().find('.modal__video--close').focus();
                }
            });
        }

        // Set keydown|escape event for all video modals
        var modal__video = document.querySelectorAll('.modal__video');
        for (var i = 0; i < modal__video.length; i++) {
            modal__video[i].addEventListener('keydown', function (ev) {
                if (ev.which === 27) {
                    if ($(this).find('.video-wrapper').hasClass('video--fullscreen') === false) {
                        videoPlayer.videoModalClose(trigger);
                    }
                }
            });
        }

        // Set click event for all modal trigger buttons, define trigger
        var modalTrigger = document.querySelectorAll('.modal__trigger--video');
        for (var i = 0; i < modalTrigger.length; i++) {
            modalTrigger[i].addEventListener('click', function () {
                videoPlayer.openModal();
                trigger = this;
            });
        }
    },
    populateModal: function () {
        var modalVideoSource = {
            poster: 'images/ii_landing_poster.jpg',
            source: 'https://www.wellsfargomedia.com/wfa/intuitive-investor/Jan5_2018_WellsFargo_Web_Edit_v19_NO_SLATE_optimized.mp4',
            captions: 'videos/ii_captions.vtt',
            transcript: 'videos/II_LPvideo_transcript.pdf',
            id: 'Jan5_2018_WellsFargo_Web_Edit_v19_NO_SLATE_optimized'
        };
        var video =
            '<div class="video-wrapper video__wrapper--2017"><video class="video-content" controls="controls" poster="' +
            modalVideoSource.poster + '"tabindex="-1" width="840" id="' + modalVideoSource.id +
            '"><source src="' + modalVideoSource.source +
            '"type="video/mp4"></source><track kind="subtitles" label="English subtitles" src="' +
            modalVideoSource.captions +
            '"srclang="en"></track>Your browser does not support HTML5 video tag.</video><div class="video-controls"><div class="sr-text" id="playbtn">Press to play</div><button aria-describedby="playbtn-' +
            modalVideoSource.id +
            '" class="video-controls__button video-controls__button--play video-control" id="play" aria-label="Play video"><img alt="Play video" src="images/play_bar_icon.svg" /></button><div class="durationTextContainer"><span class="vidDurationText video-control" id="current">0:00</span> /<span class="vidDurationText video-control" id="duration">0:00</span></div><input aria-label="Video progress" class="vidDuration video-control vidDuration__seekBar" id="seekBar" type="range" value="0"/><div class="bufferBar video-control" id="bufferBar"></div><button aria-label="Volume press to mute" class="video-controls__button video-controls__button--volume video-control" id="volume" type="button"><img alt="Volume press to mute" src="images/volume_full_bar_icon.svg" /></button><input aria-label="Volume Slider" class="volumeBar video-control" id="volumeBar" max="1" min="0" step="0.01" type="range" value="1" /><button aria-label="Show captions" class="video-controls__button video-controls__button--closedCaption video-control" data-state="subtitles"id="subtitles" type="button"><img alt="Show captions" src="images/closed_caption_bar_icon.svg" /></button><button class="video-controls__button video-controls__button--fullScreen video-control" data-state="go-fullscreen" id="fs" type="button"><img alt="Fullscreen" src="images/expand_bar_icon.svg" /></button></div></div><p class="transcript"><a aria-label="Transcript pdf" class="transcriptLink" href="' +
            modalVideoSource.transcript + '" target="_blank">Transcript PDF</a></p>';
        $('.modal__video').attr('aria-labelledby', 'play-' + modalVideoSource.id).append(video);
    },
    openModal: function (element) {
        $('.page').attr('aria-hidden', 'true');
        $('body').addClass('modalActive');
        $('#modalOverlay, .modal__video').removeClass('modal__video--hidden');
        if ($('.video-content').attr('controls') !== 'controls') { // if using custom controls/if not iOS+safari
            $('.modal__video').find('.video-controls__button--play').focus();
        } else {
            $('.modal__video--close').focus();
        }
    },
    videoModalClose: function (trigger) {
        var videos = document.querySelectorAll('video');
        for (var i = 0; i < videos.length; i++) {
            videos[i].pause();
        }
        var playButton = document.querySelector('.video-controls__button--play');
        var path;
        videoPlayer.videoAriaSwitch(playButton, 'Play video');
        path = 'play_bar_icon'; // set path to play image
        playButton.firstElementChild.setAttribute('src', 'images/' + path + '.svg');

        $('body').removeClass('modalActive');
        $('.page').attr('aria-hidden', 'false');
        $('.modal__video').addClass('modal__video--hidden');
        $('#modalOverlay').addClass('modal__video--hidden');
        $(trigger).focus();
    },
    videoInit: function () {
        var vidList = document.getElementsByTagName('video');
        if (vidList.length > 0) {
            for (i = 0; i < vidList.length; i++) {
                var source = vidList[i].getElementsByTagName('source')[0];
                source = source.getAttribute('src').split('/');
                source = source[source.length - 1];
                source = source.substr(0, source.length - 4);
                vidList[i].setAttribute('id', source);
                videoPlayer.vidControls(vidList[i].id);
            }
        }
    },
    vidControls: function (target) {
        var video = document.getElementById(target); // set video and event outside of iOS condition
        if (iOS() && navigator.userAgent.toLowerCase().indexOf('chrome') == -1) { // if iOS and Safari   
            $('.video-controls').children().hide(); // hide custom controls so native controls are active
            video.setAttribute('tabindex', '0'); // allow focus to go to video container
        } else {
            if (document.querySelector('.video__wrapper--2017') !== null) { // if the new video wrapper is being used   
                var vidList = document.getElementsByTagName('video');
                for (var i = 0; i < vidList.length; i++) {
                    vidList[i].removeAttribute('controls');
                }
                var buttons = document.getElementById(target).parentElement.querySelectorAll('.video-control');
                for (i = 0; i < buttons.length; i++) {
                    buttons[i].id = buttons[i].id + '-' + target; // set an id for each button according to the video it's housed within
                }

                // Video player variables
                var videoWrapper = video.parentNode;
                var videoControlButtons = document.querySelectorAll('.video-controls__button'); // set var's using target in case > 1 video on page
                var videoControls = document.querySelectorAll('.video-control');
                var playButton = document.getElementById('play-' + target);
                var seekBar = document.getElementById('seekBar-' + target);
                var volumeButton = document.getElementById('volume-' + target);
                var volumeBar = document.getElementById('volumeBar-' + target);
                var subtitles = document.getElementById('subtitles-' + target);
                var fullScreenButton = document.getElementById('fs-' + target);
                var vidDuration = 0;
                var hoverFlag = false;

                /*------------------------
                    Video wrapper click event
                -------------------------*/
                video.addEventListener('click', function () {
                    playVideo(); // play/pause video and change aria attr's, focus on play button                
                    $('.video-controls__button--play').focus(); // this triggers a small flash since focus moves off of video and onto video controls)
                });

                playButton.addEventListener('click', function () {
                    // set click event on play button
                    playVideo();
                });

                /*------------------------
                Video wrapper hover event
                -------------------------*/
                if ($('.modal__video').length === 0) {
                    videoWrapper.addEventListener('mouseenter', function () {
                        // on hovering into video wrapper
                        if (this.querySelector('.video-controls').classList.contains('video-controls--hidden')) {
                            // if video controls are hidden
                            this.querySelector('.video-controls').classList.remove('video-controls--hidden'); // show them
                        }
                    });
                    videoWrapper.addEventListener('mouseleave', function () {
                        // when mousing away from video player
                        if (video.currentTime == 0) {
                            // and the video current time is 0/video has not been started
                            this.querySelector('.video-controls').classList.add('video-controls--hidden'); // hide the controls
                        }
                    });
                }

                /*------------------------------
                Video controls container keyboard events
                ---------------------------------*/
                for (var i = 0; i < videoControls.length; i++) {
                    // when tabbing/focusing to the video controls
                    videoControls[i].addEventListener('focus', function () {
                        if ($(this).closest('.video-controls').hasClass('video-controls--hidden')) { // if this video's controls are hidden            
                            $(this).closest('.video-controls').removeClass('video-controls--hidden'); // show them
                        }
                    });
                    videoControls[i].addEventListener('blur', function () { // when tabbing away from/blurring controls
                        if (!$(this).closest('.video-controls').hasClass('video-controls--hidden')) { // if this video's controls are showing            
                            if (video.currentTime == 0) { // and the video current time is 0 || video has not been started
                                if (document.querySelector('.modal__trigger--video') == null) {
                                    $(this).closest('.video-controls').addClass('video-controls--hidden'); // hide them
                                }
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
                    if (video.paused == true) {
                        // if video is paused
                        video.play(); // play the video                    
                        videoPlayer.videoAriaSwitch(playButton, 'Pause video');
                        $('#playbtn').text('Press to pause');
                        path = 'pause_bar_icon'; // set path to pause image
                    } else {
                        // if video is playing
                        video.pause(); // pause the video
                        videoPlayer.videoAriaSwitch(playButton, 'Play video');
                        $('#playbtn').text('Press to play');
                        path = 'play_bar_icon'; // set path to play image
                    }
                    if (hoverFlag) {
                        // if hovering over element
                        path = path + '_gold'; // add _gold to file name in var path
                    }
                    playButton.firstElementChild.setAttribute('src', 'images/' + path + '.svg'); // change the src file of the play button
                }

                video.addEventListener('ended', function (ev) {
                    setTimeout(function () {
                        var endedPlayButton = ev.target.nextElementSibling.firstElementChild;
                        var path = 'play_bar_icon'
                        videoPlayer.videoAriaSwitch(endedPlayButton, 'Play video');
                        endedPlayButton.firstElementChild.setAttribute('src', 'images/' + path + '.svg');
                        seekBar.value = 0;
                        video.load();
                    }, 1000);
                });

                /*-------------------
                Volume events
                ---------------------*/
                var volumeBeforeMute = 1; // set to 1 by default for page load
                volumeButton.addEventListener('click', function () {
                    volumeMuteCheck(video.volume); // pass current value of value input to setVideoVolume                
                });

                function volumeMuteCheck(volume) {
                    if (volume === 0) { // if currently muted                                                
                        video.muted = false; // unmute   
                        video.volume = volumeBeforeMute;
                        videoPlayer.videoAriaSwitch(volumeButton, 'Volume press to mute');
                        $(volumeBar).val(volumeBeforeMute);
                    } else { // if not currently muted
                        video.muted = true; // mute the video                        
                        video.volume = 0; // set video volume to 0             
                        videoPlayer.videoAriaSwitch(volumeButton, 'Volume press to unmute');
                        $(volumeBar).val(0);
                    }
                    setVolumeImage(video.volume);
                }
                volumeBar.addEventListener('change', volumeBarUpdate);

                volumeBar.addEventListener('change', volumeBarUpdate);
                volumeBar.addEventListener('mousemove', volumeBarUpdate);

                function volumeBarUpdate() {
                    this.setAttribute('value', this.value);
                    $(this).val(this.value);
                    video.volume = this.value;
                    volumeBeforeMute = video.volume;
                    setVolumeImage(video.volume);
                }

                function setVolumeImage(volume) {
                    var path;
                    if (volume < 0.01) { // define the volume range and set accordingly
                        path = 'off_bar_icon';
                    } else if (volume > 0 && volume <= 0.25) {
                        path = 'low_bar_icon';
                    } else if (volume >= 0.26 && volume <= 0.75) {
                        path = 'half_bar_icon';
                    } else if (volume >= 0.76) {
                        path = 'full_bar_icon';
                    }
                    if (hoverFlag) {
                        path = path + '_gold';
                    }
                    volumeButton.firstElementChild.setAttribute('src', 'images/volume_' + path + '.svg');
                }

                /*----------------------
                Closed caption button event
                --------------------------*/
                subtitles.addEventListener('click', function () {
                    var path;
                    if (video.textTracks[0].mode == 'hidden' || video.textTracks[0].mode == 'disabled') {
                        video.textTracks[0].mode = 'showing';
                        path = 'closed_caption_active_bar_icon';
                        videoPlayer.videoAriaSwitch(subtitles, 'Hide captions');
                    } else {
                        video.textTracks[0].mode = 'hidden';
                        path = 'closed_caption_bar_icon';
                        videoPlayer.videoAriaSwitch(subtitles, 'Show captions');
                    }
                    if (hoverFlag) {
                        // if hovering over element
                        path = path + '_gold'; // add _gold to file name
                    }
                    this.firstElementChild.setAttribute('src', 'images/' + path + '.svg');
                });

                /*--------------------------
                Seek bar and buffering events
                ----------------------------*/
                seekBar.addEventListener('change', function () { // Event listener for seekBar        
                    var time = video.duration * (seekBar.value / 100); // Calculate the new time
                    video.currentTime = time; // Update the video time
                });

                video.addEventListener('timeupdate', function () {
                    var value = 100 / video.duration * video.currentTime; // Calculate the slider value        
                    if (video.currentTime > 0) {
                        seekBar.value = value;
                    }
                });

                video.addEventListener('canplay', function () {
                    $('#duration-' + this.id).text(timeCode(this.duration));
                });

                seekBar.addEventListener('mousedown', function () {
                    // Pause the video when the slider handle is being dragged        
                    video.pause();

                    videoPlayer.videoAriaSwitch(this.parentElement.querySelector('.video-controls__button--play'), 'Play video');
                    var path = 'play_bar_icon';
                    this.parentElement.querySelector('.video-controls__button--play').firstElementChild.setAttribute('src', 'images/' + path + '.svg');
                });

                seekBar.addEventListener('mouseup', function () {
                    // Play the video when the slider handle is dropped
                    video.play();
                    videoPlayer.videoAriaSwitch(this.parentElement.querySelector('.video-controls__button--play'), 'Pause video');
                    var path = 'pause_bar_icon';
                    this.parentElement.querySelector('.video-controls__button--play').firstElementChild.setAttribute('src', 'images/' + path + '.svg');
                });

                $('#' + target).on('timeupdate', function (event) {
                    onTrackedVideoFrame(target, this.currentTime, this.duration);
                });

                function onTrackedVideoFrame(item, currentTime, duration) {
                    if (currentTime != null) {
                        $('#current-' + item).text(timeCode(currentTime));
                    }
                    if (duration != null && duration != vidDuration) {
                        $('#duration-' + item).text(timeCode(duration));
                        vidDuration = duration;
                    }
                    if (currentTime === duration) {
                        console.log(duration, currentTime);

                    }
                }

                function timeCode(time) {
                    var minutes = Math.floor(time / 60) | 0;
                    var seconds = (time - minutes * 60) | 0;
                    if (seconds < 10) {
                        seconds = '0' + seconds;
                    }
                    var total = minutes + ':' + seconds;
                    return total;
                }

                video.addEventListener('progress', function () {
                    var duration = video.duration;
                    if (duration > 0) {
                        for (var i = 0; i < video.buffered.length; i++) {
                            if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
                                document.querySelector('.bufferBar').style.width =
                                    video.buffered.end(video.buffered.length - 1 - i) / duration * 100 + '%';
                                break;
                            }
                        }
                    }
                });

                /*--------------------------
                Full screen events
                --------------------------*/
                function isFullScreen() {
                    return !!(
                        document.fullScreen ||
                        document.webkitIsFullScreen ||
                        document.mozFullScreen ||
                        document.msFullscreenElement ||
                        document.fullscreenElement
                    );
                }

                $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function () {
                    if (!isFullScreen()) {
                        $(video).parent().removeClass('video--fullscreen');
                        $(video).next().removeClass('video-controls--fullscreen');
                    }
                });

                fullScreenButton.addEventListener('click', function () {
                    $(video).parent().addClass('video--fullscreen');
                    $(video).next().addClass('video-controls--fullscreen');
                    if (isFullScreen()) {
                        if (document.exitFullscreen) document.exitFullscreen();
                        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
                        else if (document.msExitFullscreen) document.msExitFullscreen();
                    } else {
                        if (video.parentElement.requestFullscreen) {
                            video.parentElement.requestFullscreen();
                        } else if (video.mozRequestFullScreen) {
                            video.parentElement.mozRequestFullScreen();
                        } else if (video.webkitRequestFullscreen) {
                            video.parentElement.webkitRequestFullscreen();
                        } else if (video.msRequestFullscreen) {
                            video.parentElement.msRequestFullscreen();
                        }
                    }
                });
            } else { // if not using the new video player
                var buttons = document.getElementById(target).nextElementSibling.children;
                var controlBox = document.getElementById(target).nextElementSibling;
                classSwap.add('active', controlBox);
                for (x = 0; x < buttons.length; x++) {
                    buttons[x].id = buttons[x].id + '-' + target; //Setting an id for each video.
                }

                // Video
                var video = document.getElementById(target);
                video.removeAttribute('controls');
                var videoContainer = video.parentNode;

                // Buttons
                var playButton = document.getElementById('play-' + target);
                var volumeButton = document.getElementById('volume-' + target);
                var fullScreenButton = document.getElementById('fs-' + target);
                var subtitles = document.getElementById('subtitles-' + target);

                // Sliders
                var seekBar = document.getElementById('seekBar-' + target);
                var volumeBar = document.getElementById('volumeBar-' + target);

                var vidDuration = 0;

                // Event listener for the play/pause button
                playButton.addEventListener('click', function () {
                    if (video.paused == true) {
                        // Play the video
                        video.play();
                        playButton.firstElementChild.setAttribute('src', '/images/mvp/mediaIcons/pause.png');
                    } else {
                        // Pause the video
                        video.pause();
                        playButton.firstElementChild.setAttribute('src', '/images/mvp/mediaIcons/play.png');
                    }
                });

                // Event listener for the seek bar
                seekBar.addEventListener('change', function () {
                    // Calculate the new time
                    var time = video.duration * (seekBar.value / 100);

                    // Update the video time
                    video.currentTime = time;
                });

                // Update the seek bar as the video plays
                video.addEventListener('timeupdate', function () {
                    // Calculate the slider value
                    var value = 100 / video.duration * video.currentTime;

                    // Update the slider value
                    seekBar.value = value;
                });

                video.addEventListener('canplay', function () {
                    $('#duration-' + this.id).text(timeCode(this.duration));
                });

                // Pause the video when the slider handle is being dragged
                seekBar.addEventListener('mousedown', function () {
                    video.pause();
                });

                // Play the video when the slider handle is dropped
                seekBar.addEventListener('mouseup', function () {
                    video.play();
                });

                $('#' + target).on('timeupdate', function (event) {
                    onTrackedVideoFrame(target, this.currentTime, this.duration);
                });

                function onTrackedVideoFrame(item, currentTime, duration) {
                    if (currentTime != null) {
                        $('#current-' + item).text(timeCode(currentTime));
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
                        seconds = '0' + seconds;
                    }
                    var total = minutes + ':' + seconds;
                    return total;
                }

                // Event listener for the mute button
                volumeButton.addEventListener('click', function () {
                    if (video.muted == false) {
                        // Mute the video
                        video.muted = true;
                        volumeButton.firstElementChild.setAttribute('src', '/images/mvp/mediaIcons/volMute.png');
                    } else {
                        // Unmute the video
                        video.muted = false;
                        volumeButton.firstElementChild.setAttribute('src', '/images/mvp/mediaIcons/volHigh.png');
                    }
                });

                // Event listener for the volume bar
                volumeBar.addEventListener('change', function () {
                    // Update the video volume
                    video.volume = volumeBar.value;
                });

                // Event listener for the closed caption button
                subtitles.addEventListener('click', function () {
                    //console.log("Current Track Mode: " + video.textTracks[0].mode);
                    if (video.textTracks[0].mode == 'hidden' || video.textTracks[0].mode == 'disabled') {
                        video.textTracks[0].mode = 'showing';
                        subtitles.firstElementChild.setAttribute('src', '/images/mvp/mediaIcons/cc.png');
                    } else {
                        video.textTracks[0].mode = 'hidden';
                        subtitles.firstElementChild.setAttribute('src', '/images/mvp/mediaIcons/ccOff.png');
                    }
                });

                function isFullScreen() {
                    return !!(
                        document.fullScreen ||
                        document.webkitIsFullScreen ||
                        document.mozFullScreen ||
                        document.msFullscreenElement ||
                        document.fullscreenElement
                    );
                }

                // Event listener for the full-screen button
                fullScreenButton.addEventListener('click', function () {
                    if (isFullScreen()) {
                        if (document.exitFullscreen) document.exitFullscreen();
                        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
                        else if (document.msExitFullscreen) document.msExitFullscreen();
                        $(videoContainer).removeClass('full');
                    } else {
                        if (videoContainer.requestFullscreen) {
                            videoContainer.requestFullscreen();
                            //console.log("Normal full screen");
                        } else if (videoContainer.mozRequestFullScreen) {
                            videoContainer.mozRequestFullScreen(); // Firefox
                            //console.log("Firefox full screen");
                        } else if (videoContainer.webkitRequestFullscreen) {
                            videoContainer.webkitRequestFullscreen(); // Chrome and Safari
                            //console.log("Chrome & Safari full screen");
                        } else if (videoContainer.msRequestFullscreen) {
                            videoContainer.msRequestFullscreen();
                        }
                        //setFullscreenData(true);
                        $(videoContainer).addClass('full');
                    }
                });

                $(document).on('keyup', function (evt) {
                    if (evt.keyCode == 27) {
                        $(videoContainer).removeClass('full');
                    }
                });
            }
        } // end else if not using new video player
    },
}

if ($('.modal__trigger--video').length > 0) {
    var trigger;
    videoPlayer.createModal();
    videoPlayer.populateModal();
    videoPlayer.modalEvents();
}
videoPlayer.videoInit();
