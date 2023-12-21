<script setup>
const props = defineProps({
	pokemon: Object,
});
</script>

<template>
	<div class="pokemon-card">
		<div class="row">
			<img :src="pokemon.sprites.regular">
		</div>

		<div class="row">
			<div class="col-3">
				№
			</div>
			<div class="col-9">
				<p>{{ pokemon.pokedexId }}</p>
			</div>
		</div>

		<div class="row">
			<div class="col-3">
				<p>Name:</p>
			</div>
			<div class="col-9">
				<p>{{ pokemon.name.fr }}</p>
			</div>
		</div>

		<div class="row">
			<div class="col-3">
				<p>Catégorie:</p>
			</div>
			<div class="col-9">
				<p>{{ pokemon.category }}</p>
			</div>
		</div>

		<div class="row">
			<div class="col-3">
				<p>Generation:</p>
			</div>
			<div class="col-9">
				<p>{{ pokemon.generation }}</p>
			</div>
		</div>

		<div class="row">
			<div class="col-3">
				<p>Types:</p>
			</div>
			<div class="col-9">
				<span v-for="type in pokemon.types">
					{{ type.name }}
					<img :src="type.image">
				</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
.pokemon-card {
	border: 1px solid red;
	height: 100%;
	padding: 20px;
}
</style>