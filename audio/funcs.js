var ajaxTarget = 'joystick';
var index = 0;


function nextTrack()
{
	var tracks = ["a.mp3", "b.mp3", "c.mp3"];
	var player = document.getElementById("audio");
	player.pause();
	index++;
	if (index == 3)
		index = 0;
	player.src = tracks[index];
	player.load();
	player.play();
}

function prevTrack()
{
	var tracks = ["a.mp3", "b.mp3", "c.mp3"];
	var player = document.getElementById("audio");
	player.pause();
	index--;
	if (index == -1)
		index = 2;
	player.src = tracks[index];
	player.load();
	player.play();
}

function volumeUp()
{
	var player = document.getElementById("audio");
	player.volume = player.volume + 0.1;
}

function volumeDown()
{
	var player = document.getElementById("audio");
	player.volume = player.volume - 0.1;
}

function pauseAudio()
{
	var player = document.getElementById("audio");
	player.pause();
}

function ajaxCallback(status,joystick){
	if(status == 200 && joystick != "") {
		if(joystick == 0){

		}
	    else if(joystick == 2) // DOWN
	    {
	    	volumeDown();
		}
	    else if(joystick == 4) //LEFT
	    {
	    	prevTrack();
		}
	    else if(joystick == 6) // RIGHT
	    {
	    	nextTrack();
		}
	    else if(joystick == 8) // UP
	    {
	    	volumeUp();
	    }
	    else if(joystick == 5) // MIDDLE
	    {
	    	pauseAudio();
		}
	    doAjax(ajaxTarget+"?joystick="+joystick,ajaxCallback,0,0);
	}
}

function run(){
    document.getElementById("message").innerHTML = "";
    joystick = Number(document.getElementById("message").value);
    if(isNaN(joystick))
	joystick = -1;
    
	doAjax(ajaxTarget+"?joystick="+joystick,ajaxCallback,0,0);
}

function doAjax(ajaxTarget,ajaxCallBack,timeout,timeoutCallBack){
	var xhr;
	var xhrTimer;
	try{ xhr = new XMLHttpRequest(); }
	catch(e){ xhr = new ActiveXObject('Microsoft.XMLHTTP'); }
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4) {
			ajaxCallBack(xhr.status,xhr.responseText);
			if(timeout > 0)
				clearTimeout(xhrTimer);
		}
	};
	xhr.open("GET", ajaxTarget, true);
	if(timeout > 0)
		xhrTimer = setTimeout(function() { xhr.abort(); timeoutCallBack;}, timeout);
	xhr.send(null);
}

function ajaxGet(url) {
	var xhr;
	try{ xhr = new XMLHttpRequest(); }
	catch(e){ xhr = new ActiveXObject('Microsoft.XMLHTTP'); }

	xhr.onreadystatechange = function(){
		if(xhr.readyState  == 4){
			if(ajaxRet=xhr.status==200)
				ajaxCallback(xhr.responseText);
		}
	};
	xhr.open("GET", url, true);
	xhr.send(null);
}
