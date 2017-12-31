<template>
	<div class="container">
		<Row type="flex" justify="center">
			<Col class-name="login-top-bar" :span="24">
				<Row type="flex" justify="start">
					<ImageControl class="login-top-bar-logo" :src="navLogo" :default="navLogo"></ImageControl>
				</Row>
			</Col>
		</Row>
		<Row class-name="container-row" type="flex" justify="center" align="middle">
			<Col>
				<Card class="login-panel" :bordered="false" dis-hover>
					<span class="login-panel-title" slot="title">{{$t('messages.Login.Login')}}</span>
					<Form ref="loginForm" :model="loginForm" :rules="loginFormRules">
						<FormItem :label="$t('messages.Login.Username')" prop="username">
							<Input type="text" v-model="loginForm.username" :placeholder="$t('messages.Login.Username')"></Input>
						</FormItem>
						<FormItem :label="$t('messages.Login.Password')" prop="password">
							<Input type="password" v-model="loginForm.password" :placeholder="$t('messages.Login.Password')" @on-enter="onClickLogin"></Input>
						</FormItem>
						<FormItem>
							<Button class="login-panel-button" type="primary" long @click="onClickLogin" :loading="isLoading">{{$t('messages.Login.Login')}}</Button>
						</FormItem>
					</Form>
				</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
import navLogo from '../assets/imgs/nav-logo.png'
import * as Api from '../api'
import { errorHandler, md5 } from '../utils'
// import Models from '../models'

export default {
	data() {
		return {
			navLogo,
			isLoading: false,

			loginForm: {
				username: '',
				password: '',
			},
			loginFormRules: {
				username: [
					{ required: true, message: this.$t('messages.Login.AccountNeeded'), trigger: 'blur' },
				],
				password: [
					{ required: true, message: this.$t('messages.Login.PasswordNeeded'), trigger: 'blur' },
					{ type: 'string', min: 0, message: this.$t('messages.Login.PasswordTooShort'), trigger: 'blur' },
				],
			},
			// initForm: {
			// 	username: '',
			// 	password: '',
			// },
		}
	},
	methods: {
		async onClickLogin() {
			this.$refs.loginForm.validate(async (valid) => {
				if (valid) {
					this.isLoading = true
					await this.login()
				} else {
					this.$Message.error(this.$t('messages.Login.InvalidForm'))
				}
			})
		},

		async login() {
			try {
				const res = await Api.login(this.loginForm.username, md5(this.loginForm.password))
				// console.log('res: ', res)
				if (res && res.id && res.token && res.role) {
					const userProfile = {
						id: res.id,
						username: res.username,
						name: res.name,
						avatarUrl: res.avatarUrl,
						remark: res.remark,
					}
					console.log('role', res.role)
					sessionStorage.setItem('userProfile', JSON.stringify(userProfile))
					sessionStorage.setItem('role', JSON.stringify(res.role))
					sessionStorage.setItem('token', JSON.stringify(res.token))
					this.$router.push({ path: '/orders' })
				}
			} catch (error) {
				errorHandler(error.code, error.message, this)
			}
			this.isLoading = false
		},
	},
	//
	// mounted() {
	// 	this.loginForm = this.initForm
	// },
}
</script>

<style lang="scss">
@import '../styles/theme.scss';
.container {
	position: absolute;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	background-size: cover;
	background-image: $login-background-image;
	.login-top-bar {
		height: 60px;
		background-color: #49505f;
		.login-top-bar-logo {
			margin: 0 30px;
			height: 60px;
			width: auto;
		}
	}
	.container-row {
		height: calc(100% - 60px);
		.login-panel {
			width: 420px;
			background-color: rgba(255,255,255,0.90);
			.login-panel-title {
				color: $login-title-color;
				font-size: $login-title-font-size;
				font-weight: $login-title-font-weight;
			}
			.login-panel-close {
				color: $primary-text-color;
			}
			.ivu-card-head {
				padding: 40px 40px 0 40px;
				border: 0;
			}
			.ivu-card-body {
				padding: 30px 40px 15px 40px;
				.ivu-form-item-label {
					padding: 0 0 5px 0;
					letter-spacing: 1px;
				}
				.ivu-form-item-label:before {
					content: "";
				}
				.ivu-input {
					height: 45px;
					font-size: 13px;
					background-color: rgba(255,255,255,0);
				}
				.login-panel-button {
					height: 40px;
					font-size: 13px;
				}
			}
		}
	}
}
</style>

</style>
