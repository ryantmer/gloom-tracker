import {
	LitElement,
	html,
	css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./enemy-healthbar.js";

export class EnemyInstance extends LitElement {
	static properties = {
		number: { type: Number },
		isElite: { type: Boolean },
		maxHealth: { type: Number },
		_currentHealth: {
			type: Number,
			state: true,
		},
	};

	constructor() {
		super();
		this._currentHealth = 5;
	}

	static styles = css`
		:host {
			margin: 0.1rem;
		}
		.wrapper {
			background-color: white;
			padding: 0.2rem;
			border-color: black;
			border-radius: 0.2rem;
			display: flex;
			align-items: center;
		}
		.wrapper > * {
			margin: 0.2rem;
		}
		.elite {
			background-color: yellow;
		}
		.enemy-text {
			font-size: 1.2 rem;
		}
		button {
			padding: 0.5rem;
		}
	`;

	render() {
		return html`
			<div class="wrapper ${this.isElite ? "elite" : ""}">
				<span class="enemy-text">#${this.number}</span>
				<button class="elite-button" @click="${this._toggleElite}">
					Rank
				</button>
				<enemy-healthbar
					currentHealth=${this._currentHealth}
					maxHealth="${this.maxHealth}"
				></enemy-healthbar>
				<button class="health-button" @click="${this._increaseHealth}">
					+
				</button>
				<button class="health-button" @click="${this._decreaseHealth}">
					-
				</button>
			</div>
		`;
	}

	_toggleElite(e) {
		this.isElite = !this.isElite;
	}

	_increaseHealth(e) {
		if (this._currentHealth + 1 <= this.maxHealth) {
			this._currentHealth++;
		}
	}

	_decreaseHealth(e) {
		if (this._currentHealth - 1 >= 0) {
			this._currentHealth--;
		}
	}
}

customElements.define("enemy-instance", EnemyInstance);
