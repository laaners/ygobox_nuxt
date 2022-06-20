<template>
	<div class="flex-col">
		<div class="flex-col" style="width: 100%">
			<input
				v-model="root"
				type="text"
				list="allcards"
				placeholder="Digita il nome di una carta!"
				style="width: 20%"
			/>
			<datalist id="allcards">
				<option
					v-for="(card, i) of allcards"
					:key="card.id + i"
					:value="card.name"
				>
					{{ card.name }}
				</option>
			</datalist>
			<button-secondary :title="'CERCA'" @click.native="startGraph()" />
			<div>
				<div
					id="mainCanvas"
					class="canvas"
					style="width: 95vw; height: 95vh; border: 1px solid black"
				>
					<div
						v-for="(draggable, i) of connections"
						:id="draggable.id"
						:key="'elem' + draggable.id + i"
						class="block draggable"
					>
						<img :src="getPicSmallUrl(draggable.id)" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ButtonSecondary from "../components/ButtonSecondary.vue"
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	components: { ButtonSecondary },
	mixins: [Utils],
	data: () => ({
		allcards: [],
		hashAllcards: {},
		connections: [],
		root: "",
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
	async mounted() {
		this.allcards = await this.getAllCards()
		this.hashAllcards = this.hashGroupBy(this.allcards, "name")
	},
	methods: {
		async startGraph() {
			this.connections = await this.$axios.$get(
				`/api/trivia/${this.root}`
			)
			this.connections.push({
				id: this.hashAllcards[this.root][0].id,
				name: this.root,
				desc: "",
			})
			console.log(this.connections[0])
		},
	},
	/*
	async mounted() {
		this.allcards = await this.getAllCards()
	},
	*/
}
</script>

<style scoped>
.flex-col > * {
	margin: var(--space-0);
}

.canvas {
	overflow: scroll;
}

img {
	width: 5vw;
}

.connector {
	border: 1px solid black;
}

</style>
