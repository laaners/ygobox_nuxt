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
			v-for="combo of combos"
			:key="combo.card"
			class="flex-col"
			style="width: 100%"
		>
			<div
				v-for="combo_n of combo.combos"
				:key="combo.card + combo_n.id"
				class="flex-row"
				style="width: 100%; align-items: start"
			>
				<div class="flex-col" style="width: 31%">
					<h1>卡组需要:</h1>
					<grid-view
						style="
							width: 100%;
							align-items: center;
							justify-items: center;
						"
						:columns="4"
						:row-gap="0"
						:col-gap="0"
					>
						<card-modal
							v-for="(card_id, i) of combo_n.pieces"
							:key="card_id + i"
							:src="getPicUrl(card_id)"
							:card-id="card_id"
							:rarity="'Common'"
						/>
					</grid-view>
				</div>
				<div class="flex-col" style="width: 31%">
					<h1>场上需要:</h1>
					<div
						v-for="(card, i) of combo_n.field"
						:key="card + i"
						class="flex-row"
						:style="{
							width: '100% !important',
							alignSelf: 'start',
							margin: '1%',
							marginLeft: '8%',
						}"
					>
						<img :src="getPicUrl(card.id)" style="height: 150px" />
						<h3 style="margin-left: 8%; width: 100%">
							{{ card.desc }}
						</h3>
					</div>
				</div>
				<div class="flex-col" style="width: 31%">
					<h1>Combo 结束会有:</h1>
					<div
						v-for="(card, i) of combo_n.board"
						:key="card + i"
						class="flex-row"
						:style="{
							width: '100%',
							alignSelf: 'start',
							margin: '1%',
							marginLeft: '8%',
							whiteSpace: 'pre-wrap',
						}"
					>
						<img :src="getPicUrl(card.id)" style="height: 150px" />
						<h3 style="margin-left: 8%; width: 100%">{{ card.desc }}</h3>
					</div>
				</div>
			</div>
			<hr style="border: 1px solid black; width: 100%" />
		</div>
	</div>
</template>

<script>
import GridView from "../components/GridView.vue"
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	components: { GridView },
	mixins: [Utils],
	// eslint-disable-next-line require-await
	async asyncData({ $axios }) {
		return {
			combos: [
				{
					card: "Union Carrier",
					combos: [
						{
							id: 1,
							pieces: [76218313, 83152482],
							field: [
								{
									id: 89631139,
									desc: "x1 暗属性或龙族怪兽",
								},
								{
									id: 40640057,
									desc: "x2 种族或属性相同的怪兽",
								},
							],
							board: [
								{
									id: 76218313,
									desc: "不能从EXTRA召唤",
								},
							],
						},
					],
				},
				{
					card: "Simorgh, Bird of Sovereignty",
					combos: [
						{
							id: 1,
							pieces: [73356503, 72330894, 34989413],
							field: [
								{
									id: 40640057,
									desc: "x3 怪兽",
								},
							],
							board: [
								{
									id: 73356503,
									desc: "大家只能特殊召唤风属性怪兽",
								},
							],
						},
						{
							id: 2,
							pieces: [29587993, 72330894, 34989413],
							field: [
								{
									id: 40640057,
									desc: "x3 怪兽",
								},
							],
							board: [
								{
									id: 29587993,
									desc: "效果发动无效并破坏",
								},
							],
						},
					],
				},
				{
					card: "Crystron Halqifibrax",
					combos: [
						{
							id: 1,
							pieces: [
								67441435, 21887175, 1861629, 50588353, 41999284,
							],
							field: [
								{
									id: 63977008,
									desc: "x1 Tuner",
								},
								{
									id: 40640057,
									desc: "x1 怪兽",
								},
							],
							board: [
								{
									id: 21887175,
									desc: "Avramax",
								},
							],
						},
						{
							id: 2,
							pieces: [67441435, 4280258, 50588353, 41999284],
							field: [
								{
									id: 63977008,
									desc: "x1 Tuner",
								},
								{
									id: 40640057,
									desc: "x1 怪兽",
								},
							],
							board: [
								{
									id: 4280258,
									desc: "ATK: 2400\nx3怪兽效果无效（不破坏）",
								},
							],
						},
						{
							id: 3,
							pieces: [
								73356503, 9047460, 72330894, 50588353, 41999284,
							],
							field: [
								{
									id: 63977008,
									desc: "x1 Tuner",
								},
								{
									id: 40640057,
									desc: "x1 怪兽",
								},
							],
							board: [
								{
									id: 73356503,
									desc: "大家只能特殊召唤风属性怪兽",
								},
								{
									id: 41999284,
									desc: "无效一个攻击",
								},
							],
						},
						{
							id: 4,
							pieces: [
								29587993, 69448290, 9047460, 72330894, 50588353,
								83152482, 41999284,
							],
							field: [
								{
									id: 63977008,
									desc: "x1 Tuner",
								},
								{
									id: 40640057,
									desc: "x2 怪兽",
								},
							],
							board: [
								{
									id: 29587993,
									desc: "xꝎ 效果发动无效并破坏",
								},
								{
									id: 69448290,
									desc: "Hai letto bene, INFINITO",
								},
								{
									id: 41999284,
									desc: "无效一个攻击",
								},
							],
						},
					],
				},
				{
					card: "Mecha Phantom Beast Auroradon",
					combos: [
						{
							id: 1,
							pieces: [
								72291078, 94693857, 27548199, 79606837,
								44097050, 50588353,
							],
							field: [
								{
									id: 63977008,
									desc: "x1 Tuner",
								},
								{
									id: 40640057,
									desc: "x1 怪兽",
								},
							],
							board: [
								{
									id: 27548199,
									desc: "效果发动无效（不破坏）",
								},
								{
									id: 79606837,
									desc: "效果发动无效并破坏",
								},
							],
						},
					],
				},
				{
					card: "Artifact Dagda",
					combos: [
						{
							id: 1,
							pieces: [
								20292186, 67441435, 8561192, 98558751, 7480763,
								50588353, 41999284,
							],
							field: [
								{
									id: 63977008,
									desc: "x1 Tuner",
								},
								{
									id: 40640057,
									desc: "x1 怪兽",
								},
							],
							board: [
								{
									id: 20292186,
									desc: "不能从EXTRA召唤\n（只有一个回合）",
								},
								{
									id: 8561192,
									desc: "Synchro LV10",
								},
							],
						},
					],
				},
			],
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
		const x = ""
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
