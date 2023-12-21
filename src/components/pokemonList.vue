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
let modalPokemonShiny = ref(false);

function switchPage(targetPage) {
	currentPage.value = Math.floor(Math.min(Math.max(targetPage, 1), (filterStore.filteredPokemonArray.length / pokemonsPerPage) + 1));
	window.scrollTo(0, 0);
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
	<div v-if="filterStore.filteredPokemonArray.length > 0">
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
					<!--					<li v-for="page in Math.ceil( filterStore.filteredPokemonArray.length / 20)">-->
					<!--						<button v-if="currentPage + 1 === page || currentPage - 1 === page" class="btn btn-primary"-->
					<!--						        @click="switchPage(page)">{{-->
					<!--								page-->
					<!--							}}-->
					<!--						</button>-->
					<!--					</li>-->
					<li class="page-item">
						<button class="btn btn-primary" @click="switchPage(999999999)">Last</button>
					</li>
				</ul>
			</nav>
		</div>
	</div>
	<div style="display: flex; justify-content: center; align-items: center; height: 50vh;" v-else>
		<div>
			<h1>Aucun pokemon ne correspond a la recherche</h1>
		</div>
	</div>


	<!--	Todo try to use v-model for this-->
	<div class="modal" id="pokemonModal" tabindex="-1" aria-labelledby="pokemonModal" aria-hidden="true" v-if="modalPokemon">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">

				<div class="modal-header">
					<h5 class="modal-title" id="pokemonModal" v-if="modalPokemon.name">{{ modalPokemon.pokedexId }} - {{
							modalPokemon.name.fr
						}}
					</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>

				<div class="modal-body">
					<div class="pokemon-modal">
						<div class="row" v-if="modalPokemon.sprites">
							<img :src="modalPokemonShiny ? modalPokemon.sprites.shiny : modalPokemon.sprites.regular">
							<div>
								<button @click="modalPokemonShiny = !modalPokemonShiny">

									<i :class="'bi ' + (modalPokemonShiny ? 'bi-star-fill' : 'bi-star')"></i>
								</button>
							</div>
						</div>

						<div class="row">
							<div class="col-3">
								<p>Taille:</p>
							</div>
							<div class="col-9">
								<p>{{ modalPokemon.height }}</p>
							</div>
						</div>

						<div class="row">
							<div class="col-3">
								<p>Poids:</p>
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
								<p>Talent:</p>
							</div>
							<div class="col-9">
								<a v-for="talent in modalPokemon.talents">{{ talent.name }}</a>
							</div>
						</div>

						<div class="row" v-if="modalPokemon.talents">
							<div class="col-12">
								<p>PV {{ modalPokemon.stats.hp }}</p>
								<p>Attaque {{ modalPokemon.stats.atk }}</p>
								<p>Defense {{ modalPokemon.stats.def }}</p>
								<p>Attaque Spéciale {{ modalPokemon.stats.spe_atk }}</p>
								<p>Défense Spéciale {{ modalPokemon.stats.spe_def }}</p>
								<p>Vitesse {{ modalPokemon.stats.vit }}</p>
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