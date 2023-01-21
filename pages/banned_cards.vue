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
		<div class="flex-col" style="width: 95%">
			<h3 style="color: black; background-color: red; padding: 5px">
				Bandite
			</h3>
			<grid-view
				:columns="25"
				:col-gap="0"
				:row-gap="0"
				style="width: 100%"
			>
				<div
					v-for="card of getBanlistCards(0)"
					:key="card.id"
					style="position: relative"
				>
					<p
						:style="{
							position: 'absolute',
							zIndex: 9,
							backgroundColor: getCardChangeColor(card.id),
						}"
					>
						{{ getCardChangeText(card.id) }}
					</p>
					<card-modal
						:card-id="card.id"
						:rarity="'Common'"
						:src="getPicUrl(card.id)"
					/>
				</div>
			</grid-view>
			<h3 style="color: black; background-color: orange; padding: 5px">
				Limitate
			</h3>
			<grid-view
				:columns="25"
				:col-gap="0"
				:row-gap="0"
				style="width: 100%"
			>
				<div
					v-for="card of getBanlistCards(1)"
					:key="card.id"
					style="position: relative"
				>
					<p
						:style="{
							position: 'absolute',
							zIndex: 9,
							backgroundColor: getCardChangeColor(card.id),
						}"
					>
						{{ getCardChangeText(card.id) }}
					</p>
					<card-modal
						:card-id="card.id"
						:rarity="'Common'"
						:src="getPicUrl(card.id)"
					/>
				</div>
			</grid-view>
			<h3 style="color: black; background-color: yellow; padding: 5px">
				Semi-limitate
			</h3>
			<grid-view
				:columns="25"
				:col-gap="0"
				:row-gap="0"
				style="width: 100%"
			>
				<div
					v-for="card of getBanlistCards(2)"
					:key="card.id"
					style="position: relative"
				>
					<p
						:style="{
							position: 'absolute',
							zIndex: 9,
							backgroundColor: getCardChangeColor(card.id),
						}"
					>
						{{ getCardChangeText(card.id) }}
					</p>
					<card-modal
						:card-id="card.id"
						:rarity="'Common'"
						:src="getPicUrl(card.id)"
					/>
				</div>
			</grid-view>
			<h3 style="color: black; padding: 5px">Non pi&ugrave; in lista</h3>
			<grid-view
				:columns="25"
				:col-gap="0"
				:row-gap="0"
				style="width: 100%"
			>
				<div
					v-for="card of getBanlistCards(3)"
					:key="card.id"
					style="position: relative"
				>
					<p
						:style="{
							position: 'absolute',
							zIndex: 9,
							backgroundColor: getCardChangeColor(card.id),
						}"
					>
						{{ getCardChangeText(card.id) }}
					</p>
					<card-modal
						:card-id="card.id"
						:rarity="'Common'"
						:src="getPicUrl(card.id)"
					/>
				</div>
			</grid-view>
		</div>

		<div class="flex-col" style="width: 60%">
			<h4>PRIMA:</h4>
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
// import Pusher from "pusher-js"
import CardModal from "../components/CardModal.vue"
import GridView from "../components/GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "BannedCardsPage",
	components: { GridView, CardModal },
	mixins: [Utils],
	async asyncData({ $axios }) {
		const bannedCards = await $axios.$get("/api/banned_cards")
		const currentBanlist = await $axios.$get("/api/banlist_latest")
		return {
			bannedCards: bannedCards.filter((_) => _.banner !== undefined),
			defaultOrder: bannedCards.filter((_) => _.banner !== undefined),
			currentBanlist,
		}
	},
	data: () => ({
		showPerBanner: false,
		sortFilter: "CRONOLOGICO",
		cardsPerRow: 20,
		defaultOrder: [],
		bannedCards: [],
		currentBanlist: [],
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
		/*
		//	this.socket = new WebSocket(`ws://${window.location.hostname}:3001/ws/`)
		this.socket = new WebSocket(location.origin.replace(/^http/, 'ws')+"/ws")

		// Connection opened
		this.socket.addEventListener("open", (event) => {
			this.socket.send("Hello Server!")
		})

		// Listen for messages
		this.socket.addEventListener("message", async (event) => {
			console.log("Updating banlist")
			await this.updateBanlist()
		})



		this.pusher = new Pusher("8b57261ee3e07fd82f1d", {
			cluster: "eu",
		})

		this.channel = this.pusher.subscribe("my-channel")
		this.channel.bind("my-event", async (data) => {
			const bannedCards = await this.$axios.$get("/api/banned_cards")
			this.updateBanlist(bannedCards)
		})

		if (this.$route.query.admin !== undefined)
			this.allcards = await this.getAllCards()
		*/
	},
	methods: {
		getBanlistCards(status) {
			if (status === 3)
				return this.categorySort(
					this.bannedCards
						.map((_) => (_.info === undefined ? _ : _.info))
						.filter((card) => {
							const banlistCard = this.currentBanlist.find(
								(_) => _.id === card.id
							)
							if (banlistCard === undefined) return true
							return banlistCard.status === 3
						})
				)
			return this.categorySort(
				this.currentBanlist
					.filter((_) => _.status === status)
					.map((_) => _.info)
			)
		},
		getCardChangeText(id) {
			const before =
				this.bannedCards.find((_) => _.id === id) === undefined ? 3 : 0
			const card = this.currentBanlist.find((_) => _.id === id)
			const now = card === undefined ? 3 : card.status
			if (before === now) return ""
			return `${before}->${now}`
		},
		getCardChangeColor(id) {
			const color =
				this.bannedCards.find((_) => _.id === id) === undefined
					? "white"
					: "red"
			return color
		},
		updateBanlist(bannedCards) {
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
		},
		async banCard() {
			const { data } = await this.$axios.get(
				`api/update_banlist?id=${this.bancard}&banner=${this.banner}`
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
