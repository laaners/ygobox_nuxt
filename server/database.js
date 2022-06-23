import fs from "fs"
import request from "request"
import { load } from "cheerio"
import bannedCards from "./data/bannedCards.json"

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
					resolve(JSON.parse(fs.readFileSync("allsets.json")))
				} else {
					console.log("Got allsets from API")
					resolve(JSON.parse(body))
				}
			}
		)
	})
}

function allCardsSegment(startdate, enddate) {
	console.log(`Retrieving all cards between ${startdate}-${enddate}...`)
	return new Promise((resolve, reject) => {
		//  "https://db.ygoprodeck.com/api/v7/cardinfo.php?&startdate=01/01/1100&enddate=01/01/2011
		request(
			{
				url: `https://db.ygoprodeck.com/api/v7/cardinfo.php?&startdate=${startdate}&enddate=${enddate}`,
				method: "GET",
			},
			function (error, resp, body) {
				if (error || resp.statusCode !== 200) {
					// eslint-disable-next-line prefer-promise-reject-errors
					reject([])
				} else {
					console.log(`Got all cards between ${startdate}-${enddate}`)
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

/*
function getBannedCards() {
    console.log("Retrieving bannedCards...")
    return new Promise((resolve, reject) => {
        request({
            url: `https://raw.githubusercontent.com/laaners/test/main/BannedCards.json`,
            method: 'GET',
        }, function(error, resp, body){
            if(error || resp.statusCode !== 200) {
                console.log("ERROR bannedCards: "+error);
                resolve([]);
            }
            else{
                console.log("Got bannedCards");
                resolve(JSON.parse(body));
            }
        });
    });
}
*/

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
					console.log("Retrieved all female cards")
                    resolve(list)
				}
			}
		)
	})
}

export async function initData() {
	const taskAllSets = getAllSets()
	//  const taskBannedCards = getBannedCards();

	const cardsCH = csvJSON(fs.readFileSync("./server/data/cardsCH.txt"))
	const cardsIT = csvJSON(fs.readFileSync("./server/data/cardsIT.txt"))
	const allsets = await taskAllSets
	//  const bannedCards = await taskBannedCards;

	const [allcardsToT, femaleCards] = await Promise.all([
		ocgAllCards(),
		getFemaleCards()
	])

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
		femaleCards
	}
}

export async function initData2() {
	const taskAllSets = getAllSets()
	//  const taskBannedCards = getBannedCards();

	const cardsCH = csvJSON(fs.readFileSync("./server/data/cardsCH.txt"))
	const cardsIT = csvJSON(fs.readFileSync("./server/data/cardsIT.txt"))
	const allsets = await taskAllSets
	//  const bannedCards = await taskBannedCards;

	const [allcards1, allcards2, allcards3, allcards4, allcardsToT, femaleCards] = await Promise.all([
		allCardsSegment("01/01/1100", "01/01/2006"),
		allCardsSegment("01/01/2006", "01/01/2012"),
		allCardsSegment("01/01/2012", "01/01/2018"),
		allCardsSegment("01/01/2018", "01/01/2024"),
		ocgAllCards(),
		getFemaleCards()
	])

	const allcards = [
		allcards1.slice(0, Math.floor(allcards1.length / 2)),
		allcards1.slice(Math.floor(allcards1.length / 2)),
		allcards2.slice(0, Math.floor(allcards2.length / 2)),
		allcards2.slice(Math.floor(allcards2.length / 2)),
		allcards3.slice(0, Math.floor(allcards3.length / 2)),
		allcards3.slice(Math.floor(allcards3.length / 2)),
		allcards4.slice(0, Math.floor(allcards4.length / 2)),
		allcards4.slice(Math.floor(allcards4.length / 2)),
	]
	/*
	const allcardsToT = [
		...new Set([
			...allcards[0],
			...allcards[1],
			...allcards[2],
			...allcards[3],
			...allcards[4],
			...allcards[5],
			...allcards[6],
			...allcards[7],
		]),
	]
	*/

	allcardsToT.forEach((card) => {
		const bannedCard = bannedCards.find((_) => _.id === card.id)
		if (bannedCard !== undefined) bannedCard.info = card
	})

	console.log(allcards.reduce((a,b)=>a.concat(b)).length)
	console.log(allcardsToT.length)

	return {
		allsets,
		bannedCards,
		cardsCH,
		cardsIT,
		allcards,
		allcardsToT,
		femaleCards
	}
}
