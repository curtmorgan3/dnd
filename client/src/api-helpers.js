import axios from 'axios';


export async function getUserCharacters(token){
	const characterData = await axios({
		method: 'get',
		url: '/characters',
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	return characterData.data;
};

export async function getCharacterData(id){
	const token = localStorage.getItem('dnd_token');
	const characterData = await axios({
		method: 'get',
		url: `/characters/${id}`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	return characterData.data;
};

export async function postNewCharacter(data){
	const token = localStorage.getItem('dnd_token');
	const newCharacter = await axios({
		method: 'post',
		url: '/characters',
		data: data,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
};

export async function updateCharacter(id, data){
	const token = localStorage.getItem('dnd_token');
	const updatedCharacter = await axios({
		method: 'put',
		url: `/characters/${id}`,
		data: data,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
};
