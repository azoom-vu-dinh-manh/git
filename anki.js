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
			const entries = doc.querySelectorAll('.link.dlink') || [];
			const reading = `/${doc.querySelector('.ipa.dipa').innerText}/`;
			const expression = doc.querySelector('.di-title').innerText;

			return [
				{
					css: this.css,
					reading,
					expression,
					definitions: [`<span class="bg-green">[${reading}]</span>`],
					audios: [],
				},
			];
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
