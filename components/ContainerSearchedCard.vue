<template>
	<div class="container flex-row">
		<card-modal
			class="card"
			:src="src"
			:card-id="card.id"
			:rarity="'Common'"
		/>
		<div class="flex-col info">
			<p style="text-align: center; font-size: 0.9vmax !important">
				<b>{{ card.name }}</b>
			</p>
			<span class="star flex-row">
				{{ card.attribute === undefined ? "" : card.attribute + "/" }}
				{{ card.race }}&ensp;
				<img v-if="card.level" src="/level.svg" />
				{{ card.level === undefined ? " " : card.level }}
			</span>
			<span>{{ card.type }}</span>
			<span>{{ getStats() }}</span>
			<span style="margin-bottom: 5%">
				{{ card.scale === undefined ? "" : "SCALE: " + card.scale }}
			</span>
			<grid-view
				:columns="3"
				:col-gap="1"
				:row-gap="0"
				style="width: 60%"
			>
				<button-secondary
					:title="'-'"
					style="padding: 0; border-radius: 4px"
					@click.native="checkedChange(-1)"
				/>
				<span>{{ checked }}/{{ copies }}</span>
				<button-secondary
					:title="'+'"
					style="padding: 0; border-radius: 4px"
					@click.native="checkedChange(1)"
				/>
			</grid-view>
			<span class="flex-row" style="margin-bottom: 1vh">
				<span
					class="fa fa-star"
					favourite="${favourite}"
					style="font-size: 2vw; color: ${color};"
					card_id="${toecho.id}"
				></span>
			</span>
		</div>
		<star-icon
			class="favourite"
			:style="getFavouriteStyle()"
			@click.native="favouriteChange()"
		/>
	</div>
</template>

<script>
import CardModal from "./CardModal.vue"
import GridView from "./GridView.vue"
import ButtonSecondary from "./ButtonSecondary.vue"
import StarIcon from "./icons/StarIcon.vue"
export default {
	name: "ContainerSearchedCard",
	components: { CardModal, GridView, ButtonSecondary, StarIcon },
	props: {
		src: {
			type: String,
			required: true,
		},
		card: {
			type: Object,
			required: true,
		},
		savedInfo: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			checked: this.savedInfo.checked,
			copies: this.savedInfo.copies,
			favourite: this.savedInfo.favourite,
		}
	},
	methods: {
		getStats() {
			let stats = ""
			if (this.card.atk !== undefined) {
				stats = this.card.atk
				if (this.card.def !== undefined) {
					stats += "/" + this.card.def
				} else {
					stats += "/Link " + this.card.linkval
				}
			}
			return stats
		},
		checkedChange(n) {
			if (this.checked + n > this.copies)
				return alert(
					"Non hai più di " + this.copies + " di questa carta!"
				)
			if (this.checked + n < 0)
				return alert("Non hai puoi togliere ancora di meno!")
			this.checked += n
			this.$emit("update:formCheckedChange", {
				cardId: this.card.id,
				checked: this.checked,
			})
		},
		getFavouriteStyle() {
			if (this.favourite)
				return {
					fill: "orange",
				}
			return {
				fill: "var(--color-darker)",
			}
		},
		favouriteChange() {
			this.favourite = !this.favourite
			this.$emit("update:formFavouriteChange", {
				cardId: this.card.id,
				favourite: this.favourite,
			})
		},
	},
}
</script>

<style scoped>
.container {
	position: relative;
	width: 100%;
	padding: var(--space-0);
	border-top: 0.2vh dashed black;
}

.card {
	width: 30%;
}

.info {
	width: 70%;
}

.info > * {
	font-size: 0.8vmax !important;
}

span {
	text-align: center;
}

.star img {
	width: 8%;
	margin: 0;
}

.favourite {
	width: var(--font-size-h2);
	height: var(--font-size-h2);
	cursor: pointer;
	position: absolute;

	top: 0;
	right: var(--space-1);
}
</style>
