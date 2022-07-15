<template>
	<div
		class="draggable"
		:style="{
			left: mutableLeft + 'px',
			top: mutableTop + 'px',
		}"
		oncontextmenu="return false;"
		@dragstart="startDrag"
		@drag="dragging"
		@dragend="endDrag"
		@mousedown="rightClickEmit"
		@click="selectForGroupDrag()"
	>
		<card-modal :card-id="cardId" :rarity="'Common'" :src="src" class="card-modal"/>
	</div>
</template>

<script>
import CardModal from "./CardModal.vue"
export default {
	name: "GraphNode",
	components: { CardModal },
	props: {
		src: { required: true, type: String },
		left: { required: true, type: Number },
		top: { required: true, type: Number },
		cardId: { required: true, type: Number },
	},
	data() {
		return {
			mutableLeft: this.left,
			mutableTop: this.top,
			offsetX: 0,
			offsetY: 0,
			drag: false,
			emittingInterval: undefined,
		}
	},
	methods: {
		selectForGroupDrag() {
			console.log("okkk")
		},
		rightClickEmit(e) {
			if (
				e?.which === 3 &&
				e.target === e.currentTarget.querySelector("img")
			) {
				console.log("Emitting")
				this.$emit("update:addNewNode", this.cardId)
			}
		},
		startDrag(e) {
			const zoom = +document.body.querySelector(".canvas-content").style.zoom

			const nodes = document.body.querySelectorAll(".nodes")
			let count = 0
			for(const i of nodes) {
				if(count > 2) break
				const node = i.__vue__
				node.offsetX =
				node.offsetX === 0
						? e.clientX/zoom - node.left
						: e.clientX/zoom - node.mutableLeft
				node.offsetY =
					node.offsetY === 0
						? e.clientY/zoom - node.top
						: e.clientY/zoom - node.mutableTop
				node.drag = true
				node.emittingInterval = setInterval(() => {
				node.$emit("update:nodePosition", {
						id: +node.cardId,
						left: node.mutableLeft,
						top: node.mutableTop,
					})
				}, 50)

				count++
			}

/*
			this.offsetX =
				this.offsetX === 0
					? e.clientX/zoom - this.left
					: e.clientX/zoom - this.mutableLeft
			this.offsetY =
				this.offsetY === 0
					? e.clientY/zoom - this.top
					: e.clientY/zoom - this.mutableTop
			this.drag = true

			this.emittingInterval = setInterval(() => {
				this.$emit("update:nodePosition", {
					id: +this.cardId,
					left: this.mutableLeft,
					top: this.mutableTop,
				})
			}, 50)
			*/
		},
		dragging(e) {
			const nodes = document.body.querySelectorAll(".nodes")
			for(const i of nodes) {
				const node = i.__vue__
				
				if (!node.drag || e.clientX === 0 || e.clientY === 0) continue
				const zoom = +document.body.querySelector(".canvas-content").style.zoom
				node.mutableLeft = e.clientX/zoom - node.offsetX
				node.mutableTop = e.clientY/zoom - node.offsetY
			}
/*
			if (!this.drag || e.clientX === 0 || e.clientY === 0) return
			const zoom = +document.body.querySelector(".canvas-content").style.zoom
			this.mutableLeft = e.clientX/zoom - this.offsetX
			this.mutableTop = e.clientY/zoom - this.offsetY
			*/
		},
		endDrag(e) {
			const nodes = document.body.querySelectorAll(".nodes")
			for(const i of nodes) {
				const node = i.__vue__
				
				node.drag = false
				clearInterval(node.emittingInterval)
				node.$emit("update:nodePosition", {
					id: +node.cardId,
					left: node.mutableLeft,
					top: node.mutableTop,
				})
			}
			/*
			this.drag = false
			clearInterval(this.emittingInterval)
			this.$emit("update:nodePosition", {
				id: +this.cardId,
				left: this.mutableLeft,
				top: this.mutableTop,
			})
			*/
		},
	},
}
</script>

<style scoped>
div {
	width: 100%;
	position: absolute;
	cursor: move;
}
</style>
