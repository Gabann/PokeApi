import {defineStore} from "pinia";

const email = "test@email.com";
const password = "qwfpg";

import router from "@/router/index.js";

export const useAuthenticationStore = defineStore('authenticationStore', () => {
	function logIn(emailInput, passwordInput) {
		if (email === emailInput && password === passwordInput) {
			router.push('/');
		} else {
			console.log("wrong email or password");
		}
	}

	return {logIn};
});

