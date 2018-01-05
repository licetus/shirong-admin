<template>
	<img :src="imageUrl" @error="onImageError" :style="styles"/>
</template>

<script>
import defaultImg from './assets/default.png'
import uploadImg from './assets/upload-image@1x.png'
import avatarMd from './assets/avatar@2x.png'
import avatarLg from './assets/avatar@3x.png'
import certificateMd from './assets/certificate@2x.png'
import certificateLg from './assets/certificate@3x.png'
import photoSm from './assets/photo@1x.png'
import photoLg from './assets/photo@3x.png'

export default {
	name: 'safe-img',
	props: {
		src: {
			type: String,
			default: '',
		},
		type: String,
		styles: String,
	},
	data() {
		return {
			showSrc: true,
		}
	},
	mounted() {
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
				case 'upload-img':
					return uploadImg
				default:
					return defaultImg
			}
		},
		imageUrl() {
			if (!this.src || this.src === '') return this.default
			return this.showSrc ? this.src : this.default
		},
	},
}
</script>
