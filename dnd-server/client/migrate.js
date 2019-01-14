const axios = require('axios')

async function migrateWeapons(){
	let weaponData = {};
	for (let i=1; i < 257; i++){
		try{
			weaponData = await axios.get(`http://www.dnd5eapi.co/api/equipment/${i}`);
			weaponData = weaponData.data;
			console.log(weaponData);
			weaponData = {
				name: weaponData.name,
				equipment_category: weaponData.equipment_category ? weaponData.equipment_category : null,
				weapon_category: weaponData.category_range ? weaponData.category_range: null,
				armor_category: weaponData.armor_category ? weaponData.armor_category : null,
				gear_category: weaponData.gear_category ? weaponData.gear_category : null,
				damageDiceType: weaponData.damage ? weaponData.damage.dice_value : null,
				damageDiceNum: weaponData.damage ? weaponData.damage.dice_count : null,
				damageType: weaponData.damage ? weaponData.damage.damage_type.name : null,
				armorType: weaponData.armor_class ? weaponData.armor_class.base : null,
				armorDexBonus: weaponData.armor_class ? weaponData.armor_class.dex_bonus : null,
				armorStrMin: weaponData.armor_str_minimum ? weaponData.armor_str_minimum : null,
				armorStealthDisadvantage: weaponData.stealth_disadvantage ? weaponData.stealth_disadvantage : null,
				worthNum: weaponData.cost ? weaponData.cost.quantity : null,
				worthType: weaponData.cost ? weaponData.cost.unit : null,
				weight: weaponData.weight ? weaponData.weight : null,
				num: 1,
				proficiencyRequired: false,
				range: weaponData.range ? weaponData.range.normal : null,
				rangeLong: weaponData.range ? weaponData.range.long : null,
				properties: weaponData.properties ? weaponData.properties : null
			};
		}catch (e){
			console.error(e)
		}finally {
			const postData = {name: weaponData.name, category: weaponData.equipment_category, data: JSON.stringify(weaponData)}
				await axios({
					method: 'post',
					url: 'https://ancient-harbor-23567.herokuapp.com/weapons',
					data: postData,
				})
		}
	}
	console.log('Finished');
}

migrateWeapons();
