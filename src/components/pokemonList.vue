<script setup>
import {onMounted, ref, watch, watchEffect} from "vue";
import PokemonCard from "@/components/pokemonCard.vue";
import {Modal} from "bootstrap";
import {useFilterStore} from "@/stores/filterStore.js";

let filterStore = useFilterStore();

let currentPage = ref(1);
let pokemonsPerPage = 20;

let modal;
let modalPokemon = ref({});

function switchPage(targetPage) {
	currentPage.value = Math.floor(Math.min(Math.max(targetPage, 1), (filterStore.filteredPokemonArray.length / pokemonsPerPage) + 1));
}

function displayModal(pokemon) {
	modalPokemon.value = pokemon;
	modal.show();
}

onMounted(() => {
	modal = new Modal(document.getElementById('pokemonModal'));
});
</script>

<template>
	<div class="d-flex flex-wrap">

		<template v-for="(pokemon, index) in filterStore.filteredPokemonArray">
			<div class="col-xl-3 col-md-4 col-12"
			     v-if="index < (pokemonsPerPage * currentPage) && index >= (currentPage * pokemonsPerPage) - pokemonsPerPage">
				<PokemonCard :pokemon="pokemon" @click="displayModal(pokemon)"></PokemonCard>
			</div>
		</template>
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


	<!--	Todo try to use v-model for this-->
	<div class="modal" id="pokemonModal" tabindex="-1" aria-labelledby="pokemonModal" aria-hidden="true" v-if="modalPokemon">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">

				<div class="modal-header">
					<h5 class="modal-title" id="pokemonModal" v-if="modalPokemon.name">{{ modalPokemon.name.fr }}</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>

				<div class="modal-body">
					<div class="pokemon-modal">
						<div class="row" v-if="modalPokemon.sprites">
							<img :src="modalPokemon.sprites.regular">
						</div>

						<div class="row">
							<div class="col-3">
								№
							</div>
							<div class="col-9">
								<p>{{ modalPokemon.pokedexId }}</p>
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

						<div class="row" v-if="modalPokemon.types">
							<div class="col-3">
								<p>Types:</p>
							</div>
							<div class="col-9">
								<p v-for="type in modalPokemon.types">{{ type.name }}</p>
							</div>
						</div>


						<div class="row" v-if="modalPokemon.talents">
							<div class="col-3">
								<p>Abilities:</p>
							</div>
							<div class="col-9">
								<p v-for="talent in modalPokemon.talents">{{ talent.name }}</p>
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