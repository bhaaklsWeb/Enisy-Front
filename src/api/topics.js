import http from '@/api/server';

export async function all(){
	let { data } = await http.get('topics');
	return data;
}