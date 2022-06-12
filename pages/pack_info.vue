<template>
	<div class="flex-col">
		<div class="flex-col">
			<div class="flex-row">
				<input id="pack" type="text" maxlength="125" size="25" />
				&ensp;
				<input
					type="button"
					class="custom"
					value="APRI PACCHETTO"
					@click="listCardsPack()"
				/>
			</div>
			<br />
			<img id="pack-img" loading="lazy" />
		</div>
		<h2 ref="packInfo"></h2>
		<grid-view
			v-if="appendCards.length > 0"
			:columns="6"
			:row-gap="0.5"
			:col-gap="1"
			style="width: 90%"
		>
			<container-pack-info
				v-for="card of appendCards"
				:key="card.id"
				:src="card.card_images[0].image_url"
				:card="card"
				:rarity="card.rarity.set_rarity"
				:percentage="card.rarity.percentage"
			/>
		</grid-view>
	</div>
</template>

<script>
import GridView from "../components/GridView.vue"
import ContainerPackInfo from "../components/ContainerPackInfo.vue"
import Utils from "~/mixins/utils"
export default {
	name: "PackInfoPage",
	components: { ContainerPackInfo, GridView },
	mixins: [Utils],
	/*
	async asyncData({ $getAllCards }) {
		const allcards = await $getAllCards()
		return { allcards }
	},
    */
	data: () => ({
		appendCards: [],
	}),
	/*
	async fetch() {
		this.allcards = await this.getAllCards()
	},
    fetchOnServer: true,
    */
	/*
	async mounted() {
		this.allcards = await this.getAllCards()
	},
	*/
	methods: {
		async listCardsPack() {
			const set_name = this.$el.querySelector("#pack").value
			const { pack_img, cards } = await this.$axios.$get(
				`api/set?set_name=${set_name}`
			)
			if (cards.length === 0) {
				alert(pack_img)
				return
			}
			this.appendCards = cards

			const draftN =
				Math.ceil(cards.length * 1.5) > 120
					? 120
					: Math.ceil(cards.length * 1.5)
			this.$el.querySelector("#pack-img").src = pack_img
			this.$refs.packInfo.innerHTML =
				cards.length +
				" carte diverse nel pacchetto\nSe apri il pacchetto avrai " +
				draftN +
				" carte a caso tra queste:"
		},
	},
}
</script>

<style scoped>
#pack-img {
	height: 50vh;
}

.flex-row {
	display: flex;
	justify-content: center;
	align-items: center;
}

.flex-col {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

h2 {
	text-align: center;
	white-space: pre-line;
}
</style>
