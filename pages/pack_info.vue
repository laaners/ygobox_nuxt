<template>
	<div>
		<div class="flex-col">
			<div class="flex-row">
				<input id="pack" type="text" maxlength="125" size="25" />
				&ensp;
				<input
					type="button"
					class="custom"
					value="APRI PACCHETTO"
					@click="listCardsPack()"
				/>
			</div>
			<br />
			<img id="pack-img" src="" style="width: 15vw" />
		</div>
		<div v-for="card of appendCards" :key="card.id">
			{{ card.name }}
		</div>

		<div id="cards-pack" class="flex-col"></div>
		<div class="cards-pack flex-row text-center"></div>

		<div id="modalAnchor"></div>
	</div>
</template>

<script>
import Utils from "~/mixins/utils"
export default {
	name: "PackInfoPage",
	mixins: [Utils],
	/*
	async asyncData({ $getAllCards }) {
		const allcards = await $getAllCards()
		return { allcards }
	},
    */
	data: () => ({
		allcards: [],
		appendCards: [],
		time: undefined,
	}),
	/*
	async fetch() {
		this.allcards = await this.getAllCards()
	},
    fetchOnServer: true,
    */
	/*
	async mounted() {
		this.allcards = await this.getAllCards()
	},
	*/
	methods: {
		async listCardsPack() {
			const set_name = this.$el.querySelector("#pack").value
			this.appendCards = await this.$axios.$get(
				`api/set?set_name=${set_name}`
			)
		},
	},
}
</script>

<style scoped>
.flex-row {
	display: flex;
	justify-content: center;
	align-items: center;
}

.flex-col {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.banned,
.cards-pack {
	flex-wrap: wrap;
	align-content: center; /*where to start wrapping,
     center, flex-start, flex-end
     also space-between etc...*/

	text-align: center;
}

.banned div,
.cards-pack div {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.banned p {
	font-size: 1vw;
	overflow-wrap: break-word;
	inline-size: 19vw;
}

.banned img {
	width: 19vw;
	padding: 0;
	cursor: pointer;
}

.cards-pack p {
	font-size: 0.7vw;
	overflow-wrap: break-word;
	inline-size: 15vw;
}

.cards-pack img {
	width: 15vw;
	padding: 0;
	cursor: pointer;
}

#your-deck {
	width: 60%;
}

#search-card {
	height: 30vh;
	overflow-y: scroll;
}

#search-result {
	height: 80vh;
	overflow-y: scroll;

	justify-content: flex-start;
	align-items: flex-start;

	flex-wrap: wrap;
	align-content: flex-start; /*where to start wrapping,
     center, flex-start, flex-end
     also space-between etc...*/
}

#search-result img {
	width: 5.5vw;
	padding: 0vw;
	cursor: pointer;
	transition: all 0.4s ease-in-out;

	margin-bottom: 2vh;
}

#search-result .flex-col p {
	font-size: 1vw;
	overflow-wrap: break-word;
	inline-size: 11vw;
}

#main_deck,
#extra_deck {
	max-width: 100%;
	flex-wrap: wrap;
	display: flex;
	align-items: center;
	justify-content: center;
}

#main_deck img,
#extra_deck img {
	width: 5.5vw;
	padding: 0vw;
	cursor: pointer;
	transition: all 0.4s ease-in-out;
}

.cards-pack {
	background-color: gray;
	color: white;
}

html {
	/*serve per avere effetto quando si clicca un riferimento a una zona interna della pagina*/
	scroll-behavior: smooth;
}

.fa-star {
	cursor: pointer;
	font-size: 30px;
	color: black;
}

.checked {
	color: orange;
}

button,
input[type="button"],
input[type="file"] {
	cursor: pointer;
}
</style>
