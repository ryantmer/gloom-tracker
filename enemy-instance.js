import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { Enemy } from './Enemy.js';
import './enemy-healthbar.js';

const statusEffects = ['disarm', 'immobilize', 'invisible', 'muddle', 'poison', 'strengthen', 'stun', 'wound'];

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
			_statusEffects: { type: Array },
		};
	}

	static get styles() {
		return css`
			:host {
				margin: 0.1rem;
			}
			.wrapper {
				background-color: white;
				color: black;
				display: flex;
				align-items: center;
			}
			.wrapper > * {
				margin: 0.1rem;
			}
			.elite {
				background-color: rgba(117, 115, 3, 0.5);
				color: white;
			}
			button {
				padding: 0;
				height: 2rem;
				font-family: 'PirataOne', 'Open Sans', sans-serif;
				font-size: 0.8rem;
			}
			.open-dialog-button {
				min-width: 1.5rem;
			}
			.health-button {
				width: 1.5rem;
				font-size: 1rem;
				font-weight: bold;
			}
			dialog > .wrapper {
				display: flex;
				flex-direction: column;
			}
			dialog::backdrop {
				backdrop-filter: blur(1px);
			}
			button.dialog-button {
				border: 1px solid black;
				border-radius: 0.2rem;
				padding: 0 0.5rem 0 0.5rem;
			}
			button.selected {
				background: lightslategrey;
			}
			.status-image {
				height: 1.2rem;
				width: 1.2rem;
				vertical-align: middle;
			}
		`;
	}

	constructor() {
		super();
		this.id = '';
		this.instanceNumber = 0;
		this.level = 0;
		this._statusEffects = [];
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

	_openDialog() {
		this.shadowRoot.querySelector('dialog').showModal();
	}

	_closeDialog() {
		this.shadowRoot.querySelector('dialog').close();
	}

	_toggleStatusEffect(name) {
		if (this._statusEffects.includes(name)) {
			this._statusEffects = this._statusEffects.filter((status) => status !== name);
		} else {
			if (!statusEffects.includes(name)) {
				throw new Error(`Status effect "${name}" is not a valid status effect`);
			}

			this._statusEffects.push(name);
			this.requestUpdate();
		}
	}

	_clearStatusEffects() {
		this._statusEffects = [];
	}

	render() {
		const statusEffectButtons = html`
			${statusEffects.map((name) => {
				return html`<button
					class="dialog-button status-button ${this._statusEffects.includes(name) ? 'selected' : ''}"
					@click="${this._toggleStatusEffect.bind(this, name)}"
				>
					<img class="status-image" src="images/${name}.svg" />
				</button>`;
			})}
		`;
		const appliedStatusEffects = this._statusEffects.map((statusEffect) => {
			return html`<img class="status-image" src="images/${statusEffect}.svg" />`;
		});

		return html`
			<div class="wrapper ${this._isElite ? 'elite' : ''}">
				<dialog>
					<div class="wrapper">
						<span>${statusEffectButtons}</span>
						<span>
							<button class="dialog-button" @click="${this._clearStatusEffects}">Clear</button>
							<button
								class="dialog-button ${this._isElite ? 'selected' : ''}"
								@click="${this._toggleElite}"
							>
								Elite
							</button>
							<button class="dialog-button" @click="${this._closeDialog}">Close</button>
						</span>
					</div>
				</dialog>
				<button class="open-dialog-button" @click="${this._openDialog}"># ${this.instanceNumber}</button>
				<button class="health-button" @click="${this._decreaseHealth}">-</button>
				<enemy-healthbar
					currentHealth=${this._currentHealth}
					maxHealth="${this._isElite ? this._eliteMaxHealth : this._maxHealth}"
				></enemy-healthbar>
				<button class="health-button" @click="${this._increaseHealth}">+</button>
				${appliedStatusEffects}
			</div>
		`;
	}
}

customElements.define('gloom-enemy-instance', GloomEnemyInstance);
