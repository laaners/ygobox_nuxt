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
		<div
			v-if="$route.query.admin !== undefined && allcards.length !== 0"
			class="flex-col"
			style="width: 30%"
		>
			<div class="flex-row" style="width: 100%">
				<input
					v-model="cardsFilter"
					type="text"
					placeholder="Filtro in _=>_"
					style="width: 100%"
				/>&ensp;
			</div>
			<button-secondary :title="'FILTRA'" @click.native="filterCards()" />
		</div>
		<div v-if="allcards.length > 0" class="flex-col" style="width: 95%">
			<div class="flex-col" style="width: 60%">
				<grid-view
					:columns="2"
					:row-gap="0"
					:col-gap="2"
					style="width: 100%"
				>
					<button-secondary
						v-for="sortLabel of ['ALFABETICO', 'PER CATEGORIA']"
						:key="sortLabel"
						:title="sortLabel"
						:style="{
							opacity: sortFilter === sortLabel ? 1 : 0.5,
						}"
						@click.native="sortFilter = sortLabel"
					/>
				</grid-view>
			</div>
			<h3>Pu&ograve; essere una di queste {{ possibleCards.length }}!</h3>
			<grid-view
				:columns="thereIsNext && thereIsPrev ? 2 : 1"
				:col-gap="3"
				:row-gap="0"
				style="width: 10%"
			>
				<button-secondary
					v-if="thereIsPrev"
					:title="'<'"
					@click.native="index -= 1"
				/>
				<button-secondary
					v-if="thereIsNext"
					:title="'>'"
					@click.native="index += 1"
				/>
			</grid-view>
			<p>
				<input
					ref="enterInput"
					type="text"
					size="1"
					:value="index + 1"
					@keypress="enterIndex"
				/>
				/
				{{ Math.ceil(possibleCards.length / cardsPerPage) }}
			</p>
			<grid-view
				:columns="15"
				:col-gap="0"
				:row-gap="0"
				style="width: 100%"
			>
				<card-modal
					v-for="card of possibleCards.slice(
						index * cardsPerPage,
						(index + 1) * cardsPerPage
					)"
					:key="card.id"
					:card-id="card.id"
					:rarity="'Common'"
					:src="getPicUrl(card.id)"
				/>
			</grid-view>
		</div>
		<div v-if="$route.query.admin !== undefined">
			<div>
				{{ allcards[0] }}
			</div>
			<div>
				{{ allcards.find((_) => _.name.includes("Accesscode")) }}
			</div>
		</div>
	</div>
</template>

<script>
import Pusher from "pusher-js"
import CardModal from "../components/CardModal.vue"
import GridView from "../components/GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "BannedCardsPage",
	components: { GridView, CardModal },
	mixins: [Utils],
	async asyncData({ $axios }) {
		const allsets = await $axios.$get("/api/allsets")
		return { allsets }
	},
	data: () => ({
		sortFilter: "ALFABETICO",
		defaultOrder: [],
		possibleCards: [],
		index: 0,
		cardsPerPage: 3 * 15,
		thereIsNext: false,
		thereIsPrev: false,
		allcards: [],
		allsets: [],
		cardsFilter: "",
	}),
	head() {
		return {
			title: "Guess Cards",
			meta: [
				{
					hid: "Guess Cards",
					name: "Guess Cards",
					content: `Guess Cards`,
				},
			],
		}
	},
	watch: {
		sortFilter(newV, olV) {
			switch (newV) {
				case "PER CATEGORIA": {
					this.possibleCards = this.categorySort(this.possibleCards)
					break
				}
				default:
					this.possibleCards.sort((a, b) =>
						a.name > b.name ? 1 : -1
					)
			}
		},
		possibleCards(newPossibleCard, oldPossibleCard) {
			this.index = 0
			this.thereIsNext =
				this.index + 1 <
				Math.ceil(newPossibleCard.length / this.cardsPerPage)
			this.thereIsPrev = this.index > 0
		},
		index(newIndex, oldIndex) {
			this.thereIsNext =
				newIndex + 1 <
				Math.ceil(this.possibleCards.length / this.cardsPerPage)
			this.thereIsPrev = newIndex > 0
		},
	},
	async mounted() {
		this.pusher = new Pusher("8b57261ee3e07fd82f1d", {
			cluster: "eu",
		})

		this.channel = this.pusher.subscribe("my-channel")
		this.channel.bind("my-event", (data) => {
			console.log(data)
			this.cardsFilter = data.message

			this.possibleCards = this.possibleCards.filter(
				// eslint-disable-next-line no-eval
				eval(this.cardsFilter)
			)
		})

		this.allcards = await this.getAllCards()
		this.allcards = this.allcards.filter((_) => _.card_sets !== undefined)
		this.allcards.forEach((card) => {
			card.tcg_date = "2200-11-11"
			card.card_sets.forEach((set) => {
				const tcg_date = this.allsets.find(
					(_) => _.set_name === set.set_name
				)?.tcg_date
				// if(tcg_date === undefined) console.log(card+"\n"+set.set_name)
				if (tcg_date !== undefined && card.tcg_date > tcg_date)
					card.tcg_date = tcg_date
			})
		})

		this.possibleCards = this.allcards
	},
	methods: {
		enterIndex(e) {
			if (e.which === 13) {
				const value = this.$refs.enterInput.value
				if (isNaN(value)) {
					alert("Inserisci un numero!")
					return
				}
				if (
					value < 1 ||
					value >
						Math.ceil(this.possibleCards.length / this.cardsPerPage)
				) {
					alert("Inserisci un numero valido!")
					return
				}
				this.index = +value - 1
			}
		},
		async filterCards() {
			const { data } = await this.$axios.get(
				`api/guess_card?cardsFilter=${encodeURIComponent(
					this.cardsFilter
				)}`
			)
			//	this.socket.send("Update banlist")
			alert(data)
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
