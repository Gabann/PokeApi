import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {Filter} from "../components/filter.js";
import {usePokeApiStore} from "./pokeApiStore.js";

export const useFilterStore = defineStore('filterStore', () => {

	let pokeApiStore = usePokeApiStore();
	let filterArray = ref([]);

	let filteredPokemonArray = computed(() => {
		let allPokemons = pokeApiStore.allPokemons;
		let filteredArray = [...allPokemons];

		for (const filter of filterArray.value) {
			filteredArray = filterPokemonList(filteredArray, filter.property, filter.filter);
		}

		return filteredArray;
	});

	function filterPokemonList(array, property, filter) {
		return array.filter((pokemon) => {
			// const keys = property.split('.');
			// const deepProperty = keys.reduce((obj, key) => obj[key], pokemon);
			return containsValue(pokemon[property], filter);
		});
	}

	function addFilter(filter) {
		const filterExists = filterArray.value.some(f => f.property === filter.property && f.filter === filter.filter);
		if (!filterExists) {
			filterArray.value.push(filter);
		}

		console.log(filterArray.value);
	}

	function containsValue(obj, targetValue) {
		if (typeof obj === 'string' || typeof obj == "number") {
			return obj === targetValue;
		} else {
			for (const key in obj) {
				if (obj[key] === targetValue) {
					return true;
				} else if (typeof obj[key] === 'object' && obj[key] !== null) {
					// Recursively search in nested properties
					if (containsValue(obj[key], targetValue)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	// addFilter(new Filter("types", "Plante"));

	return {filteredPokemonArray, addFilter};
});

