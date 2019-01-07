import axios from 'axios';


export async function getUserCharacters(){
	const characterData = await axios.get('/characters');
	return characterData.data;

}

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
}
