<template>
	<div v-if="femaleCardsList.length > 0" class="flex-col">
		<h1 style="margin: 0">{{ femaleCardsList.length }} total monsters</h1>
		<div
			v-for="year of Array(2022 - 2015)
				.fill(2016)
				.map((v, i) => v + i)"
			:key="year"
			class="flex-col"
		>
			<h2>
				{{ year }} ({{
					femaleCardsList.filter(
						(_) => +_.tcg_date.split("-")[0] === year
					).length
				}}
				monsters)
			</h2>
			<grid-view
				:columns="8"
				:col-gap="0"
				:row-gap="0"
				style="width: 100%"
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
		<div class="flex-col">
			<h2>
				Not released yet ({{
					femaleCardsList.filter(
						(_) => +_.tcg_date.split("-")[0] === 2200
					).length
				}}
				monsters)
			</h2>
			<grid-view
				:columns="8"
				:col-gap="0"
				:row-gap="0"
				style="width: 100%"
			>
				<card-modal
					v-for="card of femaleCardsList.filter(
						(_) => +_.tcg_date.split('-')[0] === 2200
					)"
					:key="card.id"
					:card-id="card.id"
					:rarity="'Common'"
					:src="getPicUrl(card.id)"
				/>
			</grid-view>
		</div>
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
		const { data } = await $axios.get("/api/female_cards")
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
		return {
			femaleCardsHash: data.data,
			allsets,
		}
	},
	data: () => ({
		femaleCardsHash: {},
		femaleCardsList: [],
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
		this.allcards = await this.getAllCards()
		this.femaleCardsList = this.allcards.filter(
			(card) =>
				this.femaleCardsHash[card.name] !== undefined &&
				card.type.toLowerCase().includes("monster")
		)

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

		this.femaleCardsList = this.categorySort(this.femaleCardsList).sort(
			(a, b) => (a.name >= b.name ? 1 : -1)
		)
		// .sort((a, b) => (a.tcg_date >= b.tcg_date ? 1 : -1))
	},
	methods: {
		fixDate(date) {
			const aY = date.split(" ")[0].split("-")[0]
			const aM = +date.split(" ")[0].split("-")[1]
			return `${aY}-${aM < 10 ? "0" + aM : aM}`
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
