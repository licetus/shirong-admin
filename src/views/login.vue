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
							<Button @click="onClickLogin" type="primary" long>登录</Button>
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

export default {
	data() {
		return {
			loginForm: {
				username: 'iview_admin',
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
					this.login()
					Cookies.set('user', this.loginForm.username)
					Cookies.set('password', this.loginForm.password)
					this.$store.commit('setAvatar', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg')
					if (this.loginForm.username === 'iview_admin') {
						Cookies.set('access', 0)
					} else {
						Cookies.set('access', 1)
					}
					this.$router.push({
						name: 'home_index',
					})
				}
			})
		},
	},
}
</script>

<style lang="less">
	@import './login.less';
</style>
