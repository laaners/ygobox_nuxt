<template>
	<div v-if="femaleCardsList.length > 0" class="flex-col">
		<h3>{{ femaleCardsList.length }} risultati trovati</h3>
		<grid-view
			:columns="6"
			:col-gap="2"
			:row-gap="0.5"
			style="width: 95%; margin-bottom: 50%"
		>
			<div
				v-for="card of femaleCardsList"
				:key="card.id"
				class="flex-col"
				style="justify-content: flex-start"
			>
				<card-modal
					:card-id="card.id"
					:rarity="'Common'"
					:src="getPicUrl(card.id)"
				/>
				<p style="margin: 2%">Member of:</p>
				<h5
					v-for="arc of card.cardArcs"
					:key="arc"
					style="margin: 1%; color: blue"
				>
					{{ arc }}
				</h5>
			</div>
		</grid-view>
		<!--
		<div
			v-for="year of Array(2023 - 2000)
				.fill(2001)
				.map((v, i) => v + i)"
			:key="year"
		>
			<grid-view
				:columns="10"
				:col-gap="0"
				:row-gap="0"
				style="width: 95%"
			>
				<card-modal
					v-for="card of femaleCardsList.filter(
						(_) => +_.tcg_date.split('-')[0] === year
					)"
					:key="card.id"
					:card-id="card.id"
					:rarity="'Common'"
					:src="getPicUrl(card.id)"
				/>
			</grid-view>
		</div>
		-->
	</div>
</template>

<script>
import CardModal from "../../components/CardModal.vue"
import GridView from "../../components/GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	components: { GridView, CardModal },
	mixins: [Utils],
	layout: "empty",
	async asyncData({ $axios }) {
		const allsets = await $axios.$get("/api/allsets")
		// Sort by release data
		/*
		data.cards.sort((a, b) => {
			const aY = +a.date.split(" ")[0].split("-")[0]
			const aM = +a.date.split(" ")[0].split("-")[1]
			const aD = +a.date.split(" ")[0].split("-")[2]
			const bY = +b.date.split(" ")[0].split("-")[0]
			const bM = +b.date.split(" ")[0].split("-")[1]
			const bD = +b.date.split(" ")[0].split("-")[2]
			return aY * 10000 + aM * 100 + aD - (bY * 10000 + bM * 100 + bD)
		})
		*/
		// Sort by name
		const { data } = await $axios.get("/api/archetypes")
		const allArchetypes = data
		/*
		for (const arc of allArchetypes) {
			const { members } = await $axios.$get(
				"/api/archetypes/" + arc.archetype
			)
			arc.members = members
			arc.members.forEach((card) => {
				card.tcg_date = "2200-11-11_-_"
				if (card.card_sets === undefined) {
					card.tcg_date = "Not yet released_-_"
					return
				}
				card.card_sets.forEach((set) => {
					const tcg_date = allsets.find(
						(_) => _.set_name === set.set_name
					)?.tcg_date
					// if(tcg_date === undefined) console.log(card+"\n"+set.set_name)
					if (tcg_date !== undefined && card.tcg_date > tcg_date)
						card.tcg_date = tcg_date + "_-_" + set.set_name
				})
			})
		}
		*/
		return {
			femaleCardsHash: data.data,
			allsets,
			allArchetypes,
		}
	},
	data: () => ({
		femaleCardsHash: {},
		femaleCardsList: [],
		allcards: [],
		allsets: [],
		allArchetypes: [],
		cheff: [],
	}),
	head() {
		return {
			title: "Home Page",
			meta: [
				{
					hid: "Home Page",
					name: "Home Page",
					content: `Home Page`,
				},
			],
		}
	},
	watch: {
		sortFilter(newV, olV) {
			switch (newV) {
				case "PER CATEGORIA": {
					this.bannedCards = this.categorySort(this.bannedCards)
					break
				}
				default:
					this.bannedCards.sort((a, b) => (a.name > b.name ? 1 : -1))
			}
		},
		banlists(newPossibleCard, oldPossibleCard) {
			this.index = 0
			this.thereIsNext = this.index + 1 < newPossibleCard.length
			this.thereIsPrev = this.index > 0
		},
		index(newIndex, oldIndex) {
			this.thereIsNext = newIndex + 1 < this.banlists.length
			this.thereIsPrev = newIndex > 0
		},
	},
	async mounted() {
		this.allcards = await this.getAllCardsLocal()
		const grouped = this.groupBy(
			this.allcards.filter((_) => _.archetype !== undefined),
			"archetype",
			"members"
		)
		grouped.forEach((_) => {
			this.allArchetypes.push(this.createArchetype(_.archetype))
		})
		this.allArchetypes = this.allArchetypes.filter(
			(_) =>
				_.archetype !== "Man-Eater Bug" &&
				_.archetype !== "-Eyes Dragon" &&
				_.archetype !== "Spiritual Art" &&
				_.archetype !== "From the Underworld" &&
				_.archetype !== "Trap Monster" &&
				_.archetype !== "Albaz Dragon" &&
				_.archetype !== "Bugroth" &&
				_.archetype !== "Jester" &&
				_.archetype !== "Starliege" &&
				_.archetype !== "Boot-Up" &&
				_.archetype !== "Doriado" &&
				_.archetype !== "Grepher" &&
				_.archetype !== "Maju" &&
				_.archetype !== "Madoor" &&
				_.archetype !== "Hellfire" &&
				_.archetype !== "Glacial Beast" &&
				_.archetype !== "Gorgonic" &&
				_.archetype !== "Yubel" &&
				_.archetype !== "Cupid" &&
				_.archetype !== "Sky Scourge" &&
				_.archetype !== "Wicked God" &&
				_.archetype !== "Umi" &&
				_.archetype !== "Fleur" &&
				_.archetype !== "Spider" &&
				_.archetype !== "Shark" &&
				_.archetype !== "The Sanctuary in the Sky" &&
				_.archetype !== "Exchange of the Spirit" &&
				_.archetype !== "Guardragon" &&
				_.archetype !== "D.D." &&
				_.archetype !== "White" &&
				_.archetype !== "Knight" &&
				_.archetype !== "Fairy" &&
				_.archetype !== "Alligator" &&
				_.archetype !== "Vassal" &&
				_.archetype !== "Greed" &&
				_.archetype !== "Dice" &&
				_.archetype !== "Cybernetic" &&
				_.archetype !== "Contact" &&
				_.archetype !== "Jar" &&
				_.archetype !== "Priestess" &&
				_.archetype !== "Butterfly" &&
				_.archetype !== "Doll" &&
				_.archetype !== "Mask" &&
				_.archetype !== "Slime" &&
				_.archetype !== "Parasite" &&
				_.archetype !== "Star" &&
				_.archetype !== "Puppet" &&
				_.archetype !== "Anti" &&
				_.archetype !== "Train" &&
				_.archetype !== "Cataclysmic"
		)

		// Array.from(document.querySelectorAll("a")).map(_=>_.href.replace("https://yugipedia.com/wiki/",""))
		this.allArchetypes.push(this.createArchetype("Aquarium"))
		this.allArchetypes.push(this.createArchetype("Fusion Dragon"))
		this.allArchetypes.push(this.createArchetype("Artorigus"))
		this.allArchetypes.push(this.createArchetype("Beast's Battle"))
		this.allArchetypes.push(this.createArchetype("Cipher Dragon"))
		// this.allArchetypes.push(this.createArchetype("Cyberdark (Spell/Trap archetype)"))
		this.allArchetypes.push(this.createArchetype("Dante"))
		this.allArchetypes.push(this.createArchetype("Dark Magician Girl"))
		this.allArchetypes.push(this.createArchetype("Doll Monster"))
		this.allArchetypes.push(this.createArchetype("Elder Entity"))
		this.allArchetypes.push(this.createArchetype("Evolution Pill"))
		this.allArchetypes.push(this.createArchetype("Fire King Avatar"))
		this.allArchetypes.push(
			this.createArchetype("Galaxy-Eyes Tachyon Dragon")
		)
		this.allArchetypes.push(this.createArchetype("Gem-Knight"))
		this.allArchetypes.push(this.createArchetype("Geargiano"))
		this.allArchetypes.push(this.createArchetype("Goblin"))
		this.allArchetypes.push(this.createArchetype("Gold Pride"))
		this.allArchetypes.push(this.createArchetype("Gottoms"))
		this.allArchetypes.push(this.createArchetype("GranSolfachord"))
		this.allArchetypes.push(this.createArchetype("Inmato"))
		this.allArchetypes.push(this.createArchetype("Laundsallyn"))
		this.allArchetypes.push(this.createArchetype("Legendary Dragon"))
		this.allArchetypes.push(this.createArchetype("Machine Angel"))
		this.allArchetypes.push(this.createArchetype("Magna Warrior"))
		this.allArchetypes.push(this.createArchetype("Meklord Astro"))
		this.allArchetypes.push(this.createArchetype("Melodious Maestra"))
		// this.allArchetypes.push(this.createArchetype("Monarch (Spell/Trap archetype)"))
		this.allArchetypes.push(this.createArchetype("Nitro"))
		this.allArchetypes.push(this.createArchetype("Nordic Ascendant"))
		this.allArchetypes.push(this.createArchetype("Number 10X"))
		this.allArchetypes.push(this.createArchetype("Number C"))
		this.allArchetypes.push(this.createArchetype("Number C10X"))
		this.allArchetypes.push(this.createArchetype("Number C39"))
		this.allArchetypes.push(this.createArchetype("Numeron Gate"))
		this.allArchetypes.push(this.createArchetype("Old Entity"))
		this.allArchetypes.push(this.createArchetype("Outer Entity"))
		this.allArchetypes.push(this.createArchetype("Palladium"))
		this.allArchetypes.push(this.createArchetype("Pendulumgraph"))
		this.allArchetypes.push(this.createArchetype("PSY-Framegear"))
		this.allArchetypes.push(this.createArchetype("Rank-Down-Magic"))
		this.allArchetypes.push(this.createArchetype("Reactor"))
		this.allArchetypes.push(this.createArchetype("Rebellion"))
		this.allArchetypes.push(this.createArchetype("Red Dragon Archfiend"))
		this.allArchetypes.push(this.createArchetype("Relinquished"))
		this.allArchetypes.push(this.createArchetype("Ritual Beast Tamer"))
		this.allArchetypes.push(this.createArchetype("Ritual Beast Ulti"))
		this.allArchetypes.push(this.createArchetype("Saber"))
		this.allArchetypes.push(this.createArchetype("Shien"))
		this.allArchetypes.push(this.createArchetype("Shiranui Spectralsword"))
		this.allArchetypes.push(this.createArchetype("Sky Striker Ace"))
		this.allArchetypes.push(this.createArchetype("Skyblaster"))
		this.allArchetypes.push(this.createArchetype("Skyscraper"))
		this.allArchetypes.push(this.createArchetype("Smile"))
		this.allArchetypes.push(this.createArchetype("Sprout"))
		this.allArchetypes.push(this.createArchetype("SPYRAL GEAR"))
		this.allArchetypes.push(this.createArchetype("SPYRAL MISSION"))
		this.allArchetypes.push(this.createArchetype("Starving Venom"))
		this.allArchetypes.push(this.createArchetype("Subterror Behemoth"))
		this.allArchetypes.push(
			this.createArchetype("Super Quantal Mech Beast")
		)
		this.allArchetypes.push(this.createArchetype("Super Quantum"))
		this.allArchetypes.push(this.createArchetype("Superheavy Samurai Soul"))
		this.allArchetypes.push(this.createArchetype("Supreme King Dragon"))
		this.allArchetypes.push(this.createArchetype("Supreme King Gate"))
		this.allArchetypes.push(this.createArchetype("Synchro Dragon"))
		this.allArchetypes.push(this.createArchetype("The Phantom Knights"))
		this.allArchetypes.push(this.createArchetype("Ultimate Crystal"))
		this.allArchetypes.push(this.createArchetype("Unchained Soul"))
		this.allArchetypes.push(this.createArchetype("Utopic Future"))
		this.allArchetypes.push(this.createArchetype("Vehicroid"))
		this.allArchetypes.push(this.createArchetype("Warrior"))
		this.allArchetypes.push(this.createArchetype("Welcome Labrynth"))
		this.allArchetypes.push(this.createArchetype("Winged Kuriboh"))
		this.allArchetypes.push(this.createArchetype("Wingman"))
		this.allArchetypes.push(this.createArchetype("Xyz Dragon"))
		this.allArchetypes.push(this.createArchetype("Zexal"))
		this.allArchetypes.push(this.createArchetype("ZS -"))
		this.allArchetypes.push(this.createArchetype("Zubaba"))
		this.allArchetypes.push(this.createArchetype("ZW -"))
		this.allArchetypes.push(this.createArchetype("Clear"))
		this.allArchetypes.push(
			this.createArchetype("Mystical Spirit of the Forest")
		)
		this.allArchetypes.push(this.createArchetype("Numerounius"))
		this.allArchetypes.push(this.createArchetype("Sea Stealth"))
		this.allArchetypes.push(this.createArchetype("Spiritual Earth Art"))
		this.allArchetypes.push(this.createArchetype("Spiritual Fire Art"))
		this.allArchetypes.push(this.createArchetype("Spiritual Water Art"))
		this.allArchetypes.push(this.createArchetype("Spiritual Wind Art"))
		this.allArchetypes.push(this.createArchetype("Topologic"))
		this.allArchetypes.push(this.createArchetype("Virtual World Gate"))
		this.allArchetypes.push(this.createArchetype("Ki-sikil"))
		// const hashArc = this.hashGroupBy(this.allArchetypes, "archetype")
		this.allArchetypes.sort(
			(a, b) => b.archetype.length - a.archetype.length
		)
		this.allcards.forEach((card) => {
			let stringToCheck = card.name.toLowerCase()
			const cardArcs = []
			this.allArchetypes.forEach((arc) => {
				const stringBefore = stringToCheck
				const stringAfter = stringToCheck.replace(
					arc.archetype.toLowerCase(),
					""
				)
				if (stringBefore !== stringAfter) {
					cardArcs.push(
						arc.archetype
							.replace("Warrior", "(Synchro) Warrior")
							.replace("Rebellion", "Rebellion (Xyz Monsters)")
					)
				}
				stringToCheck = stringToCheck.replace(
					arc.archetype.toLowerCase(),
					""
				)
			})
			stringToCheck = stringToCheck
				.replaceAll(" ", "")
				.replaceAll("&", "")
				.replaceAll("-", "")
				.replaceAll("\"", "")
			if (card.name === "Evil★Twins Ki-sikil & Lil-la") {
				console.log(stringToCheck)
				card.cardArcs = cardArcs
				this.femaleCardsList.push(card)
			}
			if (card.name === "Polymerization") {
				card.cardArcs = ["Fusion"]
				this.femaleCardsList.push(card)
			}
			if (
				stringToCheck.length < 2 &&
				stringToCheck !== "" &&
				cardArcs.length !== 0
			) {
				console.log("----------------------------")
				console.log(stringToCheck)
				console.log(card.name)
				console.log(JSON.stringify(cardArcs))
			}

			if (
				stringToCheck === "" &&
				card.name !== "Crystal Rose" &&
				card.name !== "Chaos Phantasm" &&
				card.name !== "D.D. Warrior" &&
				card.name !== "Alien Warrior" &&
				card.name !== "Laval Warrior" &&
				card.name !== "Wind-Up Warrior" &&
				card.name !== "Dododo Warrior" &&
				card.name !== "Rebellion" &&
				card.name !== "Clear Kuriboh" &&
				card.name !== "Darklord Rebellion" &&
				card.name !== "Crystal Clear Wing Synchro Dragon" &&
				card.name !== "Laval Warrior" &&
				card.name !== "Laval Warrior" &&
				card.name !== "Firewall" &&
				card.name !== "Flamvell Magician" &&
				card.name !== "T.G. Cyber Magician" &&
				card.name !== "Wind-Up Magician" &&
				card.name !== "Gagaga Magician" &&
				card.name !== "Gem-Knight Crystal" &&
				card.name !== "Golden Castle of Stromberg"
			) {
				card.cardArcs = cardArcs
				this.femaleCardsList.push(card)
			}
		})
		this.femaleCardsList.forEach((card) => {
			card.tcg_date = "2200-11-11"
			if (card.card_sets === undefined) return
			card.card_sets.forEach((set) => {
				const tcg_date = this.allsets.find(
					(_) => _.set_name === set.set_name
				)?.tcg_date
				// if(tcg_date === undefined) console.log(card+"\n"+set.set_name)
				if (tcg_date !== undefined && card.tcg_date > tcg_date)
					card.tcg_date = tcg_date
			})
		})
		this.femaleCardsList.sort((a, b) => (a.tcg_date > b.tcg_date ? 1 : -1))

		return
		// eslint-disable-next-line no-unreachable
		const types = [
			"Aqua",
			"Beast",
			"Winged Beast",
			"Cyberse",
			"Fiend",
			"Dinosaur",
			"Dragon",
			"Fairy",
			"Warrior",
			"Beast-Warrior",
			"Spellcaster",
			"Insect",
			"Machine",
			"Fish",
			"Plant",
			"Psychic",
			"Pyro",
			"Reptile",
			"Rock",
			"Sea Serpent",
			"Thunder",
			"Wyrm",
			"Zombie",
		]
		this.femaleCardsList = this.allcards.filter((card) => {
			if (
				card.type.includes("Monster") &&
				!card.name.toLowerCase().includes("dragon")
			) {
				if (
					types.some(
						(type) =>
							card.name
								.toLowerCase()
								.includes(type.toLowerCase()) &&
							card.race !== type
					)
				)
					return true
			}
			return false
		})
		// eslint-disable-next-line no-unreachable
		this.femaleCardsList.forEach((card) => {
			card.tcg_date = "2200-11-11"
			if (card.card_sets === undefined) return
			card.card_sets.forEach((set) => {
				const tcg_date = this.allsets.find(
					(_) => _.set_name === set.set_name
				)?.tcg_date
				// if(tcg_date === undefined) console.log(card+"\n"+set.set_name)
				if (tcg_date !== undefined && card.tcg_date > tcg_date)
					card.tcg_date = tcg_date
			})
		})
		// eslint-disable-next-line no-unreachable
		this.femaleCardsList = this.categorySort(this.femaleCardsList)
			.sort((a, b) => (a.name >= b.name ? 1 : -1))
			.sort((a, b) => (a.tcg_date >= b.tcg_date ? 1 : -1))
	},
	methods: {
		fixDate(date) {
			const aY = date.split(" ")[0].split("-")[0]
			const aM = +date.split(" ")[0].split("-")[1]
			return `${aY}-${aM < 10 ? "0" + aM : aM}`
		},
		createArchetype(archetype) {
			return { archetype }
			// eslint-disable-next-line no-unreachable
			let members = this.allcards.filter(
				(_) =>
					(_.desc.includes('"' + archetype + '"') ||
						_.name
							.toLowerCase()
							.includes(archetype.toLowerCase())) &&
					!_.desc.includes(
						`This card is not treated as a "${archetype}"`
					) &&
					!_.desc.includes(
						`This card is not treated as an "${archetype}"`
					) &&
					!_.type.includes("Skill") &&
					!_.type.includes("Token")
			)
			if (archetype === "Beast's Battle")
				members.push(
					this.allcards.find((_) => _.name.includes("Spartacus"))
				)
			if (archetype === "Gold Pride")
				members.push(
					this.allcards.find((_) => _.name.includes("White Aura"))
				)
			if (archetype === "Nitro") {
				members = this.allcards.filter(
					(_) =>
						(_.desc.includes('"' + archetype + '"') ||
							_.name
								.toLowerCase()
								.includes(archetype.toLowerCase() + " ")) &&
						!_.desc.includes(
							`This card is not treated as a "${archetype}"`
						) &&
						!_.desc.includes(
							`This card is not treated as an "${archetype}"`
						) &&
						!_.type.includes("Skill") &&
						!_.type.includes("Token")
				)
			}
			const obj = {
				archetype,
				members,
				true_name: archetype,
				date: "NONE",
				imgs: {
					Poster: "https://images.ygoprodeck.com/images/cards_cropped/37495766.jpg",
				},
				attributes: ["FIRE", "SPELL", "TRAP"],
				types: ["Warrior", "Machine"],
				crest: "/crests/Rescue-ACE.png",
				focus: {
					"No Extra": 7,
					Ritual: 0,
					Fusion: 0,
					Synchro: 0,
					Xyz: 0,
					Pendulum: 0,
					Link: 0,
				},
				waifu: false,
			}
			return obj
		},
	},
}
</script>

<style scoped>
.flex-col > * {
	margin-top: var(--space-0);
	margin-bottom: var(--space-0);
}

.banner > * {
	margin: 0;
}
</style>
