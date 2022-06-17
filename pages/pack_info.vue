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
				v-for="(set, i) of allsets.filter(
					(_) => _.tcg_date > dateFilter
				)"
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
					<option label="2001">2001</option>
					<option label="2002">2002</option>
					<option label="2003">2003</option>
					<option label="2004">2004</option>
					<option label="2005">2005</option>
					<option label="2006">2006</option>
					<option label="2007">2007</option>
					<option label="2008">2008</option>
					<option label="2009">2009</option>
					<option label="2010">2010</option>
					<option label="2011">2011</option>
					<option label="2012">2012</option>
					<option label="2013">2013</option>
					<option label="2014">2014</option>
					<option label="2015">2015</option>
					<option label="2016">2016</option>
					<option label="2017">2017</option>
					<option label="2018">2018</option>
					<option label="2019">2019</option>
					<option label="2021">2021</option>
					<option label="2022">2022</option>
				</select>
			</div>
			<input
				id="pack"
				type="text"
				maxlength="125"
				size="40"
				placeholder="Scrivi qua o clicca su un pacchetto!"
				:value="clickedSet"
			/>
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
				:columns="appendCards.length < 6 ? 4 : 6"
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
	/*
	async asyncData({ $axios }) {
		const allsets = await $axios.$get("/api/allsets")
		return {
			allsets: allsets
				.filter(
					(_) =>
						_.tcg_date !== undefined &&
						!_.set_name.toLowerCase().includes("sneak peek")
				)
				.sort((a, b) => (a.tcg_date > b.tcg_date ? 1 : -1)),
		}
	},
	*/
	data: () => ({
		appendCards: [],
		allsets: [],
		dateFilter: "1900",
		clickedSet: "",
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
	/*
	async fetch() {
		this.allcards = await this.getAllCards()
	},
    fetchOnServer: true,
    */
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
	width: var(--pack-width);
}

h3 {
	text-align: center;
	white-space: pre-line;
}
</style>
