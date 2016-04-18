var wsUri = "ws://echo.websocket.org/";
var output;
window.addEventListener("load", init, false);

function init()
{
	output = document.getElementById("output");
}

function onOpen(evt)
{
	write('<span style="color: green;font-size:200%;">CONNECTED</span>');
}

function conn(){
	websocket = new WebSocket(wsUri);
	websocket.onopen = function(evt) { onOpen(evt) };
	websocket.onclose = function(evt) { onClose(evt) };
	websocket.onmessage = function(evt) { onMessage(evt) };
	websocket.onerror = function(evt) { onError(evt) };
	document.getElementById("conn").disabled=true;
	document.getElementById("disconn").disabled=false;
}

function send(){
	var mess = document.getElementById('text').value;
	doSend(mess);
	document.getElementById("text").value="";
}

function disconn(){
	websocket.close();
	document.getElementById("conn").disabled=false;
	document.getElementById("disconn").disabled=true;
	
}

function doSend(message)
{
	write("Sent: " + message);
	websocket.send(message);
}

function onMessage(evt)
{
	write('<span style="color: blue;">Answer: ' + evt.data+'</span>');
}

function onError(evt)
{
	write('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function onClose(evt)
{
	write('<span style="color: red;font-size:150%;"<h2>CONNECTION LOST</h2></span>');
}

function write(message)
{
	var pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = message;
	output.appendChild(pre);
}