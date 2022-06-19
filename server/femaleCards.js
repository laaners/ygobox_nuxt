const cheerio = require("cheerio");
const request = require('request');

function femaleCards() {
	return new Promise((resolve, reject) => {
		request(
			{
				//  url specificato con nome dal docker compose e non localhost
				url: `https://yugioh.fandom.com/wiki/Concept:Female_official_cards?limit=10000`,
				method: "GET",
			},
			function (error, resp, body) {
				if (error || resp.statusCode !== 200) {
					console.log("Got allsets from LOCAL")
					resolve([])
				} else {
					const list = []
                    const $ = cheerio.load(body);
					$(".smw-column-responsive li").each(function(idx, li) {
						const $li = $(li);
						cheerio.load($li.html())("a").each(function(idx, a) {
							const $a = $(a);
							if($a.text() !== "+") {
								list.push($a.text())
							}
						});
					});
                    resolve(list)
				}
			}
		)
	})
}

async function main() {
    const list = await femaleCards()
	console.log(list)
}

main()