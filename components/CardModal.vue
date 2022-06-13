<template>
	<div class="image-loader">
		<!--
		<img
			class="small-image"
			loading="lazy"
			:src="src"
			:alt="alt"
			@click="toggleFullImage()"
		/>
		-->
		<card-rarity
			class="small-image"
			:src="src"
			:rarity="rarity"
			:card-id="cardId"
			@click.native="toggleFullImage()"
		/>
		<transition name="fade">
			<div v-show="fullImage" class="modal">
				<button
					class="modal-close"
					aria-label="close-modal"
					@click="toggleFullImage()"
				>
					<x-icon />
				</button>
				<h1 ref="name"></h1>
				<div class="modal-view">
					<div class="full-image">
						<img
							loading="lazy"
							:src="`https://storage.googleapis.com/ygoprodeck.com/pics/${cardId}.jpg`"
							:alt="cardId"
						/>
					</div>
					<div class="effects">
						<p>{{ eneff }}</p>
						<p>{{ cheff }}</p>
						<p>{{ iteff }}</p>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import CardRarity from "./CardRarity.vue"
import XIcon from "./icons/XIcon.vue"
export default {
	name: "CardModal",
	components: { XIcon, CardRarity },
	props: {
		src: {
			type: String,
			required: true,
		},
		rarity: {
			type: String,
			required: true,
		},
		cardId: {
			type: Number,
			required: true,
		},
	},
	data: () => ({
		fullImage: false,
		eneff: "",
		cheff: "",
		iteff: "",
	}),
	methods: {
		async toggleFullImage() {
			this.fullImage = !this.fullImage
			if (this.fullImage) {
				const enCard = await this.$axios.$get(
					`api/card/${this.cardId}`
				)
				const chCard = await this.$axios.$get(
					`api/cheff/${this.cardId}`
				)
				const itCard = await this.$axios.$get(
					`api/iteff/${this.cardId}`
				)
				this.cheff = chCard.desc
				this.iteff = itCard.desc
				this.eneff = enCard.desc
				this.$refs.name.innerHTML =
					enCard.name + " | " + chCard.name + " | " + itCard.name
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
	transition: all 0.2s ease;
}

.small-image:hover {
	width: 95%;
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
	font-size: 3.5vw;
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

h1 {
	margin-bottom: 0;
	margin-top: var(--space-0);
	text-align: center;
}

.effects {
	width: 30%;
	height: 95%;
	overflow-y: auto;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
</style>
