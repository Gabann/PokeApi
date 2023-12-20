<script setup>
import {ref} from "vue";
import {Filter} from "@/components/filter.js";
import {useFilterStore} from "@/stores/filterStore.js";

let filterStore = useFilterStore();
let generationFilter = ref(new Filter('generation', ''));
let typeFilter = ref(new Filter('types', ''));
</script>

<template>
	<label for='generation-filter'></label>
	<select id='generation-filter' v-model="generationFilter.filter" @change="filterStore.addFilter(generationFilter)">
		<option value="" disabled selected>Generation filter</option>
		<option :value=i v-for="i in 9">{{ i }}</option>
	</select>

	<label for="pokemonType">Sélectionnez le type de Pokémon :</label>
	<select id="pokemonType" name="pokemonType" v-model="typeFilter.filter" @change="filterStore.addFilter(typeFilter)">
		<option value="Normal">Normal</option>
		<option value="Feu">Feu</option>
		<option value="Eau">Eau</option>
		<option value="Électrique">Électrique</option>
		<option value="Plante">Plante</option>
		<option value="Glace">Glace</option>
		<option value="Combat">Combat</option>
		<option value="Poison">Poison</option>
		<option value="Sol">Sol</option>
		<option value="Vol">Vol</option>
		<option value="Psy">Psy</option>
		<option value="Insecte">Insecte</option>
		<option value="Roche">Roche</option>
		<option value="Spectre">Spectre</option>
		<option value="Ténèbres">Ténèbres</option>
		<option value="Dragon">Dragon</option>
		<option value="Acier">Acier</option>
		<option value="Fée">Fée</option>
	</select>
</template>

<style scoped>

</style>