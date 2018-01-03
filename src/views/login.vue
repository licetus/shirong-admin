<template>
	<div class="login" @keydown.enter="onClickLogin">
		<div class="login-con">
			<Card :bordered="false">
				<p slot="title">
					<Icon type="log-in"></Icon>
					欢迎登录
				</p>
				<div class="form-con">
					<Form ref="loginForm" :model="loginForm" :rules="loginFormRules">
						<FormItem prop="username">
							<Input v-model="loginForm.username" placeholder="请输入用户名">
								<span slot="prepend">
									<Icon :size="16" type="person"></Icon>
								</span>
							</Input>
						</FormItem>
						<FormItem prop="password">
							<Input type="password" v-model="loginForm.password" placeholder="请输入密码">
								<span slot="prepend">
									<Icon :size="14" type="locked"></Icon>
								</span>
							</Input>
						</FormItem>
						<FormItem>
							<Button @click="onClickLogin" type="primary" :loading="isLoginLoading" long>登录</Button>
						</FormItem>
					</Form>
					<p class="login-tip">输入任意用户名和密码即可</p>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
import Cookies from 'js-cookie'
import Api from '../libs/api'
import util from '../libs/util'

export default {
	data() {
		return {
			isLoginLoading: false,
			loginForm: {
				username: '',
				password: '',
			},
			loginFormRules: {
				username: [
					{ required: true, message: '账号不能为空', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '密码不能为空', trigger: 'blur' },
				],
			},
		}
	},
	methods: {
		onClickLogin() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.loginLoading()
					this.login()
				}
			})
		},
		loginLoading() {
			this.isLoginLoading = true
		},
		loginUnloading() {
			this.isLoginLoading = false
		},
		async login() {
			try {
				const res = await Api.login(this.loginForm.username, util.md5(this.loginForm.password))
				if (res && res.id && res.token && res.role) {
					const user = {
						id: res.id,
						username: res.username,
						name: res.name,
						avatarUrl: res.avatarUrl,
						remark: res.remark,
					}
					Cookies.set('username', this.loginForm.username)
					Cookies.set('password', this.loginForm.password)
					Cookies.set('access', res.role)
					// Cookies.set('user', user)
					sessionStorage.setItem('token', res.token)
					this.$store.commit('setAvatar', user.avatarUrl)
					this.loginUnloading()
					this.$router.push({
						name: 'home_index',
					})
				}
			} catch (error) {
				this.$Message.error(error.message)
				this.loginUnloading()
			}
		},
	},
}
</script>

<style lang="less">
	@import './login.less';
</style>
