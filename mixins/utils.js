export default {
	methods: {
		getRarityCode(rarity) {
			const rarities = [
				{ code: "(SR)", rarity: "Super Rare" },
				{ code: "(UR)", rarity: "Ultra Rare" },
				{ code: "(ScR)", rarity: "Secret Rare" },
				{ code: "(GR)", rarity: "Ghost Rare" },
				{ code: "(UtR)", rarity: "Ultimate Rare" },
				{ code: "(StR)", rarity: "Starlight Rare" },
				{ code: "(PScR)", rarity: "Prismatic Secret Rare" },
				{ code: "(GUR)", rarity: "Gold Rare" },
				{ code: "(PG)", rarity: "Premium Gold Rare" },
				{ code: "(GScR)", rarity: "Gold Secret Rare" },
				{ code: "(GGR)", rarity: "Ghost/Gold Rare" },

				/*
				{ code: "(SP)", rarity: "Short Print" },
				{ code: "(SHR)", rarity: "Shatterfoil Rare" },
				{
					code: "(DNPR)",
					rarity: "Duel Terminal Normal Parallel Rare",
				},
				{ code: "(R)", rarity: "Rare" },
				{ code: "(MSR)", rarity: "Mosaic Rare" },
				{ code: "(SFR)", rarity: "Starfoil Rare" },
				{ code: "(CR)", rarity: "Collector's Rare" },
				{ code: "(DRPR)", rarity: "Duel Terminal Rare Parallel Rare" },
				{ code: "(DSPR)", rarity: "Duel Terminal Super Parallel Rare" },
				{ code: "(DUPR)", rarity: "Duel Terminal Ultra Parallel Rare" },
				{ code: "", rarity: "Extra Secret Rare" },
				{ code: "(PIR)", rarity: "Platinum Rare" },
				{ code: "(UPR)", rarity: "Ultra Parallel Rare" },
				{ code: "(PS)", rarity: "Platinum Secret Rare" },
				{ code: "(SSP)", rarity: "Super Short Print" },
				{ code: "(SPR)", rarity: "Super Parallel Rare" },
				{ code: "(UScR)", rarity: "Ultra Secret Rare" },
				{ code: "(10000ScR)", rarity: "10000 Secret Rare" },
				*/
			]
			return rarities
				.find((_) => _.rarity === rarity)?.code.replace("(", "")
				.replace(")", "")
		},
		async getAllCards() {
			const [seg1, seg2, seg3, seg4, seg5, seg6, seg7, seg8] =
				await Promise.all([
					fetch("https://ygobox.herokuapp.com/allcards?n=0").then(
						(response) => response.json()
					),
					fetch("https://ygobox.herokuapp.com/allcards?n=1").then(
						(response) => response.json()
					),
					fetch("https://ygobox.herokuapp.com/allcards?n=2").then(
						(response) => response.json()
					),
					fetch("https://ygobox.herokuapp.com/allcards?n=3").then(
						(response) => response.json()
					),
					fetch("https://ygobox.herokuapp.com/allcards?n=4").then(
						(response) => response.json()
					),
					fetch("https://ygobox.herokuapp.com/allcards?n=5").then(
						(response) => response.json()
					),
					fetch("https://ygobox.herokuapp.com/allcards?n=6").then(
						(response) => response.json()
					),
					fetch("https://ygobox.herokuapp.com/allcards?n=7").then(
						(response) => response.json()
					),
				])
			const allcards = [
				...new Set([
					...seg1,
					...seg2,
					...seg3,
					...seg4,
					...seg5,
					...seg6,
					...seg7,
					...seg8,
				]),
			]
			allcards.sort((a, b) => a.id - b.id)
			return allcards
		},
	},
}
