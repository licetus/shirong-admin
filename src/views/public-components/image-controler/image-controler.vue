<template>
	<img :src="imageUrl" @error="onImageError" :style="style"/>
</template>

<script>
import defaultImg from './assets/default.png'
import avatarMd from './assets/avatar@2x.png'
import avatarLg from './assets/avatar@3x.png'
import certificateMd from './assets/certificate@2x.png'
import certificateLg from './assets/certificate@3x.png'
import photoSm from './assets/photo@1x.png'
import photoLg from './assets/photo@3x.png'

export default {
	name: 'picture',
	props: {
		src: String,
		type: String,
		style: String,
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
		default() {
			switch (this.type) {
				case 'avatar-md':
					return avatarMd
				case 'avatar-lg':
					return avatarLg
				case 'certificate-md':
					return certificateMd
				case 'certificate-lg':
					return certificateLg
				case 'photo-sm':
					return photoSm
				case 'photo-lg':
					return photoLg
				default:
					return defaultImg
			}
		},
		imageUrl() {
			if (!this.src) return this.default
			return this.showSrc ? this.src : this.default
		},
	},
}
</script>
