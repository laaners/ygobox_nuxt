<template>
	<div class="flex-col">
		<div
			v-if="$route.query.admin !== undefined"
			class="flex-col"
			style="width: 30%"
		>
			<div class="flex-row" style="width: 100%">
				<input
					v-model="bancard"
					type="text"
					list="allcards"
					placeholder="Digita il nome di una carta!"
					style="width: 100%"
				/>&ensp;
				<select v-model="banner" name="banner">
					<option label="Ale" selected="selected">Ale</option>
					<option label="Leo">Leo</option>
					<option label="Sandro">Sandro</option>
					<option label="Siwei">Siwei</option>
				</select>
				<datalist id="allcards">
					<option
						v-for="card of allcards"
						:key="card.id"
						:value="card.id"
					>
						{{ card.name }}
					</option>
				</datalist>
			</div>
			<button-secondary :title="'BANDISCI'" @click.native="banCard()" />
		</div>
		<div class="flex-col" style="width: 60%">
			<h4>ORDINE:</h4>
			<grid-view
				:columns="3"
				:row-gap="0"
				:col-gap="2"
				style="width: 100%"
			>
				<button-secondary
					v-for="sortLabel of [
						'CRONOLOGICO',
						'PER CATEGORIA',
						'PER PERSONA',
					]"
					:key="sortLabel"
					:title="sortLabel"
					:style="{
						opacity: sortFilter === sortLabel ? 1 : 0.5,
					}"
					@click.native="sortFilter = sortLabel"
				/>
			</grid-view>
		</div>
		<grid-view
			v-if="!showPerBanner"
			style="width: 90%"
			:columns="cardsPerRow"
			:row-gap="0"
			:col-gap="0"
		>
			<card-modal
				v-for="card of bannedCards"
				:key="card.id"
				:src="getPicSmallUrl(card.id)"
				:card-id="card.id"
				:rarity="'Common'"
			/>
		</grid-view>
		<div v-if="showPerBanner" class="flex-col banner">
			<h4>Ale</h4>
			<grid-view
				style="width: 90%"
				:columns="cardsPerRow"
				:row-gap="0"
				:col-gap="0"
			>
				<card-modal
					v-for="card of bannedCards.filter(
						(_) => _.banner === 'Ale'
					)"
					:key="card.id"
					:src="getPicSmallUrl(card.id)"
					:card-id="card.id"
					:rarity="'Common'"
				/>
			</grid-view>
			<h4>Leo</h4>
			<grid-view
				style="width: 90%"
				:columns="cardsPerRow"
				:row-gap="0"
				:col-gap="0"
			>
				<card-modal
					v-for="card of bannedCards.filter(
						(_) => _.banner === 'Leo'
					)"
					:key="card.id"
					:src="getPicSmallUrl(card.id)"
					:card-id="card.id"
					:rarity="'Common'"
				/>
			</grid-view>
			<h4>Sandro</h4>
			<grid-view
				style="width: 90%"
				:columns="cardsPerRow"
				:row-gap="0"
				:col-gap="0"
			>
				<card-modal
					v-for="card of bannedCards.filter(
						(_) => _.banner === 'Sandro'
					)"
					:key="card.id"
					:src="getPicSmallUrl(card.id)"
					:card-id="card.id"
					:rarity="'Common'"
				/>
			</grid-view>
			<h4>Siwei</h4>
			<grid-view
				style="width: 90%"
				:columns="cardsPerRow"
				:row-gap="0"
				:col-gap="0"
			>
				<card-modal
					v-for="card of bannedCards.filter(
						(_) => _.banner === 'Siwei'
					)"
					:key="card.id"
					:src="getPicSmallUrl(card.id)"
					:card-id="card.id"
					:rarity="'Common'"
				/>
			</grid-view>
		</div>
	</div>
</template>

<script>
import CardModal from "../components/CardModal.vue"
import GridView from "../components/GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "BannedCardsPage",
	components: { GridView, CardModal },
	mixins: [Utils],
	async asyncData({ $axios }) {
		const bannedCards = await $axios.$get("/api/banned_cards")
		return {
			bannedCards: bannedCards.filter((_) => _.banner !== undefined),
			defaultOrder: bannedCards.filter((_) => _.banner !== undefined),
		}
	},
	data: () => ({
		showPerBanner: false,
		sortFilter: "CRONOLOGICO",
		cardsPerRow: 20,
		defaultOrder: [],
		bannedCards: [],
		allcards: [],
		bancard: 0,
		banner: "Ale",
	}),
	head() {
		return {
			title: "Banned Cards",
			meta: [
				{
					hid: "Banned Cards",
					name: "Banned Cards",
					content: `Banned Cards`,
				},
			],
		}
	},
	watch: {
		sortFilter(newV, olV) {
			this.showPerBanner = false
			switch (newV) {
				case "PER CATEGORIA": {
					this.bannedCards = this.categorySort(
						this.bannedCards.map((_) => _.info)
					)
					break
				}
				case "PER PERSONA": {
					this.showPerBanner = true
					this.bannedCards = this.defaultOrder
					break
				}
				default:
					this.bannedCards = this.defaultOrder
			}
		},
	},
	async mounted() {
		//	this.socket = new WebSocket(`ws://${window.location.hostname}:3001/ws/`)
		this.socket = new WebSocket(location.origin.replace(/^http/, 'ws')+"/ws")

		// Connection opened
		this.socket.addEventListener("open", (event) => {
			this.socket.send("Hello Server!")
		})

		// Listen for messages
		this.socket.addEventListener("message", async (event) => {
			console.log("Updating banlist")
			const bannedCards = await this.$axios.$get("/api/banned_cards")
			this.bannedCards = bannedCards.filter((_) => _.banner !== undefined)
			this.defaultOrder = bannedCards.filter(
				(_) => _.banner !== undefined
			)
			this.showPerBanner = false
			switch (this.sortFilter) {
				case "PER CATEGORIA": {
					this.bannedCards = this.categorySort(
						this.bannedCards.map((_) => _.info)
					)
					break
				}
				case "PER PERSONA": {
					this.showPerBanner = true
					this.bannedCards = this.defaultOrder
					break
				}
				default:
					this.bannedCards = this.defaultOrder
			}
		})

		if (this.$route.query.admin !== undefined)
			this.allcards = await this.getAllCards()
	},
	methods: {
		async banCard() {
			const msg = await this.$axios.get(
				`api/update_banlist?id=${this.bancard}&banner=${this.banner}`
			)
			this.socket.send("Update banlist")
			alert(msg.data)
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
