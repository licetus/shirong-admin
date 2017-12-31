<template>
	<section id="not-found">
		<div class="not-found-pane">
			<Row type="flex" justify="center"><h1>404 Not Found</h1></Row>
			<Row type="flex" justify="center"><h3>Invalid page, <a herf="javascripit:void(0)" @click.prevent="onClickBack">click here to go back</a></h3></Row>
		</div>
	</section>
</template>

<script>
export default {
	methods: {
		onClickBack() {
			this.$router.go(-1)
		},
	},
}
</script>

<style lang="scss">
#not-found {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	.not-found-pane {
		background-color: #FFF;
		height: 100%;
		padding-top: 15%;
	}
}
</style>
