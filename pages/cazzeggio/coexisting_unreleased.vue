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
							<h4
								style="
									margin: 0 !important;
									font-weight: bold;
									color: blue;
								"
							>
								First printing:
								{{ card.tcg_date.split(" ")[0] }}
							</h4>
							<p style="margin: 0 !important">
								{{
									card.tcg_date.replace(
										card.tcg_date.split(" ")[0],
										""
									)
								}}
							</p>
						</div>
						<div class="flex-col" style="width: 50%">
							<h4
								style="
									margin: 0 !important;
									font-weight: bold;
									color: blue;
								"
							>
								First printing:
								{{ card.mention.date.split(" ")[0] }}
							</h4>
							<p style="margin: 0 !important">
								{{
									card.mention.date.replace(
										card.mention.date.split(" ")[0],
										""
									)
								}}
							</p>
						</div>
					</div>
					<hr style="width: 100%; border: 1px solid black" />
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
		const allsets = await $axios.$get("/api/allsets")
		return {
			allsets,
		}
	},
	data: () => ({
		unreleasedCards: [],
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
					this.unreleasedCards = this.categorySort(
						this.unreleasedCards
					)
					break
				}
				default:
					this.unreleasedCards.sort((a, b) =>
						a.name > b.name ? 1 : -1
					)
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
		this.allcards = this.allcards.filter((_) => _.card_sets !== undefined)
		this.allcards.forEach((card) => {
			card.tcg_date = "2200-11-11"
			card.card_sets.forEach((set) => {
				const tcg_date =
					this.allsets.find((_) => _.set_name === set.set_name)
						?.tcg_date +
					" " +
					this.allsets.find((_) => _.set_name === set.set_name)
						?.set_name
				// if(tcg_date === undefined) console.log(card+"\n"+set.set_name)
				if (tcg_date !== undefined && card.tcg_date > tcg_date)
					card.tcg_date = tcg_date
			})
		})
		const mentionCards = this.allcards.filter(
			(_) =>
				_.desc.includes('"') &&
				!(_.type.includes("Monster") && _.type.includes("Normal"))
		)
		const hashAllcards = this.hashGroupBy(
			this.allcards.filter((_) => _.type !== "Token"),
			"name"
		)
		mentionCards.forEach((card) => {
			const mentions = [
				...new Set(
					card.desc.split(/[""]/).filter((_) => _ !== card.name)
				),
			]
			if (mentions.includes("Kairyu-Shin")) console.log(mentions)
			mentions.forEach((mention) => {
				if (hashAllcards[mention] !== undefined) {
					if (
						card.desc.includes(`${mention}" monster`) ||
						card.desc.includes(`${mention}" Synchro Monster`)
					)
						return
					const topush = JSON.parse(JSON.stringify(card))
					topush.mention = {
						id: hashAllcards[mention][0].id,
						name: mention,
						date: hashAllcards[mention][0].tcg_date,
					}
					this.unreleasedCards.push(topush)
				}
			})
		})
		console.log(this.unreleasedCards)
		this.unreleasedCards
			.sort((a, b) => (a.name > b.name ? 1 : -1))
			.sort((a, b) => (a.tcg_date > b.tcg_date ? 1 : -1))
	},
	methods: {
		mentionBanned() {
			console.log(
				this.unreleasedCards.filter((_) => _.tcg_date < _.mention.date)
			)
			return this.unreleasedCards.filter(
				(_) => _.tcg_date < _.mention.date && _.name !== "Green Gadget"
			)
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
