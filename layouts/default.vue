<!-- eslint-disable vue/multi-word-component-names -->
<!-- This Layout will be applied by default to all pages -->
<!--
<template>
	<div class="wrapper">
		<div class="content">
			<main class="container">
				<nuxt />
			</main>
		</div>
	</div>
</template>
-->
<template>
	<nuxt />
</template>

<script>
export default {
	layout: "default",
}
</script>

<style>
body {
	font-family: var(--font-family-body);
	/*
	font-size: var(--font-size-body);
	 background-color: var(--color-dark);
	margin: 0;
	*/
}

.flex-row {
	display: flex;
	justify-content: center;
	align-items: center;
}

.flex-col {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

</style>
