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
		<grid-view :columns="2" :col-gap="0.5" :row-gap="0.04">
			<archetype
				v-for="(archetype, index) of archetypeList"
				:key="`archetype-index-${index}`"
				:archetype="archetype"
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
		console.log(data.slice(0,3))
		return {
			allArchetypes: data.slice(20,40),
			counter: 0,
			archetypeList: data.filter(_=>_.crest !== undefined),
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
