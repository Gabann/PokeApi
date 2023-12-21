<script setup>

</script>

<template>
	<footer class="d-flex align-items-center">
		<div class="col-4">
			<a href="https://github.com/Gabann/PokeApi">Source code</a>
		</div>

		<div class="col-4" id="image-container">
			<!--			<img src="https://avatars.githubusercontent.com/u/40118785?v=4">-->
		</div>

		<div class="col-4" style="text-align: right;">
			<!--			<span>Test</span>-->
		</div>
	</footer>
</template>

<style scoped>
footer {
	background-color: var(--main-color);
	height: 10vh;
	padding: 0 30px 0 30px;
}

#image-container {
	max-height: 100%;
	text-align: center;
}

#image-container img {
	height: 100%;
	width: 100%;
	border-radius: 50%;
}
</style>