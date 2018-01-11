<template>
	<section>
		<Card class="table-card">
			<Row class="margin-bottom-20" type="flex" justify="space-between">
			<Col>
				<Button type="primary" @click="onClickNewAccount">新建帐号</Button>
			</Col>
				<Col>
					<Row type="flex">
						<Col>
							<Input v-model="search.val" placeholder="请输入搜索内容..." @on-enter="onClickSearch">
								<Select v-model="search.key" slot="prepend" style="width: 75px">
									<template v-for="(item, index) of searchOptions">
										<Option :value="item.key" :label="item.title"></Option>
									</template>
								</Select>
								<Button slot="append" icon="ios-search" @click="onClickSearch" :loading="list.isLoading"></Button>
							</Input>
						</Col>
						<Col>
							<Button type="text" @click="onClickResetPage" :loading="list.isLoading">重置</Button>
						</Col>
					</Row>
				</Col>
				<Col>
					<Row type="flex" justify="end">
						<Button type="text" @click="onClickRefresh" :disabled="list.isLoading"><Icon class="margin-right-10" type="refresh"></Icon>刷新</Button>
					</Row>
				</Col>
			</Row>
			<Table
				:loading="list.isLoading"
				:data="accounts"
				:columns="accountColumns"
				@on-sort-change="onClickSort"
				stripe
				border>
			</Table>
		</Card>
		<Modal v-model="account.isModalVisible" width="400">
			<p slot="header">{{modalTitle}}</p>
			<Form ref="accountForm" :model="account.form" :rules="account.rules" label-position="left" :label-width="account.labelWidth" inline>
				<Row type="flex" justify="center">
					<Col>
						<Row>
							<Col><FormItem label="账号">
								<p v-if="account.action === 'edit'">{{account.form.account}}</p>
								<Input v-else v-model="account.form.account" icon="checkmark" @on-enter="focusPassword" @on-click="focusPassword"/>
							</FormItem></Col>
							<Col><FormItem label="密码">
								<Button v-if="account.action === 'edit' && !account.resetPassword" @click="onClickResetPassword">重置密码</Button>
								<InputPassword v-else ref="passwordInput" v-model="account.form.password"></InputPassword>
							</FormItem></Col>
							<Col><FormItem label="类别">
								<RadioGroup v-model="account.form.role">
									<Radio :label="Enum.Role.Admin">{{util.getRole(this, Enum.Role.Admin)}}</Radio>
									<Radio :label="Enum.Role.Operator">{{util.getRole(this, Enum.Role.Operator)}}</Radio>
									<Radio :label="Enum.Role.Agent">{{util.getRole(this, Enum.Role.Agent)}}</Radio>
								</RadioGroup>
							</FormItem></Col>
						</Row>
					</Col>
				</Row>
			</Form>
			<div slot="footer">
				<Button @click="onClickCancel">取消</Button>
				<Button type="primary" @click="onClickSubmitAccount" :loading="account.isSubmitting">提交</Button>
			</div>
		</Modal>
	</section>
</template>

<script>
import Enum from '../../models/enum'
import util from '../../libs/util'
import api from '../../libs/api'

export default {
	name: 'account_management',
	data() {
		return {
			Enum,
			util,
			list: {
				isLoading: false,
				total: 0,
				pagesize: 10,
				page: 0,
				filters: '',
				orderBy: 'role',
			},
			search: {
				key: 'id',
				val: '',
				maxLength: 10,
			},
			accounts: [],
			accountsDeleting: [],
			accountColumns: [ // TODO: columns detail needing
				{
					name: 'id',
					title: '编号',
					key: 'id',
					align: 'center',
					searchable: true,
				},
				{
					name: 'role',
					title: '类别',
					key: 'role',
					align: 'center',
					render: (h, params) => h('p', `${util.getRole(this, params.row.role) || '-'}`),
				},
				{
					name: 'account',
					title: '账号',
					key: 'account',
					align: 'center',
					searchable: true,
				},
				{
					name: 'phoneNumber',
					title: '手机',
					key: 'phoneNumber',
					align: 'center',
					searchable: true,
				},
				{
					name: 'remark',
					title: '备注',
					key: 'remark',
					align: 'center',
					searchable: true,
				},
				{
					title: '操作',
					align: 'center',
					width: 150,
					render: (h, params) => {
						if (params.row.role !== Enum.Role.SuperAdmin) {
							return h('div', [
								h('Button', {
									props: { type: 'primary',	size: 'small' },
									style: { marginRight: '10px' },
									on: {	click: () => this.onClickEditAccount(params.row) },
								}, '编辑'),
								h('Button', {
									props: { type: 'error',	size: 'small', loading: this.account[`isAccount${params.row.id}Deleting`] || false },
									on: {	click: () => this.onClickDeleteAccount(params.row.id) },
								}, '删除'),
							])
						}
						return null
					},
				},
			],
			account: {
				isModalVisible: false,
				isSubmitting: false,
				action: 'add',
				resetPassword: false,
				labelWidth: 75,
				form: {
					account: '',
					role: null,
				},
				rules: {
				},
			},
		}
	},
	mounted() {
		this.initPage()
	},
	computed: {
		searchOptions() {
			const list = []
			this.accountColumns.forEach((item) => {
				if (item.searchable) list.push({ key: item.name, title: item.title })
			})
			return list
		},
		modalTitle() {
			switch (this.account.action) {
				case 'add':
					return '新建'
				case 'edit':
					return '编辑'
				default: return ''
			}
		},
	},
	methods: {
		// main
		initPage() {
			this.listLoading()
			this.fetchAccountList()
		},
		accountDeleting(id) {
			this.$set(this.account, `isAccount${id}Deleting`, true)
		},
		accountUndeleting(id) {
			this.$delete(this.account, `isAccount${id}Deleting`)
		},
		onClickRefresh() {
			this.initPage()
		},
		onClickNewAccount() {
			this.initAccountForm('add')
			this.showAccountModal()
		},
		onClickEditAccount(account) {
			this.initAccountForm('edit', account)
			this.showAccountModal()
		},
		onClickDeleteAccount(id) {
			util.passwordCheck(this, () => {
				this.accountDeleting(id)
				this.deleteAccount(id)
			})
		},
		async deleteAccount(id) {
			try {
				await api.admin.account.delete(id)
				this.initPage()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.accountUndeleting(id)
			}
		},
		// modal
		showAccountModal() {
			this.account.isModalVisible = true
		},
		hideAccountModal() {
			this.account.isModalVisible = false
		},
		resetPassword() {
			this.account.resetPassword = true
		},
		focusPassword() {
			this.$refs.passwordInput.focus()
		},
		accountSubmitting() {
			this.account.isSubmitting = true
		},
		accountUnsubmitting() {
			this.account.isSubmitting = false
		},
		initAccountForm(action, account) {
			switch (action) {
				case 'add':
					this.account.action = 'add'
					this.account.form = {
						account: '',
						password: '',
						role: null,
					}
					break
				case 'edit':
					this.account.action = 'edit'
					this.account.form = {
						id: account.id,
						account: account.account,
						role: account.role,
					}
					break
				default:
			}
		},
		onClickResetPassword() {
			this.resetPassword()
		},
		onClickCancel() {
			this.hideAccountModal()
		},
		onClickSubmitAccount() { // BUG validator doesn't work
			// this.$refs.accountForm.validator((valid) => {
			// 	if (valid) {
			// 	}
			// })
			util.passwordCheck(this, () => {
				switch (this.account.action) {
					case 'add': {
						const account = {
							account: this.account.form.account,
							password: util.md5(this.account.form.password),
							role: this.account.form.role,
						}
						this.accountSubmitting()
						this.addAccount(account)
						break
					}
					case 'edit': {
						const account = {
							role: this.account.form.role,
						}
						if (this.account.resetPassword && this.account.form.password) account.password = util.md5(this.account.form.password)
						this.accountSubmitting()
						this.updateAccount(account, this.account.form.id)
						break
					}
					default:
				}
			})
		},
		async addAccount(account) {
			try {
				await api.admin.account.add(account)
				this.hideAccountModal()
				this.initPage()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.accountUnsubmitting()
			}
		},
		async updateAccount(account, id) {
			try {
				await api.admin.account.update(account, id)
				this.hideAccountModal()
				this.initPage()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.accountUnsubmitting()
			}
		},
		// list
		listLoading() {
			this.list.isLoading = true
		},
		listUnloading() {
			this.list.isLoading = false
		},
		async fetchAccountList() {
			try {
				const list = await api.admin.account.fetchList(
					this.list.pagesize,
					this.list.page,
					this.list.filters,
					this.list.orderBy,
				)
				this.accounts = list
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.listUnloading()
			}
		},
		// search / sort
		generateSearchFilters() {
			this.list.filters = `${this.search.key} LIKE '%${this.search.val}%'`
		},
		onClickSearch() {
			if (util.inputLengthCheck(this.search.val, this.search.maxLength, this)) {
				this.generateSearchFilters()
				this.initPage()
			}
		},
		onClickResetPage() {
			this.list.filters = ''
			this.initPage()
		},
		onClickSort() {
		},
	},
}
</script>

<style lang="less">
@import '../../styles/common.less';
@import '../../styles/public.less';
</style>
