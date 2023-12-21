<script setup>
import PokemonList from "@/components/pokemonList.vue";
import FooterComponent from "@/components/footerComponent.vue";
import HeaderComponent from "@/components/headerComponent.vue";
import Filters from "@/components/filters.vue";
import PokemonDetails from "@/components/pokemonDetails.vue";
import {RouterLink, RouterView} from 'vue-router';
</script>

<template>
	<header-component></header-component>

	<div class="container-fluid">


		<main>

			<div class="col-10 mx-auto">
				<RouterView/>
			</div>


		</main>
	</div>


	<footer-component></footer-component>
</template>

<style scoped>
</style>
