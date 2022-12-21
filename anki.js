class envn_Cambridge {
	constructor(options) {
		this.options = options;
		this.word = '';
	}

	async displayName() {
		return 'Vietnamese';
	}

	setOptions(options) {
		this.options = options;
	}

	async findTerm(word) {
		if (!word) [];

		let base =
			'https://dictionary.cambridge.org/dictionary/english-vietnamese/';
		let url = base + encodeURIComponent(word);
		let doc;
		try {
			const data = await api.fetch(url);
			const parser = new DOMParser();
			const doc = parser.parseFromString(data, 'text/html');
			return Array.from(doc.querySelectorAll('.link.dlink')).map(
				(node) => {
					const reading =
						node.querySelector('.pron.dpron')?.innerText;
					const type = node.querySelector('.pos.dpos')?.innerText;

					const expression =
						node.querySelector('.di-title')?.innerText;

					const definitions = Array.from(
						node.querySelectorAll('.ddef_block')
					).map((i) => {
						const sentence =
							i.querySelector('.ddef_d.db')?.innerText;
						const meaning = i.querySelector('.dtrans')?.innerText;
						const examples = Array.from(
							i.querySelectorAll('.eg')
						).map((j) => j.innerText);
						return (
							`
						<div>
							${sentence}
						</div>
						<div style="color: #0580e8">${meaning}</div>
						` +
							examples
								.map(
									(example) =>
										`<div style="font-size: 0.8em;list-style: square inside;margin: 3px 0;padding: 5px;background: rgba(13,71,161,0.1);border-radius: 5px">${example}</div>`
								)
								.join('')
						);
					});
					return {
						css: this.css,
						reading,
						expression,
						definitions,
						audios: [],
						extrainfo: type,
					};
				}
			);
		} catch (err) {
			return [
				{
					css: this.css,
					reading: 'reading',
					expression: 'abc',
					definitions: [
						`<span class="bg-green">[${'reading'}]</span>`,
					],
					audios: ['abc.com'],
				},
			];
		}
	}

	get css() {
		return `<style>
		.odh-extra {
			text-transform: lowercase;
			font-size: 0.9em;
			margin-right: 5px;
			padding: 2px 4px;
			color: white;
			background-color: #0d47a1;
			border-radius: 3px;
		}
		</style>`;
	}
}
