<template>
	<section>
		<Card class="table-card">
			<Row class="margin-bottom-20" type="flex">
				<Col :span="6">
					<Input v-model="search.input" placeholder="请输入搜索内容...">
						<Select v-model="search.column" slot="prepend" style="width: 60px">
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
			:data="products"
			:columns="productColumns"
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
				column: 'ID',
				input: '',
				maxLength: 10,
			},
			products: [],
			productColumns: [ // TODO: columns detail needing
				{
					name: 'loanId',
					title: '编号',
					key: 'loanId',
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
			],

			// add
			add: {
				isLoading: false,
				number: '',
				debtorId: null,
			},
		}
	},
	computed: {
		searchOptions() {
			const list = []
			this.productColumns.forEach((item) => {
				if (item.searchable) list.push({ name: item.name, title: item.title })
			})
			return list
		},
	},
	methods: {
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
				name: 'loan_detail',
				query: {
					action: 'create',
					debtor_id: debtorId,
				},
			})
		},
		async matchNumber() {
			try {
				const query = {
					pagesize: 1,
					page: 0,
					filters: `primaryNumber='${this.add.number}'`,
					orderBy: '',
				}
				const res = await api.debtor.fetchList(
					query.pagesize,
					query.page,
					query.filters,
					query.orderBy,
				)
				let debtorId = null
				if (res.length === 0) {
					const res = await api.debtor.profile.add({
						realName: '',
						primaryNumber: this.add.number,
					})
					debtorId = res
					this.$Message.info('新建借款人成功')
				}
				else {
					debtorId = res[0].id
					this.$Message.info('该号码已存在, 正在获取数据...')
				}
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
