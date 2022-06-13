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
				.find((_) => _.rarity === rarity)
				?.code.replace("(", "")
				.replace(")", "")
		},
		listOrder(n) {
			if (n === 1) return "Normal Monster"
			if (n === 2) return "Effect Monster"
			if (n === 3) return "Spirit Monster"
			if (n === 4) return "Flip Effect Monster"
			if (n === 5) return "Toon Monster"
			if (n === 6) return "Union Effect Monster"
			if (n === 7) return "Gemini Monster"
			if (n === 8) return "Tuner Monster"
			if (n === 9) return "Normal Tuner Monster"
			if (n === 10) return "Pendulum Normal Monster"
			if (n === 11) return "Pendulum Effect Monster"
			if (n === 12) return "Pendulum Flip Effect Monster"
			if (n === 13) return "Pendulum Tuner Effect Monster"
			if (n === 14) return "Ritual Monster"
			if (n === 15) return "Ritual Effect Monster"
			if (n === 16) return "Fusion Monster"
			if (n === 17) return "Pendulum Effect Fusion Monster"
			if (n === 18) return "Synchro Monster"
			if (n === 19) return "Synchro Tuner Monster"
			if (n === 20) return "Synchro Pendulum Effect Monster"
			if (n === 21) return "XYZ Monster"
			if (n === 22) return "XYZ Pendulum Effect Monster"
			if (n === 23) return "Link Monster"
			if (n === 24) return "Spell Card Normal"
			if (n === 25) return "Spell Card Ritual"
			if (n === 26) return "Spell Card Quick-Play"
			if (n === 27) return "Spell Card Continuous"
			if (n === 28) return "Spell Card Equip"
			if (n === 29) return "Spell Card Field"
			if (n === 30) return "Trap Card Normal"
			if (n === 31) return "Trap Card Continuous"
			if (n === 32) return "Trap Card Counter"
			if (n === 33) return "Skill Card Andrew"
			if (n === 34) return "Skill Card Arkana"
			if (n === 35) return "Skill Card Bonz"
			if (n === 36) return "Skill Card Christine"
			if (n === 37) return "Skill Card David"
			if (n === 38) return "Skill Card Emma"
			if (n === 39) return "Skill Card Espa Roba"
			if (n === 40) return "Skill Card Ishizu"
			if (n === 41) return "Skill Card Ishizu Ishtar"
			if (n === 42) return "Skill Card Joey"
			if (n === 43) return "Skill Card Joey Wheeler"
			if (n === 44) return "Skill Card Kaiba"
			if (n === 45) return "Skill Card Keith"
			if (n === 46) return "Skill Card Lumis Umbra"
			if (n === 47) return "Skill Card Mai"
			if (n === 48) return "Skill Card Mai Valentine"
			if (n === 49) return "Skill Card Mako"
			if (n === 50) return "Skill Card Odion"
			if (n === 51) return "Skill Card Pegasus"
			if (n === 52) return "Skill Card Rex"
			if (n === 53) return "Skill Card Seto Kaiba"
			if (n === 54) return "Skill Card Tea Gardner"
			if (n === 55) return "Skill Card Weevil"
			if (n === 56) return "Skill Card Yami Bakura"
			if (n === 57) return "Skill Card Yami Marik"
			if (n === 58) return "Skill Card Yami Yugi"
			if (n === 59) return "Skill Card Yugi"
			if (n === 60) return "Token Aqua"
			if (n === 61) return "Token Beast"
			if (n === 62) return "Token Cyberse"
			if (n === 63) return "Token Dinosaur"
			if (n === 64) return "Token Dragon"
			if (n === 65) return "Token Fairy"
			if (n === 66) return "Token Fiend"
			if (n === 67) return "Token Fish"
			if (n === 68) return "Token Insect"
			if (n === 69) return "Token Machine"
			if (n === 70) return "Token Plant"
			if (n === 71) return "Token Pyro"
			if (n === 72) return "Token Reptile"
			if (n === 73) return "Token Rock"
			if (n === 74) return "Token Thunder"
			if (n === 75) return "Token Warrior"
			if (n === 76) return "Token Winged Beast"
			if (n === 77) return "Token Wyrm"
			if (n === 78) return "Token Zombie"
		},
		categorySort(cards) {
			let res = []
			for (let i = 1; i <= 78; i++) {
				//	ordino anche per livelli o link rate
				res = res.concat(
					cards
						.filter((x) => x.type === this.listOrder(i))
						.sort((a, b) => {
							if (a.name < b.name) return -1
							if (a.name > b.name) return 1
							return 0
						})
						.sort((a, b) => a.atk - b.atk)
						.sort((a, b) => a.level - b.level)
						.sort((a, b) => a.linkval - b.linkval)
				)
				res = res.concat(
					cards
						.filter((x) => x.type + " " + x.race === this.listOrder(i))
						.sort((a, b) => a.level - b.level)
						.sort((a, b) => a.linkval - b.linkval)
						.sort((a, b) => {
							if (a.name < b.name) return -1
							if (a.name > b.name) return 1
							return 0
						})
						.sort((a, b) => a.atk - b.atk)
				)
			}
			return res
		},
		getPicUrl(id) {
			return `https://storage.googleapis.com/ygoprodeck.com/pics/${id}.jpg`
		},
		getPicSmallUrl(id) {
			return `https://storage.googleapis.com/ygoprodeck.com/pics_small/${id}.jpg`
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
