<template>
	<section>
		<Card class="table-card">
			<Row class="margin-bottom-20" type="flex" justify="space-between">
				<Col>
					<Button type="primary" @click="onClickNewProduct">新增项目</Button>
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
import util from '../../libs/util'
import api from '../../libs/api'

export default {
	name: 'products_index',
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
			products: [],
			productColumns: [ // TODO: columns detail needing
				{
					name: 'id',
					title: '编号',
					key: 'id',
					align: 'center',
					searchable: true,
				},
				{
					name: 'name',
					title: '名称',
					key: 'name',
					align: 'center',
					searchable: true,
				},
				{
					name: 'status',
					title: '状态/上架',
					key: 'status',
					align: 'center',
					render: (h, params) => {
						const tag = util.getProductStatusTag(this, params.row.status)
						return h('Row', {
							props: {
								type: 'flex',
								align: 'middle',
							},
						}, [
							h('SimpleTag', {
								props: {
									color: tag.color,
									text: tag.text || '-',
								},
							}),
							h('Icon', {
								props: {
									type: `toggle${params.row.isOnSale ? '-filled' : ''}`,
									size: 32,
								},
							}),
						])
					},
				},
				{
					name: 'amount',
					title: '金额',
					key: 'amount',
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
					name: 'currentAmount',
					title: '进度',
					key: 'currentAmount',
					align: 'center',
					render: (h, params) => h('Row', {
						props: { type: 'flex', justify: 'space-between' },
					}, [
						h('Col', `${params.row.currentInvestment || '-'}`),
						h('span', '-'),
						h('Col', `${util.formatPercent((params.row.currentInvestment / params.row.amount).toFixed(2, 10)) || '-'}`),
					]),
				},
				{
					name: 'interestRate',
					title: '利率',
					align: 'center',
					render: (h, params) => h('Row', {
						props: { type: 'flex', justify: 'space-between' },
					}, [
						h('Col', `${params.row.interestRateBase || '-'}`),
						h('span', '+'),
						h('Col', `${params.row.interestRateDelta || '-'}`),
					]),
				},
				{
					name: 'publishTime',
					title: '发布时间',
					key: 'publishTime',
					align: 'center',
					render: (h, params) => h('p', {
						style: 'word-break:keep-all',
					}, `${util.formatTime(this, params.row.publishTime) || '-'}`),
				},
				{
					title: '操作',
					align: 'center',
					render: (h, params) =>
						h('div', [
							h('Button', {
								props: { type: 'text',	size: 'small', loading: this.products[params.index].isViewing },
								style: { marginRight: '5px' },
								on: {	click: () => this.onClickViewProduct(params.index) },
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
				name: 'products_index',
			})
		}
	},
	computed: {
		searchOptions() {
			const list = []
			this.productColumns.forEach((item) => {
				if (item.searchable) list.push({ key: item.key, title: item.title })
			})
			return list
		},
	},
	methods: {
		// main
		initPage() {
			this.listLoading()
			this.fetchProductList()
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
		// productViewing(index) {
		// 	this.products[index].isViewing = true
		// },
		// productUnviewing(index) {
		// 	this.products[index].isViewing = false
		// },
		onClickViewProduct(index) {
			// this.productViewing(index)
			this.viewProduct(index)
		},
		onClickNewProduct() {
			this.$router.push({
				name: 'product_new',
			})
		},
		viewProduct(index) {
			this.$router.push({
				name: 'product_detail',
				params: {
					product_id: this.products[index].id,
				},
			})
			// this.productUnviewing()
		},
		async fetchProductList() {
			try {
				const list = await api.product.fetchList(
					this.list.pagesize,
					this.list.page,
					this.list.filters,
					this.list.orderBy,
				)
				this.products = list
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
