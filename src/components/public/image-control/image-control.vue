<template>
	<img :src="imageUrl" @error="onImageError" :style="imgStyle"/>
</template>

<script>

export default {
	name: 'image-control',
	props: {
		src: String,
		default: String,
		imgStyle: String,
	},
	data() {
		return {
			showSrc: true,
		}
	},
	methods: {
		onImageError() {
			this.showSrc = false
		},
	},
	computed: {
		imageUrl() {
			if (!this.src) return this.default
			return this.showSrc ? this.src : this.default
		},
	},
}
</script>
