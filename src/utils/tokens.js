const LOCAL_ACCESS_NAME = 'auth_accessToken';
const LOCAL_REFRESH_NAME = 'auth_refrshToken';

function setRefTokens(refresh){
	localStorage.setItem(LOCAL_REFRESH_NAME, refresh);
}

function setTokens(access){
	localStorage.setItem(LOCAL_ACCESS_NAME, access);
}

function cleanRefTokensData(){
	localStorage.removeItem(LOCAL_REFRESH_NAME);
}

function cleanTokensData(){
	localStorage.removeItem(LOCAL_ACCESS_NAME);
}

function getRefToken(){
	return localStorage.getItem(LOCAL_REFRESH_NAME);
}

function getAccessToken(){
	return localStorage.getItem(LOCAL_ACCESS_NAME);
}

function getJWTPayload(token){
	return parseJWT(token).payload;
}

function parseJWT(token){
	let parts = token.split('.');

	return {
		header: parsePart(parts[0]),
		payload: parsePart(parts[1]),
		sign: parts[2]
	};
}

function parsePart(str){
	return JSON.parse(window.atob(str));
}

export { setTokens, cleanTokensData, getJWTPayload, getAccessToken, setRefTokens, cleanRefTokensData, getRefToken }