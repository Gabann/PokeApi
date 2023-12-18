<script setup>
import {usePokeApiStore} from "@/stores/pokeApiStore.js";
import {ref, watch} from "vue";
import PokemonCard from "@/components/pokemonCard.vue";

let pokeApiStore = usePokeApiStore()
let pokemons = ref([])

let currentPage = ref(1);
let pokemonsPerPage = 20;

watch(currentPage, async () => {
	pokemons.value = await pokeApiStore.getPokemons(pokemonsPerPage, (currentPage.value * pokemonsPerPage) - pokemonsPerPage)
}, {immediate: true})

function switchPage(targetPage) {
	currentPage.value = Math.floor(Math.min(Math.max(targetPage, 1), 1017 / pokemonsPerPage));
}
</script>

<template>
	<div class="d-flex flex-wrap">
		<div class="col-3" v-for="pokemon in pokemons">
			<PokemonCard :pokemon="pokemon" @click="console.log(pokemon.name)"></PokemonCard>
		</div>
	</div>

	<div class="page-navigation mx-auto justify-content-center d-flex align-items-center">
		<nav aria-label="Page navigation">

			<ul class="pagination">
				<li class="page-item">
					<button class="btn btn-primary" @click="switchPage(1)">First</button>
				</li>
				<li class="page-item">
					<button class="btn btn-primary" @click="switchPage(currentPage - 1)">Previous</button>
				</li>
				<li class="page-item page-number" v-if="currentPage - 2 > 0">
					<button class="btn btn-primary" @click="switchPage(currentPage-2)">{{ currentPage - 2 }}</button>
				</li>
				<li class="page-item page-number" v-if="currentPage - 1 > 0">
					<button class="btn btn-primary" @click="switchPage(currentPage-1)">{{ currentPage - 1 }}</button>
				</li>
				<li class="page-item page-number">
					<button class="btn btn-primary" disabled @click="switchPage(currentPage)">{{ currentPage }}</button>
				</li>
				<li class="page-item page-number">
					<button class="btn btn-primary" @click="switchPage(currentPage+1)">{{ currentPage + 1 }}</button>
				</li>
				<li class="page-item page-number">
					<button class="btn btn-primary" @click="switchPage(currentPage +2)">{{ currentPage + 2 }}</button>
				</li>
				<li class="page-item">
					<button class="btn btn-primary" @click="switchPage(currentPage + 1)">Next</button>
				</li>
				<li class="page-item">
					<button class="btn btn-primary" @click="switchPage(999999999)">Last</button>
				</li>
			</ul>
		</nav>
	</div>
</template>

<style scoped>
.page-navigation {
	padding: 20px;
}

.pagination {
	margin: 0;
}
</style>