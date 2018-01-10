<template>
	<section>
		<Card class="table-card">
			<Row class="margin-bottom-20" type="flex" justify="space-between">
			<Col>
				<Button type="primary" @click="onClickNewAccount">新建帐号</Button>
			</Col>
				<Col>
					<Input v-model="search.input" placeholder="请输入搜索内容...">
						<Select v-model="search.column" slot="prepend" style="width: 75px">
							<template v-for="(item, index) of searchOptions">
								<Option :value="item.title">{{item.title}}</Option>
							</template>
						</Select>
						<Button slot="append" icon="ios-search" @click="onClickSearch"></Button>
					</Input>
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
	</section>
</template>

<script>
import util from '../../libs/util'
import api from '../../libs/api'

export default {
	name: 'account_management',
	data() {
		return {
			list: {
				isLoading: false,
				total: 0,
				pagesize: 10,
				page: 0,
				filter: '',
				orderBy: '',
			},
			search: {
				column: '编号',
				input: '',
				maxLength: 10,
			},
			accounts: [],
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
					title: '权限',
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
					render: (h, params) =>
						h('div', [
							h('Button', {
								props: { type: 'primary',	size: 'small' },
								style: { marginRight: '10px' },
								on: {	click: () => this.onClickEditAccount(params.row.id) },
							}, '编辑'),
							h('Button', {
								props: { type: 'error',	size: 'small' },
								on: {	click: () => this.onClickDeleteAccount(params.row.id) },
							}, '删除'),
						]),
				},
			],
		}
	},
	mounted() {
		this.initPage()
	},
	computed: {
		searchOptions() {
			const list = []
			this.accountColumns.forEach((item) => {
				if (item.searchable) list.push({ name: item.name, title: item.title })
			})
			return list
		},
	},
	methods: {
		// main
		initPage() {
			this.listLoading()
			this.fetchAccountList()
		},
		onClickRefresh() {
			this.initPage()
		},
		// list
		listLoading() {
			this.list.isLoading = true
		},
		listUnloading() {
			this.list.isLoading = false
		},
		accountViewing(index) {
			this.accounts[index].isViewing = true
		},
		accountUnviewing(index) {
			this.accounts[index].isViewing = false
		},
		onClickNewAccount() {
		},
		onClickEditAccount() {
		},
		onClickDeleteAccount() {
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
		onClickSearchOption(name) {
			this.search.column = name
		},
		onClickSearch() {
			if (util.inputLengthCheck(this.search.input, this.search.maxLength, this)) {
				this.$Message.info(`搜索: [${this.search.column}] - [${this.search.input}]`)
			}
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
