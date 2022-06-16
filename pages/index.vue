<template>
	<div class="flex-col">
		<multi-page-icon class="icon" />
		<scroll-page-icon class="icon" />
		<card-modal />
		<grid-view />
		<search-form />
		<button-secondary />
	</div>
</template>

<script>
import CardModal from "../components/CardModal.vue"
import GridView from "../components/GridView.vue"
import SearchForm from "../components/SearchForm.vue"
import ButtonSecondary from "../components/ButtonSecondary.vue"
import MultiPageIcon from "../components/icons/MultiPageIcon.vue"
import ScrollPageIcon from "../components/icons/ScrollPageIcon.vue"
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	components: {
		GridView,
		CardModal,
		SearchForm,
		ButtonSecondary,
		MultiPageIcon,
		ScrollPageIcon,
	},
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
		savedCards: [],
		deck: [],
	}),
	/*
	async mounted() {
		this.allcards = await this.getAllCards()
	},
	*/
}
</script>

<style scoped>
.flex-col > * {
	margin: var(--space-1);
}
.icon {
	width: 5vw;
	height: 5vw;
}
</style>
