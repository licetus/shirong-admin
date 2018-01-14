<template>
	<div>
		<img class="safe-img" :src="imageUrl" @error="onImageError" :style="imgStyle" @click="onClick"/>
		<Modal v-model="isModalVisible" class-name="image-modal" width="50%">
			<img class="image-detail" :src="src"/>
			<div slot="footer"></div>
		</Modal>
	</div>
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
		type: {
			type: String,
			default: '',
		},
		styles: String,
		viewable: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			isModalVisible: false,
			showDefault: false,
		}
	},
	mounted() {
	},
	watch: {
		src() {
			this.showDefault = false
		},
	},
	computed: {
		imgStyle() {
			if (this.style) return this.style
			const style = {
				width: '100%',
				height: 'auto',
			}
			if (this.type === 'avatar-md' || this.type === 'avatar-lg') this.$set(style, 'border-radius', '50%')
			if (this.viewable && !this.showDefault) this.$set(style, 'cursor', 'pointer')
			return style
		},
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
			return this.showDefault ? this.default : this.src
		},
	},
	methods: {
		showModal() {
			this.isModalVisible = true
		},
		onImageError() {
			this.showDefault = true
		},
		onClick() {
			if (this.src && !this.showDefault && this.viewable) {
				this.showModal()
			}
		},
	},
}
</script>

<style lang="less">
@import '../../../styles/public.less';

	.image-detail{
		width: 100%;
		height: auto;
	}
</style>
