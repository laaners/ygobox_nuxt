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
			><b>{{ set.tcg_date }}</b></span
		>
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
	},
	data: () => ({
		notError: true,
	}),
	methods: {
		packImage() {
			return `sets/${this.set.set_code}.jpg`
		},
		handleRedirect() {
			console.log("csadsad")
			this.$emit('update:clickedSet', this.set.set_name)
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
	width: var(--pack-width);
}

span {
	text-align: center;
}
</style>
