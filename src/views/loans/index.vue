<template>
	<section>
		<Card class="table-card">
			<Row class="margin-bottom-20" type="flex">
				<Col :span="6">
					<Input v-model="search.input" placeholder="请输入搜索内容...">
						<Select v-model="search.column" slot="prepend" style="width: 75px">
							<template v-for="(item, index) of searchOptions">
								<Option :value="item.title">{{item.title}}</Option>
							</template>
						</Select>
						<Button slot="append" icon="ios-search" @click="onClickSearch" :loading="search.isSearching"></Button>
					</Input>
				</Col>
				<Col :span="6" :offset="3">
					<Input v-model="add.number" placeholder="请输入借款人手机号码...">
						<p class="padding-5" slot="prepend">新增贷款</p>
						<Button slot="append" icon="plus-round" @click="onClickAdd" :loading="add.isLoading"></Button>
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
					name: 'interest', // TODO should be 'interestRate'
					title: '利率',
					key: 'interest',
				},
				{
					name: 'termType',
					title: '周期',
					key: 'termType',
				},
				{
					name: 'repaymentWay',
					title: '还款方式',
					key: 'repaymentWay',
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
				},
				{
					title: '操作',
					align: 'center',
					render: (h, params) =>
						h('div', [
							h('Button', {
								props: { type: 'primary',	size: 'small', loading: this.loans[params.index].isViewing },
								style: { marginRight: '5px' },
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
		adding() {
			this.add.isLoading = true
		},
		unadding() {
			this.add.isLoading = false
		},
		checkNumber() { // TODO should check phone number
			return true
		},
		onClickAdd() {
			if (this.checkNumber()) {
				this.adding()
				this.matchNumber()
			}
		},
		addLoan(debtorId) {
			this.$router.push({
				name: 'loan_new',
				query: {
					debtor_id: debtorId,
				},
			})
		},
		async matchNumber() {
			try {
				const query = {
					pagesize: 1,
					page: 0,
					filters: `primary_number='${this.add.number}'`,
					orderBy: '',
				}
				const list = await api.debtor.fetchList(
					query.pagesize,
					query.page,
					query.filters,
					query.orderBy,
				)
				let debtorId = null
				if (list.length === 0) {
					this.$Modal.confirm({
						content: '未能匹配对应借款人, 是否新建借款人？',
						onOk: async () => {
							try {
								const id = await api.debtor.profile.add({
									realName: '临时姓名 - 待修改',
									primaryNumber: this.add.number,
								})
								this.$Notice.success({
									title: '新建借款人成功',
									duration: 3,
								})
								debtorId = id
							} catch (e) {
								this.$Message.error(e.message)
							}
						},
					})
				} else {
					debtorId = list[0].id
					this.$Notice.success({
						title: '匹配成功',
						duration: 3,
					})
				}
				this.$Notice.info({
					title: '正在前往新增贷款页面...',
					duration: 3,
				})
				this.addLoan(debtorId)
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.unadding()
			}
		},
	},
}
</script>

<style lang="less">
@import '../../styles/common.less';
</style>
