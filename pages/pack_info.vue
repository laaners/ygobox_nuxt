<template>
	<div class="flex-col">
		<div class="flex-col">
				<input id="pack" type="text" maxlength="125" size="25" />
				<button-secondary
					:title="'APRI PACCHETTO'"
					@click.native="listCardsPack()"
				/>
		</div>
		<div v-show="appendCards.length > 0" class="flex-col">
			<img id="pack-img" loading="lazy" />
			<h3 ref="packInfo"></h3>
			<h4>ORDINA PER:</h4>
			<grid-view
				:columns="3"
				:row-gap="0"
				:col-gap="2"
				style="width: 80%"
			>
				<button-secondary
					:title="'DEFAULT'"
					@click.native="sort('default')"
				/>
				<button-secondary
					:title="'RARITÀ'"
					@click.native="sort('rarity')"
				/>
				<button-secondary
					:title="'CATEGORIA'"
					@click.native="sort('category')"
				/>
			</grid-view>
			<grid-view
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
	</div>
</template>

<script>
import GridView from "../components/GridView.vue"
import ContainerPackInfo from "../components/ContainerPackInfo.vue"
import ButtonSecondary from "../components/ButtonSecondary.vue"
import Utils from "~/mixins/utils"
export default {
	name: "PackInfoPage",
	components: { ContainerPackInfo, GridView, ButtonSecondary },
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
				`api/set/${set_name}`
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
		sort(option) {
			switch (option) {
				case "rarity": {
					this.appendCards.sort(
						(a, b) => a.rarity.percentage - b.rarity.percentage
					)
					break
				}
				case "category": {
					this.appendCards = this.categorySort(this.appendCards)
					break
				}
				default:
					this.appendCards.sort((a, b) => {
						const setCodeA = a.rarity.set_code
						const setCodeB = b.rarity.set_code
						if (setCodeA < setCodeB) return -1
						if (setCodeA > setCodeB) return 1
						return 0
					})
			}
		},
	},
}
</script>

<style scoped>
#pack {
	font-size: var(--font-size-body);
}

.flex-row > * {
	margin-right: var(--space-0);
	margin-left: var(--space-0);
}

.flex-col > * {
	margin-top: var(--space-0);
	margin-bottom: var(--space-0);
}

#pack-img {
	height: 50vh;
}

h3 {
	text-align: center;
	white-space: pre-line;
}
</style>
