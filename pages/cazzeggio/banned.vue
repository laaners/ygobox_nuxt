<template>
	<div class="flex-col" style="align-items: start">
		<table style="border-spacing: 0; border-collapse: collapse">
			<thead>
				<tr>
					<th><h1></h1></th>
					<th
						v-for="(banlist, i) of bannedCards.banlists"
						:key="'banlist-' + i"
						style="min-width: 180px"
					>
						<h2>{{ banlist }}</h2>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(card, i) of bannedCards.cards.slice(
						21 * index,
						21 * (index + 1)
					)"
					:key="i"
					style="border: 1px solid black"
				>
					<th class="flex-col" style="margin-right: 50px">
						<p>{{ card.name }}</p>
						<img
							style="width: 120px"
							:src="getPicUrl(card.id)"
							alt=""
						/>
						<p style="font-size: 0.7em">{{ card.date }}</p>
					</th>
					<td
						v-for="(banlist, j) of bannedCards.banlists"
						:key="'banlist-' + card.name + banlist"
						style="padding: 0"
					>
						<p style="font-size: 0.7em; width: 250px">
							<b>{{
								(+j + 0) % 5 === 0
									? card.name
									: Array(card.name.length)
											.fill("&ensp;")
											.join("")
							}}</b>
						</p>
						<div
							:style="{
								height: '150px',
								background: getColor(card, banlist),
								textAlign: 'center',
							}"
						></div>
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
			let changes = 0
			for (let i = 1; i < card.banlists.length; i++) {
				if (card.banlists[i].status !== card.banlists[i - 1].status)
					changes += 1
			}
			card.changes = changes
		})

		this.bannedCards.cards.sort((a, b) => b.changes - a.changes)
		console.log(this.bannedCards.cards)
	},
	methods: {
		getColor(card, banlist) {
			const cardBanlist = card.banlists.find((_) => _.banlist === banlist)
			// Unreleased
			const aY = +card.date.split(" ")[0].split("-")[0]
			const aM = +card.date.split(" ")[0].split("-")[1]
			const aD = +card.date.split(" ")[0].split("-")[2]
			const bY = +banlist.split("-")[0]
			const bM = +banlist.split("-")[1]
			if (cardBanlist === undefined) {
				// If released after the banlist, it is unrealeased then
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
