<template>
	<div class="image-editor">
		<Row type="flex" justify="center">
			<Col :span="16">
				<Card class="image-uploader" :padding="30">
					<p slot="title">图片上传</p>
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
									<Button @click="handlecrop" type="primary" icon="crop">裁剪</Button></span>
								</Col>
							</Row>
						</Col>
						<Col :span="11" class="image-uploader-con">
							<Row :gutter="0" type="flex" align="middle" style="height:100%">
								<Col :span="24">
									<Row type="flex" justify="center" align="middle" class="image-uploader-con-preview-con">
										<!-- <div id="preview"></div> -->
										<SafeImg id="preview" :src="img.url" type="certificate-lg"></SafeImg>
									</Row>
								</Col>
								<Col :span="24">
									<Row type="flex" justify="center"><Button type="ghost" icon="upload" @click="onClickUpload" :loading="img.isUploading">上传图片</Button></Row>
								</Col>
							</Row>
						</Col>
					</Row>
				</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
import Cropper from 'cropperjs'
import './cropper.min.css'
import api from '../../libs/api'

export default {
	name: 'image-editor',
	data() {
		return {
			cropper: {},
			img: {
				isUploading: false,
				url: '',
			},
		}
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
			this.cropper.getCroppedCanvas().toBlob((blob) => {
				this.img.url = URL.createObjectURL(blob)
			}, 'image/jpeg')
		},
		imgUploading() {
			this.img.isUploading = true
		},
		imgUnuploading() {
			this.img.isUploading = false
		},
		onClickUpload() {
			this.uploadImg(this.img.url)
		},
		async uploadImg(img) {
			try {
				await api.uploadImage(img)
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
			aspectRatio: 1 / 0.63,
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
	@import '../../styles/common.less';
	// @import './image-editor.less';
	.image-uploader{
		width: 800px;
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
			&-preview-con{
				position: relative;
				width: 100% !important;
				height: 0 !important;
				padding-bottom: 63%;
				border: 1px dashed #c3c3c3;
				overflow: hidden;
				#preview{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: auto;
				}
			}
		}
	}
</style>
