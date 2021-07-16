export default class Api {
	constructor(options) {
		this.options = options;
	}

	async shortLink(link) {
		this.link = link;
		const res = await fetch("https://api-ssl.bitly.com/v4/shorten", {
            method: "POST",
            headers: {
                authorization: "ce483cac1b7db2a8efdd6a03539861c6d67154fe",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                long_url: `${this.link}`,
            }),
        });
        if (res.ok) {
            return res.json();
        }
        const data = await Promise.reject(` ${res.status}`);
        return data;
	}
}
