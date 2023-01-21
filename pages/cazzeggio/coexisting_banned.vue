<template>
	<div class="flex-col">
		<div
			v-if="allcards.length === 0"
			class="loader"
			style="
				margin-left: auto;
				margin-right: auto;
				margin-bottom: var(--space-1);
				margin-top: var(--space-1) !important;
			"
		></div>
		<div v-if="allcards.length > 0" class="flex-col" style="width: 95%">
			<grid-view
				:columns="2"
				:col-gap="4"
				:row-gap="0"
				style="width: 100%"
			>
				<div
					v-for="card of mentionBanned()"
					:key="card.id"
					class="flex-col"
					style="width: 100%"
				>
					<grid-view
						:columns="2"
						:col-gap="4"
						:row-gap="0"
						style="width: 100%"
					>
						<card-modal
							:card-id="card.id"
							:rarity="'Common'"
							:src="getPicUrl(card.id)"
						/>
						<card-modal
							:card-id="card.mention.id"
							:rarity="'Common'"
							:src="getPicUrl(card.mention.id)"
						/>
					</grid-view>
					<div
						class="flex-row"
						style="width: 100%; text-align: center"
					>
						<div style="width: 50%">
							<h4 style="margin: 0 !important; font-weight: bold; color: blue">
								First printing: {{ card.tcg_date }}
							</h4>
						</div>
						<div class="flex-col" style="width: 50%">
							<h4 style="margin: 0 !important; font-weight: bold; color: blue">
								First printing: {{ card.mention.date }}
							</h4>
							<p
								v-for="interval of bannedIntervals(
									card.mention.id
								)"
								:key="interval.start + interval.end"
								:style="{ margin: 0, fontWeight: interval.end === '' ? 'bolder' : ''}"
							>
								Banned from {{ interval.start }}
								{{
									interval.end === ""
										? ""
										: "till " + interval.end
								}}
							</p>
						</div>
					</div>
					<hr style="width: 100%; border: 1px solid black;"/>
				</div>
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
		const { data } = await $axios.get("/api/banlist_history")
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
		data.cards.sort((a, b) => (a.name > b.name ? 1 : -1))
		return {
			bannedCards: data.cards,
			banlists: data.banlists,
			allsets,
		}
	},
	data: () => ({
		bannedCards: [],
		banlists: [],
		index: 0,
		sortFilter: "PER CATEGORIA",
		thereIsNext: true,
		thereIsPrev: false,
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
		const ris = []
		this.bannedCards.forEach((card) => {
			const topush = this.allcards.find((_) => _.id === card.id)
			topush.date = card.date
			topush.banlists = card.banlists
			ris.push(topush)
		})
		this.bannedCards = this.categorySort(ris)
		this.index = this.banlists.length - 1
	},
	methods: {
		bannedIntervals(cardId) {
			const card = this.bannedCards.find((_) => _.id === cardId)
			let stillBanned = false
			const topush = {}
			const ris = []
			for (let i = 0; i < card.banlists.length; i++) {
				const status = card.banlists[i].status
				if (status === 0 && !stillBanned) {
					topush.start = card.banlists[i].banlist
					stillBanned = true
				} else if (status !== 0 && stillBanned) {
					topush.end = card.banlists[i].banlist
					stillBanned = false
					ris.push(JSON.parse(JSON.stringify(topush)))
				}
			}
			if (stillBanned) {
				topush.end = ""
				ris.push(JSON.parse(JSON.stringify(topush)))
			}
			return ris
		},
		mentionBanned() {
			const onceBanned = this.bannedCards.filter((card) => {
				return card.banlists.some((_) => _.status === 0)
			})
			let mentionBannedCards = []
			onceBanned.forEach((mention) => {
				this.allcards
					.filter(
						(_) =>
							_.desc.includes('"' + mention.name + '"') &&
							mention.name !== _.name
					)
					.forEach((tocopy) => {
						const card = JSON.parse(JSON.stringify(tocopy))
						const firstBan = mention.banlists.find(
							(_) => _.status === 0
						).banlist
						const lastBan = [...mention.banlists]
							.reverse()
							.find((_) => _.status === 0).banlist
						const firstFreed = mention.banlists.find(
							(_) => _.status !== 0 && _.banlist > lastBan
						)
						card.mention = {
							id: mention.id,
							name: mention.name,
							date: mention.date.split(" ")[0],
							firstBan,
							lastBan,
							firstFreed:
								firstFreed === undefined
									? "2200-11-11"
									: firstFreed.banlist,
						}
						card.tcg_date = "2200-11-11"
						if (card.card_sets === undefined) return
						card.card_sets.forEach((set) => {
							const tcg_date = this.allsets.find(
								(_) => _.set_name === set.set_name
							)?.tcg_date
							if (
								tcg_date !== undefined &&
								card.tcg_date > tcg_date
							)
								card.tcg_date = tcg_date
						})
						mentionBannedCards.push(card)
					})
			})
			mentionBannedCards = mentionBannedCards
				.filter((_) => _.tcg_date < this.fixDate(_.mention.firstFreed))
				// .filter((_) => _.tcg_date < _.mention.firstFreed)
				.sort((a, b) => a.id - b.id)
				.sort((a, b) => a.mention.id - b.mention.id)
				.sort((a, b) => (a.mention.date > b.mention.date ? 1 : -1))
			console.log(mentionBannedCards)
			return mentionBannedCards
		},
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
