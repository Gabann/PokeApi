<script setup>
const props = defineProps({
	pokemon: Object,
});
</script>

<template>
	<div class="pokemon-card">
		<div class="row">
			<img :src="pokemon.sprite">
		</div>

		<div class="row">
			<div class="col-3">
				№
			</div>
			<div class="col-9">
				<p>{{ pokemon.id }}</p>
			</div>
		</div>

		<div class="row">
			<div class="col-3">
				<p>Name:</p>
			</div>
			<div class="col-9">
				<p>{{ pokemon.name }}</p>
			</div>
		</div>

		<div class="row">
			<div class="col-3">
				<p>Height:</p>
			</div>
			<div class="col-9">
				<p>{{ pokemon.height }}</p>
			</div>
		</div>

		<div class="row">
			<div class="col-3">
				<p>Weight:</p>
			</div>
			<div class="col-9">
				<p>{{ pokemon.weight }}</p>
			</div>
		</div>

		<div class="row">
			<div class="col-3">
				<p>Types:</p>
			</div>
			<div class="col-9">
				<p v-for="type in pokemon.types">{{ type.type.name }}</p>
			</div>
		</div>

		<div class="row">
			<div class="col-3">
				<p>Abilities:</p>
			</div>
			<div class="col-9">
				<p v-for="ability in pokemon.abilities">{{ ability.ability.name }}</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.pokemon-card {
	border: 1px solid red;
	height: 100%;
}
</style>