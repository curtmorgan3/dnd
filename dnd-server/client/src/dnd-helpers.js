import axios from 'axios';

// Roll any number of any sided die, returns array sorted lowest to highest
function rollDice(sides, n){
	function base(){
		const num = Math.ceil(Math.random() * sides);
		return num;
	};
	let sum = [];
	for (let i = 0; i < n; i++){
		sum.push(base());
	}
	sum = sum.sort((a,b) => a - b);
	return sum;
}

//Returns array of ability scores
function rollAbilities(){
	const abilityScores = [];
	for (let i = 0; i < 6; i++){
		const rawAbility = rollDice(6,4);
		const ability = rawAbility[1] + rawAbility[2] + rawAbility[3];
		abilityScores.push(ability);
	}
	return abilityScores;
}

//Given ability scores, returns modifiers
function getAbilityModifiers(abilities){
	const modifiers = {};
	Object.keys(abilities).forEach((key, i) => {
		let ability = abilities[key];
		const mod = Math.floor((ability - 10) / 2 );
		modifiers[key] = mod;
	})
	return modifiers;
};

//Armor Class
function getAC(dexMod){
	return 10 + dexMod;
};

//Speed
function getSpeed(race){
	switch(race){
		case 'dwarf' || 'halfling' || 'gnome':
			return 25;
		// break;
		case 'elf' || 'human' || 'dragonborn' || 'half_elf' || 'half_orc' || 'tiefling':
			return 30;
		// break;
		default:
		return 30;
	}
};

//Gold
function getStartingGold(dice, num, multi){
	let arr = rollDice(dice, num)
	let sum = arr.reduce((acc,cur) => acc + cur);
	let total = sum * multi
	return total
}

//Feats
async function getFeat(index){
	try{
		let feat = await axios.get(`http://www.dnd5eapi.co/api/features/${index}`);
		return feat.data;
	} catch(e){
		console.error(e)
	}
};

async function getCharacterFeatures(clas, level){
	let feats = [];
	let currentFeats = [];
	switch(clas){
		case 'barbarian':
			for (let i = 1; i<25; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}else {
					return null
				}
			})
		return currentFeats;
		case 'bard':
			for (let i = 25; i<71; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				};
				feats.map(feat => {
					if(feat.level <= level){
						currentFeats.push(feat);
					}else {
						return null
					}
				})
			};
		return currentFeats;
		case 'cleric':
			for (let i = 71; i<100; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}else {
					return null
				}
			})
		return currentFeats;
		case 'druid':
			for (let i = 100; i<131; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}else {
					return null
				}
			})
		return currentFeats;
		case 'fighter':
			for (let i = 131; i<160; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}else {
					return null
				}
			})
		return currentFeats;
		case 'monk':
			for (let i = 160; i<191; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}else {
					return null
				}
			})
		return currentFeats;
		case 'paladin':
			for (let i = 191; i<220; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}else {
					return null
				}
			})
		return currentFeats;
		case 'ranger':
			for (let i = 220; i<260; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}else {
					return null
				}
			})
		return currentFeats;
		case 'rogue':
			for (let i = 260; i<303; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}else {
					return null
				}
			})
		return currentFeats;
		case 'sorcerer':
			for (let i = 303; i<340; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}else {
					return null
				}
			})
		return currentFeats;
		case 'warlock':
			for (let i = 340; i<400; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}else {
					return null
				}
			})
		return currentFeats;
		case 'wizard':
			for (let i = 400; i<415; i++){
				try{
					const feat = await getFeat(i);
					feats.push(feat);
				}catch (e){
					console.error(e);
				}
			};
			feats.map(feat => {
				if(feat.level <= level){
					currentFeats.push(feat);
				}else {
					return null
				}
			})
		return currentFeats;
		default :
		return null
	}
}

//Class Stats
function getClassStats(clas){
	let stats = {}
	switch(clas){
		case 'barbarian':
			stats = {
				hitDie: 12,
				primaryAbility: 'str',
				savingThrows: ['str', 'con'],
				armorProfs: ['light', 'medium', 'shield'],
				weaponProfs: ['simple', 'martial'],
				possibleSkills: {num: 2, skills:['animal_handling', 'athletics', 'intimidation', 'nature', 'perception', 'survival']},
				startingEquipment: [
					{name: 'Greataxe', num: 1, option: 'a', suboption: '1', id: 18},
					{name: 'Any Martial Melee Weapon', num: 1, option: 'a', suboption: '2', id: 9999},
					{name: 'Handaxe', num: 2, option: 'b', suboption: '1', id: 4},
					{name: 'Any Simple Weapon', num: 1, option: 'b', suboption: '2', id: 9999},
					{name: 'Explorer Pack', num: 1, option: 'c', suboption: '1', id: 158},
					{name: 'Javelin', num: 4, option: 'd', suboption: '1', id: 5}
				],
				startingCoin: {dice: 4, num: 2, multi: 10}
			};
			return stats;
		// break;
		case 'bard':
			stats = {
				hitDie: 8,
				primaryAbility: 'cha',
				savingThrows: ['dex', 'cha'],
				armorProfs: ['light'],
				weaponProfs: ['simple', 'hand_crossbow', 'longsword', 'rapier', 'shortsword'],
				possibleSkills: {num: 3, skills: ['acrobatics','animal_handling','arcana','athletics','deception','history','insight','intimidation','investigation','medicine','nature','perception','performance','persuassion','religion','sleight_of_hand','stealth','survival']},
				startingEquipment: [
					{name: 'Rapier', num: 1, option: 'a', suboption: '1', id: 26},
					{name: 'Longsword', num: 1, option: 'a', suboption: '2', id: 22},
					{name: 'Any Simple Weapon', num: 1, option: 'a', suboption: '3', id: 9999},
					{name: 'Diplomat Pack', num: 2, option: 'b', suboption: '1', id: 155},
					{name: 'Entertainer Pack', num: 2, option: 'b', suboption: '2',ide: 157},
					{name: 'Lute', num: 1, option: 'c', suboption: '1', unique: 184},
					{name: 'Any Musical Instrument', num: 2, option: 'c', suboption: '2', id: 9999},
					{name: 'Dagger', num: 1, option: 'd', suboption: '1', id: 2},
					{name: 'Leather Armor', num: 1, option: 'e', suboption: '1', id: 39},
				],
				startingCoin: {dice: 4, num: 5, multi: 10}
			};
		return stats;
		// break;
		case 'cleric':
			stats = {
				hitDie: 8,
				primaryAbility: 'wis',
				savingThrows: ['wis', 'cha'],
				armorProfs: ['light', 'medium', 'shield'],
				weaponProfs: ['simple'],
				possibleSkills: {num: 2, skills: ['history', 'insight', 'medicine', 'persuasion', 'religion']},
				startingEquipment: [
					{name: 'Mace', num: 1, option: 'a', suboption: '1', id: 7},
					{name: 'Warhammer', num: 1, option: 'a', suboption: '1', id: 31, proficiency: true},
					{name: 'Scale Mail', num: 1, option: 'b', suboption: '1', id: 43},
					{name: 'Leather Armor', num: 2, option: 'b', suboption: '2', id: 39},
					{name: 'Chain Mail', num: 2, option: 'b', suboption: '3', id: 47, proficiency: true},
					{name: 'Light Crossbow', num: 1, option: 'c', suboption: '1', id: 11},
					{name: 'Crossbow Bolt', num: 20, option: 'c', suboption: '1', id: 56},
					{name: 'Any Simple Weapon', num: 1, option: 'c', suboption: '2', id: 9999},
					{name: 'Priest Pack', num: 1, option: 'd', suboption: '1', id: 159},
					{name: 'Explorer Pack', num: 1, option: 'd', suboption: '2', id: 158},
					{name: 'Shield', num: 1, option: 'e', suboption: '1', id: 50},
					{name: 'Holy Symbol', num: 1, option: 'f', suboption: '1', id: 99}
				],
				startingCoin: {dice: 4, num: 5, multi: 10}
			};
			return stats;
		// break;
		case 'druid':
			stats = {
				hitDie: 8,
				primaryAbility: 'wis',
				savingThrows: ['int', 'wis'],
				armorProfs: ['light', 'medium', 'shield'],
				weaponProfs: ['club', 'dagger', 'dart', 'javelins', 'mace', 'quarterstaff', 'scimitar', 'sickle', 'sling', 'spear'],
				possibleSkills: {num: 2, skills: ['arcana', 'animal_handling', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival']},
				startingEquipment: [
					{name: 'Wooden Shild', num: 1, option: 'a', suboption: '1', id: 50},
					{name: 'Any Simple Weapon', num: 1, option: 'a', suboption: '2', id: 9999},
					{name: 'Explorer Pack', num: 2, option: 'b', suboption: '1', id: 158},
					{name: 'Leather Armor', num: 1, option: 'c', suboption: '1', id: 39},
					{name: 'Druidic Focus', num: 1, option: 'd', suboption: '1', id: 9999},
					{name: 'Scimitar', num: 1, option: 'e', suboption: '1', id: 27},
					{name: 'Any Simple Melee Weapon', num: 1, option: 'e', suboption: '2', id: 9999}
				],
				startingCoin: {dice: 4, num: 2, multi: 10}
			};
			return stats;
		// break;
		case 'fighter':
			stats = {
				hitDie: 10,
				primaryAbility: ['str','dex'],
				savingThrows: ['str', 'con'],
				armorProfs: ['light', 'medium', 'heavy', 'sheild'],
				weaponProfs: ['simple', 'martial'],
				possibleSkills: {num: 2, skills: ['acrobatics', 'animal_handling','athletics','history','insight','intimidation','perception','survial']},
				startingEquipment: [
					{name: 'Chain Mail', num: 1, option: 'a', suboption: '1', id: 47 },
					{name: 'Leather Armor', num: 1, option: 'a', suboption: '2', id: 39 },
					{name: 'Longbow', num: 1, option: 'a', suboption: '2', id: 36},
					{name: 'Arrow', num: 20, option: 'a', suboption: '2', id: 54 },
					{name: 'Any Martial Weapon', num: 1, option: 'b', suboption: '1', id: 9999},
					{name: 'Sheild', num: 1, option: 'b', suboption: '1', id: 50 },
					{name: 'Any Martial Weapon', num: 2, option: 'b', suboption: '2', id: 9999},
					{name: 'Dungeoneer Pack', num: 1, option: 'c', suboption: '1', id: 156 },
					{name: 'Explorer Pack', num: 1, option: 'c', suboption: '2', id: 158 }
				],
				startingCoin: {dice: 4, num: 5, multi: 10}
			};
			return stats;
		// break;
		case 'monk':
			stats = {
				hitDie: 8,
				primaryAbility: ['dex','wis'],
				savingThrows: ['str', 'dex'],
				armorProfs: [],
				weaponProfs: ['simple', 'shortsword'],
				possibleSkills: {num: 2, skills: ['acrobatics','athletics','history','insight','religion','stealth']},
				startingEquipment: [
					{name: 'Shortsword', num: 1, option: 'a', suboption: '1', id: 28},
					{name: 'Any Simple Weapon', num: 1, option: 'a', suboption: '2', id: 9999},
					{name: 'Dungeoneer Pack', num: 1, option: 'b', suboption: '1', id: 156},
					{name: 'Explorer Pack', num: 1, option: 'b', suboption: '2', id: 158},
					{name: 'Dart', num: 10, option: 'c', suboption: '1', id: 12}
				],
				startingCoin: {dice: 4, num: 5, multi: 1}
			};
			return stats;
		// break;
		case 'paladin':
			stats = {
				hitDie: 10,
				primaryAbility: ['dex','wis'],
				savingThrows: ['wis', 'cha'],
				armorProfs: ['light', 'medium', 'heavy', 'sheild'],
				weaponProfs: ['simple', 'martial'],
				possibleSkills: {num: 2, skills: ['athletics','insight','intimidation','medicine','persuasion','religion']},
				startingEquipment: [
					{name: 'Any Martial Weapon', num: 1, option: 'a', suboption: '1', id: 9999},
					{name: 'Shield', num: 1, option: 'a', suboption: '1', id: 50},
					{name: 'Any Martial Weapon', num: 2, option: 'a', suboption: '2', id: 9999},
					{name: 'Javelin', num: 5, option: 'b', suboption: '1', id: 5},
					{name: 'Any Simple Weapon', num: 2, option: 'b', suboption: '2', id: 9999},
					{name: 'Priest Pack', num: 1, option: 'c', suboption: '1', id: 159},
					{name: 'Explorer Pack', num: 1, option: 'c', suboption: '2', id: 158},
					{name: 'Chain Mail', num: 1, option: 'd', suboption: '1', id: 47},
					{name: 'Holy Symbol', num: 1, option: 'e', suboption: '1', id: 9999}
				],
				startingCoin: {dice: 4, num: 5, multi: 10}
			};
			return stats;
		// break;
		case 'ranger':
			stats = {
				hitDie: 10,
				primaryAbility: ['dex','wis'],
				savingThrows: ['str', 'dex'],
				armorProfs: ['light', 'medium'],
				weaponProfs: ['simple', 'martial'],
				possibleSkills: {num: 3, skills: ['animal_handling','athletics','insight','investigation','nature','perception','stealth','survival']},
				startingEquipment: [
					{name: 'Scale Mail', num: 1, option: 'a', suboption: '1', id: 43},
					{name: 'Leather Armor', num: 1, option: 'a', suboption: '2', id: 39},
					{name: 'Shortsword', num: 2, option: 'b', suboption: '1', id: 28},
					{name: 'Any Simple Weapon', num: 2, option: 'b', suboption: '2', id: 9999},
					{name: 'Dungeoneer Pack', num: 1, option: 'c', suboption: '1', id: 156},
					{name: 'Explorer Pack', num: 1, option: 'c', suboption: '2', id: 158},
					{name: 'Longbow', num: 1, option: 'd', suboption: '1', id: 36},
					{name: 'Arrow', num: 20, option: 'e', suboption: '1', id: 54}
				],
				startingCoin: {dice: 4, num: 5, multi: 10}
			};
			return stats;
		// break;
		case 'rogue':
			stats = {
				hitDie: 8,
				primaryAbility: 'dex',
				savingThrows: ['dex', 'int'],
				armorProfs: ['light'],
				weaponProfs: ['simple', 'hand_crossbow', 'longsword', 'rapier', 'shortsword'],
				possibleSkills: {num: 4, skills: ['acrobatics','athletics','deception','insight','intimidation','investigation','perception','performance','persuasion','sleight_of_hand','stealth']},
				startingEquipment: [
					{name: 'Rapier', num: 1, option: 'a', suboption: '1', id: 26},
					{name: 'Shortsword', num: 1, option: 'a', suboption: '2', id: 28},
					{name: 'Shortsword', num: 1, option: 'b', suboption: '1', id: 28},
					{name: 'Shortbow', num: 1, option: 'b', suboption: '2', id: 13},
					{name: 'Arrow', num: 20, option: 'b', suboption: '2', id: 54},
					{name: 'Burglar Pack', num: 1, option: 'c', suboption: '1', id: 154},
					{name: 'Dungeoneer Pack', num: 1, option: 'c', suboption: '2', id: 156},
					{name: 'Explorer Pack', num: 1, option: 'c', suboption: '3', id: 158},
					{name: 'Leather Armor', num: 1, option: 'd', suboption: '1', id: 39},
					{name: 'Dagger', num: 2, option: 'e', suboption: '1', id: 2},
					{name: 'Thieves Tools', num: 1, option: 'f', suboption: '1', id: 191}
				],
				startingCoin: {dice: 4, num: 4, multi: 10}
			};
			return stats;
		// break;
		case 'sorcerer':
			stats = {
				hitDie: 6,
				primaryAbility: 'cha',
				savingThrows: ['con', 'cha'],
				armorProfs: [],
				weaponProfs: ['dagger', 'dart', 'sling', 'quarterstaff', 'light_crossbow'],
				possibleSkills: {num: 2, skills: ['arcana', 'deception', 'insight','intimidation','persuasion','religion']},
				startingEquipment: [
					{name: 'Light Crossbow', num: 1, option: 'a', suboption: '1', id: 11},
					{name: 'Arrow', num: 20, option: 'a', suboption: '1', id: 54},
					{name: 'Any Simple Weapon', num: 1, option: 'a', suboption: '2', id: 9999},
					{name: 'Component Pouch', num: 1, option: 'b', suboption: '1', id: 87},
					{name: 'Arcane Focus', num: 1, option: 'b', suboption: '2', id: 9999},
					{name: 'Dungeoneer Pack', num: 1, option: 'c', suboption: '1', id: 156},
					{name: 'Explorer Pack', num: 1, option: 'c', suboption: '2', id: 158},
					{name: 'Dagger', num: 2, option: 'e', suboption: '1', id: 2},
				],
				startingCoin: {dice: 4, num: 3, multi: 10}
			};
			return stats;
		// break;
		case 'warlock':
			stats = {
				hitDie: 8,
				primaryAbility: 'cha',
				savingThrows: ['con', 'cha'],
				armorProfs: ['light'],
				weaponProfs: ['simple'],
				possibleSkills: {num: 2, skills: ['arcana','deception','history','intimidation','investigation','nature','religion']},
				startingEquipment: [
					{name: 'Light Crossbow', num: 1, option: 'a', suboption: '1', id: 11},
					{name: 'Arrow', num: 20, option: 'a', suboption: '1', id: 54},
					{name: 'Any Simple Weapon', num: 1, option: 'a', suboption: '2', id: 9999},
					{name: 'Component Pouch', num: 1, option: 'b', suboption: '1', id: 87},
					{name: 'Arcane Focus', num: 1, option: 'b', suboption: '2', id: 9999},
					{name: 'Dungeoneer Pack', num: 1, option: 'c', suboption: '1', id: 156},
					{name: 'Scholar Pack', num: 1, option: 'c', suboption: '2', id: 160},
					{name: 'Leather Armor', num: 1, option: 'd', suboption: '1', id: 39},
					{name: 'Any Simple Weapon', num: 1, option: 'e', suboption: '1', id: 9999},
					{name: 'Dagger', num: 2, option: 'f', suboption: '1', id: 2},
				],
				startingCoin: {dice: 4, num: 4, multi: 10}
			};
			return stats;
		// break;
		case 'wizard':
			stats = {
				hitDie: 6,
				primaryAbility: 'str',
				savingThrows: ['int', 'wis'],
				armorProfs: [],
				weaponProfs: ['dagger', 'dart', 'sling', 'quarterstaff', 'light_crossbow'],
				possibleSkills: {num: 2, skills: ['arcana','history','insight','investigation','medicine','religion']},
				startingEquipment: [
					{name: 'Dagger', num: 1, option: 'a', suboption: '1', id: 2},
					{name: 'Quarterstaff', num: 1, option: 'a', suboption: '2', id: 8},
					{name: 'Component Pouch', num: 1, option: 'b', suboption: '1', id: 87},
					{name: 'Arcane Focus', num: 1, option: 'b', suboption: '2', id: 9999},
					{name: 'Explorer Pack', num: 1, option: 'c', suboption: '1', id: 158},
					{name: 'Scholar Pack', num: 1, option: 'c', suboption: '2', id: 160},
					{name: 'Spellbook', num: 1, option: 'd', suboption: '1', id: 145}
				],
				startingCoin: {dice: 4, num: 4, multi: 10}
			};
			return stats;
		// break;
		default :
		console.log(stats);
	};
};

//Get Skill Modifiers
function getSkillModifiers(skills, abilityMods, proficiencyBonus){
	const skillMods = {
		'acrobatics': abilityMods.dex,
		'animal_handling': abilityMods.wis,
		'arcana': abilityMods.int,
		'athletics': abilityMods.str,
		'deception': abilityMods.cha,
		'history': abilityMods.int,
		'insight': abilityMods.wis,
		'intimidation': abilityMods.cha,
		'investigation': abilityMods.int,
		'medicine': abilityMods.wis,
		'nature': abilityMods.int,
		'perception': abilityMods.wis,
		'performance': abilityMods.cha,
		'persuasion': abilityMods.cha,
		'religion': abilityMods.int,
		'sleight_of_hand': abilityMods.dex,
		'stealth': abilityMods.dex,
		'survival': abilityMods.wis
	};
	skills.forEach(skill => {
		if(skillMods[skill]){
			skillMods[skill] += proficiencyBonus
		}
	});
	return skillMods;
}

export {
	rollDice,
	rollAbilities,
	getAbilityModifiers,
	getAC,
	getSpeed,
	getClassStats,
	getSkillModifiers,
	getStartingGold,
	getCharacterFeatures
}
