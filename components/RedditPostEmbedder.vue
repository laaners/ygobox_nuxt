<template>
	<blockquote class="reddit-card" data-card-created="1490648549">
		<a :href="href"></a>
	</blockquote>
</template>

<script>
export default {
	name: "RedditPostEmbedder",
	props: {
		href: { required: true, type: String },
	},
}
</script>

<style scoped>
.button {
	color: var(--color-light);
	display: inline-block;
	padding: var(--space-0) var(--space-1);
	border-radius: var(--border-radius);
	border: none;
	background-color: var(--color-darker);
	font-family: var(--font-family-body);
	font-size: var(--font-size-body);
	font-weight: bold;
	text-decoration: none;

	cursor: pointer;
	transition: all 0.2s ease;
}
.button:hover {
	background-color: var(--color-dark);
}
</style>
