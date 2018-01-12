<template>
	<div class="image-uploader">
		<Button type="text" @click="isModalVisible = true"><slot></slot></Button>
		<Modal v-model="isModalVisible" class-name="image-uploader" width="800">
				<p slot="header">图片上传</p>
				<Row type="flex" justify="space-between">
					<Col :span="12" class="image-uploader-con">
						<div class="cropper">
							<img id="cropimg" alt=""/>
						</div>
						<Row class="margin-top-20" :gutter="20" type="flex" justify="center">
							<Col>
								<input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handelChange" id="fileinput" class="fileinput" />
								<label class="filelabel" for="fileinput"><Icon class="margin-right-10" type="image"></Icon>选择图片</label>
							</Col>
							<Col>
								<ButtonGroup>
									<Button @click="cropper.rotate(-45)" type="primary"><Icon type="arrow-return-left"></Icon></Button>
									<Button @click="cropper.rotate(45)" type="primary"><Icon type="arrow-return-right"></Icon></Button>
									<Button @click="cropper.rotate(-1)" type="primary"><Icon type="refresh" style="transform:scaleX(-1)"></Icon></Button>
									<Button @click="cropper.rotate(1)" type="primary"><Icon type="refresh"></Icon></Button>
									<Button @click="handlecrop" type="primary"><Icon type="checkmark"></Icon></Button></span>
								</ButtonGroup>
							</Col>
						</Row>
					</Col>
					<Col :span="11" class="image-uploader-con">
						<Row :gutter="0" type="flex" align="middle" style="height:100%">
							<Col :span="24">
								<Row type="flex" justify="center">
									<RadioGroup v-model="img.type" @on-change="onClickImgType">
										<Radio :label="Enum.ImageType.IdCard">身份证</Radio>
										<Radio :label="Enum.ImageType.Other">其他</Radio>
									</RadioGroup>
								</Row>
							</Col>
							<Col :span="24">
								<Row type="flex" justify="center" align="middle" class="image-uploader-con-preview-con">
									<div :style="previewStyle"></div>
								</Row>
							</Col>
							<Col :span="24">
								<Row type="flex" justify="center"><Button type="ghost" icon="upload" @click="onClickUpload" :loading="img.isUploading">上传图片</Button></Row>
							</Col>
						</Row>
					</Col>
				</Row>
				<div slot="footer">
					<Button @click="onClickCancel">取消</Button>
					<Button type="primary" @click="onClickConfirm">确认</Button>
				</div>
		</Modal>
	</div>
</template>

<script>
import Cropper from 'cropperjs'
import './cropper.min.css'
import certificateLg from './assets/certificate@3x.png'
import photoLg from './assets/photo@3x.png'
import Enum from '../../../models/enum'
import api from '../../../libs/api'

export default {
	name: 'image-uploader',
	data() {
		return {
			Enum,
			isModalVisible: false,
			cropper: {},
			img: {
				isUploading: false,
				type: Enum.ImageType.Other,
				dataUrl: '',
				file: '',
				url: '',
			},
		}
	},
	computed: {
		defaultUrl() {
			return this.img.type === Enum.ImageType.IdCard ? certificateLg : photoLg
		},
		previewStyle() {
			const style = {
				width: '100%',
				height: '200px',
				'background-image': `url(${this.img.dataUrl || this.defaultUrl})`,
				'background-size': 'contain',
				'background-repeat': 'no-repeat',
				'background-position': 'center',
			}
			return style
		},
	},
	methods: {
		handelChange(e) {
			const file = e.target.files[0]
			const reader = new FileReader()
			reader.onload = () => {
				this.cropper.replace(reader.result)
				reader.onload = null
			}
			reader.readAsDataURL(file)
		},
		handlecrop() {
			const canvas = this.cropper.getCroppedCanvas()
			this.img.dataUrl = canvas.toDataURL('image/png')
		},
		imgUploading() {
			this.img.isUploading = true
		},
		imgUnuploading() {
			this.img.isUploading = false
		},
		onClickImgType(type) {
			this.img.type = type
			const aspectRatio = type === Enum.ImageType.IdCard ? 1 / 0.63 : null
			this.cropper.setAspectRatio(aspectRatio)
		},
		onClickUpload() {
			this.imgUploading()
			this.cropper.getCroppedCanvas().toBlob((blob) => {
				this.uploadImg(blob)
			}, 'image/png')
		},
		onClickCancel() {
			this.isModalVisible = false
		},
		onClickConfirm() {
			this.$emit('on-upload', this.img.url)
			this.isModalVisible = false
		},
		async uploadImg(blob) {
			try {
				const res = await api.uploadImage(blob)
				this.img.url = res.imageUrl
				this.$Notice.success({
					title: '上传成功',
					duration: 3,
				})
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.imgUnuploading()
			}
		},
	},
	mounted() {
		const img = document.getElementById('cropimg')
		this.cropper = new Cropper(img, {
			dragMode: 'move',
			aspectRatio: null,
			// preview: '#preview',
			restore: false,
			center: false,
			highlight: false,
			cropBoxMovable: true,
			toggleDragModeOnDblclick: false,
			autoCropArea: 0.9,
		})
	},
}
</script>

<style lang="less">
	@import '../../../styles/common.less';
	.image-uploader{
		.ivu-modal-body{
			padding: 30px;
		}
		.cropper{
			box-sizing: border-box;
			border: 1px dashed #c3c3c3;
			width: 100%;
			height: calc(~"100% - 45px");
			img{
				max-height: 100%;
			}
		}
		.fileinput{
			display: none;
		}
		.filelabel{
			display: block;
			padding: 6px 15px;
			background: #2d8cf0;
			display: inline-block;
			border: 1px solid #2d8cf0;
			border-radius: 4px;
			cursor: pointer;
			color: white;
			font-size: 12px;
			text-align: center;
			transition: all .2s;
			&:hover{
				background: #5cadff;
				border: 1px solid #5cadff;
				transition: all .2s;
			}
		}
		&-con{
			height: 300px;
		}
	}
</style>
