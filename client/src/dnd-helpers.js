
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
					{name: 'greataxe', num: 1, option: 'a'},
					{name: 'other_martial_melee', num: 1, option: 'a'},
					{name: 'handaxe', num: 2, option: 'b'},
					{name: 'other_simple_weapon', num: 1, option: 'b'},
					{name: 'explorer_pack', num: 1},
					{name: 'javelin', num: 4}
				]
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
					{name: 'rapier', num: 1, option: 'a'},
					{name: 'longsword', num: 1, option: 'a'},
					{name: 'other_simple_weapon', num: 1, option: 'a'},
					{name: 'diplomat_pack', num: 2, option: 'b'},
					{name: 'entertainer_pack', num: 2, option: 'b'},
					{name: 'lute', num: 1, option: 'c'},
					{name: 'other_instrument', num: 2, option: 'c'},
					{name: 'dagger', num: 1},
					{name: 'leather_armor', num: 1},
				]
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
					{name: 'mace', num: 1, option: 'a'},
					{name: 'warhammer', num: 1, option: 'a', proficiency: true},
					{name: 'scale_mail', num: 1, option: 'b'},
					{name: 'leather_armor', num: 2, option: 'b'},
					{name: 'chain_mail', num: 2, option: 'b', proficiency: true},
					{name: 'light_crossbow', num: 1, option: 'c'},
					{name: 'crossbow_bolts', num: 20},
					{name: 'other_simple_weapon', num: 1, option: 'c'},
					{name: 'priest_pack', num: 1, option: 'd'},
					{name: 'explorer_pack', num: 1, option: 'd'},
					{name: 'shield', num: 1},
					{name: 'holy_symbol', num: 1}
				]
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
					{name: 'wooden_shild', num: 1, option: 'a'},
					{name: 'other_simple_weapon', num: 1, option: 'a'},
					{name: 'explorer_pack', num: 2, option: 'b'},
					{name: 'leather_armor', num: 1},
				]
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
					{name: 'chain_mail', num: 1, option: 'a', suboption: '1'},
					{name: 'leather_armor', num: 1, option: 'a', suboption: '2'},
					{name: 'longbow', num: 1, option: 'a', suboption: '2'},
					{name: 'arrow', num: 20, option: 'a', suboption: '2'},
					{name: 'other_martial_weapon', num: 1, option: 'b', suboption: '1'},
					{name: 'sheild', num: 1, option: 'b', suboption: '1'},
					{name: 'other_martial_weapon', num: 2, option: 'b', suboption: '2'},
					{name: 'dungeoneer_pack', num: 1, option: 'c', suboption: '1'},
					{name: 'explorer_pack', num: 1, option: 'c', suboption: '2'}
				]
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
					{name: 'shortsword', num: 1, option: 'a'},
					{name: 'other_simple_weapon', num: 1, option: 'a'},
					{name: 'dungeoneer_pack', num: 1, option: 'b'},
					{name: 'explorer_pack', num: 1, option: 'b'},
					{name: 'dart', num: 10}
				]
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
					{name: 'other_martial_weapon', num: 1, option: 'a'},
					{name: 'shield', num: 1},
					{name: 'other_martial_weapon', num: 2, option: 'a'},
					{name: 'javelin', num: 5, option: 'b'},
					{name: 'other_simple_weapon', num: 2, option: 'b'},
					{name: 'priest_pack', num: 1, option: 'c'},
					{name: 'explorer_pack', num: 1, option: 'c'},
					{name: 'chain_mail', num: 1},
					{name: 'holy_symbol', num: 1}
				]
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
					{name: 'scale_mail', num: 1, option: 'a'},
					{name: 'leather_armor', num: 1, option: 'a'},
					{name: 'shortsword', num: 2, option: 'b'},
					{name: 'other_simple_weapon', num: 2, option: 'b'},
					{name: 'dungeoneer_pack', num: 1, option: 'c'},
					{name: 'explorer_pack', num: 1, option: 'c'},
					{name: 'longbow', num: 1},
					{name: 'arrow', num: 20}
				]
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
					{name: 'rapier', num: 1, option: 'a'},
					{name: 'shortsword', num: 1, option: 'a'},
					{name: 'shortsword', num: 1, option: 'b'},
					{name: 'shortbow', num: 1, option: 'b'},
					{name: 'arrow', num: 20},
					{name: 'burglar_pack', num: 1, option: 'c'},
					{name: 'dungeoneer_pack', num: 1, option: 'c'},
					{name: 'explorer_pack', num: 1, option: 'c'},
					{name: 'leather_armor', num: 1},
					{name: 'dagger', num: 2},
					{name: 'thieves_tools', num: 1}
				]
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
					{name: 'light_crossbow', num: 1, option: 'a'},
					{name: 'arrow', num: 20},
					{name: 'other_simple_weapon', num: 1, option: 'a'},
					{name: 'component_pouch', num: 1, option: 'b'},
					{name: 'arcane_focus', num: 1, option: 'b'},
					{name: 'dungeoneer_pack', num: 1, option: 'c'},
					{name: 'explorer_pack', num: 1, option: 'c'},
					{name: 'dagger', num: 2},
				]
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
					{name: 'light_crossbow', num: 1, option: 'a'},
					{name: 'arrow', num: 20},
					{name: 'other_simple_weapon', num: 1, option: 'a'},
					{name: 'component_pouch', num: 1, option: 'b'},
					{name: 'arcane_focus', num: 1, option: 'b'},
					{name: 'dungeoneer_pack', num: 1, option: 'c'},
					{name: 'scholar_pack', num: 1, option: 'c'},
					{name: 'leather_armor', num: 1},
					{name: 'other_simple_weapon', num: 1},
					{name: 'dagger', num: 2},
				]
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
					{name: 'dagger', num: 1, option: 'a'},
					{name: 'quarterstaff', num: 1, option: 'a'},
					{name: 'component_pouch', num: 1, option: 'b'},
					{name: 'arcane_focus', num: 1, option: 'b'},
					{name: 'explorer_pack', num: 1, option: 'c'},
					{name: 'scholar_pack', num: 1, option: 'c'},
					{name: 'spellbook', num: 1}
				]
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

module.exports = {
	rollDice,
	rollAbilities,
	getAbilityModifiers,
	getAC,
	getSpeed,
	getClassStats,
	getSkillModifiers
}
