<template>
	<div v-if="allArchetypes.length > 0" class="flex-col">
		<div
			v-for="arc of allArchetypes"
			:key="arc.archetype"
			class="flex-col"
			style="padding: 0; margin-bottom: 0"
		>
			<h3 style="padding: 0; margin: 0">
				{{ arc.archetype.replace(" & Doodlebook", "") }} ({{
					arc.members.length
				}})
			</h3>
			<div class="flex-col" style="padding: 0; margin: 0">
				<grid-view
					:columns="arc.members.length"
					:col-gap="0"
					:row-gap="0"
					style="width: 95%"
				>
					<div
						v-for="card of actualMembers(arc)"
						:key="card.id"
						style="
							width: 240px;
							margin: 0;
							padding: 25px;
							padding-bottom: 0;
							padding-top: 0;
							text-align: center;
							color: blue;
						"
					>
						<h4>Archetype Member</h4>
						<card-modal
							:card-id="card.id"
							:rarity="'Common'"
							:src="getPicUrl(card.id)"
						/>
						<h5 style="margin: 0 !important; margin-top: 3%">
							{{ card.tcg_date.split("_-_")[0] }}
						</h5>
						<h5 style="margin: 0 !important; text-align: center">
							{{ card.tcg_date.split("_-_")[1] }}
						</h5>
					</div>
					<div
						v-for="card of supportMembers(arc)"
						:key="card.id"
						style="
							width: 240px;
							padding: 25px;
							padding-bottom: 0;
							padding-top: 0;
							text-align: center;
						"
					>
						<h4>Support Card</h4>
						<card-modal
							:card-id="card.id"
							:rarity="'Common'"
							:src="getPicUrl(card.id)"
						/>
						<h5 style="margin: 0 !important; margin-top: 3%">
							{{ card.tcg_date.split("_-_")[0] }}
						</h5>
						<h5 style="margin: 0 !important; text-align: center">
							{{ card.tcg_date.split("_-_")[1] }}
						</h5>
					</div>
				</grid-view>
			</div>
			<hr style="width: 100%; height: 1px; background-color: black" />
		</div>
	</div>
</template>

<script>
import CardModal from "../../components/CardModal.vue"
import GridView from "../../components/GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	// eslint-disable-next-line vue/no-unused-components
	components: { GridView, CardModal },
	mixins: [Utils],
	layout: "empty",
	async asyncData({ $axios }) {
		// must turn off blacklist
		const { data } = await $axios.get("/api/archetypes")
		const allsets = await $axios.$get("/api/allsets")
		const allArchetypes = data.filter(
			(_) =>
				_.members <= 5 &&
				_.members > 1 &&
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
				_.archetype !== "Cataclysmic"
		)
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
		return {
			allArchetypes,
			allsets,
		}
	},
	data: () => ({
		allArchetypes: [],
		allcards: [],
		allsets: [],
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
	async mounted() {
		this.allcards = await this.getAllCards()
		this.allcards.forEach((card) => {
			card.tcg_date = "2200-11-11_-_"
			if (card.card_sets === undefined) {
				card.tcg_date = "Not yet released_-_"
				return
			}
			card.card_sets.forEach((set) => {
				const tcg_date = this.allsets.find(
					(_) => _.set_name === set.set_name
				)?.tcg_date
				// if(tcg_date === undefined) console.log(card+"\n"+set.set_name)
				if (tcg_date !== undefined && card.tcg_date > tcg_date)
					card.tcg_date = tcg_date + "_-_" + set.set_name
			})
		})
		this.allArchetypes.push(this.createArchetype("Aquarium"))
		this.allArchetypes.push(this.createArchetype("Artorigus"))
		this.allArchetypes.push(this.createArchetype("Beast's Battle"))
		this.allArchetypes.push(this.createArchetype("Cipher Dragon"))
		// this.allArchetypes.push(this.createArchetype("Cyberdark (Spell/Trap archetype)"))
		// this.allArchetypes.push(this.createArchetype("Cybernetic"))
		this.allArchetypes.push(this.createArchetype("Dante"))
		// this.allArchetypes.push(this.createArchetype("Dark Magician Girl"))
		this.allArchetypes.push(this.createArchetype("Doll Monster"))
		this.allArchetypes.push(this.createArchetype("Elder Entity"))
		this.allArchetypes.push(this.createArchetype("Evolution Pill"))
		this.allArchetypes.push(this.createArchetype("Fire King Avatar"))
		this.allArchetypes.push(
			this.createArchetype("Galaxy-Eyes Tachyon Dragon")
		)
		this.allArchetypes.push(this.createArchetype("Geargiano"))
		// this.allArchetypes.push(this.createArchetype("Goblin"))
		this.allArchetypes.push(this.createArchetype("Gold Pride"))
		this.allArchetypes.push(this.createArchetype("Gottoms"))
		this.allArchetypes.push(this.createArchetype("GranSolfachord"))
		this.allArchetypes.push(this.createArchetype("Inmato"))
		this.allArchetypes.push(this.createArchetype("Laundsallyn"))
		// this.allArchetypes.push(this.createArchetype("Legendary Dragon"))
		// this.allArchetypes.push(this.createArchetype("Machine Angel"))
		this.allArchetypes.push(this.createArchetype("Magna Warrior"))
		this.allArchetypes.push(this.createArchetype("Meklord Astro"))
		this.allArchetypes.push(this.createArchetype("Melodious Maestra"))
		// this.allArchetypes.push(this.createArchetype("Monarch (Spell/Trap archetype)"))
		this.allArchetypes.push(this.createArchetype("Nitro"))
		this.allArchetypes.push(this.createArchetype("Nordic Ascendant"))
		// this.allArchetypes.push(this.createArchetype("Number 10X"))
		// this.allArchetypes.push(this.createArchetype("Number C"))
		// this.allArchetypes.push(this.createArchetype("Number C10X"))
		// this.allArchetypes.push(this.createArchetype("Number C39"))
		// this.allArchetypes.push(this.createArchetype("Numeron Gate"))
		this.allArchetypes.push(this.createArchetype("Old Entity"))
		this.allArchetypes.push(this.createArchetype("Outer Entity"))
		this.allArchetypes.push(this.createArchetype("Palladium"))
		this.allArchetypes.push(this.createArchetype("Pendulumgraph"))
		// this.allArchetypes.push(this.createArchetype("PSY-Framegear"))
		this.allArchetypes.push(this.createArchetype("Rank-Down-Magic"))
		// this.allArchetypes.push(this.createArchetype("Reactor"))
		// this.allArchetypes.push(this.createArchetype("Rebellion"))
		// this.allArchetypes.push(this.createArchetype("Red Dragon Archfiend"))
		// this.allArchetypes.push(this.createArchetype("Relinquished"))
		// this.allArchetypes.push(this.createArchetype("Ritual Beast Tamer"))
		this.allArchetypes.push(this.createArchetype("Ritual Beast Ulti"))
		// this.allArchetypes.push(this.createArchetype("Saber"))
		// this.allArchetypes.push(this.createArchetype("Shien"))
		this.allArchetypes.push(this.createArchetype("Shiranui Spectralsword"))
		// this.allArchetypes.push(this.createArchetype("Sky Striker Ace"))
		this.allArchetypes.push(this.createArchetype("Skyblaster"))
		this.allArchetypes.push(this.createArchetype("Skyscraper"))
		this.allArchetypes.push(this.createArchetype("Smile"))
		this.allArchetypes.push(this.createArchetype("Sprout"))
		// this.allArchetypes.push(this.createArchetype("SPYRAL GEAR"))
		this.allArchetypes.push(this.createArchetype("SPYRAL MISSION"))
		this.allArchetypes.push(this.createArchetype("Starving Venom"))
		// this.allArchetypes.push(this.createArchetype("Subterror Behemoth"))
		// this.allArchetypes.push(this.createArchetype("Super Quantal Mech Beast"))
		// this.allArchetypes.push(this.createArchetype("Super Quantum"))
		// this.allArchetypes.push(this.createArchetype("Superheavy Samurai Soul"))
		// this.allArchetypes.push(this.createArchetype("Supreme King Dragon"))
		// this.allArchetypes.push(this.createArchetype("Supreme King Gate"))
		// this.allArchetypes.push(this.createArchetype("Synchro Dragon"))
		// this.allArchetypes.push(this.createArchetype("The Phantom Knights"))
		// this.allArchetypes.push(this.createArchetype("Ultimate Crystal"))
		// this.allArchetypes.push(this.createArchetype("Unchained Soul"))
		this.allArchetypes.push(this.createArchetype("Utopic Future"))
		this.allArchetypes.push(this.createArchetype("Vehicroid"))
		// this.allArchetypes.push(this.createArchetype("Warrior"))
		this.allArchetypes.push(this.createArchetype("Welcome Labrynth"))
		// this.allArchetypes.push(this.createArchetype("Winged Kuriboh"))
		this.allArchetypes.push(this.createArchetype("Wingman"))
		// this.allArchetypes.push(this.createArchetype("Xyz Dragon"))
		// this.allArchetypes.push(this.createArchetype("Zexal"))
		// this.allArchetypes.push(this.createArchetype("ZS -"))
		// this.allArchetypes.push(this.createArchetype("Zubaba"))
		// this.allArchetypes.push(this.createArchetype("ZW -"))
		// this.allArchetypes.push(this.createArchetype("Clear"))
		this.allArchetypes.push(
			this.createArchetype("Mystical Spirit of the Forest")
		)
		this.allArchetypes.push(this.createArchetype("Numerounius"))
		this.allArchetypes.push(this.createArchetype("Sea Stealth"))
		this.allArchetypes.push(this.createArchetype("Spiritual Earth Art"))
		this.allArchetypes.push(this.createArchetype("Spiritual Fire Art"))
		this.allArchetypes.push(this.createArchetype("Spiritual Water Art"))
		this.allArchetypes.push(this.createArchetype("Spiritual Wind Art"))
		// this.allArchetypes.push(this.createArchetype("Topologic"))
		this.allArchetypes.push(this.createArchetype("Virtual World Gate"))
		this.allArchetypes = this.allArchetypes.filter(
			(_) => _.members.length <= 5 && _.members.length > 1
		)
		this.allArchetypes
			.sort((a, b) => (a.archetype >= b.archetype ? 1 : -1))
			.sort((a, b) => a.members.length - b.members.length)
		for (const arc of this.allArchetypes) {
			arc.members = this.categorySort(arc.members)
			arc.members = arc.members.sort((a, b) =>
				a.tcg_date >= b.tcg_date ? 1 : -1
			)
		}

		const i = 14
		this.allArchetypes = this.allArchetypes.slice(5 * i, 5 * i + 5)
		console.log(this.allArchetypes.length)
	},
	methods: {
		actualMembers(data) {
			let toInclude
			if (data.archetype === "Phantasm") toInclude = "Phantasm"
			else if (data.archetype === "Seventh") toInclude = "Seventh"
			else toInclude = data.true_name
			return data.members.filter((_) => {
				const alwaysTreated =
					_.desc
						.toLowerCase()
						.includes(
							`this card is always treated as a "${toInclude.toLowerCase()}"`
						) ||
					_.desc
						.toLowerCase()
						.includes(
							`this card is always treated as an "${toInclude.toLowerCase()}"`
						)
				return (
					_.name.toLowerCase().includes(toInclude.toLowerCase()) ||
					alwaysTreated
				)
			})
		},
		supportMembers(data) {
			let toInclude
			if (data.archetype === "Phantasm") toInclude = "Phantasm"
			else if (data.archetype === "Seventh") toInclude = "Seventh"
			else toInclude = data.true_name
			return data.members.filter((_) => {
				const alwaysTreated =
					_.desc
						.toLowerCase()
						.includes(
							`this card is always treated as a "${toInclude.toLowerCase()}"`
						) ||
					_.desc
						.toLowerCase()
						.includes(
							`this card is always treated as an "${toInclude.toLowerCase()}"`
						)
				return (
					!_.name.toLowerCase().includes(toInclude.toLowerCase()) &&
					!alwaysTreated
				)
			})
		},
		fixDate(date) {
			const aY = date.split(" ")[0].split("-")[0]
			const aM = +date.split(" ")[0].split("-")[1]
			return `${aY}-${aM < 10 ? "0" + aM : aM}`
		},
		createArchetype(archetype) {
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
								.includes(archetype.toLowerCase()+" ")) &&
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
.banner > * {
	margin: 0;
}
</style>
