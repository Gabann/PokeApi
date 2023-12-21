<script setup>
import router from "@/router/index.js";

const reloadPage = () => {
	window.location.reload();
};
</script>

<template>
	<header class="d-flex align-items-center">
		<div class="col-4">
			<!--			<img src="../assets/logo.png" alt="logo" @click="reloadPage">-->
		</div>

		<h1 class="text-center col-4">PokeApi in vue js</h1>

		<div class="col-4" style="text-align: right">
			<span @click="router.push('/login/')">Login / Sign up</span>
		</div>
	</header>
</template>

<style scoped>
header {
	height: 10vh;
	background-color: var(--main-color);
	padding: 0px 30px 0px 30px;
}

header img {
	max-height: 90%;
}
</style>