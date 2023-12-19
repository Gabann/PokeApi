import {createRouter, createWebHistory} from 'vue-router'
import PokemonList from "@/components/pokemonList.vue";

const routes = [
	{path: '/', component: PokemonList},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router