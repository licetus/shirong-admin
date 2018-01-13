<template>
	<Row>
		<Col :span="12">
			<Card>
				<Spin v-if="user.isLoading" size="large" fix></Spin>
				<p slot="title">用户信息</p>
				<div slot="extra">
					<div v-if="!user.isEditable">
						<Button type="text" @click="onClickEditProfile">编辑</Button>
					</div>
					<div v-else>
						<Button type="text" @click="onClickCancelEditProfile">取消</Button>
						<Button type="text" @click="onClickSubmitProfile" :loading="user.isSubmitting">提交</Button>
					</div>
				</div>
				<Form label-position="left" :label-width="user.labelWidth" inline>
					<Row>
						<Col :span="12">
							<Row>
								<Col :span="24"><FormItem label="用户头像">
									<Row><Col :span="16">
										<SafeImg v-if="!user.isEditable" :src="util.generateImageUrl(user.profile.avatarUrl)" type="avatar-md"></SafeImg>
										<ImageUploader v-else v-model="user.form.avatarUrl" :type="Enum.ImageType.Avatar"></ImageUploader>
									</Col></Row>
								</FormItem></Col>
							</Row>
						</Col>
						<Col :span="12">
							<Row>
								<Col><FormItem label="登录账号">
									<p>{{`${user.account} - ${util.getRole(this, user.access)}`}}</p>
								</FormItem></Col>
							</Row>
							<Row>
								<Col :span="24"><FormItem label="手机号码">
									<p v-if="!user.isEditable">{{user.profile.phoneNumber}}</p>
									<Input v-else v-model="user.form.phoneNumber" />
								</FormItem></Col>
								<Col :span="24"><FormItem label="备注">
									<p v-if="!user.isEditable">{{user.profile.remark}}</p>
									<Input v-else v-model="user.form.remark" />
								</FormItem></Col>
							</Row>
						</Col>
					</Row>
				</Form>
			</Card>
		</Col>
	</Row>
</template>

<script>
import Cookies from 'js-cookie'
import Enum from '../../models/enum'
import api from '../../libs/api'
import util from '../../libs/util'

export default {
	name: 'ownspace_index',
	data() {
		return {
			Enum,
			util,
			user: {
				isEditable: false,
				isLoading: false,
				isSubmitting: false,
				labelWidth: 75,
				account: Cookies.get('username'),
				access: parseInt(Cookies.get('access'), 10),
				profile: JSON.parse(Cookies.get('userProfile')),
				form: {
					avatarUrl: '',
					phoneNumber: '',
					remark: '',
				},
				rules: {},
			},
		}
	},
	methods: {
		editProfile() {
			this.user.isEditable = true
		},
		uneditProfile() {
			this.user.isEditable = false
		},
		profileLoading() {
			this.user.isLoading = true
		},
		profileUnloading() {
			this.user.isLoading = false
		},
		profileSubmitting() {
			this.user.isSubmitting = true
		},
		profileUnsubmitting() {
			this.user.isSubmitting = false
		},
		initUserForm() {
			this.user.form = {
				avatarUrl: this.user.profile.avatarUrl,
				phoneNumber: this.user.profile.phoneNumber,
				remark: this.user.profile.remark,
			}
		},
		onClickEditProfile() {
			this.initUserForm()
			this.editProfile()
		},
		onClickCancelEditProfile() {
			this.initUserForm()
			this.uneditProfile()
		},
		onClickSubmitProfile() {
			// this.$refs.userForm.validate((valid) => { // BUG validator doesnt work
			// 	if (valid) => {
			// 	}
			// })
			util.passwordCheck(this, () => {
				const profile = {
					avatarUrl: this.user.form.avatarUrl,
					phoneNumber: this.user.form.phoneNumber,
					remark: this.user.form.remark,
				}
				this.profileSubmitting()
				this.updateProfile(profile)
			})
		},
		async updateProfile(profile) {
			try {
				await api.admin.profile.updateSelf(profile)
				profile.id = this.user.profile.id
				Cookies.set('userProfile', JSON.stringify(profile))
				this.$store.commit('setAvatar', util.generateImageUrl(profile.avatarUrl))
				this.user.profile = profile
				this.uneditProfile()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.profileUnsubmitting()
			}
		},
	},
	mounted() {
	},
}
</script>

<style lang="less">
	@import '../../styles/common.less';
	@import '../../styles/public.less';
</style>
