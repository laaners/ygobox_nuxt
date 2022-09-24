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

		<div
			v-for="type in types.slice(21,29)"
			:key="type"
			style="
				width: 100%;
				flex-wrap: wrap;
				margin-top: 1%;
				margin-bottom: 1%;
			"
			class="flex-row"
		>
			<div class="flex-col" style="width: 14%">
				<img
					:src="type.toUpperCase() + '.png'"
					:style="{
						marginLeft: 'var(--space-0)',
						marginRight: 'var(--space-0)',
						cursor: 'pointer',
					}"
				/>
				<h3>
					{{ type }} ({{
						showCards.filter((_) => _.race === type).length
					}})
				</h3>
			</div>
			<grid-view
				style="width: 83%"
				:columns="8"
				:row-gap="0"
				:col-gap="0"
			>
				<card-modal
					v-for="card of showCards.filter((_) => _.race === type)"
					:key="card.id"
					:src="getPicUrl(card.id)"
					:card-id="card.id"
					:rarity="'Common'"
				/>
			</grid-view>
			<hr style="height: 2px; background-color: black; width: 100%" />
		</div>

		<!--
		<div
			v-for="type in types"
			:key="type"
			style="width: 100%; justify-content: start; margin-bottom: 0.4%"
			class="flex-row"
		>
			<div class="flex-col" style="width: 10%">
				<img
					:src="type.toUpperCase() + '.png'"
					:style="{
						marginLeft: 'var(--space-0)',
						marginRight: 'var(--space-0)',
						marginBottom: '0',
						width: '50px',
						cursor: 'pointer',
					}"
				/>
				<p style="margin: 0">
					{{ type }} ({{
						showCards.filter((_) => _.race === type).length
					}})
				</p>
			</div>
			<div
				:style="{
					width:
						(showCards.filter((_) => _.race === type).length / 66.5) *
							100 +
						'%',
					height: '70px',
					backgroundImage: 'linear-gradient(yellow, orange,orange)',
				}"
			></div>
		</div>
		-->
	</div>
</template>

<script>
import GridView from "../components/GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	components: { GridView },
	mixins: [Utils],
	data: () => ({
		allcards: [],
		showCards: [],
		bannedCards: [],
		savedCards: [],
		deck: [],
		types: [
			"Fairy",
			"Beast",
			"Fiend",
			"Thunder",
			"Zombie",
			"Spellcaster",
			"Machine",
			"Psychic",
			"Aqua",
			"Warrior",
			"Sea Serpent",
			"Reptile",
			"Plant",
			"Beast-Warrior",
			"Cyberse",
			"Dinosaur",
			"Winged Beast",
			"Fish",
			"Wyrm",
			"Insect",
			"Rock",
			"Pyro",
			"Divine-Beast",
			"Creator-God",
		].sort((a, b) => (a > b ? 1 : -1)),
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
	async mounted() {
		this.allcards = await this.getAllCards()
		this.showCards = this.categorySort(
			this.allcards.filter(
				(_) =>
					_.name.includes("Dragon") &&
					_.race.toLowerCase() !== "dragon" &&
					_.type.includes("Monster")
			)
		)
	},
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
