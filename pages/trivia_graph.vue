<template>
	<div class="flex-col">
		<grid-view
			:columns="3"
			:col-gap="0.5"
			:row-gap="1"
			style="width: 60%; justify-items: center; align-items: center"
		>
			<h2>Trivia</h2>
			<p>Da una carta, trovare tutte le carte con quello nell'immagine o viceversa</p>
			<div class="notdone"></div>
		</grid-view>
	</div>
</template>

<script>
import GridView from "../components/GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	components: { GridView },
	mixins: [Utils],
	data: () => ({
		allcards: [],
		bannedCards: [],
		savedCards: [],
		deck: [],
	}),
	head() {
		return {
			title: "Trivia Page",
			meta: [
				{
					hid: "Trivia Page",
					name: "Trivia Page",
					content: `Trivia Page`,
				},
			],
		}
	},
	/*
	async mounted() {
		this.allcards = await this.getAllCards()
	},
	*/
}
</script>

<style scoped>
.done {
	border-radius: 50%;
	width: var(--font-size-body);
	height: var(--font-size-body);
	background: lightgreen;
}

.notdone {
	border-radius: 50%;
	width: var(--font-size-body);
	height: var(--font-size-body);
	background: red;
}

p {
	text-align: center;
}
</style>
