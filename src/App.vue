<script setup>
import PokemonList from "@/components/pokemonList.vue";
import FooterComponent from "@/components/footerComponent.vue";
import HeaderComponent from "@/components/headerComponent.vue";
import Filters from "@/components/filters.vue";
import PokemonDetails from "@/components/pokemonDetails.vue";
</script>

<template>
	<pokemon-details></pokemon-details>
	<header-component></header-component>

	<div class="container-fluid">
		<main>
			<filters></filters>

			<div class="col-9 mx-auto">
				<PokemonList/>
			</div>


		</main>
	</div>

	<footer-component></footer-component>
</template>

<style scoped>
</style>
