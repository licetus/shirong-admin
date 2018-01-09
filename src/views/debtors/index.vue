<template>
	<section>
		<Card class="table-card">
			<Row class="margin-bottom-20" type="flex" justify="space-between">
				<Col>
					<Button type="primary" @click="onClickNewDebtor">新增借款人</Button>
				</Col>
				<Col>
					<Input v-model="search.input" placeholder="请输入搜索内容...">
						<Select v-model="search.column" slot="prepend" style="width: 75px">
							<template v-for="(item, index) of searchOptions">
								<Option :value="item.title">{{item.title}}</Option>
							</template>
						</Select>
						<Button slot="append" icon="ios-search" @click="onClickSearch" :loading="search.isSearching"></Button>
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
			:data="debtors"
			:columns="debtorColumns"
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
	name: 'debtors_index',
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
			debtors: [],
			debtorColumns: [ // TODO: columns detail needing
				{
					name: 'id',
					title: '编号',
					key: 'id',
					searchable: true,
				},
				{
					name: 'realName',
					title: '姓名',
					key: 'realName',
					searchable: true,
				},
				{
					name: 'primaryNumber',
					title: '手机',
					key: 'primaryNumber',
					searchable: true,
				},
				{
					name: 'remark',
					title: '备注',
					key: 'remark',
					searchable: true,
				},
				{
					title: '操作',
					align: 'center',
					render: (h, params) =>
						h('div', [
							h('Button', {
								props: { type: 'text', loading: this.debtors[params.index].isViewing },
								on: {	click: () => this.onClickViewDebtor(params.index) },
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
				name: 'debtors_index',
			})
		}
	},
	computed: {
		searchOptions() {
			const list = []
			this.debtorColumns.forEach((item) => {
				if (item.searchable) list.push({ name: item.name, title: item.title })
			})
			return list
		},
	},
	methods: {
		// main
		initPage() {
			this.listLoading()
			this.fetchDebtorList()
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
		debtorViewing(index) {
			this.debtors[index].isViewing = true
		},
		debtorUnviewing(index) {
			this.debtors[index].isViewing = false
		},
		onClickViewDebtor(index) {
			this.debtorViewing(index)
			this.viewDebtor(index)
		},
		viewDebtor(index) {
			this.$router.push({
				name: 'debtor_detail',
				params: {
					debtor_id: this.debtors[index].id,
				},
			})
		},
		async fetchDebtorList() {
			try {
				const list = await api.debtor.fetchList(
					this.list.pagesize,
					this.list.page,
					this.list.filters,
					this.list.orderBy,
				)
				this.debtors = list
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
		onClickNewDebtor() {
			this.$router.push({
				name: 'debtor_new',
			})
		},
	},
}
</script>

<style lang="less">
@import '../../styles/common.less';
@import '../../styles/public.less';
</style>
