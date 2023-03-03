<template>
	<div class="flex-col">
		<div
			v-if="allsets.length === 0"
			class="loader"
			style="
				margin-left: auto;
				margin-right: auto;
				margin-bottom: var(--space-1);
			"
		></div>
		<h-scroll-view style="width: 90%">
			<container-pack-scroll
				v-for="(set, i) of allsets.filter((_) => {
					if (dateFilter === 'Deck')
						return _.set_name.includes('Deck')
					return _.tcg_date >= dateFilter
				})"
				:key="set.set_code + i"
				:clicked-set.sync="clickedSet"
				:set="set"
			/>
		</h-scroll-view>
		<div class="flex-col">
			<div class="flex-row">
				<p>Mostra solo i pacchetti a partire dal:</p>
				<select v-model="dateFilter" name="setsFilter">
					<option label="Tutti" selected="selected">1900</option>
					<option label="Solo i deck" selected="selected">
						Deck
					</option>
					// Array(2023-2000).fill(2001).map((v,i)=>v+i)"
					<option
						v-for="i of Array.from(
							new Set(
								allsets.map((_) => _.tcg_date.split('-')[0])
							)
						)"
						:key="'date-' + i"
						:label="i"
					>
						{{ i }}
					</option>
				</select>
			</div>
			<input
				id="pack"
				type="text"
				maxlength="125"
				size="40"
				placeholder="Scrivi qua o clicca su un pacchetto!"
				list="allsets"
				:value="clickedSet"
			/>
			<datalist id="allsets">
				<option
					v-for="set of allsets"
					:key="set.set_code"
					:value="set.set_name"
				>
					{{ set.set_name }}
				</option>
			</datalist>
			<button-secondary
				:title="'APRI PACCHETTO'"
				@click.native="listCardsPack()"
			/>
		</div>
		<div v-show="appendCards.length > 0" class="flex-col">
			<container-pack-scroll id="pack-img" :set="openedSet" />
			<h3 ref="packInfo"></h3>
			<h4>ORDINA PER:</h4>
			<grid-view
				:columns="3"
				:row-gap="0"
				:col-gap="2"
				style="width: 80%"
			>
				<button-secondary
					v-for="sortLabel of ['DEFAULT', 'RARITÀ', 'CATEGORIA']"
					:key="sortLabel"
					:title="sortLabel"
					:style="{
						opacity: sortFilter === sortLabel ? 1 : 0.5,
					}"
					@click.native="sortFilter = sortLabel"
				/>
			</grid-view>
			<grid-view
				:columns="appendCards.length < 6 ? appendCards.length : 6"
				:row-gap="0.5"
				:col-gap="1"
				style="width: 90%"
			>
				<container-pack-info
					v-for="card of appendCards"
					:key="card.id"
					:src="getPicUrl(card.id)"
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
import ContainerPackScroll from "../components/ContainerPackScroll.vue"
import ButtonSecondary from "../components/ButtonSecondary.vue"
import Utils from "~/mixins/utils"
export default {
	name: "PackInfoPage",
	components: {
		GridView,
		ButtonSecondary,
		ContainerPackScroll,
	},
	mixins: [Utils],
	data: () => ({
		appendCards: [],
		allsets: [],
		dateFilter: "1900",
		clickedSet: "",
		openedSet: {},
		sortFilter: "DEFAULT",
	}),
	head() {
		return {
			title: "Pack Info",
			meta: [
				{
					hid: "Pack Info",
					name: "Pack Info",
					content: `Pack Info`,
				},
			],
		}
	},
	watch: {
		sortFilter(newV, olV) {
			switch (newV) {
				case "RARITÀ": {
					this.appendCards.sort((a, b) => {
						if (a.rarity.percentage.includes("-"))
							return (
								a.rarity.percentage.split(" - ")[1] -
								b.rarity.percentage.split(" - ")[1]
							)
						return a.rarity.percentage - b.rarity.percentage
					})
					this.appendCards.sort(
						(a, b) => a.rarity.percentage - b.rarity.percentage
					)
					break
				}
				case "CATEGORIA": {
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
	async mounted() {
		const allsets = await this.$axios.$get("/api/allsets")
		this.allsets = allsets
			.filter(
				(_) =>
					_.tcg_date !== undefined &&
					!_.set_name.toLowerCase().includes("sneak peek")
			)
			.sort((a, b) => (a.tcg_date > b.tcg_date ? 1 : -1))
	},
	methods: {
		async listCardsPack() {
			const set_name = this.$el.querySelector("#pack").value
			this.clickedSet = set_name
			if (!set_name) {
				alert("Empty set name")
				return
			}
			const { pack_img, cards, draftN } = await this.$axios.$get(
				`api/set/${set_name}`
			)
			if (cards.length === 0) {
				alert(pack_img)
				return
			}
			this.appendCards = cards
			this.openedSet = this.allsets.find(
				(_) => _.set_name.toLowerCase() === set_name.toLowerCase()
			)
			this.$el.querySelector("#pack-img").src = pack_img
			this.$refs.packInfo.innerHTML =
				cards.length +
				" carte diverse nel pacchetto\nSe apri il pacchetto avrai " +
				draftN +
				" carte a caso tra queste:"
			this.sortFilter = "DEFAULT"
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
	width: var(--pack-width);
}

h3 {
	text-align: center;
	white-space: pre-line;
}
</style>
