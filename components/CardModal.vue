<template>
	<div class="image-loader" :style="getBorder()">
		<p v-if="header">{{ header }}</p>
		<img
			class="small-image"
			:src="src"
			:alt="alt"
			@click="toggleFullImage()"
		/>
		<p v-if="footer">{{ footer }}</p>
		<transition name="fade">
			<div v-show="fullImage" class="modal">
				<button
					class="modal-close"
					aria-label="close-modal"
					@click="toggleFullImage()"
				>
					<x-icon />
				</button>
				<h2 ref="name"></h2>
				<div class="modal-view">
					<div class="full-image">
						<img :src="card.card_images[0].image_url" :alt="alt" />
					</div>
					<div class="effects">
						<p>
							{{ card.desc }}
						</p>
						<p ref="cheff"></p>
						<p ref="iteff"></p>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import XIcon from "./icons/XIcon.vue"
export default {
	name: "CardModal",
	components: { XIcon },
	props: {
		src: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			required: true,
		},
		card: {
			type: Object,
			required: true,
		},
		// eslint-disable-next-line vue/require-default-prop
		header: {
			type: String,
			required: false,
		},
		// eslint-disable-next-line vue/require-default-prop
		footer: {
			type: String,
			required: false,
		},
		// eslint-disable-next-line vue/require-default-prop
		border: {
			type: String,
			required: false,
		},
	},
	data: () => ({
		fullImage: false,
	}),
	methods: {
		async toggleFullImage() {
			this.fullImage = !this.fullImage
			if (this.fullImage) {
				const chCard = await this.$axios.$get(
					`api/cheff?id=${this.card.id}`
				)
				const itCard = await this.$axios.$get(
					`api/iteff?id=${this.card.id}`
				)
				this.$refs.cheff.innerHTML = chCard.desc
				this.$refs.iteff.innerHTML = itCard.desc
				this.$refs.name.innerHTML =
					this.card.name + " | " + chCard.name + " | " + itCard.name
			}
		},
		getBorder() {
			if (this.border)
				return {
					border: this.border,
				}
		},
	},
}
</script>

<style scoped>
.image-loader {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.small-image {
	cursor: pointer;
	width: 100%;
	padding: 0vw;
}

.modal {
	background: var(--color-darker);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	color: var(--color-light);

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
	color: var(--color-light-transparent);
	font-size: 3.5rem;
}

.modal-close:hover {
	color: var(--color-light);
}

.modal-view {
	display: flex;
	justify-content: center;
	align-items: center;

	margin: auto;
	position: relative;
	height: 90vmin;
}

.modal-view div {
	margin: 1vmin;
}

.full-image {
	width: 28vw;
	height: 95%;
}

.full-image img {
	width: 100%;
}

.effects {
	width: 30%;
	height: 95%;
	overflow-y: auto;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	font-size: var(--font-size-body);
}
</style>
