<template>
	<section>
		<Card class="table-card">
			<Row class="margin-bottom-10" type="flex">
				<Col :span="6">
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
				column: 'ID',
				input: '',
				maxLength: 10,
			},
			products: [],
			productColumns: [ // TODO: columns detail needing
				{
					name: 'productId',
					title: '编号',
					key: 'productId',
					searchable: true,
				},
				{
					name: 'name',
					title: '名称',
					key: 'name',
					searchable: true,
				},
				{
					name: 'loanAmount',
					title: '金额',
					key: 'loanAmount',
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
				},
				{
					name: 'debtor',
					title: '借款人',
					key: 'debtor',
				},
				{
					name: 'publishTime',
					title: '发布时间',
					key: 'publishTime',
				},
				{
					name: 'action',
					title: '操作',
					render: () => {
					},
				},
			],
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
