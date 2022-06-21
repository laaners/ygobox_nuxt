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
			this.offsetX =
				this.offsetX === 0
					? e.clientX - this.left
					: e.clientX - this.mutableLeft
			this.offsetY =
				this.offsetY === 0
					? e.clientY - this.top
					: e.clientY - this.mutableTop
			this.drag = true

			this.emittingInterval = setInterval(() => {
				this.$emit("update:nodePosition", {
					id: +this.cardId,
					left: this.mutableLeft,
					top: this.mutableTop,
				})
			}, 50)
		},
		dragging(e) {
			if (!this.drag || e.clientX === 0 || e.clientY === 0) return
			this.mutableLeft = e.clientX - this.offsetX
			this.mutableTop = e.clientY - this.offsetY
		},
		endDrag(e) {
			this.drag = false
			clearInterval(this.emittingInterval)
			this.$emit("update:nodePosition", {
				id: +this.cardId,
				left: this.mutableLeft,
				top: this.mutableTop,
			})
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
