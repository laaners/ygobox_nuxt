<template>
	<div class="flex-col">
		<div class="flex-col top-menu">
			<h1>{{ archetypeList.length }} archetipi in questa sezione</h1>
			<grid-view
				:columns="8"
				:col-gap="1"
				:row-gap="0"
				style="width: 80%"
			>
				<button-secondary
					:title="'Crest'"
					@click.native="filter = 'Crest'"
				/>
				<button-secondary
					:title="'All'"
					@click.native="filter = 'All'"
				/>
				<button-secondary
					:title="'Ritual'"
					@click.native="filter = 'Ritual'"
				/>
				<button-secondary
					:title="'Fusion'"
					@click.native="filter = 'Fusion'"
				/>
				<button-secondary
					:title="'Synchro'"
					@click.native="filter = 'Synchro'"
				/>
				<button-secondary
					:title="'Xyz'"
					@click.native="filter = 'Xyz'"
				/>
				<button-secondary
					:title="'Link'"
					@click.native="filter = 'Link'"
				/>
				<button-secondary
					:title="'Pendulum'"
					@click.native="filter = 'Pendulum'"
				/>
			</grid-view>
			<button-secondary
				:title="'MOSTRA/NASCONDI COLORI SOLO PER EXTRA'"
				@click.native="toggleExtraColor = !toggleExtraColor"
			/>
			<div class="flex-row">
				<span><b>Archetipi per riga:&ensp;</b></span>
				<select v-model="archetypesPerRow">
					<option label="1">1</option>
					<option label="2">2</option>
					<option label="3">3</option>
					<option label="4">4</option>
					<option label="5">5</option>
					<option label="6">6</option>
					<option label="7">7</option>
					<option label="8">8</option>
					<option label="9">9</option>
					<option label="10">10</option>
				</select>
			</div>
			<div class="flex-row" style="width: 15%">
				<img
					v-for="attribute in attributes"
					:key="attribute"
					:src="attribute+'.png'"
					:style="{ width: 100/attributes.length+'%', marginLeft: 'var(--space-0)', marginRight: 'var(--space-0)'}"
					@click="attributeFilter = attribute"
				/>
 			</div>
			<div class="flex-row" style="width: 60%">
				<img
					v-for="type in types"
					:key="type"
					:src="type+'.png'"
					:style="{ width: 100/types.length+'%', marginLeft: 'var(--space-0)', marginRight: 'var(--space-0)'}"
					@click="typeFilter = type"
				/>
 			</div>
			<!--
				attribute
				types
				#members (sort by date)
				waifu
			-->
		</div>
		<grid-view
			:columns="archetypeList.length > 1 ? +archetypesPerRow : archetypeList.length+2"
			:col-gap="0.5"
			:row-gap="10 / archetypeList.length"
			style="align-self: flex-start"
		>
			<archetype
				v-for="(archetype, index) of archetypeList"
				:key="`archetype-index-${archetype.true_name + index}`"
				:archetype="archetype"
				class="flex-elem"
			/>
		</grid-view>
	</div>
</template>

<script>
import Archetype from "../../components/Archetype.vue"
import ButtonSecondary from "../../components/ButtonSecondary.vue"
import GridView from "../../components/GridView.vue"
export default {
	name: "ArchetypesPage",
	components: { Archetype, GridView, ButtonSecondary },
	async asyncData({ $axios }) {
		const { data } = await $axios.get("/api/archetypes")
		return {
			allArchetypes: data,
			counter: 0,
			archetypeList: data.filter((_) => _.crest !== undefined),
			filter: "Crest",
			toggleExtraColor: false,
			archetypesPerRow: 10,
			attributes: ['EARTH', 'DARK', 'LIGHT', 'FIRE', 'WATER', 'WIND', 'DIVINE'],
			types: ['Fairy', 'Beast', 'Fiend', 'Dragon', 'Thunder', 'Zombie', 'Spellcaster', 'Machine', 'Psychic', 'Aqua', 'Warrior', 'Sea Serpent', 'Reptile', 'Plant', 'Beast-Warrior', 'Cyberse', 'Dinosaur', 'Winged Beast', 'Fish', 'Wyrm', 'Insect', 'Rock', 'Pyro', 'Divine-Beast', 'Creator-God'],
			attributeFilter: 'All',
			typeFilter: 'All',
		}
	},
	head() {
		return {
			title: "Archetypes",
			meta: [
				{
					hid: "Archetypes",
					name: "Archetypes",
					content: `Archetypes`,
				},
			],
		}
	},
	watch: {
		toggleExtraColor(newToggle, oldToggle) {
			console.log(newToggle)
			this.updateArchetypeList()
			this.updateArchetypeList()
		},
		filter(newFilter, oldFilter) {
			console.log(newFilter)
			this.updateArchetypeList()
		},
		archetypesPerRow(newV, oldV) {
			console.log(newV)
		},
		attributeFilter(newV, oldV) {
			this.updateArchetypeList()
		},
		typeFilter(newV, oldV) {
			this.updateArchetypeList()
		}

	},
	methods: {
		next() {
			this.counter += 20
			this.archetypeList = this.allArchetypes.slice(
				this.counter,
				this.counter + 20
			)
		},
		prev() {
			this.counter -= 20
			this.archetypeList = this.allArchetypes.slice(
				this.counter,
				this.counter + 20
			)
		},
		updateArchetypeList() {
			this.archetypeList = JSON.parse(JSON.stringify(this.allArchetypes))
			if(this.attributeFilter !== 'All') this.archetypeList = this.archetypeList.filter(_=>_.attributes.includes(this.attributeFilter))
			if(this.typeFilter !== 'All') this.archetypeList = this.archetypeList.filter(_=>_.types.includes(this.typeFilter))
			console.log(this.toggleExtraColor)
			if (this.toggleExtraColor === true) {
				this.archetypeList.forEach((_) => {
					_.focus["No Extra"] = 0
				})
			}
			switch (this.filter) {
				case "Crest": {
					this.archetypeList = this.archetypeList.filter(
						(_) => _.crest !== undefined
					)
					break
				}
				case "All": {
					break
				}
				case "Pendulum": {
					this.archetypeList = this.archetypeList.filter((arc) => {
						let max = 0
						for (const key in arc.focus) {
							if (key === "No Extra") {
								if (arc.focus[key] - arc.focus.Pendulum > max)
									max = arc.focus[key] - arc.focus.Pendulum
							} else {
								// eslint-disable-next-line no-lonely-if
								if (arc.focus[key] > max) max = arc.focus[key]
							}
						}
						return (
							arc.focus.Pendulum > 1 && arc.focus.Pendulum === max
						)
					})
					break
				}
				default: {
					this.archetypeList = this.archetypeList.filter((arc) => {
						let max = 0
						for (const key in arc.focus) {
							if (
								arc.focus[key] > max &&
								key !== "No Extra" &&
								key !== "Pendulum"
							)
								max = arc.focus[key]
						}
						return (
							arc.focus[this.filter] > 1 &&
							arc.focus[this.filter] === max
						)
					})
					break
				}
			}
		},
		getArchetypeList() {
			const ris = JSON.parse(JSON.stringify(this.archetypeList))
			if (this.toggleExtraColor) {
				for (const elem of ris) elem.focus["No Extra"] = 0
			}
			return ris
		},
	},
}
</script>

<style scoped>
.flex-col > * {
	margin: var(--space-0);
}

.top-menu {
	margin: 0;
	width: 100%;
	/*
	position: fixed;
	z-index: 2;
	top: var(--header-padding);
	background: var(--color-darker);
	color: var(--color-light);
	*/
}
</style>
