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
						const sentences =
							i.querySelector('.ddef_d.db')?.innerText;
						const meaning = i.querySelector('.dtrans')?.innerText;
						const example = i.querySelector('.eg')?.innerText;
						return `${sentences} | ${meaning} | ${example}`;
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
		.bg-bg {
			background: green
		}
		</style>`;
	}
}
