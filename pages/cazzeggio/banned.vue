<template>
	<div class="flex-col" style="align-items: start">
		<div
			style="
				margin-left: 10px;
				display: flex;
				justify-content: flex-start;
			"
		>
			<div class="flex-row" style="margin-right: 60px">
				<div
					style="
						height: 30px;
						width: 30px;
						background: gray;
						textAlign: 'center;
						border: 2px solid black
					"
				></div>
				&ensp;
				<h2>Not released</h2>
			</div>
			<div class="flex-row" style="margin-right: 60px">
				<div
					style="
						height: 30px;
						width: 30px;
						background: white;
						textAlign: 'center;
						border: 2px solid black
					"
				></div>
				&ensp;
				<h2>3 - Unlimited</h2>
			</div>
			<div class="flex-row" style="margin-right: 60px">
				<div
					style="
						height: 30px;
						width: 30px;
						background: yellow;
						textAlign: 'center;
						border: 2px solid black
					"
				></div>
				&ensp;
				<h2>2 - Semi-Limited</h2>
			</div>
			<div class="flex-row" style="margin-right: 60px">
				<div
					style="
						height: 30px;
						width: 30px;
						background: orange;
						textAlign: 'center;
						border: 2px solid black
					"
				></div>
				&ensp;
				<h2>1 - Limited</h2>
			</div>
			<div class="flex-row" style="margin-right: 60px">
				<div
					style="
						height: 30px;
						width: 30px;
						background: red;
						textAlign: 'center;
						border: 2px solid black
					"
				></div>
				&ensp;
				<h2>0 - Forbidden</h2>
			</div>
		</div>
		<table style="border-spacing: 0; border-collapse: collapse">
			<thead>
				<tr>
					<th><h1></h1></th>
					<!--
					<th><h3>Card is unreleased</h3></th>
					-->
					<th
						v-for="(banlist, i) of bannedCards.banlists"
						:key="'banlist-' + i"
						style="min-width: 20px"
					>
						<h3>{{ banlist }}</h3>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(card, i) of bannedCards.cards.slice(
						21 * index,
						210 * (index + 1)
					)"
					:key="i"
					style="border: 1px solid black"
				>
					<th
						class="flex-col"
						style="margin-right: 20px; margin-left: 20px"
					>
						<h2 style="margin-bottom: 0; color: blue">
							{{ card.name }}
						</h2>
						<h2 style="margin-top: 0">
							{{ card.changes }} changes
						</h2>
						<card-modal
							:key="card.id"
							:card-id="card.id"
							:rarity="'Common'"
							:src="getPicUrl(card.id)"
							style="width: 180px"
						/>
						<p style="font-size: 0.7em; margin-bottom: 0">
							{{ card.date.split(" ")[0] }}
						</p>
						<p style="font-size: 0.7em; margin-top: 0">
							{{ card.date.replace(card.date.split(" ")[0], "") }}
						</p>
					</th>
					<!--
					<td
						:key="'beforebanlist'"
						style="padding: 0"
					>
						<div
							:style="{
								height: '150px',
								background: 'grey',
								textAlign: 'center',
								border: '0px solid white',
							}"
							class="flex-row"
						>
							<p style="font-size: 0.7em; width: 150px">
								<b>{{
									(+j + 0) % 5 === 0
										? card.name
										: Array(card.name.length)
												.fill("&ensp;")
												.join("")
								}}</b>
							</p>
						</div>
						<p>
							<b>Card is unreleased</b>
						</p>
					</td>
					-->
					<td
						v-for="(banlist, j) of bannedCards.banlists"
						:key="'banlist-' + card.name + banlist"
						style="padding: 0"
					>
						<div
							:style="{
								height: '150px',
								background: getColor(card, banlist),
								textAlign: 'center',
								border: '0px solid white',
							}"
							class="flex-row"
						>
							<p style="font-size: 0.7em; width: 150px">
								<b>{{
									(+j + 1) % 5 === 0
										? card.name
										: Array(card.name.length)
												.fill("&ensp;")
												.join("")
								}}</b>
							</p>
						</div>
						<p>
							<b>{{ banlist }}</b>
						</p>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import Utils from "~/mixins/utils"
export default {
	name: "IndexPage",
	mixins: [Utils],
	layout: "empty",
	async asyncData({ $axios }) {
		const { data } = await $axios.get("/api/banlist_history")
		// Sort by release data
		/*
		data.cards.sort((a, b) => {
			const aY = +a.date.split(" ")[0].split("-")[0]
			const aM = +a.date.split(" ")[0].split("-")[1]
			const aD = +a.date.split(" ")[0].split("-")[2]
			const bY = +b.date.split(" ")[0].split("-")[0]
			const bM = +b.date.split(" ")[0].split("-")[1]
			const bD = +b.date.split(" ")[0].split("-")[2]
			return aY * 10000 + aM * 100 + aD - (bY * 10000 + bM * 100 + bD)
		})
		*/
		// Sort by name
		data.cards.sort((a, b) => (a.name > b.name ? 1 : -1))
		return {
			bannedCards: data,
		}
	},
	data: () => ({
		bannedCards: [],
		savedCards: [],
		deck: [],
		index: 0,
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
		const max = JSON.parse(JSON.stringify(this.bannedCards.cards)).sort(
			(a, b) => b.name.length - a.name.length
		)
		console.log(max[0].name)
		console.log(max[1].name)
		console.log(max[2].name)
		console.log(max.length)

		this.bannedCards.cards.forEach((card) => {
			let changes = 1
			for (let i = 1; i < card.banlists.length; i++) {
				if (card.banlists[i].status !== card.banlists[i - 1].status)
					changes += 1
			}
			card.changes = changes
		})

		console.log(this.bannedCards.cards)
		this.bannedCards.cards = this.bannedCards.cards.filter(
			(_) => _.changes > 6
		)
		this.bannedCards.cards.sort((a, b) => b.changes - a.changes)
		console.log(this.bannedCards.cards)
	},
	methods: {
		getWidth(card, banlist) {
			const aY = +card.date.split(" ")[0].split("-")[0]
			const aM = +card.date.split(" ")[0].split("-")[1]
			const bY = +banlist.split("-")[0]
			const bM = +banlist.split("-")[1]

			// in the release month-year got hit
			if (aY === bY && aM === bM) {
				return "50%"
			}
			return "100%"
		},
		getColor(card, banlist) {
			const cardBanlist = card.banlists.find((_) => _.banlist === banlist)
			// Unreleased
			const aY = +card.date.split(" ")[0].split("-")[0]
			const aM = +card.date.split(" ")[0].split("-")[1]
			const aD = +card.date.split(" ")[0].split("-")[2]
			const bY = +banlist.split("-")[0]
			const bM = +banlist.split("-")[1]
			if (cardBanlist === undefined) {
				// If released after the banlist, it is unreleased then
				if (aY * 10000 + aM * 100 + aD > bY * 10000 + bM * 100) {
					return "grey"
				} else return "white"
			}

			// At 3
			if (cardBanlist === undefined) return "white"

			switch (cardBanlist.status) {
				case 3:
					return "white"
				case 2:
					return "yellow"
				case 1:
					return "orange"
				case 0:
					return "red"
				default:
					return "grey"
			}
		},
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
