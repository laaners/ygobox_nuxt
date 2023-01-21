import fs from "fs"
import request from "request"
import { load } from "cheerio"
// import { getAllBanlists } from "./banlists"
// import bannedCards from "./data/bannedCards.json"

function csvJSON(csv) {
	const lines = csv.toString().split("\n")
	const result = []
	const headers = lines[0].split("	")
	for (let i = 1; i < lines.length; i++) {
		const obj = {}
		const currentline = lines[i].split("	")
		for (let j = 0; j < headers.length; j++) {
			obj[headers[j]] =
				headers[j] === "id" ? +currentline[j] : currentline[j]
		}
		result.push(obj)
	}
	console.log("Parsed a csv")
	return result
}

function getAllSets() {
	console.log("Retrieving allsets...")
	return new Promise((resolve, reject) => {
		request(
			{
				//  url specificato con nome dal docker compose e non localhost
				url: `https://db.ygoprodeck.com/api/v7/cardsets.php`,
				method: "GET",
			},
			function (error, resp, body) {
				if (error || resp.statusCode !== 200) {
					console.log("Got allsets from LOCAL")
					resolve([])
				} else {
					console.log("Got allsets from API")
					resolve(JSON.parse(body))
				}
			}
		)
	})
}

function getBannedCards() {
    console.log("Retrieving bannedCards...")
	return new Promise((resolve, reject) => {
		request({
			url: `https://raw.githubusercontent.com/laaners/ygobox_nuxt/master/server/data/bannedCards.json`,
			method: 'GET',
		}, function(error, resp, body){
			if(error || resp.statusCode !== 200) {
				console.log("ERROR bannedCards: "+error);
				resolve([]);
			}
			else{
				console.log("Got bannedCards");
				const ris = JSON.parse(body)
				resolve(ris);
			}
		});
	});
}

// eslint-disable-next-line no-unused-vars
function ocgAllCards() {
	console.log(`Retrieving all OCG cards`)
	return new Promise((resolve, reject) => {
		//  "https://db.ygoprodeck.com/api/v7/cardinfo.php?&startdate=01/01/1100&enddate=01/01/2011
		request(
			{
				url: `https://db.ygoprodeck.com/api/v7/cardinfo.php`,
				method: "GET",
			},
			function (error, resp, body) {
				if (error || resp.statusCode !== 200) {
					// eslint-disable-next-line prefer-promise-reject-errors
					reject([])
				} else {
					console.log(`Got all OCG cards`)
					const ris = JSON.parse(body).data
					for (let i = 0; i < ris.length; i++) {
						delete ris[i].card_prices
						//	delete ris[i].archetype
					}
					resolve(ris)
				}
			}
		)
	})
}

function getFemaleCards() {
	console.log(`Retrieving all female cards`)
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
					resolve({})
				} else {
					const list = {}
                    const $ = load(body);
					$(".smw-column-responsive li").each(function(idx, li) {
						const $li = $(li);
						load($li.html())("a").each(function(idx, a) {
							const $a = $(a);
							if($a.text() !== "+") {
								list[$a.text()] = true
							}
						});
					});
					console.log("Got all female cards")
                    resolve(list)
				}
			}
		)
	})
}

export async function initData() {
	// eslint-disable-next-line no-unused-vars, prefer-const
	let [allsets, bannedCards, allcardsToT, femaleCards] = await Promise.all([
		getAllSets(),
		getBannedCards(),
		ocgAllCards(),
		getFemaleCards(),
	]);

	const cardsIT = csvJSON(fs.readFileSync("./server/data/cardsIT.txt"))
	const cardsCH = csvJSON(fs.readFileSync("./server/data/cardsCH.txt"))

	const len = allcardsToT.length
	const step = Math.floor(len/8)

	const allcards = [
		allcardsToT.slice(0, step),
		allcardsToT.slice(step, step*2),
		allcardsToT.slice(step*2,step*3),
		allcardsToT.slice(step*3,step*4),
		allcardsToT.slice(step*4,step*5),
		allcardsToT.slice(step*5,step*6),
		allcardsToT.slice(step*6,step*7),
		allcardsToT.slice(step*7,len),
	]

	allcardsToT.forEach((card) => {
		const bannedCard = bannedCards.find((_) => _.id === card.id)
		if (bannedCard !== undefined) bannedCard.info = card
	})

	return {
		allsets,
		bannedCards,
		cardsCH,
		cardsIT,
		allcards,
		allcardsToT,
		femaleCards,
	}
}