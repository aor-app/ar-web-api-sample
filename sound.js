let audio_context = null;
let initial_delay_sec = 0;
let scheduled_time = 0;
let audio_src;
let mute = false;
let gainNode;
const playChunk = (audio_src, scheduled_time) => {
	if (audio_src.start) {
		audio_src.start(scheduled_time);
	} else {
		audio_src.noteOn(scheduled_time);
	}
};
const audio_prepare = (audio_f32) => {
	let audio_buf = audio_context.createBuffer(1, audio_f32.length, 44100);
	let audio_src = audio_context.createBufferSource();
	let current_time = audio_context.currentTime;
	audio_buf.getChannelData(0).set(audio_f32);
	audio_src.buffer = audio_buf;

	audio_src.connect(gainNode);
	gainNode.connect(audio_context.destination);
	gainNode.gain.value = volume;

	if (current_time < scheduled_time) {
		playChunk(audio_src, scheduled_time);
		scheduled_time += audio_buf.duration;
	} else {
		playChunk(audio_src, current_time);
		scheduled_time = current_time + audio_buf.duration + initial_delay_sec;
	}
};
const debug_audio = () => {};
const on_ws_opened = () => {
	//
};
const on_ws_recv = (evt) => {
	if(!(evt.data instanceof ArrayBuffer)) {
		console.log("on_ws_recv(): Not ArrayBuffer received...",1);
		console.log(evt.data);
		setResultMessage(`sound session result: ${evt.data}`);
		return;
	}
	data = new Int16Array(evt.data);
	buff = new Float32Array(data);
	audio_prepare(buff);
};
const on_ws_closed = () => {
	try {
		audio_node.disconnect();
	} catch (dont_care) {
		//
	}
	console.log("WebSocket has closed unexpectedly. Please reload the page.", 1);
};
const on_ws_error = (event) => {
	console.log("WebSocket error.",1);
};
const open_websocket = () => {
	if (!("WebSocket" in window))
		console.log("Your browser does not support WebSocket, which is required for API to run. Please upgrade to a HTML5 compatible browser.");
	const serverAddress = document.getElementById('serverURL').value;
	const serverPort = document.getElementById('serverPORT').value;
	if (!serverAddress){
		serverAddress = SERVER_ADDRESS;
	}
	if (!serverPort){
		serverPort = SERVER_PORT;
	}
	const ws_url = `ws://${serverAddress}:${SERVER_PORT}`;
	ws = new WebSocket(ws_url);
	ws.onopen = on_ws_opened;
	ws.onmessage = on_ws_recv;
	ws.onclose = on_ws_closed;
	ws.binaryType = "arraybuffer";
	window.onbeforeunload = () => {
		ws.onclose = () => {};
		ws.close();
	};
	ws.onerror = on_ws_error;
};
const audio_init = () => {
	try{
		window.AudioContext = window.AudioContext||window.webkitAudioContext;
		if ( audio_context == null ) {
			audio_context = new AudioContext( {
				sampleRate: 44100,
			});
		}
		gainNode = audio_context.createGain();

	}catch(e){
		console.log('Your browser does not support Web Audio API, which is required for API to run. Please upgrade to a HTML5 compatible browser.', 1);
		return;
	}
};
const receiver_init = () => {
	open_websocket();
	audio_init();
	window.setTimeout(() => {
		window.setInterval(debug_audio, 1000);
		},1000);

	toggleMute(true);
}
const toggleMute = (arg) => {
	if ( typeof arg === "undefined" ) {
		//
	} else {
		mute = !arg;
	}
	if (mute) {
		console.log('mute off');
		mute = false;
	} else {
		console.log('mute on');
		mute = true;
	}
	updateVolume();
};
const updateVolume = () => {
	const vol = document.getElementById("vol");
    volume = parseFloat(vol.value) / 3276800.0;
	if (isNaN(volume)){
		volume = 0;
	}
};
const PlayButtonClick = () => {
	receiver_init();
};
const StopButtonClick = () => {
	ws.close();
};
