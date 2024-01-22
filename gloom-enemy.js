import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { Enemy } from './Enemy.js';
import './enemy-instance.js';

export class GloomEnemy extends LitElement {
	static get properties() {
		return {
			id: { type: String },
			level: { type: Number },
			_normalEnemy: { type: Enemy },
			_eliteEnemy: { type: Enemy },
			_maxInstances: { type: Number },
			_enemyInstances: { type: Array },
		};
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);

		this._normalEnemy = new Enemy(this.id, this.level, false);
		this._eliteEnemy = new Enemy(this.id, this.level, true);
		this._maxInstances = this._normalEnemy.maxInstances;
		this._enemyInstances = new Array(this._normalEnemy.maxInstances).fill(null);
	}

	static get styles() {
		return css`
			:host {
				display: flex;
				flex-direction: column;
				border: 3px solid black;
				padding-left: 0.2rem;
				font-family: 'PirataOne', 'Open Sans', sans-serif;
			}

			.header-bar {
				display: flex;
				align-items: center;
			}
			.header-bar > * {
				margin-right: 0.2rem;
			}
			.header-bar > *:last-child {
				margin-right: 0;
			}

			.enemy-name {
				font-size: 1.2rem;
			}

			.instance-buttons > button {
				border: 1px solid black;
				min-width: 2rem;
				min-height: 2rem;
				color: white;
				font-family: 'PirataOne', 'Open Sans', sans-serif;
			}
			button.add-enemy {
				background-color: transparent;
			}
			button.remove-enemy {
				background-color: red;
			}

			.stats-bar {
				display: inline-flex;
				flex-direction: column;
			}
			.stat-bar {
				display: flex;
				flex-direction: row;
				padding: 0.2rem;
			}
			.stat-bar.elite {
				background: rgb(117, 115, 3);
			}
			.enemy-stat {
				margin-right: 0.5rem;
				font-size: 0.7rem;
			}
			.stat-bar > *:last-child {
				margin-right: 0;
			}
			.enemy-stat > img {
				height: 0.8rem;
				width: 0.8rem;
				vertical-align: middle;
			}

			.enemy-instances {
				display: flex;
				flex-wrap: wrap;
			}
			gloom-enemy-instance {
				display: inline-block;
			}
		`;
	}

	_addEnemyInstance(i) {
		this._enemyInstances[i] = html`<gloom-enemy-instance
			id=${this.id}
			instanceNumber=${i + 1}
			level=${this.level}
		></gloom-enemy-instance>`;
		this.requestUpdate();
	}

	_removeEnemyInstance(i) {
		this._enemyInstances[i] = null;
		this.requestUpdate();
	}

	render() {
		if (!this._normalEnemy || !this._eliteEnemy) {
			return;
		}

		const instanceButtons = [];
		const enemyInstances = [];

		for (let i = 0; i < this._maxInstances; i++) {
			let buttonClass = '';
			let buttonHandler = null;
			if (this._enemyInstances[i]) {
				buttonClass = 'remove-enemy';
				buttonHandler = this._removeEnemyInstance.bind(this, i);
				enemyInstances.push(this._enemyInstances[i]);
			} else {
				buttonClass = 'add-enemy';
				buttonHandler = this._addEnemyInstance.bind(this, i);
				enemyInstances.push(html`</>`);
			}

			instanceButtons.push(html`<button class="${buttonClass}" @click="${buttonHandler}">${i + 1}</button>`);
		}

		const enemyStats = html`
			<span class="stat-bar">
				<span class="enemy-stat">HP ${this._normalEnemy.hp}</span>
				<span class="enemy-stat"><img src="images/attack.svg" /> ${this._normalEnemy.attack ?? '-'}</span>
				<span class="enemy-stat"><img src="images/move.svg" /> ${this._normalEnemy.move ?? '-'}</span>
				<span class="enemy-stat"><img src="images/range.svg" /> ${this._normalEnemy.range ?? '-'}</span>
				<span class="enemy-stat"><img src="images/shield.svg" /> ${this._normalEnemy.shield ?? '-'}</span>
				<span class="enemy-stat"><img src="images/target.svg" /> ${this._normalEnemy.target ?? '-'}</span>
			</span>
			<span class="stat-bar elite">
				<span class="enemy-stat">HP ${this._eliteEnemy.hp}</span>
				<span class="enemy-stat"><img src="images/attack.svg" /> ${this._eliteEnemy.attack ?? '-'}</span>
				<span class="enemy-stat"><img src="images/move.svg" /> ${this._eliteEnemy.move ?? '-'}</span>
				<span class="enemy-stat"><img src="images/range.svg" /> ${this._eliteEnemy.range ?? '-'}</span>
				<span class="enemy-stat"><img src="images/shield.svg" /> ${this._eliteEnemy.shield ?? '-'}</span>
				<span class="enemy-stat"><img src="images/target.svg" /> ${this._eliteEnemy.target ?? '-'}</span>
			</span>
		`;

		return html`
			<span class="header-bar">
				<span class="enemy-name">Level ${this.level} ${this._normalEnemy.name}</span>
				<span class="instance-buttons">${instanceButtons}</span>
				<span class="stats-bar">${enemyStats}</span>
			</span>
			<span class="enemy-instances">
				${enemyInstances}
			</span>
		`;
	}
}

customElements.define('gloom-enemy', GloomEnemy);
