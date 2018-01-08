<template>
	<section>
		<Card class="table-card">
			<Row class="margin-bottom-10" type="flex">
			<Col :span="6">
				<Button type="primary" @click="onClickNewProduct">新增项目</Button>
			</Col>
				<Col :span="6" :offset="3">
					<Input v-model="search.input" placeholder="请输入搜索内容...">
						<Select v-model="search.column" slot="prepend" style="width: 60px">
							<template v-for="(item, index) of searchOptions">
								<Option :value="item.title">{{item.title}}</Option>
							</template>
						</Select>
						<Button slot="append" icon="ios-search" @click="onClickSearch"></Button>
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
				column: '编号',
				input: '',
				maxLength: 10,
			},
			products: [],
			productColumns: [ // TODO: columns detail needing
				{
					name: 'id',
					title: '编号',
					key: 'id',
					searchable: true,
				},
				{
					name: 'name',
					title: '名称',
					key: 'name',
					searchable: true,
				},
				{
					name: 'amount',
					title: '金额',
					key: 'amount',
				},
				{
					name: 'termType',
					title: '周期',
					key: 'termType',
				},
				{
					name: 'currentAmount',
					title: '进度',
					key: 'currentAmount',
				},
				{
					name: 'interestRate',
					title: '利率',
					render: (h, params) => h('p', `${params.row.interestRateBase || '-'} + ${params.row.interestRateDelta || '-'}`),
				},
				{
					name: 'publishTime',
					title: '发布时间',
					key: 'publishTime',
				},
				{
					title: '操作',
					align: 'center',
					render: (h, params) =>
						h('div', [
							h('Button', {
								props: { type: 'primary',	size: 'small', loading: this.products[params.index].isViewing },
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
		// main
		initPage() {
			this.listLoading()
			this.fetchProductList()
		},
		// list
		listLoading() {
			this.list.isLoading = true
		},
		listUnloading() {
			this.list.isLoading = false
		},
		productViewing(index) {
			this.products[index].isViewing = true
		},
		productUnviewing(index) {
			this.products[index].isViewing = false
		},
		onClickViewProduct(index) {
			this.productViewing(index)
			this.viewProduct(index)
		},
		onClickNewProduct() {
		},
		viewProduct(index) {
			this.$router.push({
				name: 'product_detail',
				params: {
					product_id: this.products[index].id,
				},
			})
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
</style>
