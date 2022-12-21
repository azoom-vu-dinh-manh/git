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
		let doc = '';
		try {
			let data = await api.fetch(url);
			let parser = new DOMParser();
			doc = parser.parseFromString(data, 'text/html');
		} catch (err) {
			return [];
		}
		const entries = doc.querySelectorAll('.link.dlink') || [];
		const reading = `/${doc.querySelector('.ipa.dipa').innerText}/`;
		const expression = document.querySelector('.di-title').innerText;

		return [
			{
				css: this.css,
				reading,
				expression,
				definitions: [`<span class="bg-green">[${reading}]</span>`],
				audios: [],
			},
		];
	}

	get css() {
		return `<style>
		.bg-bg {
			background: green
		}
		</style>`;
	}
}
