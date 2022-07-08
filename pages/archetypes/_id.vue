<template>
	<div class="flex-col">
		<h1 style="text-align: center">
			{{ archetype.archetype }}
		</h1>
		<h3>{{ archetype.members.length }} membri</h3>
		<div v-if="archetype.crest" class="crest">
			<img :src="archetype.crest" />
		</div>
		<div class="flex-row" style="width: 100%; flex-wrap: wrap">
			<img
				v-for="attribute in archetype.attributes"
				:key="attribute"
				:src="'/' + attribute + '.png'"
				:style="{
					width: '2.4%',
					marginLeft: 'var(--space-0)',
					marginRight: 'var(--space-0)',
				}"
			/>
		</div>
		<div class="flex-row" style="width: 100%; flex-wrap: wrap">
			<img
				v-for="type in archetype.types"
				:key="type"
				:src="'/' + type.toUpperCase() + '.png'"
				:style="{
					width: '2.4%',
					marginLeft: 'var(--space-0)',
					marginRight: 'var(--space-0)',
				}"
			/>
		</div>
		<grid-view :columns="2" :row-gap="0" :col-gap="2" style="width: 50%">
			<button-secondary
				:title="'CARD ART'"
				:style="{ opacity: artwork ? 0.5 : 1 }"
				@click.native="artwork = false"
			/>
			<button-secondary
				:title="'FULL ART'"
				:style="{ opacity: artwork ? 1 : 0.5 }"
				@click.native="artwork = true"
			/>
		</grid-view>
		<div class="flex-row">
			<span><b>Carte per riga:&ensp;</b></span>
			<select v-model="cardsPerRow">
				<option
					v-for="(v, i) of archetype.members"
					:key="i"
					:label="i + 1"
				>
					{{ i + 1 }}
				</option>
			</select>
		</div>
		<h4>ORDINE:</h4>
		<grid-view :columns="3" :row-gap="0" :col-gap="2" style="width: 80%">
			<button-secondary
				v-for="sortLabel of [
					'PER CATEGORIA',
					'ALFABETICO',
					'CRONOLOGICO',
				]"
				:key="sortLabel"
				:title="sortLabel"
				:style="{
					opacity: sortFilter === sortLabel ? 1 : 0.5,
				}"
				@click.native="sortFilter = sortLabel"
			/>
		</grid-view>
		<grid-view
			:columns="
				+cardsPerRow < archetype.members.length
					? +cardsPerRow
					: archetype.members.length
			"
			:row-gap="0"
			:col-gap="0"
		>
			<card-modal
				v-for="member of archetype.members"
				:key="member.id"
				:card-id="member.id"
				:src="artwork ? getPicArtUrl(member.id) : getPicUrl(member.id)"
				:rarity="'Common'"
			/>
		</grid-view>
	</div>
</template>

<script>
import CardModal from "../../components/CardModal.vue"
import Utils from "~/mixins/utils"
export default {
	name: "DetailsPage",
	components: { CardModal },
	mixins: [Utils],
	async asyncData({ route, $axios }) {
		const { id } = route.params
		const data = await $axios.$get(
			"/api/archetypes/" + id.replace(/\//g, "%2F")
		)
		const allsets = await $axios.$get("/api/allsets")
		return {
			artwork: false,
			archetype: data,
			allsets,
		}
	},
	data() {
		return {
			artwork: false,
			archetype: {},
			cardsPerRow: 7,
			sortFilter: "PER CATEGORIA",
		}
	},
	head() {
		return {
			title: this.archetype.archetype,
			meta: [
				{
					hid: this.archetype.archetype,
					name: this.archetype.archetype,
					content: this.archetype.archetype,
				},
			],
		}
	},
	watch: {
		sortFilter(newV, oldV) {
			switch (newV) {
				case "PER CATEGORIA": {
					this.archetype.members = this.categorySort(
						this.archetype.members
					)
					break
				}
				case "ALFABETICO": {
					this.archetype.members.sort((a, b) =>
						a.name >= b.name ? 1 : -1
					)
					break
				}
				case "CRONOLOGICO": {
					this.archetype.members = this.categorySort(
						this.archetype.members
					).sort((a, b) =>
						this.searchDate(a) >= this.searchDate(b) ? 1 : -1
					)
					break
				}
				default:
					break
			}
		},
	},
	mounted() {
		this.archetype.members = this.categorySort(this.archetype.members)
		this.allsets = this.hashGroupBy(this.allsets, "set_name")
	},
	methods: {
		searchDate(member) {
			let ris = "NONE"
			if (member.card_sets !== undefined) {
				for (let j = 0; j < member.card_sets.length; j++) {
					const target_set = member.card_sets[j].set_name
					const cmp = this.allsets[target_set][0]
					if (ris === "") ris = cmp.tcg_date + " " + cmp.set_name
					else if (cmp !== undefined && cmp.tcg_date < ris)
						ris = cmp.tcg_date + " " + cmp.set_name
				}
			}
			return ris
		},
		backToList() {
			this.$router.push("/")
		},
	},
}
</script>

<style scoped>
.flex-col > * {
	margin: var(--space-0);
}

.crest {
	background-color: white;
	height: 10vmax;
	margin: var(--space-0);
	background-position: center center;
	border-radius: var(--border-radius);
}

.crest img {
	height: 100%;
	border-radius: var(--border-radius);
}
</style>
