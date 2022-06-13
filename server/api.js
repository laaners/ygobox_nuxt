import express from "express"
import { initData } from "./database"
import { retrieveArchetypes } from "./archetypes"
import archetypesBlacklist from "./data/blacklist.json"
const app = express()
app.use(express.json())

export default app
;(async () => {
	const { allsets, bannedCards, cardsCH, cardsIT, allcards, allcardsToT } =
		await initData()
	const archetypes = retrieveArchetypes(allcardsToT, allsets)
	console.log("Got all the data now!")

	app.get("/", (req, res) => {
		return res.json(cardsIT)
	})

	app.get("/allcards", (req, res) => {
		return res.json(allcards[+req.query.n])
	})

	app.get("/allsets", (req, res) => {
		return res.json(allsets)
	})

	app.get("/archetypes", (req, res) => {
		return res.json(
			archetypes
				.filter((_) => !archetypesBlacklist.includes(_.archetype))
				.map((_) => {
					const obj = {
						archetype: _.archetype,
						members: _.members.length,
						true_name: _.true_name,
						date: _.date,
						imgs: _.imgs,
						attributes: _.attributes,
						types: _.types,
						crest: _?.crest,
						focus: _.focus,
					}
					return obj
				})
		)
	})

	app.get("/archetypes/:id", (req, res) => {
		return res.json(archetypes.filter((_) => _.archetype === req.params.id))
	})

	app.get("/card/:id", (req, res) => {
		const id = +req.params.id
		const card = allcardsToT.find((_) => _.id === id)
		return res.json(card)
	})

	app.get("/cheff/:id", (req, res) => {
		const id = +req.params.id
		let card = cardsCH.find((_) => _.id === id)
		let i = -1
		while (card === undefined && i < 2) {
			card = cardsCH.find((_) => _.id === id + i)
			i += 2
		}
		if (card === undefined || card.desc === "[INVALID_DATA]")
			return res.send("Undefined type of card or [INVALID_DATA]")
		return res.json({ name: card.name, desc: card.desc })
	})

	app.get("/iteff/:id", (req, res) => {
		const id = +req.params.id
		let card = cardsIT.find((_) => _.id === id)
		let i = -1
		while (card === undefined && i < 2) {
			card = cardsIT.find((_) => _.id === id + i)
			i += 2
		}
		if (card === undefined || card.desc === "[INVALID_DATA]")
			return res.send("Undefined type of card or [INVALID_DATA]")
		return res.json({ name: card.name, desc: card.desc })
	})

	app.get("/banned_cards", (req, res) => {
		return res.json(bannedCards)
	})

	app.get("/set/:id", (req, res) => {
		const set_name = req.params.id.toLowerCase()
		const cards = allcardsToT.filter((_) => {
			if (_.card_sets === undefined) return false
			if (_.card_sets.length !== 0) {
				return _.card_sets
					.filter((set) => set.set_name !== undefined)
					.map((set) => set.set_name.toLowerCase())
					.includes(set_name.toLowerCase())
			} else return false
		})
		if (cards.length === 0)
			return res.json({
				pack_img: "Pack not found, name error",
				cards: [],
				draftN: 0,
			})
		const draftN =
			Math.ceil(cards.length * 1.5) > 120
				? 120
				: Math.ceil(cards.length * 1.5)
		const differentRarities = rarityAssignAndOccurrence(
			cards,
			set_name,
			draftN
		)
		computePrecedence(differentRarities, draftN)

		const tmpArr = listCardsPrecedence(cards, differentRarities)
		const totNumber = tmpArr.length
		cards.forEach((elem) => {
			const tmp = differentRarities.find(
				(_) => _.set_rarity_code === elem.rarity.set_rarity_code
			)
			elem.rarity.percentage = (
				(1 - ((totNumber - +tmp.times) / totNumber) ** draftN) *
				100
			).toFixed(2)
		})
		cards.sort((a, b) => {
			const setCodeA = a.rarity.set_code
			const setCodeB = b.rarity.set_code
			if (setCodeA < setCodeB) return -1
			if (setCodeA > setCodeB) return 1
			return 0
		})
		return res.json({
			pack_img: packImage(set_name),
			cards,
			draftN,
		})
	})

	function packImage(set_name) {
		return `sets/${
			allsets.find(
				(_) => _.set_name.toLowerCase() === set_name.toLowerCase()
			).set_code
		}.jpg`
	}

	function rarityAssignAndOccurrence(cards, set_name) {
		//	each element assign rarity
		cards.forEach(
			(_) =>
				(_.rarity = _.card_sets.find(
					(_) => _.set_name.toLowerCase() === set_name
				))
		)

		//	compute different rarities and occurrences in pack
		const differentRarities = []
		cards
			.map((_) =>
				_.card_sets.find((_) => _.set_name.toLowerCase() === set_name)
			)
			.forEach((elem) => {
				const currentRarity = differentRarities.find(
					(_) => _.set_rarity_code === elem.set_rarity_code
				)
				if (currentRarity === undefined)
					differentRarities.push({
						set_rarity_code: elem.set_rarity_code,
						set_rarity: elem.set_rarity,
						n: 1,
					})
				else currentRarity.n += 1
			})
		return differentRarities.sort((a, b) => a.n - b.n)
	}

	function computePrecedence(differentRarities, draftN) {
		let times = 1
		let currentN = differentRarities[0].n
		differentRarities.forEach((rarity) => {
			if (rarity.n > currentN) times += Math.ceil(Math.sqrt(draftN))
			rarity.times = times
			currentN = rarity.n
		})
		if (differentRarities.length < 5)
			differentRarities.find((_) => _.times === 1).times =
				1 + Math.ceil(Math.sqrt(draftN) / 2)
	}

	function listCardsPrecedence(filteredCopy, differentRarities) {
		const tmpArr = []
		filteredCopy.forEach((elem) => {
			const rarity = elem.rarity.set_rarity_code
			const times = differentRarities.find(
				(_) => _.set_rarity_code === rarity
			).times
			for (let i = 0; i < times; i++) {
				tmpArr.push(elem)
			}
		})
		return tmpArr
	}
})()
