<template>
	<section>
		<Card class="table-card">
			<Row class="margin-bottom-20" type="flex">
				<Col :span="6">
					<Button type="primary" @click="onClickNewLoan">新增贷款</Button>
				</Col>
				<Col :span="6" :offset="3">
					<Input v-model="search.input" placeholder="请输入搜索内容...">
						<Select v-model="search.column" slot="prepend" style="width: 75px">
							<template v-for="(item, index) of searchOptions">
								<Option :value="item.title">{{item.title}}</Option>
							</template>
						</Select>
						<Button slot="append" icon="ios-search" @click="onClickSearch" :loading="search.isSearching"></Button>
					</Input>
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
				isSearching: false,
				column: '编号',
				input: '',
				maxLength: 10,
			},
			loans: [],
			loanColumns: [ // TODO: columns detail needing
				{
					name: 'loanId',
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
					searchable: true,
				},
				{
					name: 'amount',
					title: '借款金额',
					key: 'amount',
				},
				{
					name: 'interestRate',
					title: '利率',
					key: 'interestRate',
				},
				{
					name: 'termType',
					title: '周期',
					key: 'termType',
					render: (h, params) => h('p', util.getLoanTermType(this, params.row.termType) || '-'),
				},
				{
					name: 'repaymentWay',
					title: '还款方式',
					key: 'repaymentWay',
					render: (h, params) => h('p', util.getLoanRepaymentWay(this, params.row.repaymentWay) || '-'),
				},
				{
					name: 'debtorId',
					title: '借款人',
					key: 'debtorId',
					searchable: true,
				},
				{
					name: 'agentId',
					title: '业务员',
					key: 'agentId',
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
				if (item.searchable) list.push({ name: item.name, title: item.title })
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
		// list
		listLoading() {
			this.list.isLoading = true
		},
		listUnloading() {
			this.list.isLoading = false
		},
		loanViewing(index) {
			this.loans[index].isViewing = true
		},
		loanUnviewing(index) {
			this.loans[index].isViewing = false
		},
		onClickViewLoan(index) {
			this.loanViewing(index)
			this.viewLoan(index)
		},
		viewLoan(index) {
			this.$router.push({
				name: 'loan_detail',
				params: {
					loan_id: this.loans[index].id,
				},
			})
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
		onClickSearchOption(name) {
			this.search.column = name
		},
		onClickSearch() {
			if (util.inputLengthCheck(this.search.input, this.search.maxLength, this)) {
				this.$Notice.open({
					title: `搜索: [${this.search.column}] - [${this.search.input}]`,
					duration: 3,
				})
			}
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
