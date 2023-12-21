<script setup>

import router from "@/router/index.js";
</script>

<template>
	<h1>Error 404</h1>
	<h1>Not found</h1>

	<a @click="router.push('/pokedex/1')">Retourner au début</a>
</template>

<style scoped>

</style>