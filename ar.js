/*! ar.js | 2019/03 AOR, LTD. | www.aorja.com/receiver/ar-web-api/  */
const SERVER_PORT = "3000";
const SERVER_ADDRESS = "192.168.0.20";
const sendCommand = (method, command, value, param) => {
	return new Promise((resolve, reject)=>{
		const serverAddress = document.getElementById('serverURL').value;
		const serverPort = document.getElementById('serverPORT').value;
		if (!serverAddress){
			serverAddress = SERVER_ADDRESS;
		}
		if (!serverPort){
			serverPort = SERVER_PORT;
		}
		const SERVER_API_URL = `http://${serverAddress}:${SERVER_PORT}/api`;
		let url = `${SERVER_API_URL}/${command}`;
		const json = JSON.stringify(value);
		const xhr = new XMLHttpRequest();
		console.log(json);
		if (param) {
			let itemCount = 0;
			for(let item in param){
				console.log(item);
				if (itemCount == 0){
					url = `${url}?${item}=${param[item]}`;
				}else{
					url = `${url}&${item}=${param[item]}`;
				}
				itemCount++;
			}
		}
		console.log(url);
		xhr.open(method, url);
		xhr.withCredentials = true;
		xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
/*		if (command != 'adapter/login'){
			xhr.setRequestHeader('Authorization', session);
		}*/
		xhr.send(json);

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 ){
				resolve(JSON.parse(xhr.responseText));
			}
		};
	});
};
window.onload = () => {
	console.log('api sample start');
};
const setResultMessage = (message) => {
	const resultDiv = document.getElementById('result');
	const p = document.createElement('p');
	const br = document.createElement('br');
	resultDiv.appendChild(document.createTextNode(message));
	resultDiv.appendChild(br);
	//resultDiv.appendChild(p);
};
const login = async () => {
	setResultMessage('login');
	const result = await sendCommand('POST', 'adapter/login', {password: 'arwebreceiver'});
	if (result.code == 0){
		setResultMessage(`code: ${result.code} session: ${result.session}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
}
const loginXXXX = async () => {
	setResultMessage('loginXXXX');
	const result = await sendCommand('POST', 'adapter/login', {password: 'arwebreceiverXXXX'});
	if (result.code == 0){
		setResultMessage(`code: ${result.code} session: ${result.session}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
}
const powerOn = async () => {
	const value = { value: '1'};
	setResultMessage('power on');
	const result = await sendCommand('POST', 'receiver/power', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getReceiverState = async () => {
	setResultMessage('get receiver state');
	const result = await sendCommand('GET', 'receiver/receiver_state', null);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} vfo: ${result.vfo} frequency: ${result.frequency} stepFrequency: ${result.stepFrequency} mode: ${result.mode} smeter: ${result.smeter}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setFrequency = async () => {
	//const value = {value: 434.40};
	//const value = {value: 93};
	const value = {value: 78.4};
	setResultMessage(`set frequency: ${value.value}`);
	const result = await sendCommand('POST', 'receiver/frequency', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setTime = async () => {
	const now = new Date();
	const year = String(now.getFullYear()).slice(-2);
	const month = ('0' + String(now.getMonth()+1)).slice(-2);
	const day = ('0' + String(now.getDate())).slice(-2);
	const hour = ('0' + String(now.getHours())).slice(-2);
	const minute = ('0' + String(now.getMinutes())).slice(-2);
	const nowStr = `${year}${month}${day}${hour}${minute}`;
	setResultMessage(`set Time: ${nowStr}`);
	const value = {value: nowStr}
	const result = await sendCommand('POST', 'receiver/time', value);
	setResultMessage(`code: ${result.code}`);
};
const setDemodulateMode = async () => {
	const value = {value: '0F0'};
	setResultMessage(`set demodulate mode: ${value.value}`);
	const result = await sendCommand('POST', 'receiver/demodulate_mode', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setDemodulateModeTTC = async () => {
	const value = {value: '090'};
	setResultMessage(`set demodulate mode: ${value.value}`);
	const result = await sendCommand('POST', 'receiver/demodulate_mode', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setIFbandwidth = async () => {
	const value = {value: '1'};
	setResultMessage(`set IFbandwidth: ${value.value}`);
	const result = await sendCommand('POST', 'receiver/ifbandwidth', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setFrequencyStep = async () => {
	const value = {value: 2};
	setResultMessage(`set frequency step: ${value.value}`);
	const result = await sendCommand('POST', 'receiver/frequency_step', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setFrequencyStepAdjust = async () => {
	const value = {value: 0.5};
	setResultMessage(`set frequency step adjust: ${value.value}`);
	const result = await sendCommand('POST', 'receiver/frequency_step_adjust', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setDigitalDataOutput = async () => {
	const value = {value: '1'};
	setResultMessage(`set digital data output: ${value.value}`);
	const result = await sendCommand('POST', 'receiver/digital_data_output', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const powerOff = async () => {
	setResultMessage(`power off`);
	const value = { value: '0'};
	const result = await sendCommand('POST', 'receiver/power', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setSelectSquelch = async () => {
	const value = {value: 0};
	setResultMessage(`set select squelch: ${value.value}`);
	const result = await sendCommand('POST', 'receiver/select_squelch', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setNoiseSquelch = async () => {
	const value = {value: 10};
	setResultMessage(`set noise squelch: ${value.value}`);
	const result = await sendCommand('POST', 'receiver/noise_squelch', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setLevelSquelch = async () => {
	const value = {value: 10};
	setResultMessage(`set level squelch: ${value.value}`);
	const result = await sendCommand('POST', 'receiver/level_squelch', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setVolume = async () => {
	const value = {value: 10};
	setResultMessage(`set volume: ${value.value}`);
	const result = await sendCommand('POST', 'receiver/volume', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setPrevStep = async () => {
	const value = {step: -10};
	setResultMessage(`set prev step: ${value.step}`);
	const result = await sendCommand('POST', 'receiver/frequency', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setNextStep = async () => {
	const value = {step: 10};
	setResultMessage(`set prev step: ${value.step}`);
	const result = await sendCommand('POST', 'receiver/frequency', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setVFO = async () => {
	const value = {value: 'B'};
	setResultMessage(`set VFO: ${value.value}`);
	const result = await sendCommand('POST', 'receiver/vfo', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getVolume = async() => {
	setResultMessage('get volume');
	const value = null;
	const result = await sendCommand('GET', 'receiver/volume', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getVFO = async() => {
	setResultMessage('get VFO');
	const value = null;
	const result = await sendCommand('GET', 'receiver/vfo', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
		for(let item of result.value){
			setResultMessage(`vfo: ${item.vfo} frequency: ${item.frequency} step frequency: ${item.stepFrequency} step adjust frequency: ${item.stepAdjustFrequency} mode: ${item.mode}`);
		}
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getSelectSquelch = async () => {
	setResultMessage('get select squelch');
	const value = null;
	const result = await sendCommand('GET', 'receiver/select_squelch', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getNoiseSquelch = async () => {
	setResultMessage('get noise squelch');
	const value = null;
	const result = await sendCommand('GET', 'receiver/noise_squelch', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getLevelSquelch = async () => {
	setResultMessage('get level squelch');
	const value = null;
	const result = await sendCommand('GET', 'receiver/level_squelch', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getDigitalDataOutput = async() => {
	setResultMessage(`get digital data output`);
	const value = null;
	const result = await sendCommand('GET', 'receiver/digital_data_output', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getIFbandwidth = async () => {
	setResultMessage(`get IFbandwidth`);
	const value = null;
	const result = await sendCommand('GET', 'receiver/ifbandwidth', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getFrequencyStepAdjust = async () => {
	setResultMessage(`get frequency step adjust`);
	const value = null;
	const result = await sendCommand('GET', 'receiver/frequency_step_adjust', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getDigitalAdditionalInfo = async () => {
	setResultMessage(`get digital additional info`);
	const value = null
	const result = await sendCommand('GET', 'receiver/digital_additional_info', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getSpectrumData = async() => {
	setResultMessage(`get SpectrumData`);
	const value = null;
	const result = await sendCommand('GET', 'receiver/spectrum_data', value);
	if(result.code == 0){
		const htmlValue = result.value.replace(/ /g, '\u00a0');
		setResultMessage(`code: ${result.code}`);
		setResultMessage(`value: ${htmlValue}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getSpectrumCenter = async () => {
	setResultMessage(`get Spectrum center`);
	const value = null;
	const result = await sendCommand('GET', 'receiver/spectrum_center', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setSpectrumCenter = async () => {
	setResultMessage(`set Spectrum center`);
	const value = {value: 80};
	const result = await sendCommand('POST', 'receiver/spectrum_center', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getSpectrumSpan = async () => {
	setResultMessage(`get Spectrum span`);
	const value = null;
	const result = await sendCommand('GET', 'receiver/spectrum_span', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setSpectrumSpan = async () => {
	setResultMessage(`set Spectrum span`);
	const value = {value: 10};
	const result = await sendCommand('POST', 'receiver/spectrum_span', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getSmeter = async () => {
	setResultMessage(`get smeter`);
	const value = null;
	const result = await sendCommand('GET', 'receiver/smeter', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setReceiverStateNotification = async() => {
	const value = {value: 20};
	setResultMessage(`set ReceiverStateNotification: ${value.value}`);
	const result = await sendCommand('POST', 'receiver/receiver_state_notification', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const shutdown = async () => {
	const value = {};
	setResultMessage(`shutdown adapter`);
	const result = await sendCommand('POST', 'adapter/shutdown', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const reboot = async () => {
	const value = {};
	setResultMessage(`reboot adapter`);
	const result = await sendCommand('POST', 'adapter/reboot', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getNetworkInterfaces = async () => {
	const value = null;
	setResultMessage(`get network interfaces`);
	const result = await sendCommand('GET', 'adapter/network_interfaces', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
		for(let key in result.value){
			setResultMessage(`${key} ----------`);
			for(let i = 0; i< result.value[key].length; i++){
				for(let innerKey in result.value[key][i]){
					setResultMessage(`${innerKey}: ${result.value[key][i][innerKey]}`);
				}
			}
		}
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getWifiSettings = async () => {
	const value = null;
	setResultMessage(`get wifi settings`);
	const result = await sendCommand('GET', 'adapter/wifi', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
		for(let key in result.value){
			setResultMessage(`${key}: ${result.value[key]}`);
		}
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setWifiSettings = async () => {
	const value = {
		operationMode: "b",
		country: "JP",
		ssid: "AR-WEB-RECEIVER",
		channel: "1",
		passphrase: "arwebreceiver"
	};
	setResultMessage(`set wifi settings`);
	const result = await sendCommand('POST', 'adapter/wifi', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setPassword = async () => {
	const value = {
		password: "arwebreceiver"
	};
	setResultMessage(`set password`);
	const result = await sendCommand('POST', 'adapter/password', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setPasswordXXXX = async () => {
	const value = {
		password: "arwebreceiverXXXX"
	};
	setResultMessage(`set passwordXXXX`);
	const result = await sendCommand('POST', 'adapter/password', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setSSH = async (val) => {
	const value = { value: val };
	setResultMessage(`set SSH ${val}`);
	const result = await sendCommand('POST', 'adapter/ssh', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getCTCSS = async () => {
	setResultMessage(`get CTCSS`);
	const value = null;
	const result = await sendCommand('GET', 'receiver/ctcss', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setCTCSS = async () => {
	setResultMessage(`set CTCSS`);
	const value = {value: "1"};
	const result = await sendCommand('POST', 'receiver/ctcss', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getDCS = async () => {
	setResultMessage(`get DCS`);
	const value = null;
	const result = await sendCommand('GET', 'receiver/dcs', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setDCS = async () => {
	setResultMessage(`set DCS`);
	const value = {value: "0"};
	const result = await sendCommand('POST', 'receiver/dcs', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getDCSCode = async () => {
	setResultMessage(`get DCS code`);
	const value = null;
	const result = await sendCommand('GET', 'receiver/dcs_code', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setDCSCode  = async () => {
	setResultMessage(`set DCS code`);
	const value = {value: "017"};
	const result = await sendCommand('POST', 'receiver/dcs_code', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getCTCSS_Frequency = async () => {
	setResultMessage(`get CTCSS frequency`);
	const value = null;
	const result = await sendCommand('GET', 'receiver/ctcss_frequency', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setCTCSS_Frequency  = async () => {
	setResultMessage(`set CTCSS frequency`);
	const value = {value: "01"};
	const result = await sendCommand('POST', 'receiver/ctcss_frequency', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getDCREncryptionCode = async () => {
	setResultMessage(`get DCR Encryption Code`);
	const value = null;
	const result = await sendCommand('GET', 'receiver/dcr_encryption_code', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setDCREncryptionCode  = async () => {
	setResultMessage(`set DCR Encryption Code`);
	const value = {value: "11111"};
	const result = await sendCommand('POST', 'receiver/dcr_encryption_code', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const getTTCSlot = async () => {
	setResultMessage(`get T-TC Slot`);
	const value = null;
	const result = await sendCommand('GET', 'receiver/ttcslot', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code} value: ${result.value}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setTTCSlotAUTO  = async () => {
	setResultMessage(`set T-TC Slot 0`);
	const value = {value: "0"};
	const result = await sendCommand('POST', 'receiver/ttcslot', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};
const setTTCSlot1  = async () => {
	setResultMessage(`set T-TC Slot 1`);
	const value = {value: "1"};
	const result = await sendCommand('POST', 'receiver/ttcslot', value);
	if (result.code == 0){
		setResultMessage(`code: ${result.code}`);
	}else{
		setResultMessage(`code: ${result.code} message: ${result.message}`);
	}
};

