export default {
	methods: {
		groupBy(obj, key, listName) {
			const ris = []
			if (obj[0][key] === undefined) return ris
			obj.forEach((elem) => {
				const risElem = ris.find((_) => _[key] === elem[key])
				if (risElem === undefined) {
					const toPush = {}
					toPush[key] = elem[key]
					toPush[listName] = [elem]
					ris.push(toPush)
				} else risElem[listName].push(elem)
			})
			return ris
		},
		hashGroupBy(obj, key) {
			const ris = {}
			if (obj[0][key] === undefined) return ris
			obj.forEach((elem) => {
				const risElem = ris[elem[key]]
				if (risElem === undefined) {
					const toPush = [elem]
					ris[elem[key]] = toPush
				} else risElem.push(elem)
			})
			return ris
		},
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
			if (n === 16) return "Pendulum Effect Ritual Monster"
			if (n === 17) return "Fusion Monster"
			if (n === 18) return "Pendulum Effect Fusion Monster"
			if (n === 19) return "Synchro Monster"
			if (n === 20) return "Synchro Tuner Monster"
			if (n === 21) return "Synchro Pendulum Effect Monster"
			if (n === 22) return "XYZ Monster"
			if (n === 23) return "XYZ Pendulum Effect Monster"
			if (n === 24) return "Link Monster"
			if (n === 25) return "Spell Card Normal"
			if (n === 26) return "Spell Card Ritual"
			if (n === 27) return "Spell Card Quick-Play"
			if (n === 28) return "Spell Card Continuous"
			if (n === 29) return "Spell Card Equip"
			if (n === 30) return "Spell Card Field"
			if (n === 31) return "Trap Card Normal"
			if (n === 35) return "Trap Card Continuous"
			if (n === 33) return "Trap Card Counter"
			if (n === 34) return "Skill Card Andrew"
			if (n === 35) return "Skill Card Arkana"
			if (n === 36) return "Skill Card Bonz"
			if (n === 37) return "Skill Card Christine"
			if (n === 38) return "Skill Card David"
			if (n === 39) return "Skill Card Emma"
			if (n === 40) return "Skill Card Espa Roba"
			if (n === 41) return "Skill Card Ishizu"
			if (n === 42) return "Skill Card Ishizu Ishtar"
			if (n === 43) return "Skill Card Joey"
			if (n === 44) return "Skill Card Joey Wheeler"
			if (n === 45) return "Skill Card Kaiba"
			if (n === 46) return "Skill Card Keith"
			if (n === 47) return "Skill Card Lumis Umbra"
			if (n === 48) return "Skill Card Mai"
			if (n === 49) return "Skill Card Mai Valentine"
			if (n === 50) return "Skill Card Mako"
			if (n === 51) return "Skill Card Odion"
			if (n === 52) return "Skill Card Pegasus"
			if (n === 53) return "Skill Card Rex"
			if (n === 54) return "Skill Card Seto Kaiba"
			if (n === 55) return "Skill Card Tea Gardner"
			if (n === 56) return "Skill Card Weevil"
			if (n === 57) return "Skill Card Yami Bakura"
			if (n === 58) return "Skill Card Yami Marik"
			if (n === 59) return "Skill Card Yami Yugi"
			if (n === 60) return "Skill Card Yugi"
			if (n === 61) return "Token Aqua"
			if (n === 62) return "Token Beast"
			if (n === 63) return "Token Cyberse"
			if (n === 64) return "Token Dinosaur"
			if (n === 65) return "Token Dragon"
			if (n === 66) return "Token Fairy"
			if (n === 67) return "Token Fiend"
			if (n === 68) return "Token Fish"
			if (n === 69) return "Token Insect"
			if (n === 70) return "Token Machine"
			if (n === 71) return "Token Plant"
			if (n === 72) return "Token Pyro"
			if (n === 73) return "Token Reptile"
			if (n === 74) return "Token Rock"
			if (n === 75) return "Token Thunder"
			if (n === 76) return "Token Warrior"
			if (n === 77) return "Token Winged Beast"
			if (n === 78) return "Token Wyrm"
			if (n === 79) return "Token Zombie"
		},
		categorySort(cards) {
			let res = []
			for (let i = 1; i <= 79; i++) {
				//	ordino anche per livelli o link rate
				res = res.concat(
					cards
						.filter((x) => x.type === this.listOrder(i))
						.sort((a, b) => (a.name < b.name ? -1 : 1))
						.sort((a, b) => (a.race < b.race ? -1 : 1))
						.sort((a, b) => a.level - b.level)
						.sort((a, b) => a.linkval - b.linkval)
				)
				res = res.concat(
					cards
						.filter(
							(x) => x.type + " " + x.race === this.listOrder(i)
						)
						.sort((a, b) => (a.name < b.name ? -1 : 1))
						.sort((a, b) => (a.race < b.race ? -1 : 1))
						.sort((a, b) => a.level - b.level)
						.sort((a, b) => a.linkval - b.linkval)
				)
			}
			console.log(
				cards.filter((_) => !res.includes(_)).map((_) => _.type)
			)
			return res
		},
		getPicUrl(id) {
			return `https://storage.googleapis.com/ygoprodeck.com/pics/${id}.jpg`
		},
		getPicSmallUrl(id) {
			return `https://storage.googleapis.com/ygoprodeck.com/pics_small/${id}.jpg`
		},
		getPicArtUrl(id) {
			return `https://storage.googleapis.com/ygoprodeck.com/pics_artgame/${id}.jpg`
		},
		download(filename, text) {
			const element = document.createElement('a');
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
			element.setAttribute('download', filename);
		
			element.style.display = 'none';
			document.body.appendChild(element);
		
			element.click();
		
			document.body.removeChild(element);
		},
		async getAllCards() {
			const [seg1, seg2, seg3, seg4, seg5, seg6, seg7, seg8] =
				await Promise.all([
					this.$axios.$get("api/allcards?n=0"),
					this.$axios.$get("api/allcards?n=1"),
					this.$axios.$get("api/allcards?n=2"),
					this.$axios.$get("api/allcards?n=3"),
					this.$axios.$get("api/allcards?n=4"),
					this.$axios.$get("api/allcards?n=5"),
					this.$axios.$get("api/allcards?n=6"),
					this.$axios.$get("api/allcards?n=7"),
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
			return allcards
		},
	},
}
