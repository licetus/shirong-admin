<template>
	<Row>
		<Col :span="8">
			<Card>
				<Spin v-if="user.isLoading" size="large" fix></Spin>
				<p slot="title">用户信息</p>
				<Form label-position="left" :label-width="user.labelWidth" inline>
					<Row>
						<Col :span="12"><FormItem label="登录账号">
							<p>{{user.account}}</p>
						</FormItem></Col>
						<Col :span="12"><FormItem label="">
							<p>{{util.getRole(this, user.access)}}</p>
						</FormItem></Col>
					</Row>
					<Row>
						<Col :span="24"><FormItem label="用户头像">
							<Row>
								<Col :span="12">
									<SafeImg :src="user.form.avatarUrl" type="avatar-md"></SafeImg>
								</Col>
							</Row>
						</FormItem></Col>
					</Row>
					<Row>
						<Col :span="24"><FormItem label="手机号码">
							<p>{{user.form.phoneNumber}}</p>
						</FormItem></Col>
						<Col :span="24"><FormItem label="备注">
							<p>{{user.form.remark}}</p>
						</FormItem></Col>
					</Row>
				</Form>
			</Card>
		</Col>
	</Row>
</template>

<script>
import Cookies from 'js-cookie'
import api from '../../libs/api'
import util from '../../libs/util'

export default {
	name: 'ownspace_index',
	data() {
		return {
			util,
			user: {
				isLoading: false,
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
		initPage() {
		},
		initUserForm() {
			this.user.form = {
				avatarUrl: this.user.profile.avatarUrl,
				phoneNumber: this.user.profile.phoneNumber,
				remark: this.user.profile.remark,
			}
		},
	},
	mounted() {
		this.initPage()
	},
}
</script>

<style lang="less">
	@import '../../styles/common.less';
</style>
