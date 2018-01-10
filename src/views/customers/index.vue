<template>
	<section>
		<Card class="table-card">
			<Row class="margin-bottom-20" type="flex" justify="space-between">
				<Col :span='2'>
					<!-- <Button type="primary" @click="onClickNewCustomer">新增借款人</Button> -->
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
			:data="customers"
			:columns="customerColumns"
			@on-sort-change="onClickSort"
			stripe
			border>
		</Table>
	</Card>
	</section>
</template>

<script>
import api from '../../libs/api'
import util from '../../libs/util'

export default {
	name: 'customers_index',
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
				key: 'id',
				val: '',
				maxLength: 10,
			},
			customers: [],
			customerColumns: [ // TODO: columns detail needing
				{
					name: 'id',
					title: '编号',
					key: 'id',
					align: 'center',
					searchable: true,
				},
				{
					name: 'account',
					title: '账号',
					key: 'account',
					align: 'center',
					searchable: true,
				},
				{
					name: 'vipLevel',
					title: 'Vip等级',
					key: 'vipLevel',
					align: 'center',
				},
				{
					name: 'isIdVerified',
					title: '认证状态',
					key: 'isIdVerified',
					align: 'center',
					render: (h, params) => h('p', `${params.row.isIdVerified ? '已认证' : '未认证'}`),
				},
				{
					name: 'realName',
					title: '姓名',
					key: 'realName',
					align: 'center',
					searchable: true,
					render: (h, params) => h('div', [
						h('p', {
							style: {
								'font-size': '12px',
							},
						}, params.row.realName),
						h('p', {
							style: {
								'font-size': '10px',
							},
						}, params.row.idCardNumber),
					]),
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
								props: { type: 'text', loading: this.customers[params.index].isViewing },
								on: {	click: () => this.onClickViewCustomer(params.index) },
							}, '查看'),
						]),
				},
			],
		}
	},
	mounted() {
		this.initPage()
	},
	activated() {
		if (this.$route.query.action === 'refresh') {
			this.initPage()
			this.$router.push({
				name: 'customers_index',
			})
		}
	},
	computed: {
		searchOptions() {
			const list = []
			this.customerColumns.forEach((item) => {
				if (item.searchable) list.push({ key: item.key, title: item.title })
			})
			return list
		},
	},
	methods: {
		// main
		initPage() {
			this.listLoading()
			this.fetchCustomerList()
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
		// customerViewing(index) {
		// 	this.customers[index].isViewing = true
		// },
		// customerUnviewing(index) {
		// 	this.customers[index].isViewing = false
		// },
		onClickViewCustomer(index) {
			// this.customerViewing(index)
			this.viewCustomer(index)
		},
		viewCustomer(index) {
			this.$router.push({
				name: 'customer_detail',
				params: {
					customer_id: this.customers[index].id,
				},
			})
			// this.customerUnviewing()
		},
		async fetchCustomerList() {
			try {
				const list = await api.customer.fetchList(
					this.list.pagesize,
					this.list.page,
					this.list.filters,
					this.list.orderBy,
				)
				this.customers = list
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
