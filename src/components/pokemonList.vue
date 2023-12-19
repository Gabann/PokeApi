<script setup>
import {usePokeApiStore} from "@/stores/pokeApiStore.js";
import {onMounted, ref, watch} from "vue";
import PokemonCard from "@/components/pokemonCard.vue";
import {Modal} from "bootstrap";

let pokeApiStore = usePokeApiStore()
let pokemons = ref([])

let currentPage = ref(1);
let pokemonsPerPage = 20;

let modal;
let modalPokemon = ref({});

watch(currentPage, async () => {
	pokemons.value = await pokeApiStore.getPokemons(pokemonsPerPage, (currentPage.value * pokemonsPerPage) - pokemonsPerPage)
}, {immediate: true})

function switchPage(targetPage) {
	currentPage.value = Math.floor(Math.min(Math.max(targetPage, 1), (1017 / pokemonsPerPage) + 1));
}

onMounted(() => {
	modal = new Modal(document.getElementById('pokemonModal'));
})

function displayModal(pokemon) {
	modalPokemon.value = pokemon;

	modal.show();
}
</script>

<template>
	<div class="d-flex flex-wrap">
		<div class="col-3" v-for="pokemon in pokemons">
			<PokemonCard :pokemon="pokemon" @click="displayModal(pokemon)"></PokemonCard>
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

	<div class="modal" id="pokemonModal" tabindex="-1" aria-labelledby="pokemonModal" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header" v-if="modalPokemon">
					<h5 class="modal-title" id="pokemonModal">{{ modalPokemon.name }}</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="pokemon-modal">
						<div class="row">
							<img :src="modalPokemon.sprite">
						</div>

						<div class="row">
							<div class="col-3">
								№
							</div>
							<div class="col-9">
								<p>{{ modalPokemon.id }}</p>
							</div>
						</div>

						<div class="row">
							<div class="col-3">
								<p>Name:</p>
							</div>
							<div class="col-9">
								<p>{{ modalPokemon.name }}</p>
							</div>
						</div>

						<div class="row">
							<div class="col-3">
								<p>Height:</p>
							</div>
							<div class="col-9">
								<p>{{ modalPokemon.height }}</p>
							</div>
						</div>

						<div class="row">
							<div class="col-3">
								<p>Weight:</p>
							</div>
							<div class="col-9">
								<p>{{ modalPokemon.weight }}</p>
							</div>
						</div>

						<div class="row">
							<div class="col-3">
								<p>Types:</p>
							</div>
							<div class="col-9">
								<p v-for="type in modalPokemon.types">{{ type.type.name }}</p>
							</div>
						</div>

						<div class="row">
							<div class="col-3">
								<p>Abilities:</p>
							</div>
							<div class="col-9">
								<p v-for="ability in modalPokemon.abilities">{{ ability.ability.name }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.page-navigation {
	padding: 20px;
}

.pagination {
	margin: 0;
}

.modal::before {
	content: "";
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	filter: grayscale(1);
	z-index: 1;
}

.modal-content {
	position: relative;
	z-index: 2;
}
</style>