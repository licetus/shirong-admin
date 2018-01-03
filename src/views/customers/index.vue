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
				column: 'ID',
				input: '',
				maxLength: 10,
			},
			customers: [],
			customerColumns: [ // TODO: columns detail needing
				{
					name: 'customerId',
					title: 'ID',
					key: 'customerId',
					searchable: true,
				},
				{
					name: 'customerNickname',
					title: '昵称',
					key: 'customerNickname',
					searchable: true,
				},
				{
					name: 'customerName',
					title: '姓名',
					key: 'customerName',
					searchable: true,
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
			this.customerColumns.forEach((item) => {
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
