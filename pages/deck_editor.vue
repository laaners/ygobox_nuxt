<template>
	<div id="flex-col" class="text-center">
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
			v-if="savedCards.length === 0 && allcards.length > 0"
			class="flex-col"
			style="margin-bottom: 1em; position: relative; overflow: hidden"
		>
			<button-secondary
				:title="'CARICA LE TUE CARTE'"
				@click.native="$refs.upload.click()"
			/>
			<input
				ref="upload"
				type="file"
				class="text-center"
				value="CARICA LE TUE CARTE!"
				@change="handleFile"
			/>
		</div>
		<grid-view
			v-if="savedCards.length > 0"
			:columns="3"
			:row-gap="0"
			:col-gap="1"
			style="width: 80%; margin-left: auto; margin-right: auto"
		>
			<button-secondary
				:title="'SALVA IL DECK'"
				@click.native="saveDeck()"
			/>
			<!--
			<button-secondary :title="'RESETTA IL DECK'" />
			-->
			<trash-icon />
			<x-icon />
			<button-secondary
				:title="'CARICA UN DECK'"
				@click.native="$refs.upload.click()"
			/>
			<input
				ref="upload"
				type="file"
				class="text-center"
				@change="handleFile"
			/>
		</grid-view>
		<!--
		<div v-if="savedCards.length > 0" class="flex-row after-page">
		-->
		<div class="flex-row after-page" oncontextmenu="return false;">
			<div class="flex-col deck-container">
				<h3>MAIN DECK ({{ getMainDeck().length }})</h3>
				<grid-view
					:columns="
						getMainDeck().length > 5
							? 10
							: getMainDeck().length * 2
					"
					:row-gap="0"
					:col-gap="0"
				>
					<card-modal
						v-for="(card, index) of getMainDeck()"
						:key="card.id + index"
						:src="getPicSmallUrl(card.id)"
						:card-id="card.id"
						:rarity="'Common'"
						@mousedown.native="removeFromDeck"
					/>
				</grid-view>
				<h3>EXTRA DECK ({{ getExtraDeck().length }})</h3>
				<grid-view
					:columns="
						getExtraDeck().length > 5
							? 10
							: getExtraDeck().length * 2
					"
					:row-gap="0"
					:col-gap="0"
				>
					<card-modal
						v-for="(card, index) of getExtraDeck()"
						:key="card.id + index"
						:src="getPicSmallUrl(card.id)"
						:card-id="card.id"
						:rarity="'Common'"
						@mousedown.native="removeFromDeck"
					/>
				</grid-view>
			</div>
			<div class="form-container flex-col">
				<h3>CERCA</h3>
				<div class="flex-col search-form">
					<div class="flex-row">
						<p>Solo carte preferite:&ensp;</p>
						<input type="checkbox" />
					</div>
					<search-form
						:hiding-mode="true"
						:searched-cards.sync="searchedCards"
					/>
				</div>
				<div>
					<button-secondary
						:title="'CERCA'"
						@click.native="
							$el.querySelector(`button[type='submit']`).click()
						"
					/>
					<button-secondary
						type="reset"
						:title="'RESET'"
						@click.native="
							$el.querySelector(`button[type='reset']`).click()
						"
					/>
				</div>
				<grid-view
					v-if="searchedCards.length > 0"
					class="search-results"
					:columns="3"
					:col-gap="0"
					:row-gap="0"
				>
					<card-modal
						v-for="(card, index) of searchedCards.slice(0, 20)"
						:key="card.id + index"
						:card-id="card.id"
						:rarity="'Common'"
						:src="getPicSmallUrl(card.id)"
					/>
				</grid-view>
			</div>
		</div>
		<div class="flex-col">
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
			<p>a</p>
		</div>
	</div>
</template>

<script>
import CardModal from "../components/CardModal.vue"
import GridView from "../components/GridView.vue"
import SearchForm from "../components/SearchForm.vue"
import ButtonSecondary from "../components/ButtonSecondary.vue"
import XIcon from '../components/icons/XIcon.vue'
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	components: { GridView, CardModal, SearchForm, ButtonSecondary, XIcon },
	mixins: [Utils],
	/*
	async asyncData({ $getAllCards }) {
		const allcards = await $getAllCards()
		return { allcards }
	},
	*/
	data: () => ({
		allcards: [],
		savedCards: [],
		searchedCards: [],
		deck: [],
	}),
	watch: {
		savedCards(newSavedCards, oldSavedCards) {
			this.reloadDeck(newSavedCards)
		},
	},
	async mounted() {
		this.allcards = await this.getAllCards()
	},
	methods: {
		removeFromDeck(e) {
			e.preventDefault()
			if (e?.which === 3) {
				try {
					const cardId = +e.target.src
						.split("/")
						.at(-1)
						.replace(".jpg", "")
					const toRemove = this.savedCards.find(
						(_) => _.id === cardId
					)
					if (toRemove !== undefined) {
						toRemove.checked =
							toRemove.checked > 0
								? toRemove.checked - 1
								: toRemove.checked
						this.reloadDeck(this.savedCards)
					}
				} catch (error) {
					console.log(error)
				}
			}
		},
		async handleFile(e) {
			console.log(e.target.files)
			const file = e.target.files[0]
			this.savedCards = await new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.onload = (e) => {
					const file = e.target.result
					try {
						resolve(JSON.parse(file))
					} catch (error) {
						alert("Errore, seleziona un file valido!\n" + error)
						resolve([])
					}
				}
				reader.onerror = (e) => alert(e.target.error.name)
				try {
					reader.readAsText(file)
				} catch (error) {
					console.log(error)
					resolve([])
				}
			})
			console.log(this.savedCards)
			this.savedCards.sort((a, b) => a.id - b.id)
			console.log(
				`HAI ${this.savedCards.length} CARTE DIVERSE NELLA TUA COLLEZIONE!`
			)
		},
		reloadDeck(newSavedCards) {
			const ris = []
			const checked = newSavedCards.filter((_) => _.checked > 0)
			this.deck = checked
			checked.forEach((card) => {
				for (let i = 0; i < card.checked; i++)
					ris.push(this.allcards.find((_) => _.id === card.id))
			})
			console.log(ris)
			this.deck = this.categorySort(ris)
		},
		getMainDeck() {
			return this.deck.filter((card) => {
				const isExtra =
					card.type.includes("XYZ") ||
					card.type.includes("Synchro") ||
					card.type.includes("Fusion") ||
					card.type.includes("Link")
				return !isExtra
			})
		},
		getExtraDeck() {
			return this.deck.filter((card) => {
				const isExtra =
					card.type.includes("XYZ") ||
					card.type.includes("Synchro") ||
					card.type.includes("Fusion") ||
					card.type.includes("Link")
				return isExtra
			})
		},
		saveDeck() {
			console.log(this.savedCards[0])
			console.log("Ok")
			this.savedCards[0].checked += 1
			this.reloadDeck(this.savedCards)
		},
	},
}
</script>

<style scoped>
.after-page {
	align-items: flex-start;
	margin: var(--space-1);
}

.deck-container {
	width: 50%;
	margin-right: var(--space-1);
}

.deck-container > * {
	margin-bottom: var(--space-0);
}

.form-container {
	width: 40%;
}

.form-container > * {
	margin: 0;
}

.search-form {
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	justify-content: flex-start;
	height: 20vh;
}

.search-form >>> button {
	display: none;
}

.search-results {
	margin-top: var(--space-1);
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	height: 66vh;
}

.form-container >>> .link-markers-grid {
	width: 20% !important;
}
</style>
