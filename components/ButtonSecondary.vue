<template>
	<button class="button">{{ title }}</button>
</template>

<script>
export default {
	name: "ButtonSecondary",
	props: {
		title: { required: true, type: String },
	},
}
</script>

<style scoped>
.button {
	color: var(--color-darker);
	display: inline-block;
	padding: var(--space-0) var(--space-1);
	border-radius: var(--border-radius);
	background-color: var(--color-accent);
	font-family: var(--font-family-heading);
	font-size: var(--font-size-button);
	font-weight: bold;
	text-decoration: none;
}
.button:hover {
	background-color: var(--color-accent-dark);
}
</style>
