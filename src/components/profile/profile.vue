<template>
	<section id="profile-modify">
		<Row class-name="pane">
			<Col class-name="pane-main" :span="18">
				<Card class="profile-pane-body" :padding="30" :bordered="false" dis-hover>
					<Row type="flex" justify="space-between">
						<Col :span="11">
							<InfoCard :title="$t('messages.Profile.Profile')">
								<Form :model="profile" label-position="left" :label-width="labelWidth.left">
									<FormItem :label="$t('messages.Profile.Avatar')" prop="avatarUrl">
										<p><ImageControl :src="generateImgUrl(profile.avatarUrl)" :default="avatarPlaceholder"></ImageControl></p>
										<p><ImgUploader :buttonText="$t('messages.Profile.ChangeAvatar')" :imgUrl="profile.avatarUrl" :defaultUrl="avatarPlaceholder" @on-upload="onUploadAvatar"></ImgUploader></p>
									</FormItem>
									<FormItem :label="$t('messages.Profile.Username')" prop="username">
										<p>{{profile.username}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Profile.Password')" prop="password">
										<Button v-if="isPasswordLocked" @click="isPasswordLocked = false">{{$t('messages.Profile.ResetPassword')}}</Button>
										<Input v-else v-model="profile.password"></Input>
									</FormItem>
									<FormItem :label="$t('messages.Profile.Name')" prop="name">
										<Input v-model="profile.name"></Input>
									</FormItem>
									<FormItem :label="$t('messages.Profile.Remark')" prop="remark">
										<Input v-model="profile.remark"></Input>
									</FormItem>
								</Form>
							</InfoCard>
						</Col>
						<Col :span="11">
						</Col>
					</Row>
				</Card>
			</Col>
			<Col class-name="pane-sub" :span="6">
				<ActionCard modify>
					<div slot="footer">
						<Button type="primary" @click="onClickSave" :loading="isSaveLoading">{{$t('messages.Public.Button.Save')}}</Button>
						<Button @click="onClickCancel">{{$t('messages.Public.Button.Cancel')}}</Button>
					</div>
				</ActionCard>
			</Col>
		</Row>

	</section>
</template>

<script>
import avatarPlaceholder from '../../assets/imgs/aerolink-avatar.png'
import Bus from '../../bus'
import * as Api from '../../api'
import { md5, errorHandler, generateImgUrl } from '../../utils'
import { Enum } from '../../models'

export default {
	data() {
		return {
			isSaveLoading: false,
			labelWidth: {
				left: 150,
				right: 150,
			},
			Enum,
			avatarPlaceholder,
			isPasswordLocked: true,
			profile: {
				avatarUrl: '',
				username: '',
				password: '',
				name: '',
				remark: '',
			},
		}
	},
	created() {
	},
	mounted() {
		this.initPage()
	},
	methods: {
		onClickSave() {
			this.updateProfile()
		},
		onClickCancel() {
			this.backToView()
		},
		onUploadAvatar(url) {
			this.profile.avatarUrl = url
		},
		generateImgUrl(url) {
			return generateImgUrl(url)
		},

		getUserProfile() {
			const profile = JSON.parse(sessionStorage.getItem('userProfile'))
			this.profile = {
				avatarUrl: profile.avatarUrl || '',
				username: profile.username || '',
				password: '',
				name: profile.name || '',
				remark: profile.remark || '',
			}
		},

		async updateProfile() {
			try {
				this.isSaveLoading = true
				const profile = {}
				if (this.profile.avatarUrl) profile.avatarUrl = this.profile.avatarUrl
				if (this.isPasswordLocked === false && this.profile.password) profile.password = md5(this.profile.password)
				if (this.profile.name) profile.name = this.profile.name
				if (this.profile.remark) profile.remark = this.profile.remark
				await Api.updateCurrentUser(profile)
				this.isSaveLoading = false
				this.$Modal.success({
					title: this.$t('messages.Profile.Message.Relogin.Title'),
					content: this.$t('messages.Profile.Message.Relogin.Content'),
					onOk: () => this.logout(),
				})
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isSaveLoading = false
			}
		},
		logout() {
			sessionStorage.removeItem('userProfile')
			sessionStorage.removeItem('role')
			sessionStorage.removeItem('token')
			this.$router.push('/login')
		},
		backToView() {
			this.$router.go(-1)
		},
		generateBreadcrumb() {
			this.breadcrumbs = [
				{ name: this.$t('messages.Profile.Breadcrumb'), path: '/profile' },
			]
			Bus.$emit('updateBreadcrumbs', this.breadcrumbs)
		},
		initPage() {
			this.generateBreadcrumb()
			this.getUserProfile()
		},
	},
}
</script>

<style>
#profile-modify {
	height: 100%;
}
#profile-modify .pane {
	height: 100%;
	min-height: 100%;
	margin-bottom: 20px;
}
#profile-modify .pane-main {
	min-height: 100%;
}
#profile-modify .pane-sub {
	padding: 0 50px;
}

</style>
