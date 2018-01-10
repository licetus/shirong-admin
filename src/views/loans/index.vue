<template>
	<section>
		<Card class="table-card">
			<Row class="margin-bottom-20" type="flex" justify="space-between">
				<Col>
					<Button type="primary" @click="onClickNewLoan">新增贷款</Button>
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
			:data="loans"
			:columns="loanColumns"
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
	name: 'loans_index',
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
			loans: [],
			loanColumns: [ // TODO: columns detail needing
				{
					name: 'id',
					title: '编号',
					key: 'id',
					searchable: true,
				},
				{
					name: 'status',
					title: '状态',
					key: 'status',
					render: (h, params) => {
						const tag = util.getLoanStatusTag(this, params.row.status)
						return h('Tag', {
							props: {
								color: tag.color,
							},
						}, tag.text || '')
					},
				},
				{
					name: 'object',
					title: '标的',
					key: 'object',
					align: 'center',
					searchable: true,
				},
				{
					name: 'amount',
					title: '借款金额',
					key: 'amount',
					align: 'center',
				},
				{
					name: 'interestRate',
					title: '利率',
					key: 'interestRate',
					align: 'center',
				},
				{
					name: 'termType',
					title: '周期',
					key: 'termType',
					align: 'center',
					render: (h, params) => h('p', util.getLoanTermType(this, params.row.termType) || '-'),
				},
				{
					name: 'repaymentWay',
					title: '还款方式',
					key: 'repaymentWay',
					align: 'center',
					render: (h, params) => h('p', util.getLoanRepaymentWay(this, params.row.repaymentWay) || '-'),
				},
				{
					name: 'debtorName',
					title: '借款人',
					key: 'debtorName',
					align: 'center',
					searchable: true,
				},
				{
					name: 'agentId',
					title: '业务员',
					key: 'agentId',
					align: 'center',
					searchable: true,
				},
				{
					name: 'approvalStatus',
					title: '审核状态',
					key: 'approvalStatus',
					align: 'center',
					render: (h, params) => {
						const tag = util.getLoanApprovalStatusTag(this, params.row.approvalStatus)
						return h('Tag', {
							props: {
								color: tag.color,
							},
						}, tag.text || '')
					},
				},
				{
					title: '操作',
					align: 'center',
					render: (h, params) =>
						h('div', [
							h('Button', {
								props: { type: 'text', loading: this.loans[params.index].isViewing },
								on: {	click: () => this.onClickViewLoan(params.index) },
							}, '查看'),
						]),
				},
			],

			// add
			add: {
				isLoading: false,
				number: '15895959270',
				debtorId: null,
			},
		}
	},
	mounted() {
		this.initPage()
	},
	activated() {
		if (this.$route.query.action === 'refresh') {
			this.initPage()
			this.$router.push({
				name: 'loans_index',
			})
		}
	},
	computed: {
		searchOptions() {
			const list = []
			this.loanColumns.forEach((item) => {
				if (item.searchable) list.push({ key: item.key, title: item.title })
			})
			return list
		},
	},
	methods: {
		// main
		initPage() {
			this.listLoading()
			this.fetchLoanList()
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
		// loanViewing(index) {
		// 	this.loans[index].isViewing = true
		// },
		// loanUnviewing(index) {
		// 	this.loans[index].isViewing = false
		// },
		onClickViewLoan(index) {
			// this.loanViewing(index)
			this.viewLoan(index)
		},
		viewLoan(index) {
			this.$router.push({
				name: 'loan_detail',
				params: {
					loan_id: this.loans[index].id,
				},
			})
			// this.loanUnviewing()
		},
		async fetchLoanList() {
			try {
				const list = await api.loan.fetchList(
					this.list.pagesize,
					this.list.page,
					this.list.filters,
					this.list.orderBy,
				)
				this.loans = list
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
		// add
		onClickNewLoan() {
			this.$router.push({
				name: 'loan_new',
			})
		},
	},
}
</script>

<style lang="less">
@import '../../styles/common.less';
@import '../../styles/public.less';
</style>
