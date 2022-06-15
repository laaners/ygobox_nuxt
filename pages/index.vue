<template>
	<div id="initial-page" class="text-center">
		<div class="form-container">
			<search-form :hiding-mode="true" style="width: 100%" />
		</div>
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
		<div class="flex-col" style="width: 60%">
			<h4>ORDINE:</h4>
			<grid-view
				:columns="2"
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
			</grid-view>
		</div>
		<grid-view style="width: 90%" :columns="15" :row-gap="0" :col-gap="0">
			<card-modal
				v-for="card of bannedCards"
				:key="card.id"
				:src="getPicUrl(card.id)"
				:card-id="card.id"
				:rarity="'Common'"
			/>
		</grid-view>
	</div>
</template>

<script>
import CardModal from "../components/CardModal.vue"
import GridView from "../components/GridView.vue"
import SearchForm from "../components/SearchForm.vue"

import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	components: { GridView, CardModal, SearchForm },
	mixins: [Utils],
	async asyncData({ $axios }) {
		const bannedCards = await $axios.$get("/api/banned_cards")
		return {
			bannedCards,
		}
	},
	data: () => ({
		bannedCards: [],
	}),
	/*
	async mounted() {
		this.allcards = await this.getAllCards()
	},
	*/
	methods: {
		sort(option) {
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
#initial-page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.form-container {
	height: 40vh;
	width: 50%;
	color: var(--color-darker) !important;
	overflow-y: auto;
}

.form-container >>> .link-markers-grid {
	width: 16% !important;
}
</style>
