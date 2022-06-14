<template>
	<form
		name="card-form"
		method="POST"
		class="text-center flex-col form"
		@submit.prevent="onSubmit()"
	>
		<!--
                            Inverti ricerca&ensp;<input name="inverted" type="checkbox">
                            <br>
                            -->
		<div class="flex-row">
			<p>Categoria:&ensp;</p>
			<select v-model="form.type1" name="type-1">
				<option label="Qualunque" selected="selected"></option>
				<option label="Mostro">Monster</option>
				<option label="Magia">Spell</option>
				<option label="Trappola">Trap</option>
			</select>
		</div>
		<grid-view
			:columns="2"
			:row-gap="0"
			:col-gap="5"
			style="width: 20%; text-align: center"
		>
			<p>Mostro:</p>
			<p>o Magia/Trappola:</p>
			<select v-model="form.type2" name="type-2">
				<option label="Qualunque" selected="selected"></option>
				<option label="Normale">Normal</option>
				<option label="Effetto">Effect</option>
				<option label="Scoperta">Flip</option>
				<option label="Union">Union</option>
				<option label="Gemelli">Gemini</option>
				<option label="Tuner">Tuner</option>
				<option label="Spirito">Spirit</option>
				<option label="Rituale">Ritual</option>
				<option label="Fusione">Fusion</option>
				<option label="Synchro">Synchro</option>
				<option label="Synchro Tuner">Synchro Tuner</option>
				<option label="Xyz">XYZ</option>
				<option label="Pendulum">Pendulum</option>
				<option label="Link">Link</option>
			</select>
			<select v-model="form.raceSpellTrap" name="race-spell-trap">
				<option label="Qualunque" selected="selected"></option>
				<option label="Normale">Normal</option>
				<option label="Rapida">Quick-Play</option>
				<option label="Continua">Continuous</option>
				<option label="Equipaggiamento">Equip</option>
				<option label="Rituale">Ritual</option>
				<option label="Terreno">Field</option>
				<option label="Contro-Trappola">Counter</option>
			</select>
		</grid-view>
		<div class="flex-col">
			<div class="flex-row">
				<p><b>Pendulum Scale:&ensp;</b></p>
				<input
					v-model="form.pendulumScale"
					name="pendulum-scale"
					type="text"
					size="5"
					value="_"
				/>
			</div>
			<p>(Mettere gli operatori, per esempio ==13, &lt;=8, &gt;3)</p>
		</div>

		<div class="flex-col" style="width: 100%">
			<p><b>Se Link, il mostro ha ESATTAMENTE queste frecce:</b></p>
			<grid-view
				:columns="3"
				:col-gap="0"
				:row-gap="10"
				class="link-markers-grid"
			>
				<img
					loading="lazy"
					src="/false/Top-Left.png"
					@click="markerEvent"
				/>
				<img loading="lazy" src="/false/Top.png" @click="markerEvent" />
				<img
					loading="lazy"
					src="/false/Top-Right.png"
					@click="markerEvent"
				/>
			</grid-view>
			<grid-view
				:columns="3"
				:col-gap="0"
				:row-gap="10"
				class="link-markers-grid"
			>
				<img
					loading="lazy"
					src="/false/Left.png"
					@click="markerEvent"
				/>
				<div></div>
				<img
					loading="lazy"
					src="/false/Right.png"
					@click="markerEvent"
				/>
			</grid-view>
			<grid-view
				:columns="3"
				:col-gap="0"
				:row-gap="10"
				class="link-markers-grid"
			>
				<img
					loading="lazy"
					src="/false/Bottom-Left.png"
					@click="markerEvent"
				/>
				<img
					loading="lazy"
					src="/false/Bottom.png"
					@click="markerEvent"
				/>
				<img
					loading="lazy"
					src="/false/Bottom-Right.png"
					@click="markerEvent"
				/>
			</grid-view>
		</div>
		<grid-view
			:columns="2"
			:row-gap="0"
			:col-gap="5"
			style="width: 20%; text-align: center"
		>
			<p>Tipo:</p>
			<p>e/o Attributo:</p>
			<select v-model="form.raceMonster" name="race-monster">
				<option label="Qualunque" selected="selected"></option>
				<option label="Aqua">Aqua</option>
				<option label="Bestia">Beast</option>
				<option label="Bestia Alata">Winged Beast</option>
				<option label="Cyberso">Cyberse</option>
				<option label="Demone">Fiend</option>
				<option label="Dinosauro">Dinosaur</option>
				<option label="Drago">Dragon</option>
				<option label="Fata">Fairy</option>
				<option label="Guerriero">Warrior</option>
				<option label="Guerriero-Bestia">Beast-Warrior</option>
				<option label="Incantatore">Spellcaster</option>
				<option label="Insetto">Insect</option>
				<option label="Macchina">Machine</option>
				<option label="Pesce">Fish</option>
				<option label="Pianta">Plant</option>
				<option label="Psichico">Psychic</option>
				<option label="Pyro">Pyro</option>
				<option label="Rettile">Reptile</option>
				<option label="Roccia">Rock</option>
				<option label="Serpente Marino">Sea Serpent</option>
				<option label="Tuono">Thunder</option>
				<option label="Wyrm">Wyrm</option>
				<option label="Zombie">Zombie</option>
			</select>
			<select v-model="form.attribute" name="attribute">
				<option label="Qualunque" selected="selected"></option>
				<option label="TERRA">EARTH</option>
				<option label="ACQUA">WATER</option>
				<option label="VENTO">WIND</option>
				<option label="OSCURITÀ">DARK</option>
				<option label="LUCE">LIGHT</option>
				<option label="FUOCO">FIRE</option>
				<option label="DIVINO">DIVINE</option>
			</select>
		</grid-view>
		<div class="flex-row">
			<p>Livello/Rango/Classificazione Link:&ensp;</p>
			<select v-model="form.levelRankRating" name="level-rank-rating">
				<option label="Qualunque" selected="selected">_</option>
				<option label="1-4">_&gt;=1 &amp;&amp; _&lt;=4</option>
				<option label="5-6">_&gt;=5 &amp;&amp; _&lt;=6</option>
				<option label="7+">_&gt;=7</option>
				<option label="1">_==1</option>
				<option label="2">_==2</option>
				<option label="3">_==3</option>
				<option label="4">_==4</option>
				<option label="5">_==5</option>
				<option label="6">_==6</option>
				<option label="7">_==7</option>
				<option label="8">_==8</option>
				<option label="9">_==9</option>
				<option label="10">_==10</option>
				<option label="11">_==11</option>
				<option label="12">_==12</option>
			</select>
		</div>
		<grid-view
			:columns="2"
			:row-gap="0"
			:col-gap="5"
			style="width: 20%; text-align: center"
		>
			<p>ATK</p>
			<p>DEF</p>
			<input
				v-model="form.atk"
				type="text"
				name="ATK"
				size="5"
				value="> -1"
			/>
			<input
				v-model="form.def"
				type="text"
				name="DEF"
				size="5"
				value="> -1"
			/>
		</grid-view>
		<p>(Mettere gli operatori, per esempio ==1900, &lt;=500, &gt;2000)</p>
		<div></div>
		<div class="flex-row">
			<p>Il nome contiene:&ensp;</p>
			<input
				v-model="form.cardName"
				type="text"
				name="card-name"
				size="30"
			/>
		</div>
		<p>
			(In inglese, aggiungere .* se si vuole cercare per pi&ugrave;
			parole: poly.*ation)
		</p>
		<div></div>
		<div class="flex-row">
			<p>L'effetto contiene:&ensp;</p>
			<input
				v-model="form.cardEffect"
				type="text"
				name="card-effect"
				size="30"
			/>
		</div>
		<p>
			(In inglese, aggiungere .* se si vuole cercare per pi&ugrave;
			parole: destroy.*all)
		</p>
		<div>
			<button-secondary type="submit" :title="'CERCA'" />
			<button-secondary
				type="reset"
				:title="'RESET'"
				@click.native="resetForm()"
			/>
		</div>
		<div v-if="loading" class="loader"></div>
	</form>
</template>

<script>
import GridView from "./GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "SearchForm",
	components: { GridView },
	mixins: [Utils],
	data: () => ({
		form: {
			pack: "",
			type1: "",
			type2: "",
			raceSpellTrap: "",
			pendulumScale: "_",
			raceMonster: "",
			attribute: "",
			levelRankRating: "_",
			atk: "> -1",
			def: "> -1",
			cardName: "",
			cardEffect: "",
			linkmarkers: [],
		},
		loading: false,
	}),
	methods: {
		async onSubmit() {
			this.loading = true
			const results = await this.$axios.$post(
				"api/search_cards",
				this.form
			)
			console.log(results)
			this.$emit("update:searchedCards", this.categorySort(results))
			this.loading = false
		},
		resetForm() {
			this.form = {
				pack: "",
				type1: "",
				type2: "",
				raceSpellTrap: "",
				pendulumScale: "_",
				raceMonster: "",
				attribute: "",
				levelRankRating: "_",
				atk: "> -1",
				def: "> -1",
				cardName: "",
				cardEffect: "",
				linkmarkers: [],
			}
			const markers = this.$el.querySelectorAll("img")
			Array.from(markers).forEach(_=> {
				_.src = _.src.replace("true", "false")
			})
			this.$emit("update:searchedCards", [])
		},
		markerEvent(e) {
			const marker = e.target.src.split("/").at(-1).replace(".png", "")
			if (e.target.src.includes("true")) {
				e.target.src = e.target.src.replace("true", "false")
				this.form.linkmarkers = this.form.linkmarkers.filter(
					(_) => _ !== marker
				)
			} else {
				e.target.src = e.target.src.replace("false", "true")
				this.form.linkmarkers.push(marker)
			}
			console.log(this.form.linkmarkers)
		},
	},
}
</script>

<style scoped>
.form > div {
	margin: var(--space-0);
}

p {
	margin: 0;
}

.loader {
	position: absolute;
}

.link-markers-grid {
	width: 8%;
	margin-top: var(--space-1);
}

.link-markers-grid > img {
	margin-left: auto;
	margin-right: auto;
}
</style>
