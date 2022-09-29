<template>
	<div class="flex-col">
		<grid-view
			:columns="3"
			:col-gap="0.5"
			:row-gap="1"
			style="width: 60%; justify-items: center; align-items: center"
		>
			<h2>Il tuo Deck</h2>
			<p>
				Editare, salvare deck<br />
				Cercare carte dalla collezione<br />
				Aprire pacchetti e aggiungere alla collezione<br />
			</p>
			<div class="done"></div>

			<h2>Carte Bandite</h2>
			<p>Vedere carte bandite</p>
			<div class="done"></div>

			<h2>Info Pacchetto</h2>
			<p>Vedere i pacchetti<br />Vedere le carte di un pacchetto</p>
			<div class="done"></div>

			<h2>Cerca Carta</h2>
			<p>Cercare le carte tra tutte e non solo dalla collezione</p>
			<div class="done"></div>

			<h2>Archetipi</h2>
			<p>Vedere tutti gli archetipi e loro dettagli</p>
			<div class="done"></div>

			<h2>Trivia</h2>
			<p>
				Da una carta, trovare tutte le carte con quello nell'immagine o
				collegate e viceversa, costruendo un grafo
			</p>
			<div class="done"></div>
		</grid-view>

		<grid-view
			v-if="archetypes.length > 0"
			style="width: 100%; align-items: center; justify-items: center"
			:columns="9"
			:row-gap="0"
			:col-gap="0"
		>
			<div v-for="arc of archetypes" :key="arc.arc" class="flex-col">
				<img :src="arc.crest" alt="" style="width: 80%" />
				<p>{{ arc.arc }}</p>
			</div>
		</grid-view>
	</div>
</template>

<script>
import GridView from "../components/GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	components: { GridView },
	mixins: [Utils],
	async asyncData({ $axios }) {
		const { data } = await $axios.get("/api/crests")
		const archetypes = data
			.sort((a, b) => (a.arc > b.arc ? 1 : -1))
			.filter((_) => {
				return (
					_.arc !== "Endymion" &&
					_.arc !== "Infernoid & Void" &&
					_.arc !== "True Draco & True King"
				)
			})
			.filter((_) => _.crest !== undefined)
		archetypes.forEach((_) => {
			if (_.arc === "Evilswarm & Infestation") _.arc = "lswarm"
			if (_.arc === "Buster Blader & Destruction Sword")
				_.arc = "Buster Blader"
			if (_.arc === "Evil★Twin & Live☆Twin") _.arc = "Live☆Twin"
			if (_.arc === "Heraldic Beast & Heraldry") _.arc = "Heraldic Beast"
			if (_.arc === "Infernoble Knight & Roland")
				_.arc = "Infernoble Knight"
			if (_.arc === "Steelswarm & Infestation") _.arc = "Steelswarm"
		})
		return {
			archetypes,
		}
	},
	data: () => ({
		bannedCards: [],
		savedCards: [],
		deck: [],
	}),
	head() {
		return {
			title: "Home Page",
			meta: [
				{
					hid: "Home Page",
					name: "Home Page",
					content: `Home Page`,
				},
			],
		}
	},
	mounted() {
		let x = ""
		this.archetypes.forEach((_) => {
			x += `- [${_.arc}](${_.credit})\n`
		})
		console.log(x)
	},
	/*
	async mounted() {
		this.archetypes = await this.$axios.get("/api/crests")
		this.archetypes = this.archetypes.data
			.sort((a, b) => (a.arc > b.arc ? 1 : -1))
			.filter((_) => {
				return _.arc !== "Endymion"
			})
			.forEach((_) => {
				if (_.arc === "Evilswarm & Infestation") _.arc = "lswarm"
			})
	},
	*/
}
</script>

<style scoped>
.done {
	border-radius: 50%;
	width: var(--font-size-body);
	height: var(--font-size-body);
	background: lightgreen;
}

.halfdone {
	border-radius: 50%;
	width: var(--font-size-body);
	height: var(--font-size-body);
	background: yellow;
}

.notdone {
	border-radius: 50%;
	width: var(--font-size-body);
	height: var(--font-size-body);
	background: red;
}

p {
	text-align: center;
}
</style>
