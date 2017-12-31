<template>
	<section id="settings">
		<Card class="pane" :padding="20" :bordered="false" dis-hover>
			<Row class-name="tool-bar" type="flex" justify="space-between">
				<Col :span="12">
					<Row class-name="top-bar-left" type="flex" justify="start">
						<Col>
							<Button type="primary" @click="onClickAddUser">
								<Icon type="plus" color="white"></Icon> {{$t('messages.Settings.Button.NewUser')}}
							</Button>
						</Col>
					</Row>
				</Col>
				<Col :span="12">
					<Row class-name="top-bar-right" type="flex" justify="end">
						<Col :span="18">
							<Row type="flex" juestify="end">
								<Col :span="8">
								</Col>
								<Col :span="12">
								</Col>
								<Col :span="4">
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>

			<Table
				:loading="isPageLoading"
				:columns="userColumns"
				:data="users"
				:no-data-text="$t('messages.Public.Table.NoDataText')"
				:no-filtered-data-text="$t('messages.Public.Table.NoFilteredDataText')"
				stripe
				border>
			</Table>
		</Card>
		<Modal v-model="isUserEditModalVisible" width="750">
			<p class="modal-title" slot="header">
				{{userEditForm.id ? $t('messages.Settings.Modal.Title.Edit') : $t('messages.Settings.Modal.Title.Add')}}
			</p>
			<Row type="flex" justify="space-between">
				<Col :span="11">
					<Form ref="userEditForm" :rules="userEditFormRules" :model="userEditForm" label-position="top">
						<FormItem :label="$t('messages.Settings.Modal.Username')" prop="username">
							<Input v-model="userEditForm.username"></Input>
						</FormItem>
						<FormItem :label="$t('messages.Settings.Modal.Password')" prop="password">
							<Button v-if="userEditForm.id && isPasswordLocked" @click="isPasswordLocked = false">{{$t('messages.Settings.Modal.Button.ResetPassword')}}</Button>
							<Input v-else v-model="userEditForm.password"></Input>
						</FormItem>
						<FormItem></FormItem>
						<FormItem :label="$t('messages.Settings.Modal.Name')" prop="name">
							<Input v-model="userEditForm.name" placeholder="name"></Input>
						</FormItem>
						<FormItem :label="$t('messages.Settings.Modal.Remark')" prop="remark">
							<Input v-model="userEditForm.remark" placeholder="remark"></Input>
						</FormItem>
					</Form>
				</Col>
				<Col :span="11">
					<Row class-name="avatar-card" type="flex" justify="center">
						<Card dis-hover>
							<div class="avatar-img-div">
								<ImageControl :src="generateImgUrl(userEditForm.avatarUrl)" :default="avatarPlaceholder"></ImageControl>
							</div>
						</Card>
					</Row>
					<Row type="flex" align="bottom" justify="center">
						<Upload action="" :before-upload="onClickUploadAvatar">
							<Button type="ghost" size="large" :loading="isUploading"><Icon type="upload"></Icon> {{$t('messages.Settings.Modal.Button.UploadAvatar')}}</Button>
						</Upload>
					</Row>
				</Col>
			</Row>
			<div slot="footer">
				<Button type="default" @click="onClickCancelUser">{{$t('messages.Public.Button.Cancel')}}</Button>
				<Button type="primary" @click="onClickConfirmUser" :loading="isEditFormConfirmLoading">{{$t('messages.Public.Button.Confirm')}}</Button>
			</div>
		</Modal>
	</section>
</template>

<script>
import avatarPlaceholder from '../../assets/imgs/aerolink-avatar.png'
import Bus from '../../bus'
import * as Api from '../../api'
import config from '../../config/config'
import { Enum } from '../../models'
import { md5, errorHandler, generateImgUrl, getRoleType } from '../../utils'

export default {
	data() {
		return {
			userColumns: [{
				title: this.$t('messages.Settings.Table.UserId'), key: 'id', align: 'center',
			}, {
				title: this.$t('messages.Settings.Table.Name'), key: 'name', align: 'center',
			}, {
				title: this.$t('messages.Settings.Table.Username'), key: 'username', align: 'center',
			}, {
				title: this.$t('messages.Settings.Table.Remark'), key: 'remark', align: 'center',
			}, {
				title: this.$t('messages.Settings.Table.Role'),
				key: 'role',
				align: 'center',
				render: (h, params) => h('Tag', {
					prop: { type: 'border' },
				}, getRoleType(params.row.role)),
			},
			{
				title: this.$t('messages.Settings.Table.Action'),
				key: 'action',
				align: 'center',
				render: (h, params) =>
					h('div', [
						h('Button', {
							props: { type: 'primary',	size: 'small' },
							style: { marginRight: '5px' },
							on: {	click: () => this.onClickEditUser(params.index) },
						}, this.$t('messages.Settings.Table.Button.Edit')),
						h('Button', {
							props: { type: 'error', size: 'small', loading: this.isEditFormDeleteLoading },
							on: { click: () => this.onClickRemoveUser(params.index) },
						}, this.$t('messages.Settings.Table.Button.Remove')),
					]),
			}],

			users: [],
			isPageLoading: false,
			isEditFormConfirmLoading: false,
			isEditFormDeleteLoading: false,
			isUploading: false,
			isUserEditModalVisible: false,
			isPasswordLocked: true,
			avatarPlaceholder,
			userEditForm: {
				id: null,
				name: '',
				username: '',
				password: '',
				remark: '',
				avatarUrl: '',
			},
			userEditFormRules: {
				username: [{ type: 'string', required: true, message: this.$t('messages.Settings.Modal.Validator.Requirement.Username'), trigger: 'blur' }],
				// password: [
					// { validator: passwordValidator, required: true, type: 'string', trigger: 'change' },
					// { type: 'string', required: true, message: this.$t('messages.Settings.Modal.Validator.Requirement.Password'), trigger: 'blur' },
					// { type: 'string', min: 6, message: this.$t('messages.Settings.Modal.Validator.PasswordTooShort'), trigger: 'change' },
				// ],
				name: [{ type: 'string', required: false, message: this.$t('messages.Settings.Modal.Validator.Requirement.Name'), trigger: 'blur' }],
				remark: [{ type: 'string', required: false, max: config.remarkLength.user, message: `${this.$t('messages.Settings.Modal.Validator.Remark.Length')} ${config.remarkLength.user} ${this.$t('messages.Settings.Modal.Validator.Remark.Characters')}`, trigger: 'change' }],
			},
		}
	},
	methods: {
		generateImgUrl(url) {
			return generateImgUrl(url)
		},

		onClickEditUser(index) {
			this.userEditForm = {
				id: this.users[index].id,
				username: this.users[index].username,
				password: '',
				name: this.users[index].name,
				remark: this.users[index].remark,
				avatarUrl: this.users[index].avatarUrl,
			}
			this.isPasswordLocked = true
			this.showUserEditModal()
		},
		onClickRemoveUser(index) {
			this.$Modal.confirm({
				title: this.$t('messages.Settings.Message.Remove.Title'),
				content: this.$t('messages.Settings.Message.Remove.Content'),
				onOk: async () => {
					const id = this.users[index].id
					const role = this.users[index].role
					if (this.role === Enum.RoleType.Superadmin && role !== Enum.RoleType.Superadmin) {
						this.$Loading.start()
						this.removeUser(id)
						this.$Loading.finish()
						this.fetchUserList()
					} else {
						this.$Loading.error()
						this.$Message.error(this.$t('messages.Settings.Message.LowAuth'))
					}
				},
			})
		},
		onClickAddUser() {
			this.userEditForm = {
				username: '',
				password: '',
				name: '',
				remark: '',
				avatarUrl: '',
			}
			this.showUserEditModal()
		},

		onClickCancelUser() {
			this.hideUserEditModal()
		},
		onClickConfirmUser() {
			this.$refs.userEditForm.validate((valid) => {
				if (valid) {
					if (this.userEditForm.id) this.patchUser()
					else this.addUser()
				}
			})
		},

		onClickUploadAvatar(image) {
			this.uploadAvatar(image)
			return false
		},
		showUserEditModal() {
			this.isUserEditModalVisible = true
		},
		hideUserEditModal() {
			this.isUserEditModalVisible = false
		},

		async addUser() {
			try {
				this.isEditFormConfirmLoading = true
				const user = {
					name: this.userEditForm.name,
					username: this.userEditForm.username,
					password: md5(this.userEditForm.password),
					avatarUrl: this.userEditForm.avatarUrl,
					remark: this.userEditForm.remark,
					role: Enum.RoleType.Admin, // TODO need not
				}
				await Api.createUser(user)
				this.isEditFormConfirmLoading = false
				this.$Message.success(this.$t('messages.Settings.Message.AddSuccessfully'))
				this.fetchUserList()
				this.hideUserEditModal()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async patchUser() {
			try {
				this.isEditFormConfirmLoading = true
				const id = this.userEditForm.id
				const user = {
					name: this.userEditForm.name,
					username: this.userEditForm.username,
					avatarUrl: this.userEditForm.avatarUrl,
					remark: this.userEditForm.remark,
					role: Enum.RoleType.Admin, // TODO need not
				}
				if (this.isPasswordLocked === false && this.userEditForm.password && this.userEditForm.password !== '') user.password = md5(this.userEditForm.password)
				await Api.updateUser(id, user)
				this.isEditFormConfirmLoading = false
				this.$Message.success(this.$t('messages.Settings.Message.UpdateSuccessfully'))
				this.fetchUserList()
				this.hideUserEditModal()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async removeUser(id) {
			try {
				this.isEditFormDeleteLoading = true
				await Api.removeUser(id)
				this.$Message.success(this.$t('messages.Settings.Message.RemoveSuccessfully'))
				this.isEditFormDeleteLoading = false
				this.fetchUserList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormDeleteLoading = false
			}
		},

		async uploadAvatar(image) {
			try {
				this.isUploading = true
				const res = await Api.uploadImage(image)
				this.userEditForm.avatarUrl = res.imageUrl
				this.isUploading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isUploading = false
			}
		},

		refreshCurrentUser(user) {
			const lastProfile = JSON.parse(sessionStorage.getItem('userProfile'))
			const userProfile = {
				id: lastProfile.id,
				username: lastProfile.username,
				name: user.name,
				remark: user.remark,
				avatarUrl: user.avatarUrl,
			}
			sessionStorage.setItem('userProfile', JSON.stringify(userProfile))
			Bus.$emit('refreshUser')
		},

		async fetchUserList() {
			try {
				this.isPageLoading = true
				const res = await Api.fetchUserList()
				this.users = res
				this.isPageLoading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isPageLoading = false
			}
		},

		authenticationCheck() {
			this.role = parseInt(sessionStorage.getItem('role'), 10)
			if (this.role !== Enum.RoleType.Superadmin) this.$router.replace('/login')
		},
		generateBreadcrumb() {
			this.breadcrumbs = [
				{ name: this.$t('messages.Settings.Breadcrumb'), path: '/settings' },
			]
			Bus.$emit('updateBreadcrumbs', this.breadcrumbs)
		},
		initPage() {
			this.generateBreadcrumb()
			this.authenticationCheck()
			this.fetchUserList()
		},
	},

	computed: {
		formatAvatarUrl() {
			if (this.userEditForm.avatarUrl) return `${config.host}${this.userEditForm.avatarUrl}`
			return ''
		},
	},

	mounted() {
		this.initPage()
	},
}
</script>

<style lang="scss">
#settings{
	height: 100%;
	.pane{
		min-height: 100%;
		margin-bottom: 20px;
	}
	.tool-bar{
		margin-bottom: 10px;
	}
	.ivu-spin{
		z-index: 10;
	}
	.ivu-table-cell{
		padding-left: 0;
		padding-right: 0;
		word-break: break-word;
		&.ivu-btn-text{
			color: #2e8cf0;
		}
		.table-paging{
			margin-top: 20px;
		}
	}
	.ivu-modal-wrap{
	}
}
.avatar-card {
	padding: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.avatar-img-div {
	height: 200px;
	width: 200px;
}
img {
	width: 100%;
	height: 100%;
}


</style>
