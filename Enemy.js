import { enemyData } from './enemy-data.js';

export class Enemy {
	hp = 0;
	attack = 0;
	move = 0;
	range = 0;
	shield = 0;
	target = 0;
	pierce = 0;
	retaliate = 0;
	attributes = [];

	constructor(name, level, isElite) {
		const enemy = enemyData[name];
		if (!enemy) {
			throw new Error(`Enemy with ID ${name} not found in enemy data`);
		}

		const stats = enemy.level[level][isElite ? 'elite' : 'normal'];
		this.name = name;
		this.hp = stats.health;
		this.attack = stats.attack;
		this.move = stats.move;
		this.range = stats.range;
		this.shield = stats.shield;
		this.target = stats.target;
		this.pierce = stats.pierce;
		this.retaliate = stats.retaliate;
		this.attributes = stats.attributes ?? [];
	}
}
