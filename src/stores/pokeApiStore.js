import {defineStore} from "pinia";
import {Pokemon} from "@/pokemon.js";
import {watchEffect} from "vue";
import data from "bootstrap/js/src/dom/data.js";

const baseUrl = 'https://pokeapi.co/api/v2/';
let pokemonCount;
let allPokemons;

export const usePokeApiStore = defineStore('pokeApi', () => {
	async function getPokemons(count, offSet) {
		try {
			let results = []
			let response = await fetch(baseUrl + `pokemon/?limit=${count}&offset=${offSet}`)

			return formatApiResponse(response)
		} catch (e) {
			console.error(e);
		}
	}

	async function getAllPokemons() {
		try {
			let response = await fetch(baseUrl + `pokemon?limit=100000&offset=0`)

			return formatApiResponse(response)


		} catch (e) {
			console.error(e);
		}
	}

	async function formatApiResponse(response) {
		let results = []
		let data = await response.json()

		for (let id of data.results) {
			response = await fetch(id.url)
			data = await response.json()

			let currentPokemon = new Pokemon(data.id, data.sprites.front_default, data.name, data.height, data.weight, data.types, data.abilities, data.stats);
			results.push(currentPokemon)
		}

		return results;
	}


	watchEffect(async () => {
		let response = await fetch(baseUrl + 'pokedex/national');
		let data = await response.json()
		pokemonCount = data.pokemon_entries.length
	});

	return {getPokemons, pokemonCount}
})

