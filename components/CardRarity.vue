<template>
	<div class="container">
		<img loading="lazy" :src="src" />
		<div :class="getClass()"></div>
	</div>
</template>

<script>
export default {
	name: "CardRarity",
	props: {
		src: {
			type: String,
			required: true,
		},
		rarity: {
			type: String,
			required: true,
		},
		card: {
			type: Object,
			required: true,
		},
	},
	methods: {
		getClass() {
			let rarity_size = this.card.type.toLowerCase().includes("pendulum")
				? "pack-info-rarity-pend"
				: "pack-info-rarity"
			rarity_size = this.card.type.toLowerCase().includes("link")
				? "pack-info-rarity-link"
				: rarity_size
			switch (this.rarity) {
				case "Common":
					return rarity_size + " C"
				case "Super Rare":
					return rarity_size + " SR"
				case "Ultra Rare":
					return rarity_size + " UR"
				case "Short Print":
					return rarity_size + " SP"
				case "Shatterfoil Rare":
					return rarity_size + " SHR"
				case "Duel Terminal Normal Parallel Rare":
					return rarity_size + " DNPR"
				case "Rare":
					return rarity_size + " R"
				case "Ultimate Rare":
					return rarity_size + " UtR"
				case "Secret Rare":
					return rarity_size + " ScR"
				case "Mosaic Rare":
					return rarity_size + " MSR"
				case "Gold Secret Rare":
					return rarity_size + " GScR"
				case "Gold Rare":
					return rarity_size + " GUR"
				case "Starfoil Rare":
					return rarity_size + " SFR"
				case "Premium Gold Rare":
					return rarity_size + " PG"
				case "Prismatic Secret Rare":
					return rarity_size + " PScR"
				case "Collector's Rare":
					return rarity_size + " CR"
				case "Duel Terminal Rare Parallel Rare":
					return rarity_size + " DRPR"
				case "Duel Terminal Super Parallel Rare":
					return rarity_size + " DSPR"
				case "Duel Terminal Ultra Parallel Rare":
					return rarity_size + " DUPR"
				case "Starlight Rare":
					return rarity_size + " StR"
				case "Extra Secret Rare":
					return rarity_size + " "
				case "Ghost Rare":
					return rarity_size + " GR"
				case "Platinum Rare":
					return rarity_size + " PIR"
				case "Ultra Parallel Rare":
					return rarity_size + " UPR"
				case "Ghost/Gold Rare":
					return rarity_size + " GGR"
				case "Platinum Secret Rare":
					return rarity_size + " PS"
				case "Super Short Print":
					return rarity_size + " SSP"
				case "Super Parallel Rare":
					return rarity_size + " SPR"
				case "Ultra Secret Rare":
					return rarity_size + " UScR"
				case "10000 Secret Rare":
					return rarity_size + " 10000ScR"
				default:
					return rarity_size + " "
			}
		},
	},
}
</script>

<style scoped>
.container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}

img {
	width: 100%;
}

.pack-info-rarity {
	position: absolute;
	width: 77%;
	height: 53%;
	top: 17.9%;
}

.pack-info-rarity-link {
	position: absolute;
	width: 77%;
	height: 53%;
	top: 17.9%;
	border-radius: 5%;
}

.pack-info-rarity-pend {
	position: absolute;
	width: 86.9%;
	height: 44.3%;
	top: 17.9%;
}
</style>
