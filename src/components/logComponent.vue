<script setup>
import {ref} from "vue";
import {useAuthenticationStore} from "@/stores/authenticationStore.js";

let email = ref("");
let password = ref("");
let authenticationStore = useAuthenticationStore();

function tryLogIn(email, password) {
	authenticationStore.logIn(email, password);
}
</script>

<template>
	<input type="text" name="" id="" v-model="email">
	<input type="text" name="" id="" v-model="password">

	<button @click="tryLogIn(email,password)"></button>
</template>

<style scoped>

</style>