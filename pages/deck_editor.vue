<template>
	<div id="flex-col" class="text-center flex-col">
		<div
			v-if="allcards.length === 0"
			class="loader"
			style="
				margin-left: auto;
				margin-right: auto;
				margin-bottom: var(--space-1);
				margin-top: var(--space-1) !important;
			"
		></div>
		<div
			v-if="savedCards.length === 0 && allcards.length > 0"
			class="flex-col"
			style="
				margin-top: var(--space-0);
				position: relative;
				overflow: hidden;
			"
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
			<h1>
				HAI {{ savedCards.length }} CARTE DIVERSE NELLA TUA COLLEZIONE!
			</h1>

			<div class="flex-row after-page">
				<div
					class="flex-col deck-container"
					oncontextmenu="return false;"
				>
					<grid-view
						:columns="3"
						:row-gap="0"
						:col-gap="1"
						style="
							width: 80%;
							margin-left: auto;
							margin-right: auto;
						"
					>
						<button-secondary
							:title="'SALVA IL DECK'"
							@click.native="saveDeck()"
						/>
						<button-secondary
							:title="'RESETTA IL DECK'"
							@click.native="resetDeck()"
						/>
						<button-secondary
							:title="'CARICA UN DECK'"
							@click.native="$refs.upload.click()"
						/>
						<input
							ref="upload"
							type="file"
							class="text-center"
							@change="uploadDeck"
						/>
					</grid-view>
					<span style="margin-top: var(--space-1)"
						>TASTO SINISTRO PER VEDERE L'EFFETTO</span
					>
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
					<div
						class="flex-col search-form"
						:style="
							searchedAppendCards.length > 0
								? { height: '15vh' }
								: {}
						"
					>
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
					<div class="redundant-form-buttons">
						<button-secondary
							:title="'CERCA'"
							@click.native="
								$el.querySelector(
									`button[type='submit']`
								).click()
							"
						/>
						<button-secondary
							:title="'RESET'"
							@click.native="
								$el.querySelector(
									`button[type='reset']`
								).click()
							"
						/>
					</div>
					<div
						v-if="searchedAppendCards.length > 0"
						class="flex-col"
						style="position: relative"
					>
						<h3 @click="multiPage = !multiPage">
							{{ searchedAppendCards.length }} risultati trovati
						</h3>
						<div v-if="multiPage" class="flex-col">
							<grid-view
								:columns="1"
								:col-gap="0"
								:row-gap="20"
								style="
									position: absolute;
									right: -11%;
									top: 15%;
								"
							>
								<multi-page-icon
									style="
										height: 4vmax;
										width: 4vmax;
										cursor: pointer;
									"
									@click.native="multiPage = true"
								/>
								<scroll-page-icon
									style="
										height: 4vmax;
										width: 4vmax;
										cursor: pointer;
									"
									@click.native="multiPage = false"
								/>
							</grid-view>
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
									v-for="(
										card, i
									) of searchedAppendCards.slice(
										index * cardsPerPage,
										(index + 1) * cardsPerPage
									)"
									:key="card.id + i"
									:card="card"
									:saved-info="card.saved_info"
									:src="getPicSmallUrl(card.id)"
									:form-checked-change.sync="
										formCheckedChange
									"
									:form-favourite-change.sync="
										formFavouriteChange
									"
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
										searchedAppendCards.length /
											cardsPerPage
									)
								}}
							</p>
						</div>
						<div v-if="!multiPage" class="flex-col">
							<grid-view
								:columns="1"
								:col-gap="0"
								:row-gap="20"
								style="
									position: absolute;
									right: -11%;
									top: 15%;
								"
							>
								<multi-page-icon
									style="
										height: 4vmax;
										width: 4vmax;
										cursor: pointer;
									"
									@click.native="multiPage = true"
								/>
								<scroll-page-icon
									style="
										height: 4vmax;
										width: 4vmax;
										cursor: pointer;
									"
									@click.native="multiPage = false"
								/>
							</grid-view>
							<grid-view
								style="overflow-y: scroll; height: 60vh"
								class="search-results"
								:columns="
									searchedAppendCards.length > 1 ? 2 : 1
								"
								:col-gap="1"
								:row-gap="0"
							>
								<container-searched-card
									v-for="(card, i) of searchedAppendCards"
									:key="card.id + i"
									:card="card"
									:saved-info="card.saved_info"
									:src="getPicSmallUrl(card.id)"
									:form-checked-change.sync="
										formCheckedChange
									"
									:form-favourite-change.sync="
										formFavouriteChange
									"
								/>
							</grid-view>
						</div>
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
import MultiPageIcon from "../components/icons/MultiPageIcon.vue"
import ScrollPageIcon from "../components/icons/ScrollPageIcon.vue"
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	components: {
		GridView,
		CardModal,
		SearchForm,
		ButtonSecondary,
		MultiPageIcon,
		ScrollPageIcon,
	},
	mixins: [Utils],
	/*
	async asyncData({ $getAllCards }) {
		const allcards = await $getAllCards()
		return { allcards }
	},
	*/
	async asyncData({ $axios }) {
		const bannedCards = await $axios.$get("/api/banned_cards")
		return { bannedCards }
	},
	data: () => ({
		bannedCards: [],
		allcards: [],
		hashAllcards: {},
		savedCards: [],
		deck: [],

		searchedCards: [],
		searchedAppendCards: [],
		index: -1,
		cardsPerPage: 6,
		thereIsNext: false,
		thereIsPrev: false,
		formCheckedChange: {},
		formFavouriteChange: {},
		multiPage: true,
	}),
	watch: {
		savedCards(newSavedCards, oldSavedCards) {
			this.reloadDeck(newSavedCards)
		},
		searchedCards(newSearchedCard, oldSearchedCard) {
			if (newSearchedCard.length === 0) {
				this.searchedAppendCards = []
				this.$refs.favourite.checked = false
				this.$refs.selectPack.value = ""
				this.multiPage = true
				return
			}
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
		formFavouriteChange(newFavouriteChange, oldFavouriteChange) {
			this.savedCards.find(
				(_) => _.id === newFavouriteChange.cardId
			).favourite = newFavouriteChange.favourite
		},
	},
	async mounted() {
		this.allcards = await this.getAllCards()
		this.hashAllcards = this.hashGroupBy(this.allcards, "id")
		window.addEventListener("scroll", this.fixDeckContainer, false)
		window.addEventListener("resize", this.fixDeckContainer, false)
	},
	// See Vue Issue: https://github.com/vuejs/vue/issues/1915
	beforeUnmount() {
		window.removeEventListener("scroll", this.fixDeckContainer, false)
		window.removeEventListener("resize", this.fixDeckContainer, false)
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
						this.updateSearchedCard(cardId, toRemove.checked)
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
			/*
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
			*/
			newSavedCards.forEach((card) => {
				if (card.checked === 0) return
				for (let i = 0; i < card.checked; i++)
					this.deck.push(this.hashAllcards[card.id][0])
			})

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
		fixDeckContainer(e) {
			const threshold = 600
			const deckContainer = this.$el.querySelector(".deck-container")
			//	document.body.querySelector(".deck-container").style
			const setStyle = {
				top: 0,
				marginTop: "var(--header-padding)",
				position: "fixed",
				overflowY: "scroll",
				height: "30%",
				justifyContent: "flex-start",
				backgroundColor: "white",
				zIndex: 9998,
			}
			if (window.scrollY >= threshold) {
				for (const prop of Object.keys(setStyle)) {
					deckContainer.style[prop.toString()] =
						setStyle[prop.toString()]
				}
			} else {
				for (const prop of Object.keys(setStyle)) {
					deckContainer.style[prop.toString()] = ""
				}
			}
		},
		/* BUTTONS FOR YDK AND EXPORTING */
		saveDeck() {
			const mainDeck = this.getMainDeck()
			if (mainDeck.length < 20 || mainDeck.length > 30)
				return alert("Scegli tra 20 e 30 carte!")
			const extraDeck = this.getExtraDeck()
			if (extraDeck.length >= 16)
				return alert("Troppe carte in extra deck!")

			const copies = this.hashGroupBy(mainDeck.concat(extraDeck), "name")
			console.log(copies)
			for (const name in copies) {
				if (copies[name].length > 3)
					return alert(`"${name}" presente in 4+ copie!`)
			}
			for (const banned of this.bannedCards) {
				if (copies[banned.name] !== undefined)
					return alert(`"${banned.name}" è bandito!`)
			}

			let text = "#main\n"
			mainDeck.forEach((_) => {
				text += _.id + "\n"
			})
			text += "300104005" //	Switcheroo
			//	text += "\n511002116"; //Orichalcum

			text += "\n#extra\n"

			extraDeck.forEach((_) => {
				text += _.id + "\n"
			})

			this.download("0Deck.ydk", text)
			this.download("00SavedCards.json", JSON.stringify(this.savedCards))
			// $(".cards-pack").html("");
			//	document.getElementById("pack-img").src = "";
			//	$("#search-result").html("");
			this.reloadDeck(this.savedCards)
		},
		resetDeck() {
			if (confirm("Sei sicuro di voler resettare il deck?")) {
				if (confirm("Vuoi mantenere l'extra?")) {
					this.savedCards
						.filter((_) => _.checked > 0)
						.forEach((savedCard) => {
							const card = this.hashAllcards[savedCard.id][0]
							const isExtra =
								card.type.includes("XYZ") ||
								card.type.includes("Synchro") ||
								card.type.includes("Fusion") ||
								card.type.includes("Link")
							if (!isExtra) {
								this.savedCards.find(
									(_) => _.id === savedCard.id
								).checked = 0
								this.updateSearchedCard(savedCard.id, 0)
							}
						})
				} else {
					this.savedCards.forEach((_) => {
						_.checked = 0
						this.updateSearchedCard(_.id, 0)
					})
				}
				this.reloadDeck(this.savedCards)
			}
		},
		async uploadDeck(e) {
			const file = e.target.files[0]
			/*
				if(!recentlySaved) {
					alert("NON PUOI CARICARE UN DECK SE NON HAI SALVATO DI RECENTE, SALVA E RICARICA LA PAGINA");
					return false;
				}
			*/
			const deck = await new Promise((resolve, reject) => {
				const reader = new FileReader()
				reader.onload = (e) => {
					const file = e.target.result
					try {
						let newDeck = file.toString().split("\r\n")
						if(newDeck.length < 2) newDeck = file.toString().split("\n")
						newDeck = newDeck.filter(_=>_.length > 0 && !isNaN(_)).map(_=>{return { "id": +_}})
						newDeck = this.hashGroupBy(newDeck, "id")
						console.log(newDeck)
						this.savedCards.forEach((card) => {
							if(newDeck[card.id] === undefined)
								card.checked = 0
							else
								card.checked = newDeck[card.id].length
							this.updateSearchedCard(card.id, card.checked)
						})
						this.reloadDeck(this.savedCards)
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
			console.log(deck)
		},
		/* FORM */
		bindSelectedSet(e) {
			this.$el.querySelector(".search-form-component").__vue__.form.pack =
				e.target.value
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
		updateSearchedCard(cardId, checked) {
			const searchResults = this.$el.querySelector(".search-results")
			// document.body.querySelector(".search-results").__vue__.$slots.default[0]
			// document.body.querySelector(".search-results").__vue__.$slots.default[0].componentInstance.copies = 10
			// document.body.querySelector(".search-results").__vue__.$slots.default[0].componentOptions.propsData.card.id
			if (searchResults === undefined || searchResults === null) return
			const toUpdate = searchResults.__vue__.$slots.default.find(
				(slot) => slot.componentOptions.propsData.card.id === cardId
			)
			if (toUpdate === undefined || toUpdate === null) return
			toUpdate.componentInstance.checked = checked
		},
	},
}
</script>

<style scoped>
.after-page {
	align-items: flex-start;
}

.deck-container {
	width: 50%;
	padding-top: 2%;
	margin-right: var(--space-1);
}

.deck-container > * {
	margin: 0;
}

.deck-container h3 {
	margin: var(--space-0);
}

.form-container {
	width: 40%;
}

.form-container > * {
	margin: 0;
}

.search-form {
	width: 100%;
	overflow-x: hidden;
	justify-content: flex-start;
	transition: all 0.2 linear;
	margin-bottom: 0;
}

.search-form >>> button {
	display: none;
}

.search-form div {
	margin: 0;
}

.search-form:hover {
	height: 100% !important;
}

.search-form:hover >>> button {
	display: initial;
}

.search-form:hover + .redundant-form-buttons {
	display: none;
}

.search-results {
	margin-top: var(--space-1);
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
}

.form-container >>> .link-markers-grid {
	width: 25% !important;
}
</style>
