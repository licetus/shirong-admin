<template>
	<section class="img-uploader">
		<a href="javascript:void(0);" @click.prevent="onClickUpload">{{buttonText}}</a>
		<Modal v-model="isUploadModalVisible" @on-ok="onClickConfirm" @on-cancel="onClickCancel" :styles="modalStyle" :transfer="transfer" :mask-closable="false">
			<Row type="flex" justify="center">
				<Card class="upload-img-card" dis-hover>
					<ImageControl class="upload-img" :src="generateImgUrl(img ? img : imgUrl)" :default="defaultUrl"></ImageControl>
				</Card>
			</Row>
			<Row type="flex" align="bottom" justify="center">
				<Upload action="" :before-upload="onClickSubmit">
					<Button type="ghost" size="large" :loading="isUploading"><Icon type="upload"></Icon> {{$t('messages.Public.ImgUploader.Button.Upload')}}</Button>
				</Upload>
			</Row>
		</Modal>
	</section>
</template>

<script>
import * as Api from '../../../api'
import { errorHandler, generateImgUrl } from '../../../utils'

export default {
	name: 'img-uploader',
	props: {
		buttonText: String,
		imgUrl: String,
		defaultUrl: String,
		transfer: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			isUploadModalVisible: false,
			isUploading: false,
			img: '',
			modalStyle: {
				'z-index': 9999,
			},
		}
	},
	methods: {
		onClickUpload() {
			this.isUploadModalVisible = true
		},
		onClickConfirm() {
			const img = this.img
			this.img = ''
			this.$emit('on-upload', img)
		},
		onClickCancel() {
			this.img = ''
			this.isUploadModalVisible = false
		},
		onClickSubmit(img) {
			this.submitImg(img)
			return false
		},
		generateImgUrl(url) {
			return generateImgUrl(url)
		},
		async submitImg(img) {
			try {
				this.isUploading = true
				const res = await Api.uploadImage(img)
				this.img = res.imageUrl
				this.isUploading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isUploading = false
			}
		},
		init() {
			this.isUploadModalVisible = false
			this.isUploading = false
			this.img = ''
		},
	},
	mounted() {
		this.init()
	},
}
</script>

<style>
.upload-img-card {
	margin: 30px 0;
}
.upload-img {
	width: 400px;
	height: auto;
}
</style>
