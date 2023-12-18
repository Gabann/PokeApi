export class Pokemon {
	id;
	sprite;
	name;
	height;
	weight;
	types;
	abilities;
	stats;


	constructor(id, sprite, name, height, weight, types, abilities, stats) {
		this.id = id;
		this.sprite = sprite;
		this.name = name;
		this.height = height;
		this.weight = weight;
		this.types = types;
		this.abilities = abilities;
		this.stats = stats
	}
}