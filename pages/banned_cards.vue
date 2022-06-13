<template>
	<div class="flex-col">
		<div class="flex-col" style="width: 60%">
			<h4>ORDINE:</h4>
			<grid-view
				:columns="3"
				:row-gap="0"
				:col-gap="2"
				style="width: 100%"
			>
				<button-secondary
					:title="'CRONOLOGICO'"
					@click.native="sort('chronological')"
				/>
				<button-secondary
					:title="'PER CATEGORIA'"
					@click.native="sort('category')"
				/>
				<button-secondary
					:title="'PER PERSONA'"
					@click.native="showPerBanner = true"
				/>
			</grid-view>
		</div>
		<grid-view
			v-if="!showPerBanner"
			style="width: 90%"
			:columns="15"
			:row-gap="0"
			:col-gap="0"
		>
			<card-modal
				v-for="card of bannedCards"
				:key="card.id"
				:src="getPicUrl(card.id)"
				:card-id="card.id"
				:rarity="'Common'"
			/>
		</grid-view>
		<div v-if="showPerBanner" class="flex-col banner">
			<h4>Ale</h4>
			<grid-view
				style="width: 90%"
				:columns="15"
				:row-gap="0"
				:col-gap="0"
			>
				<card-modal
					v-for="card of bannedCards.filter(
						(_) => _.banner === 'Ale'
					)"
					:key="card.id"
					:src="getPicUrl(card.id)"
					:card-id="card.id"
					:rarity="'Common'"
				/>
			</grid-view>
			<h4>Leo</h4>
			<grid-view
				style="width: 90%"
				:columns="15"
				:row-gap="0"
				:col-gap="0"
			>
				<card-modal
					v-for="card of bannedCards.filter(
						(_) => _.banner === 'Leo'
					)"
					:key="card.id"
					:src="getPicUrl(card.id)"
					:card-id="card.id"
					:rarity="'Common'"
				/>
			</grid-view>
			<h4>Sandro</h4>
			<grid-view
				style="width: 90%"
				:columns="15"
				:row-gap="0"
				:col-gap="0"
			>
				<card-modal
					v-for="card of bannedCards.filter(
						(_) => _.banner === 'Sandro'
					)"
					:key="card.id"
					:src="getPicUrl(card.id)"
					:card-id="card.id"
					:rarity="'Common'"
				/>
			</grid-view>
			<h4>Siwei</h4>
			<grid-view
				style="width: 90%"
				:columns="15"
				:row-gap="0"
				:col-gap="0"
			>
				<card-modal
					v-for="card of bannedCards.filter(
						(_) => _.banner === 'Siwei'
					)"
					:key="card.id"
					:src="getPicUrl(card.id)"
					:card-id="card.id"
					:rarity="'Common'"
				/>
			</grid-view>
			<h4>Altro</h4>
			<grid-view
				style="width: 90%"
				:columns="15"
				:row-gap="0"
				:col-gap="0"
			>
				<card-modal
					v-for="card of bannedCards.filter(
						(_) => !['Ale', 'Leo', 'Sandro', 'Siwei'].includes(_.banner)
					)"
					:key="card.id"
					:src="getPicUrl(card.id)"
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
		const rawBannedCards = await $axios.$get("/api/banned_cards")
		const promises = []
		rawBannedCards.forEach((card) => {
			promises.push($axios.$get(`/api/card/${card.id}`))
		})
		const bannedCards = await Promise.all(promises)
		bannedCards.forEach((_) => {
			_.banner = rawBannedCards.find((x) => x.id === _.id).banner
		})
		return {
			bannedCards,
			defaultOrder: bannedCards,
		}
	},
	data: () => ({
		showPerBanner: false,
		defaultOrder: [],
		bannedCards: [],
	}),
	methods: {
		sort(option) {
			console.log(this.defaultOrder)
			this.showPerBanner = false
			switch (option) {
				case "category": {
					this.bannedCards = this.categorySort(this.defaultOrder)
					break
				}
				default:
					this.bannedCards = this.defaultOrder
			}
		},
	},
}
</script>

<style scoped>
.flex-col > * {
	margin-top: var(--space-0);
	margin-bottom: var(--space-0);
}
</style>
