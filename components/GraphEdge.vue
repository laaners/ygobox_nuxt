<template>
	<div>
		<hr
			class="edge"
			:style="getEdgeStyle()"
			oncontextmenu="return false;"
			@click="fullImage = !fullImage"
			@mousedown="rightClickRemove"
		/>
		<transition name="fade">
			<div
				v-show="fullImage"
				class="modal flex-col"
				oncontextmenu="return false;"
				:style="getScaleStyle()"
				@mousedown="rightClickClose"
			>
				<button
					class="modal-close"
					aria-label="close-modal"
					@click="fullImage = !fullImage"
				>
					<x-icon />
					<p>O TASTO DESTRO<br />PER CHIUDERE!</p>
				</button>
				<h1 ref="name">
					{{ source.value.name }} &lt;==&gt; {{ target.value.name }}
				</h1>
				<grid-view
					:columns="3"
					:col-gap="0"
					:row-gap="0"
					class="modal-view"
					style="justify-items: center; width: 80%"
				>
					<div
						class="full-image flex-col source-img"
						style="justify-content: flex-start"
					>
						<a :href="getPicUrl(source.value.id)" target="_blank">
							<img
								loading="lazy"
								:src="getPicUrl(source.value.id)"
								:alt="source.value.id"
							/>
						</a>
					</div>
					<div style="overflow-y: auto">
						<p>
							<u>
								<b>{{
									source.value.name +
									" ==> " +
									target.value.name
								}}</b>
							</u>
						</p>
						<p class="trivia-text">{{ edge.weight }}</p>
						<div v-if="edge.reverseWeight">
							<p>
								<u>
									<b>{{
										source.value.name +
										" <== " +
										target.value.name
									}}</b>
								</u>
							</p>
							<p class="trivia-text">{{ edge.reverseWeight }}</p>
						</div>
					</div>
					<div
						class="full-image flex-col target-img"
						style="justify-content: flex-start"
					>
						<a :href="getPicUrl(target.value.id)" target="_blank">
							<img
								loading="lazy"
								:src="getPicUrl(target.value.id)"
								:alt="target.value.id"
							/>
						</a>
					</div>
				</grid-view>
				<grid-view
					:columns="2"
					:col-gap="3"
					:row-gap="0"
					style="width: 20%"
				>
					<button-secondary
						:title="'CARD ART'"
						@click.native="changeImg('card')"
					/>
					<button-secondary
						:title="'FULL ART'"
						@click.native="changeImg('art')"
					/>
				</grid-view>
			</div>
		</transition>
	</div>
</template>

<script>
import GridView from "./GridView.vue"
import ButtonSecondary from "./ButtonSecondary.vue"
import XIcon from "./icons/XIcon.vue"
import Utils from "~/mixins/utils"
export default {
	name: "GraphEdge",
	components: { XIcon, GridView, ButtonSecondary },
	mixins: [Utils],
	props: {
		edge: { required: true, type: Object },
		source: { required: true, type: Object },
		target: { required: true, type: Object },
		draggableWidth: { required: true, type: Number },
		draggableHeight: { required: true, type: Number },
	},
	data() {
		return {
			fullImage: false,
		}
	},
	watch: {
		fullImage(newV, oldV) {
			if(newV) {
				const parentZoom = +document.body.querySelector(".canvas-content").style.zoom
				this.$el.querySelector(".modal").style.zoom = 1/+parentZoom
			}
		}
	},
	methods: {
		getScaleStyle() {
			return {
				
			}
		},
		rightClickRemove(e) {
			if (e?.which === 3 && e.target === e.currentTarget) {
				this.$emit("update:removeEdge", this.edge)
				this.fullImage = false
			}
		},
		rightClickClose(e) {
			if (e?.which === 3) {
				this.fullImage = false
			}
		},
		changeImg(option) {
			if (option === "card") {
				this.$el.querySelector(".source-img img").src = this.getPicUrl(
					this.source.value.id
				)
				this.$el.querySelector(".source-img a").href = this.getPicUrl(
					this.source.value.id
				)
				this.$el.querySelector(".target-img img").src = this.getPicUrl(
					this.target.value.id
				)
				this.$el.querySelector(".target-img a").href = this.getPicUrl(
					this.target.value.id
				)
			}
            else {
				this.$el.querySelector(".source-img img").src = this.getPicArtUrl(
					this.source.value.id
				)
				this.$el.querySelector(".source-img a").href = this.getPicArtUrl(
					this.source.value.id
				)
				this.$el.querySelector(".target-img img").src = this.getPicArtUrl(
					this.target.value.id
				)
				this.$el.querySelector(".target-img a").href = this.getPicArtUrl(
					this.target.value.id
				)
			}
		},
		getEdgeStyle() {
			const deg =
				(Math.atan(
					(this.source.value.top - this.target.value.top) /
						(this.target.value.left - this.source.value.left)
				) *
					360) /
				(2 * Math.PI)
			let width = Math.sqrt(
				(this.target.value.left - this.source.value.left) ** 2 +
					(this.target.value.top - this.source.value.top) ** 2
			)

			const left =
				(Math.abs(this.target.value.left - this.source.value.left) -
					width) /
					2 +
				(this.target.value.left < this.source.value.left
					? this.target.value.left
					: this.source.value.left) +
				this.draggableWidth / 2 +
				"px"
			const top =
				(this.target.value.top +
					this.source.value.top +
					this.draggableHeight / 2) /
					2 +
				"px"
			width += "px"

			return {
				webkitTransform: `rotate(${-deg}deg)`,
				position: "absolute",
				top,
				left,
				width,
				border: this.edge.reverseWeight ? '2px solid var(--color-darker)' : 'none',
				height: this.edge.reverseWeight ? '2px' : '2px',
				background: this.edge.reverseWeight ? 'var(--color-light)' : 'var(--color-darker)',
			}
		},
	},
}
</script>

<style scoped>
.edge {
	z-index: 0;
	cursor: pointer;
}

.edge:hover {
	background: blue !important;
}

.image-loader {
	width: 100%;
}

.small-image {
	cursor: pointer;
	width: 100%;
	padding: 0vw;
	transition: all 0.2s ease;
}

.small-image:hover {
	width: 95%;
}

.modal {
	background: #222222;
	color: white;

	height: 100%;
	width: 100%;
	left: 0;
	right: 0;
	top: 0;
	position: fixed;
	overflow: auto;
	z-index: 9998;
}

.modal-close {
	position: absolute;
	right: var(--space-0);
	top: var(--space-0);
	z-index: 9999;

	background: none;
	border: none;
	cursor: pointer;
	color: rgba(255, 255, 255, 0.33);
	font-size: 3.5vw;
}

.modal-close p {
	margin: 0;
}

.modal-close:hover {
	color: white;
}

.modal-view {
	/*margin: auto;*/

	position: relative;
	height: 75vmin;
}

.full-image {
	width: 23.5vw;
	height: 90%;
	margin: var(--space-1);
}

.full-image img {
	width: 100%;
}

.trivia-text {
	width: 100%;
	margin-top: var(--space-1);
	white-space: pre-line;
}

h1 {
	margin-bottom: 0;
	margin-top: var(--space-0);
	text-align: center;
	width: 85%;
}
</style>
