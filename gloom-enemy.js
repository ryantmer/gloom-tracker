import {
	LitElement,
	html,
	css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./enemy-instance.js";

export class Enemy extends LitElement {
	static properties = {
		name: { type: String },
		level: { type: Number },
		count: { type: Number },
	};

	constructor() {
		super();
		this.name = "";
		this.level = 0;
		this.count = 0;
	}

	static styles = css`
		.enemy-name {
			font-size: 1.2rem;
		}
		enemy-instance {
			display: inline-block;
		}
	`;

	render() {
		const itemTemplates = [];
		for (let i = 1; i <= this.count; i++) {
			itemTemplates.push(
				html` <enemy-instance
					number=${i}
					maxHealth="5"
				></enemy-instance>`,
			);
		}
		return html`
			<p class="enemy-name">Level ${this.level} ${this.name}</p>
			<p>${itemTemplates}</p>
		`;
	}
}

customElements.define("gloom-enemy", Enemy);
