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
					<p class="login-tip">世融理财，灵活选择多样收益</p>
				</div>
			</Card>
		</div>
	</div>
</template>

<script>
import Cookies from 'js-cookie'
import api from '../libs/api'
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
				const res = await api.login(this.loginForm.username, util.md5(this.loginForm.password))
				if (res && res.id && res.token && res.role) {
					Cookies.set('username', this.loginForm.username)
					Cookies.set('password', this.loginForm.password)
					Cookies.set('access', res.role)
					sessionStorage.setItem('token', res.token)
					// this.$store.commit('setAvatar', user.avatarUrl)
					this.$router.push({
						name: 'home_index',
					})
					this.fetchProfile()
				}
			} catch (error) {
				if (error.code === 'INVALID_ADMIN_ID_ERROR') this.$Message.error('用户名或密码错误')
				else this.$Message.error(error.message)
			} finally {
				this.loginUnloading()
			}
		},
		async fetchProfile() {
			try {
				const res = await api.admin.profile.fetchSelf()
				const userProfile = {
					id: res.id,
					avatarUrl: res.avatarUrl,
					phoneNumber: res.phoneNumber,
					remark: res.remark,
				}
				Cookies.set('userProfile', JSON.stringify(userProfile))
				this.$store.commit('setAvatar', util.generateImageUrl(res.avatarUrl))
			} catch (e) {
				this.$Message.error(e.message)
			}
		},
	},
}
</script>

<style lang="less">
	@import './login.less';
</style>
