import http from '@/api/server';

export async function login(username, password){
	let { data } = await http.post('auth/login', { username, password }, {
		errorAlert: 'при попытке логина'
	});
	return data;
}

export async function register(username, password){
	let { data } = await http.post('auth/registration', { username, password }, {
		errorAlert: 'при попытке регистрации'
	});
	return data;
}

export async function logout(){
	let { data } = await http.get('auth/logout', {
		errorAlert: 'при попытке выхода с сайта'
	});
	
	return data;
}

export async function check(){
	try{
		let { data } = await http.get('auth/check', {
			appSilence401: true
		});

		return data;
	}
	catch(e){
		return { res: false };
	}
}