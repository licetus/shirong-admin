<template>
	<div>
		<Button type="text" @click="onClickOpenModal"><SafeImg :src="util.generateImageUrl(value)" type="upload-img"></SafeImg></Button>
		<Modal v-model="isModalVisible" class-name="image-uploader" width="800">
				<p slot="header">图片上传</p>
				<VueCropper v-if="isModalVisible" @on-upload="onUploadImage"></VueCropper>
				<div slot="footer">
					<Button @click="onClickCancel">取消</Button>
					<Button type="primary" @click="onClickConfirm" :disabled="isConfirmDisabled">确认</Button>
				</div>
		</Modal>
	</div>
</template>

<script>
import VueCropper from './vue-cropper/vue-cropper.vue'
import util from '../../../libs/util'

export default {
	name: 'image-uploader',
	components: {
		VueCropper,
	},
	props: {
		value: String,
	},
	data() {
		return {
			util,
			isModalVisible: false,
			isConfirmDisabled: true,
			url: '',
		}
	},
	computed: {
	},
	methods: {
		showModal() {
			this.isModalVisible = true
		},
		hideModal() {
			this.isModalVisible = false
		},
		disableConfirm() {
			this.isConfirmDisabled = true
		},
		enableConfirm() {
			this.isConfirmDisabled = false
		},
		onClickOpenModal() {
			this.disableConfirm()
			this.showModal()
		},
		onUploadImage(url) {
			this.url = url
			this.enableConfirm()
		},
		onClickCancel() {
			this.hideModal()
		},
		onClickConfirm() {
			this.$emit('input', this.url)
			this.hideModal()
		},
	},
	mounted() {
	},
}
</script>

<style lang="less">
</style>
