<template>
	<div id="initial-page" class="text-center">
		<br /><br />
		<div
			style="
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 1em;
			"
		>
			<input
				id="main_file"
				type="file"
				class="text-center"
				value="CARICA LE TUE CARTE!"
				disabled
			/>
		</div>
		<div
			style="
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 1em;
			"
		>
			<input type="button" class="upload" value="CARICA LE TUE CARTE!" />
		</div>
		<div
			style="display: flex; justify-content: center; align-items: center"
		>
			<input
				id="banned_category"
				type="button"
				class="banned"
				value="CARTE BANDITE ORDINE PER CATEGORIA"
				disabled
			/>
			&ensp;
			<input
				id="banned_temporal"
				type="button"
				class="banned"
				value="CARTE BANDITE ORDINE CRONOLOGICO"
				disabled
			/>
		</div>
		<a href="/pack_info">guarda cosa contiene un pacchetto</a>
		<grid-view style="width: 90%" :columns="10" :row-gap="0" :col-gap="0">
			<card-modal
				v-for="card of bannedCards"
				:key="card.id"
				:src="card.card_images[0].image_url"
				:card-id="card.id"
				:rarity="'Common'"
			/>
		</grid-view>
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
		const bannedCards = await $axios.$get("/api/banned_cards")
		return {
			bannedCards,
		}
	},
	data: () => ({
		allcards: [],
		bannedCards: [],
	}),
	async mounted() {
		this.allcards = await this.getAllCards()
	},
}
</script>

<style scoped>
#initial-page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
