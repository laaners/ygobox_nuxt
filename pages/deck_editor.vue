<template>
	<div id="flex-col" class="text-center flex-col">
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
				:title="'CARICA LE TUE CARTE!'"
				style="font-size: var(--font-size-h1)"
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
		<!--
		<button-secondary
			v-if="savedCards.length === 0 && allcards.length > 0"
			style="left: auto; right: auto;"
			:title="'RICOMINCIA DA ZERO'"
			@click.native="
				savedCards = [
					{
						id: 24094653,
						copies: 3,
						checked: 3,
						favourite: true,
						sets: ['2002-03-08 Legend of Blue Eyes White Dragon'],
					},
				]
			"
		/>
		-->
		<div v-if="savedCards.length > 0" class="flex-col">
			<grid-view
				:columns="3"
				:row-gap="0"
				:col-gap="1"
				style="width: 80%; margin-left: auto; margin-right: auto"
			>
				<button-secondary
					:title="'SALVA IL DECK'"
					@click.native="saveDeck()"
				/>
				<button-secondary :title="'RESETTA IL DECK'" />
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
			<div class="flex-row after-page" oncontextmenu="return false;">
				<div class="flex-col deck-container">
					<span>TASTO SINISTRO PER VEDERE L'EFFETTO</span>
					<span>TASTO DESTRO PER TOGLIERE DAL DECK</span>
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
							v-for="(card, i) of getMainDeck()"
							:key="card.id + i"
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
							v-for="(card, i) of getExtraDeck()"
							:key="card.id + i"
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
							<span>Solo carte preferite:&ensp;</span>
							<input ref="favourite" type="checkbox" />
						</div>
						<div class="flex-row">
							<p>Solo dal pacchetto:&ensp;</p>
							<select
								ref="selectPack"
								style="width: 50%"
								@change="bindSelectedSet"
							>
								<option
									label="Qualunque"
									selected="selected"
								></option>
								<option
									v-for="(set, i) of getSavedSets()"
									:key="set + i"
									:label="set"
								>
									{{ set }}
								</option>
							</select>
						</div>
						<search-form
							ref="searchForm"
							class="search-form-component"
							:hiding-mode="true"
							:searched-cards.sync="searchedCards"
						/>
					</div>
					<div>
						<button-secondary
							:title="'CERCA'"
							@click.native="
								$el.querySelector(
									`button[type='submit']`
								).click()
							"
						/>
						<button-secondary
							type="reset"
							:title="'RESET'"
							@click.native="
								$el.querySelector(
									`button[type='reset']`
								).click()
								$el.querySelector(
									`input[type='checkbox']`
								).checked = false
								$refs.selectPack.value = ''
							"
						/>
					</div>
					<div v-if="searchedAppendCards.length > 0" class="flex-col">
						<h3 style="margin-bottom: 0">
							{{ searchedAppendCards.length }} risultati trovati
						</h3>
						<grid-view
							class="search-results"
							:columns="
								searchedAppendCards.slice(
									index * cardsPerPage,
									(index + 1) * cardsPerPage
								).length > 1
									? 2
									: 1
							"
							:col-gap="1"
							:row-gap="0"
						>
							<container-searched-card
								v-for="(card, i) of searchedAppendCards.slice(
									index * cardsPerPage,
									(index + 1) * cardsPerPage
								)"
								:key="card.id + i"
								:card="card"
								:saved-info="card.saved_info"
								:src="getPicSmallUrl(card.id)"
								:form-checked-change.sync="formCheckedChange"
							/>
						</grid-view>
						<p>
							<input
								ref="enterInput"
								type="text"
								size="1"
								:value="index + 1"
								@keypress="enterIndex"
							/>
							/
							{{
								Math.ceil(
									searchedAppendCards.length / cardsPerPage
								)
							}}
						</p>
						<grid-view
							:columns="thereIsNext && thereIsPrev ? 2 : 1"
							:col-gap="3"
							:row-gap="0"
							style="width: 20%"
						>
							<button-secondary
								v-if="thereIsPrev"
								:title="'<'"
								@click.native="index -= 1"
							/>
							<button-secondary
								v-if="thereIsNext"
								:title="'>'"
								@click.native="index += 1"
							/>
						</grid-view>
					</div>
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
	</div>
</template>

<script>
import CardModal from "../components/CardModal.vue"
import GridView from "../components/GridView.vue"
import SearchForm from "../components/SearchForm.vue"
import ButtonSecondary from "../components/ButtonSecondary.vue"
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	components: { GridView, CardModal, SearchForm, ButtonSecondary },
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
		savedCardsHash: {},
		deck: [],

		searchedCards: [],
		searchedAppendCards: [],
		index: -1,
		cardsPerPage: 2 * 10,
		thereIsNext: false,
		thereIsPrev: false,
		formCheckedChange: {},
	}),
	watch: {
		savedCards(newSavedCards, oldSavedCards) {
			this.reloadDeck(newSavedCards)
		},
		searchedCards(newSearchedCard, oldSearchedCard) {
			const hash = this.hashGroupBy(this.savedCards, "id")
			console.log(this.$refs.selectPack.value)
			/*
			{
				21312: [{
						"id": 21312,
						"copies": 3
						...
					}]
				}
			}
			*/
			const filteredSavedCards = this.$refs.favourite.checked
				? this.savedCards.filter((_) => _.favourite).map((_) => _.id)
				: this.savedCards.map((_) => _.id)
			this.searchedAppendCards = this.categorySort(
				newSearchedCard.filter((_) => {
					return filteredSavedCards.includes(_.id)
				})
			)
			this.searchedAppendCards.forEach((_) => {
				_.saved_info = hash[_.id][0]
			})

			/*
			this.index = 0
			this.thereIsNext =
				this.index + 1 <
				Math.ceil(newSearchedCard.length / this.cardsPerPage)
			this.thereIsPrev = this.index > 0
			*/
		},
		searchedAppendCards(newSearchedAppendCards, oldSearchedAppendCards) {
			this.index = 0
			this.thereIsNext =
				this.index + 1 <
				Math.ceil(newSearchedAppendCards.length / this.cardsPerPage)
			this.thereIsPrev = this.index > 0
		},
		index(newIndex, oldIndex) {
			this.thereIsNext =
				newIndex + 1 <
				Math.ceil(this.searchedAppendCards.length / this.cardsPerPage)
			this.thereIsPrev = newIndex > 0
		},
		formCheckedChange(newCheckedChange, oldCheckedChange) {
			this.savedCards.find(
				(_) => _.id === newCheckedChange.cardId
			).checked = newCheckedChange.checked
			this.reloadDeck(this.savedCards)
		},
	},
	async mounted() {
		this.allcards = await this.getAllCards()
	},
	methods: {
		/* BEFORE PAGE */
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
			this.savedCards.forEach((_) => {
				_.id = +_.id
			})
			this.savedCards.sort((a, b) => a.id - b.id)
			console.log(
				`HAI ${this.savedCards.length} CARTE DIVERSE NELLA TUA COLLEZIONE!`
			)
		},
		/* DECK CONTAINER */
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

						/*
						const x = this.searchedAppendCards.find(_=>_.id === cardId)
						x.saved_info.checked = toRemove.checked
						this.reloadSearchResults++;
						*/
						const searchResults =
							this.$el.querySelector(".search-results")
						// document.body.querySelector(".search-results").__vue__.$slots.default[0]
						// document.body.querySelector(".search-results").__vue__.$slots.default[0].componentInstance.copies = 10
						// document.body.querySelector(".search-results").__vue__.$slots.default[0].componentOptions.propsData.card.id
						searchResults.__vue__.$slots.default.find(
							(slot) =>
								slot.componentOptions.propsData.card.id ===
								cardId
						).componentInstance.checked = toRemove.checked
					}
				} catch (error) {
					console.log(error)
				}
			}
		},
		reloadDeck(newSavedCards) {
			this.deck = []
			/*
			newSavedCards.forEach((card) => {
				if(card.checked === 0) {
					return
				}
				for(let i = 0; i < card.checked; i++)
					this.deck.push(this.allcards.find((_) => _.id === card.id))
			})
			*/
			let allCardsI = 0
			for (
				let newSavedCardsI = 0;
				newSavedCardsI < newSavedCards.length;
				newSavedCardsI++
			) {
				while (
					newSavedCards[newSavedCardsI].id !==
					this.allcards[allCardsI].id
				) {
					allCardsI++
				}
				//	same id
				const topush = this.allcards[allCardsI]
				for (let i = 0; i < newSavedCards[newSavedCardsI].checked; i++)
					this.deck.push(topush)
			}
			console.log("activated reload deck")
			this.deck = this.categorySort(this.deck)
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
		/* BUTTONS FOR YDK AND EXPORTING */
		saveDeck() {
			console.log(this.savedCards[0])
			console.log("Ok")
			this.savedCards[0].checked += 1
			this.reloadDeck(this.savedCards)
		},
		/* FORM */
		bindSelectedSet(e) {
			this.$el.querySelector(".search-form-component").__vue__.form.pack = e.target.value
		},
		getSelectedPack() {
			console.log(this.$refs.selectPack?.value)
			return this.$refs.selectPack === undefined
				? "pacsdsad"
				: this.$refs.selectPack.value
		},
		getSavedSets() {
			return [
				...new Set(
					this.savedCards
						.map((_) => _.sets)
						.reduce((a, b) => a.concat(b))
				),
			].sort((a, b) => (a > b ? -1 : 1))
		},
		enterIndex(e) {
			if (e.which === 13) {
				const value = this.$refs.enterInput.value
				if (isNaN(value)) {
					alert("Inserisci un numero!")
					return
				}
				if (
					value < 1 ||
					value >
						Math.ceil(this.searchedCards.length / this.cardsPerPage)
				) {
					alert("Inserisci un numero valido!")
					return
				}
				this.index = +value - 1
			}
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
	margin-top: 5vh;
	margin-right: var(--space-1);
}

.deck-container > * {
	margin: 0;
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
	height: 29vh;
}

.search-form div {
	margin: 0;
}

.search-form >>> button {
	display: none;
}

.search-results {
	margin-top: var(--space-1);
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	height: 59vh;
}

.form-container >>> .link-markers-grid {
	width: 25% !important;
}
</style>
