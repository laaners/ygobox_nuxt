<template>
	<div class="flex-col">
		<div class="flex-col top-menu">
			<h1>{{ archetypeList.length }} archetipi in questa sezione</h1>
			<grid-view
				:columns="9"
				:col-gap="1"
				:row-gap="0"
				style="width: 80%"
			>
				<button-secondary
					v-for="(btn, i) of [
						'Crest',
						'Waifu',
						'All',
						'Ritual',
						'Fusion',
						'Synchro',
						'Xyz',
						'Link',
						'Pendulum',
					]"
					:key="btn + i"
					:title="btn"
					:style="{ opacity: filter === btn ? 1 : 0.5 }"
					@click.native="filter = btn"
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
			<h3 style="cursor: pointer;" @click="inclusiveAttributes = !inclusiveAttributes">
				{{
					inclusiveAttributes
						? "ATTRIBUTI INCLUSIVI"
						: "ATTRIBUTI ESCLUSIVI"
				}}
			</h3>
			<div class="flex-row" style="width: 100%; flex-wrap: wrap">
				<img
					v-for="attribute in attributes"
					:key="attribute"
					:src="attribute + '.png'"
					:style="{
						width: 20 / attributes.length + '%',
						marginLeft: 'var(--space-0)',
						marginRight: 'var(--space-0)',
						cursor: 'pointer',
						opacity: attributeFilter.includes(attribute) ? 1 : 0.5,
					}"
					@click="
						attributeFilter.includes(attribute)
							? (attributeFilter = attributeFilter.filter(
									(_) => _ !== attribute
							  ))
							: attributeFilter.push(attribute)
					"
				/>
			</div>
			<h3 style="cursor: pointer;" @click="inclusiveTypes = !inclusiveTypes">
				{{ inclusiveTypes ? "TIPI INCLUSIVI" : "TIPI ESCLUSIVI" }}
			</h3>
			<div class="flex-row" style="width: 100%; flex-wrap: wrap">
				<img
					v-for="type in types"
					:key="type"
					:src="type.toUpperCase() + '.png'"
					:style="{
						width: 60 / types.length + '%',
						marginLeft: 'var(--space-0)',
						marginRight: 'var(--space-0)',
						cursor: 'pointer',
						opacity: typeFilter.includes(type) ? 1 : 0.5,
					}"
					@click="
						typeFilter.includes(type)
							? (typeFilter = typeFilter.filter(
									(_) => _ !== type
							  ))
							: typeFilter.push(type)
					"
				/>
			</div>
			<!--
				#members (sort by date)
				waifu
			-->
		</div>
		<div v-if="loading" class="loader"></div>
		<grid-view
			:columns="
				archetypeList.length > 3
					? +archetypesPerRow
					: archetypeList.length + 3
			"
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
			loading: false,
			allArchetypes: data,
			counter: 0,
			archetypeList: data.filter(
				(_) => _.imgs.Poster === undefined || _.imgs === undefined
			),
			//	archetypeList: data.filter((_) => _.crest !== undefined),
			//	archetypeList: data.filter((_) => !_.waifu),
			filter: "Crest",
			toggleExtraColor: false,
			archetypesPerRow: 10,
			attributes: [
				"EARTH",
				"DARK",
				"LIGHT",
				"FIRE",
				"WATER",
				"WIND",
				"DIVINE",
				"SPELL",
				"TRAP",
			],
			types: [
				"Fairy",
				"Beast",
				"Fiend",
				"Dragon",
				"Thunder",
				"Zombie",
				"Spellcaster",
				"Machine",
				"Psychic",
				"Aqua",
				"Warrior",
				"Sea Serpent",
				"Reptile",
				"Plant",
				"Beast-Warrior",
				"Cyberse",
				"Dinosaur",
				"Winged Beast",
				"Fish",
				"Wyrm",
				"Insect",
				"Rock",
				"Pyro",
				"Divine-Beast",
				"Creator-God",
			],
			attributeFilter: [],
			typeFilter: [],
			inclusiveAttributes: false,
			inclusiveTypes: false,
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
			this.loading = true
			setTimeout(() => {
				this.updateArchetypeList()
			}, 10)
		},
		filter(newFilter, oldFilter) {
			this.loading = true
			setTimeout(() => {
				this.updateArchetypeList()
			}, 10)
		},
		attributeFilter(newV, oldV) {
			this.loading = true
			setTimeout(() => {
				this.updateArchetypeList()
			}, 10)
		},
		typeFilter(newV, oldV) {
			this.loading = true
			setTimeout(() => {
				this.updateArchetypeList()
			}, 10)
		},
		inclusiveAttributes(newV, oldV) {
			this.loading = true
			setTimeout(() => {
				this.updateArchetypeList()
			}, 10)
		},
		inclusiveTypes(newV, oldV) {
			this.loading = true
			setTimeout(() => {
				this.updateArchetypeList()
			}, 10)
		},
	},
	methods: {
		updateArchetypeList() {
			this.archetypeList = JSON.parse(JSON.stringify(this.allArchetypes))
			this.archetypeList = this.archetypeList.filter((_) => {
				//	For each of attributeFilter, there exists an attribute in archetypes.attributes
				return (
					this.attributeFilter.length === 0 ||
					(this.attributeFilter.every((aF) =>
						_.attributes.includes(aF)
					) &&
						(this.attributeFilter.length === _.attributes.length ||
							this.inclusiveAttributes))
				)
			})
			this.archetypeList = this.archetypeList.filter((_) => {
				return (
					this.typeFilter.length === 0 ||
					(this.typeFilter.every((tF) => _.types.includes(tF)) &&
						(this.typeFilter.length === _.types.length ||
							this.inclusiveTypes))
				)
			})
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
				case "Waifu": {
					this.archetypeList = this.archetypeList.filter(
						(_) => _.waifu
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
			this.loading = false
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
