const axios = require('axios');

export async function getUserCharacters(token){
	const characterData = await axios({
		method: 'get',
		url: '/characters/mine',
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	return characterData.data;
};
export async function getUserCampaigns(token){
	const campaignData = await axios({
		method: 'get',
		url: '/campaigns/mine',
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	return campaignData.data;
}
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

export async function getCampaignData(id){
	const token = localStorage.getItem('dnd_token');
	const campaignData = await axios({
		method: 'get',
		url: `/campaigns/${id}`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	return campaignData.data;
};

export async function getCampaignCharacters(id){
	const token = localStorage.getItem('dnd_token');
	const campaignCharacterData = await axios({
		method: 'get',
		url: `/campaigns/${id}/characters`,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	return campaignCharacterData.data;
}

export async function postNewCharacter(data){
	const token = localStorage.getItem('dnd_token');
	await axios({
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
	await axios({
		method: 'put',
		url: `/characters/${id}`,
		data: data,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
};

export async function postNewCampaign(data){
	const token = localStorage.getItem('dnd_token');
	await axios({
		method: 'post',
		url: '/campaigns',
		data: data,
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
};
