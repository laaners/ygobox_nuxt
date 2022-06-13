<template>
	<div v-if="notError" class="flex-col container">
		<img
			loading="lazy"
			:src="packImage()"
			@error="notError = false"
			@click="handleRedirect()"
		/>
		<span>{{ set.set_name }}</span>
		<span
			><b> {{ set.tcg_date }}</b></span
		>
		<h4>{{ rarityPercentage }}</h4>
	</div>
</template>

<script>
export default {
	name: "ContainerPackInfo",
	props: {
		set: {
			type: Object,
			required: true,
		},
		// eslint-disable-next-line vue/require-default-prop
		rarityPercentage: {
			type: String,
			required: false,
		},
	},
	data: () => ({
		notError: true,
	}),
	methods: {
		packImage() {
			return `sets/${this.set.set_code}.jpg`
		},
		handleRedirect() {
			this.$emit("update:clickedSet", this.set.set_name)
		},
	},
}
</script>

<style scoped>
.container {
	position: relative;
	cursor: pointer;
}

img {
	width: 100%;
}

span {
	text-align: center;
}

h4 {
	margin: 0;
	font-weight: bolder;
	color: yellow;
}
</style>
