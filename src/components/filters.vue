<script setup>
import {ref, watch} from "vue";
import {Filter} from "@/components/filter.js";
import {useFilterStore} from "@/stores/filterStore.js";

let filterStore = useFilterStore();
let generationFilter = ref(new Filter('generation', ''));
let typeFilter = ref(new Filter('types', ''));
let nameFilter = ref("");
const pokemonTypes = ['Normal', 'Feu', 'Eau', 'Électrik', 'Plante', 'Glace', 'Combat', 'Poison', 'Sol', 'Vol', 'Psy', 'Insecte', 'Roche', 'Spectre', 'Ténèbres', 'Dragon', 'Acier', 'Fée'];

watch(nameFilter, (newValue, oldValue) => {
	filterStore.searchQuery = newValue;
});

function handleCheckboxChange(event, type) {
	if (event.target.checked) {
		console.log("checked");
		filterStore.addFilter(new Filter('types', type));
		event.target.classList.toggle("unselected");
	} else {
		filterStore.removeFilter(new Filter('types', type));
	}
}

function clearFilters() {
	nameFilter.value = '';
	filterStore.clearFilters();

	const checkboxes = document.querySelectorAll('input[type="checkbox"]');
	for (const checkbox of checkboxes) {
		checkbox.checked = false;
	}
}
</script>

<template>
	<div class="py-4 d-flex  justify-content-center align-items-center flex-column">
		<label for='generation-filter'></label>
		<select id='generation-filter' v-model="generationFilter.filter" @change="filterStore.addFilter(generationFilter)">
			<option value="" disabled selected>Generation filter</option>
			<option :value=i v-for="i in 9">{{ i }}</option>
		</select>

		<div class="d-flex flex-wrap type-filter-container">
			<div v-for="type in pokemonTypes" :key="type">
				<input type="checkbox" :id="type" :value="type" @change="handleCheckboxChange($event, type)" v-show="false">
				<label :for="type" :class="type" class="type">{{ type }}</label>
			</div>
		</div>

		<div class="row">
			<input type="text" name="" id="" placeholder="Nom ou numéro de pokedex" v-model="nameFilter">
		</div>

		<div class="row">
			<button class="btn btn-danger" @click="clearFilters">Clear filters</button>
		</div>
	</div>
</template>

<style scoped>
.type {
	margin: 5px 10px 5px 10px;
	padding: 0 10px 0 10px;
	border-radius: 10px;
}

label {
	text-align: center;
}

.Normal {
	background-color: #A8A878;
}

.Feu {
	background-color: #F08030;
}

.Eau {
	background-color: #6890F0;
}

.Électrik {
	background-color: #F8D030;
}

.Plante {
	background-color: #78C850;
}

.Glace {
	background-color: #98D8D8;
}

.Combat {
	background-color: #C03028;
}

.Poison {
	background-color: #A040A0;
}

.Sol {
	background-color: #E0C068;
}

.Vol {
	background-color: #A890F0;
}

.Psy {
	background-color: #F85888;
}

.Insecte {
	background-color: #A8B820;
}

.Roche {
	background-color: #B8A038;
}

.Spectre {
	background-color: #705898;
}

.Dragon {
	background-color: #7038F8;
}

.Ténèbres {
	background-color: #705848;
}

.Acier {
	background-color: #B8B8D0;
}

.Fée {
	background-color: #EE99AC;
}

input[type="checkbox"]:not(:checked) + label {
	opacity: 0.3;
}

</style>