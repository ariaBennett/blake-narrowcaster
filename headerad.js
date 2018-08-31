var container;
var closeAdBtn;
var closePanelBtn;
var clickBtn;
var clickBtn2;
var panel;
var bar;
var bg;
var isOpen;

var element = document.getElementById("bar");

function init(){
    container=document.getElementById("container");
    closeAdBtn=document.getElementById("closeAdBtn");
	closePanelBtn=document.getElementById("closePanelBtn");
	clickBtn=document.getElementById("clickthroughBtn");
	clickBtn2=document.getElementById("clickthroughBtn2");
	panel=document.getElementById("panel");
	bar=document.getElementById("bar");
	bg=document.getElementById("bg");
	
	isOpen=false;
	
	clickBtn.onmouseover=function(e){if(window.innerWidth-e.clientX > 70)openPanel();}
	clickBtn.onclick=function(){EB.clickthrough();}
	clickBtn2.onclick=function(){EB.clickthrough();}
	closeAdBtn.onclick=function(){closeBanner();}
	closeAdBtn.onmouseover=function(){closePanel();}
	closePanelBtn.onclick=function(){closePanel();}
	bg.onmouseover=function(){closePanel();}
	$(container).mouseleave(function() {closePanel();});
}


function openPanel(){
	if(isOpen)return;
	togglePlayPause();
	isOpen=true;
	$(panel).stop();
	$(panel).animate({top: "10px"},400,"easeOutQuad");
	window.top.postMessage(JSON.stringify({action: "expand"}), "*");
	EB.userActionCounter("expand");	
}


function closePanel(){
	if(!isOpen)return;
	togglePlayPause();
	isOpen=false;
	$(panel).stop();
	$(panel).animate({top: "-400px"},400,"easeOutQuad", function(){
		window.top.postMessage(JSON.stringify({action: "collapse"}), "*");
		EB.userActionCounter("collapse");	
	});
}


function closeBanner(){
	$(bar).animate({top: "-100px"},400,"easeOutQuad");
}

//var overlay= document.getElementById('overlay');
//  var video= document.getElementById('media-player');
//  video.addEventListener('progress', function() {
//    var show= video.currentTime>=5 && video.currentTime<10;
//    overlay.style.visibility= show? 'visible' : 'visible';
//  }, false);
  
// Wait for the DOM to be loaded before initialising the media player
document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);

// Variables to store handles to various required elements
var mediaPlayer;
var playPauseBtn;
var muteBtn;
var progressBar;

function initialiseMediaPlayer() {
	// Get a handle to the player
	mediaPlayer = document.getElementById('media-video');
	
	// Get handles to each of the buttons and required elements
	playPauseBtn = document.getElementById('play-pause-button');
	muteBtn = document.getElementById('mute-button');
	progressBar = document.getElementById('progress-bar');

	// Hide the browser's default controls
	mediaPlayer.controls = false;
	
	// Add a listener for the timeupdate event so we can update the progress bar
	mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
	
	// Add a listener for the play and pause events so the buttons state can be updated
	mediaPlayer.addEventListener('play', function() {
		// Change the button to be a pause button
		changeButtonType(playPauseBtn, 'pause');
	}, false);
	mediaPlayer.addEventListener('pause', function() {
		// Change the button to be a play button
		changeButtonType(playPauseBtn, 'play');
	}, false);
	
	// need to work on this one more...how to know it's muted?
	mediaPlayer.addEventListener('volumechange', function(e) { 
		// Update the button to be mute/unmute
		if (mediaPlayer.muted) changeButtonType(muteBtn, 'unmute');
		else changeButtonType(muteBtn, 'mute');
	}, false);	
	mediaPlayer.addEventListener('ended', function() { this.pause(); }, false);	
}

function togglePlayPause() {
	// If the mediaPlayer is currently paused or has ended
	if (mediaPlayer.paused || mediaPlayer.ended) {
		// Change the button to be a pause button
		changeButtonType(playPauseBtn, 'pause');
		// Play the media
		mediaPlayer.play();
	}
	// Otherwise it must currently be playing
	else {
		// Change the button to be a play button
		changeButtonType(playPauseBtn, 'play');
		// Pause the media
		mediaPlayer.pause();
	}
}





// Updates a button's title, innerHTML and CSS class to a certain value
function changeButtonType(btn, value) {
	btn.title = value;
	btn.innerHTML = value;
	btn.className = value;
}

