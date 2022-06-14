<template>
	<div class="page container mt-5">
		<button v-if="counter > 0" @click="prev()">Prev</button>
		<button @click="next()">Next</button>
		<button @click="focusOn('Ritual')">Ritual</button>
		<button @click="focusOn('Fusion')">Fusion</button>
		<button @click="focusOn('Synchro')">Synchro</button>
		<button @click="focusOn('Xyz')">Xyz</button>
		<button @click="focusOn('Link')">Link</button>
		<button @click="focusOn('Pendulum')">Pendulum</button>
		<grid-view :columns="4" :col-gap="0.5" :row-gap="0.04">
			<archetype
				v-for="(archetype, index) of archetypeList"
				:key="`archetype-index-${index}`"
				:name="archetype.archetype"
				:true_name="archetype.true_name"
				:members="archetype.members"
				:date="archetype.date"
				:attributes="archetype.attributes"
				:types="archetype.types"
				:imgs="archetype.imgs"
				:crest="archetype.crest"
				class="flex-elem"
			/>
		</grid-view>
		<button v-if="counter > 0" @click="prev()">Prev</button>
		<button @click="next()">Next</button>
		<button @click="focusOn('Ritual')">Ritual</button>
		<button @click="focusOn('Fusion')">Fusion</button>
		<button @click="focusOn('Synchro')">Synchro</button>
		<button @click="focusOn('Xyz')">Xyz</button>
		<button @click="focusOn('Link')">Link</button>
		<button @click="focusOn('Pendulum')">Pendulum</button>
	</div>
</template>

<script>
import Archetype from "../../components/Archetype.vue"
import GridView from '../../components/GridView.vue'
export default {
	name: "ArchetypesPage",
	components: { Archetype, GridView},
	async asyncData({ $axios }) {
		const { data } = await $axios.get("/api/archetypes")
		return {
			allArchetypes: data,
			counter: 0,
			archetypeList: data,
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
		focusOn(mechanic) {
			if (mechanic === "Pendulum") {
				this.archetypeList = this.allArchetypes.filter((arc) => {
					let max = 0
					for (const key in arc.focus) {
						if (arc.focus[key] > max) max = arc.focus[key]
					}
					return arc.focus.Pendulum > 1 && arc.focus.Pendulum === max
				})
			} else {
				this.archetypeList = this.allArchetypes.filter((arc) => {
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
						arc.focus[mechanic] > 1 && arc.focus[mechanic] === max
					)
				})
			}
		},
	},
}
</script>

<style scoped>
</style>
