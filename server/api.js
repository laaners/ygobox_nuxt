import express from "express"
import { initData } from "./database"
const app = express()
app.use(express.json())

export default app
;(async () => {
	const { allsets, bannedCards, cardsCH, cardsIT, allcards } =
		await initData()

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

	app.get("/cheff", function (req, res) {
		if (req.query !== undefined && req.query.id !== undefined) {
			let card = cardsCH.find((x) => x.id === +req.query.id)
			let i = -1
			while (card === undefined && i < 2) {
				card = cardsCH.find((x) => x.id === +req.query.id + i)
				i += 2
			}
			if (card === undefined || card.desc === "[INVALID_DATA]")
				return res.send("Undefined type of card or [INVALID_DATA]")
			return res.json({ name: card.name, desc: card.desc })
		} else return res.send("Erroneous parameters")
	})

	app.get("/iteff", function (req, res) {
		if (req.query !== undefined && req.query.id !== undefined) {
			let card = cardsIT.find((x) => x.id === +req.query.id)
			let i = -1
			while (card === undefined && i < 2) {
				card = cardsIT.find((x) => x.id === +req.query.id + i)
				i += 2
			}
			if (card === undefined || card.desc === "[INVALID_DATA]")
				return res.send("Undefined type of card or [INVALID_DATA]")
			return res.json({ name: card.name, desc: card.desc })
		} else return res.send("Erroneous parameters")
	})

	app.get("/banned_cards", function (req, res) {
		return res.json(bannedCards)
	})
})()
