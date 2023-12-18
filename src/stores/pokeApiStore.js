import {defineStore} from "pinia";
import {Pokemon} from "@/pokemon.js";
import {watchEffect} from "vue";
import data from "bootstrap/js/src/dom/data.js";

const baseUrl = 'https://pokeapi.co/api/v2/';
let pokemonCount;

export const usePokeApiStore = defineStore('pokeApi', () => {
	async function getPokemons(count, offSet) {
		try {
			let results = []
			let response = await fetch(baseUrl + `pokemon/?limit=${count}&offset=${offSet}`)
			let data = await response.json()

			for (let id of data.results) {
				response = await fetch(id.url)
				data = await response.json()

				let currentPokemon = new Pokemon(data.id, data.sprites.front_default, data.name, data.height, data.weight, data.types, data.abilities, data.stats);
				results.push(currentPokemon)
			}

			return results;
		} catch (e) {
			console.error(e);
		}
	}

	watchEffect(async () => {
		let response = await fetch(baseUrl + 'pokedex/national');
		let data = await response.json()
		pokemonCount = data.pokemon_entries.length
	});

	return {getPokemons, pokemonCount}
})

