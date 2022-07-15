<template>
	<div class="flex-col" style="padding-bottom: 0">
		<span class="pop-up">{{ popUpText }}</span>
		<button-secondary
			v-show="g.nodes.length > 0"
			class="pic-button"
			:title="isFullArt ? 'CARD ART' : 'FULL ART'"
			@click.native="isFullArt = !isFullArt"
		/>
		<div class="flex-row" style="width: 30%">
			<input
				v-model="root"
				type="text"
				list="allcards"
				placeholder="Digita il nome di una carta!"
				style="width: 100%"
			/>&ensp;
			<datalist id="allcards">
				<option
					v-for="card of allcards"
					:key="card.id"
					:value="card.name"
				>
					{{ card.name }}
				</option>
			</datalist>
			<button-secondary :title="'CERCA'" @click.native="startGraph()" />
		</div>
		<div
			v-if="allcards.length === 0"
			class="loader"
			style="
				margin-left: auto;
				margin-right: auto;
				margin-bottom: var(--space-1);
			"
		></div>
		<div
			v-if="allcards.length > 0"
			class="canvas"
			oncontextmenu="return false;"
		>
			<div v-show="g.nodes.length > 0" class="canvas-content">
				<graph-edge
					v-for="edge of edges"
					:key="edge.target + '-' + edge.source"
					class="edges"
					:edge="edge"
					:source="g.nodes.find((_) => _.value.id === edge.source)"
					:target="g.nodes.find((_) => _.value.id === edge.target)"
					:draggable-width="draggableWidth"
					:draggable-height="draggableHeight"
					:remove-edge.sync="removeEdge"
				/>
				<graph-node
					v-for="(node, i) of g.nodes"
					:id="node.value.id"
					:key="'elem' + node.value.id + i"
					class="nodes"
					:src="
						isFullArt
							? getPicArtUrl(node.value.id)
							: getPicUrl(node.value.id)
					"
					:card-id="node.value.id"
					:left="node.value.left"
					:top="node.value.top"
					:add-new-node.sync="addNewNode"
					:node-position.sync="nodePosition"
					:style="{ width: '90px' }"
				/>
			</div>
		</div>
		<grid-view
			v-show="g.nodes.length > 0"
			:columns="3"
			:col-gap="1"
			:row-gap="0"
			style="width: 50%; position absolute; margin-top: 1%; margin-left: 1%; justify-items: center; margin-bottom: 0;"
		>
			<button-secondary
				:title="'-'"
				style="padding: 0; border-radius: 4px; width: 80%"
				@click.native="draggableSize-=0.1"
			/>
			<span>Zoom a {{ draggableSize.toFixed(1) }}</span>
			<button-secondary
				:title="'+'"
				style="padding: 0; border-radius: 4px; width: 80%"
				@click.native="draggableSize+=0.1"
			/>
		</grid-view>
	</div>
</template>

<script>
import ButtonSecondary from "../components/ButtonSecondary.vue"
import GraphNode from "../components/GraphNode.vue"
import Utils from "~/mixins/utils"
import Graph from "~/mixins/graph"
export default {
	name: "IndexPage",
	components: { ButtonSecondary, GraphNode },
	mixins: [Utils, Graph],
	data: () => ({
		allcards: [],
		hashAllcardsName: {},
		hashAllcardsId: {},
		root: "",
		g: { nodes: [] },
		addNewNode: "",
		removeEdge: "",
		draggableSize: 1,
		draggableHeight: 0,
		draggableWidth: 0,
		popUpText: "Nessun nodo presente",
		edges: [],
		nodePosition: {},
		isFullArt: false,
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
	watch: {
		removeEdge(newV, oldV) {
			const source = this.g.nodes.find((_) => _.value.id === newV.source)
			const target = this.g.nodes.find((_) => _.value.id === newV.target)
			source.outEdges = source.outEdges.filter(
				(_) => !(_.source === newV.source && _.target === newV.target)
			)
			target.outEdges = target.outEdges.filter(
				(_) => !(_.source === newV.target && _.target === newV.source)
			)
			if (
				source.outEdges.length === 0 &&
				this.getInEdges(this.g, source).length === 0
			)
				this.g.nodes = this.g.nodes.filter(
					(_) => _.value.id !== source.value.id
				)
			if (
				target.outEdges.length === 0 &&
				this.getInEdges(this.g, target).length === 0
			)
				this.g.nodes = this.g.nodes.filter(
					(_) => _.value.id !== target.value.id
				)
			this.popUpText = "Rimosso un arco"
			this.edges = []
			setTimeout(() => this.getEdges(), 100)
		},
		isFullArt(newV, oldV) {
			this.edges = []
			setTimeout(() => this.getEdges(), 100)
		},
		nodePosition(newV, oldV) {
			const n = this.g.nodes.find((_) => _.value.id === newV.id)
			n.value.left = newV.left
			n.value.top = newV.top
		},
		draggableSize(newV, oldV) {
			/*
			this.draggableWidth =
				this.$el.querySelector(`.canvas .nodes img`).clientWidth
			this.draggableHeight =
				this.$el.querySelector(`.canvas .nodes img`).clientHeight
			this.edges = []
			setTimeout(() => this.getEdges(), 100)
			*/
			this.$el.querySelector(".canvas-content").style.zoom = newV
		},
		async addNewNode(newV, oldV) {
			if (newV === "") return
			this.popUpText = "Caricamento..."

			this.draggableWidth =
				this.$el.querySelector(`.canvas .nodes img`).clientWidth
			this.draggableHeight =
				this.$el.querySelector(`.canvas .nodes img`).clientHeight

			if (this.hashAllcardsId[+newV] === undefined) {
				this.popUpText = "Carta non in database"
				return
			}

			const newNode = this.hashAllcardsId[+newV][0]
			const nodeEdge = await this.$axios.$get(
				`/api/trivia/${newNode.name.replace(/\//g, "%2F")}`
			)

			if (nodeEdge.length === 0) {
				this.popUpText = "Non ci sono trivia per questa carta"
				return
			}

			// Already present node
			const N1 = this.addNode(this.g, {
				name: newNode.name,
				id: newNode.id,
				top: 0,
				left: 0,
			})

			// leaves -> (max_i)*this.draggableWidth+(max_i-1)*0.1*this.draggableWidth
			// first left -> N1.value.left-(max_i)*this.draggableWidth+(max_i-1)*0.1*this.draggableWidth)/2
			let i = -1
			nodeEdge.forEach((_) => {
				if (_.name !== N1.value) {
					if (
						this.g.nodes.find((n) => n.value.id === _.id) ===
						undefined
					)
						i++
					const N2 = this.addNode(this.g, {
						name: _.name,
						id: _.id,
						top: N1.value.top + this.draggableHeight * 1.5,
						left: N1.value.left + this.draggableWidth * 1.1 * i,
					})
					this.addEdge(this.g, N1.value.id, N2.value.id, _.desc)
				}
			})
			this.popUpText =
				"Aggiunti nuovi nodi, tasto destro su un arco per rimuoverlo!"
			this.edges = []
			setTimeout(() => this.getEdges(), 100)
		},
	},
	async mounted() {
		this.allcards = await this.getAllCards()
		this.hashAllcardsName = this.hashGroupBy(this.allcards, "name")
		this.hashAllcardsId = this.hashGroupBy(this.allcards, "id")
	},
	methods: {
		startGraph() {
			this.addNewNode = ""
			this.edges = []
			this.popUpText = "Caricamento..."
			if (this.hashAllcardsName[this.root] === undefined) {
				this.popUpText = "Nome della carta sbagliata!"
				return
			}
			const canvas = this.$el.querySelector(".canvas")
			this.g = this.newGraph([])
			setTimeout(() => {
				this.addNode(this.g, {
					name: this.root,
					id: this.hashAllcardsName[this.root][0].id,
					top: 10,
					left: canvas.clientWidth - canvas.clientWidth + 10,
					/*	(canvas.clientWidth -
							(window.innerWidth * this.draggableSize) / 100) /
						2	*/
				})
				this.popUpText =
					"Tasto destro su una carta per avere i collegamenti!"
				this.$el.querySelector(".canvas-content").style.zoom = 1
			}, 100)
		},
		getEdges() {
			const edges = []
			for (const node of this.g.nodes) {
				for (const edge of node.outEdges) {
					if (
						edges.find((_) => {
							return (
								_.target === edge.target &&
								_.source === edge.source
							)
						}) === undefined
					) {
						edges.push(edge)
					}
				}
			}
			this.edges = []
			edges.forEach((e) => {
				const revE = edges.find(
					(_) => _.target === e.source && _.source === e.target
				)
				if (revE !== undefined) {
					e.reverseWeight = revE.weight
					if (
						this.edges.find((_) => {
							return (
								(_.target === e.target &&
									_.source === e.source) ||
								(_.target === e.source && _.source === e.target)
							)
						}) === undefined
					)
						this.edges.push(e)
				} else this.edges.push(e)
			})
		},
	},
}
</script>

<style scoped>
.pop-up {
	position: fixed;
	top: var(--header-padding);
	background: #222222;
	color: white;

	border-radius: var(--border-radius);
	padding: var(--space-0);
	right: 0;

	z-index: 10;
}

.pic-button {
	position: fixed;
	top: var(--header-padding);
	background: #222222;
	color: white;

	border-radius: var(--border-radius);
	padding: var(--space-0);
	left: 0;

	z-index: 10;
}

.flex-col > * {
	margin: var(--space-0);
}

.canvas {
	position: relative;
	overflow: scroll;

	width: 98vw;
	height: 75vh;
	border: 1px solid var(--color-darker);

	box-sizing: border-box;
	padding-left: 800px !important;
}
</style>
