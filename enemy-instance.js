import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { Enemy } from './Enemy.js';
import './enemy-healthbar.js';

export class GloomEnemyInstance extends LitElement {
	static get properties() {
		return {
			id: { type: String },
			instanceNumber: { type: Number },
			level: { type: Number },
			_isElite: { type: Boolean },
			_maxHealth: { type: Number },
			_eliteMaxHealth: { type: Number },
			_currentHealth: { type: Number },
		};
	}

	static get styles() {
		return css`
			:host {
				margin: 0.1rem;
			}
			.wrapper {
				background-color: white;
				border-radius: 0.2rem;
				color: black;
				display: flex;
				align-items: center;
			}
			.wrapper > * {
				margin: 0.1rem;
			}
			.elite {
				background-color: rgb(117, 115, 3);
				color: white;
			}
			button {
				padding: 0;
				height: 2rem;
				font-family: 'PirataOne', 'Open Sans', sans-serif;
				font-size: 0.8rem;
			}
			.elite-button {
				width: 2rem;
			}
			.health-button {
				width: 1.5rem;
				font-size: 1.2rem;
			}
		`;
	}

	constructor() {
		super();
		this.id = '';
		this.instanceNumber = 0;
		this.level = 0;
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);

		const normalEnemy = new Enemy(this.id, this.level, false);
		const eliteEnemy = new Enemy(this.id, this.level, true);

		this._isElite = false;
		this._maxHealth = normalEnemy.hp;
		this._eliteMaxHealth = eliteEnemy.hp;
		this._currentHealth = this._maxHealth;
	}

	render() {
		const isEliteButton = html` <button class="elite-button" @click="${this._toggleElite}"># ${this.instanceNumber}</button>`;
		const healthbar = html`
			<enemy-healthbar
				currentHealth=${this._currentHealth}
				maxHealth="${this._isElite ? this._eliteMaxHealth : this._maxHealth}"
			></enemy-healthbar>
		`;
		const increaseHealthButton = html` <button class="health-button" @click="${this._increaseHealth}">+</button>`;
		const decreaseHealthButton = html` <button class="health-button" @click="${this._decreaseHealth}">-</button>`;

		return html`
			<div class="wrapper ${this._isElite ? 'elite' : ''}">
				${isEliteButton} ${healthbar} ${increaseHealthButton} ${decreaseHealthButton}
			</div>
		`;
	}

	_toggleElite() {
		this._isElite = !this._isElite;
		this._currentHealth = this._isElite ? this._eliteMaxHealth : this._maxHealth;
	}

	_increaseHealth(e) {
		if (this._currentHealth + 1 <= (this._isElite ? this._eliteMaxHealth : this._maxHealth)) {
			this._currentHealth++;
		}
	}

	_decreaseHealth(e) {
		if (this._currentHealth - 1 >= 0) {
			this._currentHealth--;
		}
	}
}

customElements.define('gloom-enemy-instance', GloomEnemyInstance);
