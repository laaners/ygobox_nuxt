/* eslint-disable no-eval */
import express from "express"
import bodyParser from "body-parser"
import { initData } from "./database"
import { retrieveArchetypes } from "./archetypes"
import archetypesBlacklist from "./data/blacklist.json"
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
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
		let card = allcardsToT.find((_) => _.id === id)
		let i = -1
		while (card === undefined && i < 2) {
			card = allcardsToT.find((_) => _.id === id + i)
			i += 2
		}
		if (card === undefined || card.desc === "[INVALID_DATA]")
			return res.send("Undefined type of card or [INVALID_DATA]")

		/*	For each set find tcg_date and assign percentage */
		if (card.card_sets !== undefined) {
			allsets.forEach((set) => {
				const setElem = card.card_sets.find(
					(_) => _.set_name === set.set_name
				)
				if (setElem !== undefined) setElem.tcg_date = set.tcg_date
			})
		}
		card.card_sets?.forEach((set) => {
			const set_name = set.set_name.toLowerCase()
			const cards = allcardsToT.filter((_) => {
				if (_.card_sets === undefined) return false
				if (_.card_sets.length !== 0) {
					return _.card_sets
						.filter((set) => set.set_name !== undefined)
						.map((set) => set.set_name.toLowerCase())
						.includes(set_name.toLowerCase())
				} else return false
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
			const tmp = differentRarities.find(
				(_) => _.set_rarity_code === set.set_rarity_code
			)
			if (tmp === undefined) set.percentage = 0
			else
				set.percentage = (
					(1 - ((totNumber - +tmp.times) / totNumber) ** draftN) *
					100
				).toFixed(2)
		})
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

	app.get("/drafting/:id", (req, res) => {
		const set_name = req.params.id.toLowerCase()
		const set = allsets.find(_=>_.set_name.toLowerCase() === set_name)
		if(set === undefined)
			return res.json({
				pack_img: "Pack not found, name error",
				cards: [],
				draftN: 0,
				packN: 0,
				setNameCorrect: "Not found"
			})
		let cards = allcardsToT.filter((_) => {
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
				packN: 0,
				setNameCorrect: "Not found"
			})
		const packN = cards.length
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

		cards = listCardsPrecedence(cards, differentRarities)
		const totNumber = cards.length
		const filtered = [];
		for(let i = 0; i < draftN; i++) {
			filtered.push(cards[Math.floor(Math.random()*cards.length)]);
		}
		cards = filtered
		//	cards = cards.sort(() => Math.random() - 0.5).slice(0,draftN)
		cards.forEach((elem) => {
			const tmp = differentRarities.find(
				(_) => _.set_rarity_code === elem.rarity.set_rarity_code
			)
			elem.rarity.percentage = (
				(1 - ((totNumber - +tmp.times) / totNumber) ** draftN) *
				100
			).toFixed(2)
		})
		const setNameCorrect = set.tcg_date+" "+set.set_name
		return res.json({
			pack_img: `/sets/${set.set_code}.jpg`,
			cards,
			draftN,
			packN,
			setNameCorrect
		})
	})


	function packImage(set_name) {
		return `/sets/${
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

	app.post("/search_cards", (req, res) => {
		console.log(req.body)
		const {
			pack,
			type1,
			type2,
			raceSpellTrap,
			pendulumScale,
			raceMonster,
			attribute,
			levelRankRating,
			atk,
			def,
			cardName,
			cardEffect,
			linkmarkers,
			favouriteCards
		} = req.body
		let filtered = [...allcardsToT]
		if(favouriteCards.length !== 0) {
			filtered = filtered.filter(_=>favouriteCards.includes(_.id))
		}
		if (pack !== "")
			filtered = filtered
				.filter((_) => _.card_sets !== undefined)
				.filter((_) =>
					_.card_sets
						.map((set) => set.set_name.toLowerCase())
						.includes(pack.toLowerCase())
				)

		if (pendulumScale !== "_")
			filtered = filtered
				.filter((_) => _.scale !== undefined)
				.filter((_) => eval(`_.scale ${pendulumScale}`))

		/*	LINK MARKERS!!!!!!!!!!!!!!!!!! */
		if (linkmarkers.length !== 0)
			filtered = filtered
				.filter((_) => _.linkmarkers !== undefined)
				.filter(
					(_) =>
						JSON.stringify(
							_.linkmarkers.sort((a, b) => (a > b ? -1 : 1))
						) ===
						JSON.stringify(
							linkmarkers.sort((a, b) => (a > b ? -1 : 1))
						)
				)

		filtered = filtered.filter(
			(_) =>
				_.type.includes(type1) &&
				_.type.includes(type2) &&
				_.race.toLowerCase().includes(raceMonster.toLowerCase()) &&
				_.race.toLowerCase().includes(raceSpellTrap.toLowerCase())
		)
		if (raceMonster === "Beast")
			filtered = filtered.filter(
				(_) =>
					!_.race.toLowerCase().includes("winged beast") &&
					!_.race.toLowerCase().includes("divine-beast") &&
					!_.race.toLowerCase().includes("beast-warrior")
			)
		if (attribute !== "")
			filtered = filtered
				.filter((_) => _.attribute !== undefined)
				.filter((_) => _.attribute === attribute)

		if (levelRankRating !== "_")
			filtered = filtered
				.filter((_) => _.level !== undefined || _.linkval !== undefined)
				.filter((card) => {
					if (card.level !== undefined) {
						// eslint-disable-next-line no-unused-vars
						const _ = card.level
						return eval(levelRankRating)
					} else if (card.linkval !== undefined) {
						// eslint-disable-next-line no-unused-vars
						const _ = card.linkval
						return eval(levelRankRating)
					}
					return false
				})

		if (atk !== "> -1") {
			filtered = filtered
				.filter((_) => _.atk !== undefined)
				.filter((_) => eval(`_.atk  ${atk}`))
		}
		if (def !== "> -1") {
			filtered = filtered
				.filter((_) => _.atk !== undefined)
				.filter((_) => eval(`_.def ${def}`))
		}
		if (cardName !== "") {
			const regex = new RegExp(cardName.toLowerCase(), "g")
			filtered = filtered.filter(
				(_) =>
					_.name.toLowerCase().search(regex) >= 0 ||
					_.desc
						.toLowerCase()
						.includes(
							`this card is always treated as a "${cardName.toLowerCase()}"`
						) ||
					_.desc
						.toLowerCase()
						.includes(
							`this card is always treated as an "${cardName.toLowerCase()}"`
						)
			)
		}
		//        if(card_effect != "") filtered = filtered.filter(_=>_.desc.toLowerCase().includes(card_effect.toLowerCase()));
		if (cardEffect !== "") {
			const regex = new RegExp(cardEffect.toLowerCase(), "g")
			filtered = filtered.filter(
				(_) => _.desc.toLowerCase().search(regex) >= 0
			)
		}
		return res.json(filtered)
	})
})()
