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
			<div class="flex-col" style="width: 60%">
				<grid-view
					:columns="2"
					:row-gap="0"
					:col-gap="2"
					style="width: 100%"
				>
					<button-secondary
						v-for="sortLabel of ['PER CATEGORIA', 'ALFABETICO']"
						:key="sortLabel"
						:title="sortLabel"
						:style="{
							opacity: sortFilter === sortLabel ? 1 : 0.5,
						}"
						@click.native="sortFilter = sortLabel"
					/>
				</grid-view>
			</div>
			<h2>Banlist {{ banlists[index] }}</h2>
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
					@keyup.native.left="index = index > 0 ? index - 1 : index"
					@keyup.native.right="
						index = index + 1 < banlists.length ? index + 1 : index
					"
				/>
				<button-secondary
					v-if="thereIsNext"
					:title="'>'"
					@click.native="index += 1"
					@keyup.native.left="index = index > 0 ? index - 1 : index"
					@keyup.native.right="
						index = index + 1 < banlists.length ? index + 1 : index
					"
				/>
			</grid-view>
			<p>
				<input
					ref="enterInput"
					type="text"
					size="1"
					:value="index + 1"
					@keypress="enterIndex"
					@keyup.left="index = index > 0 ? index - 1 : index"
					@keyup.right="
						index = index + 1 < banlists.length ? index + 1 : index
					"
				/>
				/
				{{ banlists.length }}
			</p>
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
					v-for="card of getCurrentBanlistCards(0)"
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
					v-for="card of getCurrentBanlistCards(1)"
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
					v-for="card of getCurrentBanlistCards(2)"
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
					v-for="card of getCurrentBanlistCards(3)"
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
	</div>
</template>

<script>
import CardModal from "../components/CardModal.vue"
import GridView from "../components/GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	components: { GridView, CardModal },
	mixins: [Utils],
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
		cardsPerPage: 3 * 15,
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
		enterIndex(e) {
			if (e.which === 13) {
				const value = this.$refs.enterInput.value
				if (isNaN(value)) {
					alert("Inserisci un numero!")
					return
				}
				if (value < 1 || value > this.banlists.length) {
					alert("Inserisci un numero valido!")
					return
				}
				this.index = +value - 1
			}
		},
		getCurrentBanlistCards(status) {
			if (status === 3 && this.index !== 0)
				return this.bannedCards.filter((card) => {
					const infoNow = card.banlists.find(
						(_) => _.banlist === this.banlists[this.index]
					)
					const infoPrev = card.banlists.find(
						(_) => _.banlist === this.banlists[this.index - 1]
					)
					return (
						infoPrev !== undefined &&
						infoPrev.status < 3 &&
						infoNow.status === 3
					)
				})
			return this.bannedCards.filter((card) => {
				const info = card.banlists.find(
					(_) => _.banlist === this.banlists[this.index]
				)
				return info !== undefined && info.status === status
			})
		},
		getCardChangeText(id) {
			if (this.index === 0) return ""
			const infoNow = this.bannedCards
				.find((_) => _.id === id)
				.banlists.find((_) => _.banlist === this.banlists[this.index])
			const infoPrev = this.bannedCards
				.find((_) => _.id === id)
				.banlists.find(
					(_) => _.banlist === this.banlists[this.index - 1]
				)

			// newly banned
			if (infoPrev === undefined && infoNow !== undefined)
				return `3->${infoNow.status}`
			else if (
				infoPrev !== undefined &&
				infoNow !== undefined &&
				infoNow.status !== infoPrev.status
			)
				return `${infoPrev.status}->${infoNow.status}`
			// non existent in both
			else return ""
		},
		getCardChangeColor(id) {
			if (this.index === 0) return "white"
			const infoNow = this.bannedCards
				.find((_) => _.id === id)
				.banlists.find((_) => _.banlist === this.banlists[this.index])
			const infoPrev = this.bannedCards
				.find((_) => _.id === id)
				.banlists.find(
					(_) => _.banlist === this.banlists[this.index - 1]
				)
			const colors = ["red", "orange", "yellow"]
			// newly banned
			if (infoPrev === undefined && infoNow !== undefined) return "white"
			else if (
				infoPrev !== undefined &&
				infoNow !== undefined &&
				infoNow.status !== infoPrev.status
			)
				return colors[infoPrev.status]
			// non existent in both
			else return "white"
		},
		mentionBanned() {
			const onceBanned = this.bannedCards.filter((card) => {
				return card.banlists.some((_) => _.status === 0)
			})
			let mentionBannedCards = this.allcards.filter((_) =>
				onceBanned
					.map((__) => __.name)
					.some(
						(__) => _.desc.includes('"' + __ + '"') && __ !== _.name
					)
			)
			mentionBannedCards.forEach((card) => {
				const mention = onceBanned.find(
					(_) =>
						card.desc.includes('"' + _.name + '"') &&
						card.name !== _.name
				)
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
					// if(tcg_date === undefined) console.log(card+"\n"+set.set_name)
					if (tcg_date !== undefined && card.tcg_date > tcg_date)
						card.tcg_date = tcg_date
				})
			})
			mentionBannedCards = mentionBannedCards
				.filter((_) => _.tcg_date < _.mention.firstFreed)
				.sort((a, b) => (a.tcg_date > b.tcg_date ? 1 : -1))
			console.log(mentionBannedCards)
			return mentionBannedCards
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
