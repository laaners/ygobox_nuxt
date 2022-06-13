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
	<div>
		<page-header />
		<nuxt />
	</div>
</template>

<script>
import PageHeader from "../components/PageHeader.vue"
export default {
	components: { PageHeader },
	layout: "default",
}
</script>

<style>
body {
	font-family: var(--font-family-body);
	margin: 0;
	/*
	font-size: var(--font-size-body);
	 background-color: var(--color-dark);
	margin: 0;
	*/
}

p,
span {
	font-size: var(--font-size-body);
}

h1 {
	font-size: var(--font-size-h1);
}

h2 {
	font-size: var(--font-size-h2);
}

h3 {
	font-size: var(--font-size-h3);
}

h4 {
	font-size: var(--font-size-h4);
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
