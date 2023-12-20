import {defineStore} from "pinia";
import {Pokemon} from "../pokemon.js";
import {ref} from "vue";

const baseUrl = 'https://tyradex.tech/api/v1/';

export const usePokeApiStore = defineStore('pokeApi', () => {
	let allPokemons = ref([]);

	async function getAllPokemons() {
		if (!localStorage.getItem("allPokemons")) {
			console.log("used api");
			try {
				let response = await fetch(baseUrl + `pokemon`);
				let formattedResponse = await formatApiResponse(response);

				allPokemons = formattedResponse;
				localStorage.setItem('allPokemons', JSON.stringify(formattedResponse));
			} catch (e) {
				console.error(e);
			}
		} else {
			console.log("used local storage");
			allPokemons = JSON.parse(localStorage.getItem('allPokemons'));
		}
	}

	async function formatApiResponse(response) {
		let results = [];
		let data = await response.json();

		for (let pokemon of data) {
			// response = await fetch(pokemon.url)
			// data = await response.json()

			let currentPokemon = new Pokemon(
				pokemon.pokedexId,
				pokemon.generation,
				pokemon.category,
				pokemon.name,
				pokemon.sprites,
				pokemon.types,
				pokemon.talents,
				pokemon.stats,
				pokemon.resistances,
				pokemon.evolution,
				pokemon.height,
				pokemon.weight,
				pokemon.egg_groups,
				pokemon.sexe,
				pokemon.catch_rate,
				pokemon.level_100,
				pokemon.forme
			);
			results.push(currentPokemon);
		}

		return results;
	}

	getAllPokemons();

	return {allPokemons};
});

