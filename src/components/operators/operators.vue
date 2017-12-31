<template>
	<section id="operators">
		<Card class="pane" :padding="20" :bordered="false" dis-hover>
			<!-- tool bar -->
			<Row class-name="tool-bar" type="flex" justify="space-between">
				<Col :span="12">
					<Row class-name="top-bar-left" type="flex" justify="start">
						<Col>
							<Button type="primary" @click="onClickNewOperator">
								<Icon type="plus" color="white"></Icon> {{$t('messages.Operator.Button.NewOperator')}}
							</Button>
						</Col>
					</Row>
				</Col>
				<Col :span="12">
					<Row class-name="top-bar-right" type="flex" justify="end">
						<Col :span="18">
							<Row type="flex" juestify="end">
								<Col class-name="table-selector" :span="8">
									<Select v-model="filters.searchFilter.type" @on-change="onChangeSelector" placeholder="filter type">
										<Option :value="Enum.OperatorSelectorOptions.OperatorId">{{$t('messages.Operator.Table.OperatorId')}}</Option>
										<Option :value="Enum.OperatorSelectorOptions.OperatorNickname">{{$t('messages.Operator.Table.Nickname')}}</Option>
										<Option :value="Enum.OperatorSelectorOptions.Company">{{$t('messages.Operator.Table.Company')}}</Option>
									</Select>
								</Col>
								<Col :span="12">
									<Input type="text" v-model="filters.searchFilter.value"></Input>
								</Col>
								<Col class-name="table-search-button" :span="4">
									<Button @click="onClickSearch" icon="ios-search" long></Button>
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>

			<Table
				:loading="list.isLoading"
				:data="operators"
				:columns="operatorsColumns"
				@on-sort-change="onClickSort"
				:no-data-text="$t('messages.Public.Table.NoDataText')"
				:no-filtered-data-text="$t('messages.Public.Table.NoFilteredDataText')"
				stripe
				border>
			</Table>
			<Row class-name="table-paging" type="flex" justify="center">
				<Page :total="list.total" :page-size="list.pagesize" @on-change="onPaging"></Page>
			</Row>
		</Card>

		<Modal v-model="isNewOperatorModalVisible">
			<p slot="header">{{$t('messages.Operator.Modal.NewOperator')}}</p>
			<Form ref="newOperatorForm" :model="newOperatorForm" :rules="newOperatorFormRules" label-position="left" :label-width="labelWidth.edit">
				<FormItem :label="$t('messages.Operator.Modal.Account')" prop="account">
					<Input v-model="newOperatorForm.account"></Input>
				</FormItem>
				<FormItem :label="$t('messages.Operator.Modal.Password')" prop="password">
					<Input v-model="newOperatorForm.password"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="default" @click="onClickCancelNewOperator">{{$t('messages.Public.Button.Cancel')}}</Button>
				<Button type="primary" @click="onClickConfirmNewOperator" :loading="isEditFormConfirmLoading">{{$t('messages.Public.Button.Next')}}</Button>
			</div>
		</Modal>
	</section>
</template>

<script>
import Bus from '../../bus'
import * as Api from '../../api'
import { md5, errorHandler, generateSortQuery, getOperatorType, formatRate } from '../../utils'
import { Enum } from '../../models'
// import { getStyle } from '../../utils'

export default {
	data() {
		return {
			Enum,
			list: {
				isLoading: false,
				total: 0,
				pagesize: 10,
				page: 0,
				filter: '',
				orderBy: '',
			},
			filters: {
				searchFilter: {
					type: Enum.OperatorSelectorOptions.OperatorId,
					value: null,
				},
			},
			sortItems: [],
			operators: [],
			operatorsColumns: [
				{
					name: 'operatorId',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: false,
					width: 150,
					title: this.$t('messages.Operator.Table.OperatorId'),
					key: 'id',
					render: (h, params) => h('Button', {
						props: {
							type: 'text',
						},
						on: {
							click: () => this.onClickOperatorId(params.row.id),
						},
					}, params.row.id),
				},
				{
					name: 'nickname',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: false,
					width: 150,
					title: this.$t('messages.Operator.Table.Nickname'),
					key: 'nickname',
				},
				{
					name: 'company',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: false,
					title: this.$t('messages.Operator.Table.Company'),
					key: 'company',
				},
				{
					name: 'type',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: 'custom',
					width: 100,
					title: this.$t('messages.Operator.Table.Type'),
					key: 'type',
					render: (h, params) => h('div', this.$t(`messages.Operator.OperatorType.${getOperatorType(params.row.type)}`)),
				},
				{
					name: 'orderAmount',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: 'custom',
					width: 120,
					title: this.$t('messages.Operator.Table.OrderAmount'),
					key: 'orderCount',
					render: (h, params) => h('Button', {
						props: {
							type: 'text',
						},
						on: {
							click: () => {
								if (params.row.orderCount > 0) this.onClickOrderAmount(params.row.id)
							},
						},
					}, params.row.orderCount || 0),
				},
				{
					name: 'discountRate',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: 'custom',
					width: 120,
					title: this.$t('messages.Operator.Table.DiscountRate'),
					key: 'discountRate',
					render: (h, params) => {
						if (params.row.discountRate === 1) return h('div', '-')
						return h('div', `- ${formatRate(1 - params.row.discountRate)}`)
					},
				},
				{
					name: 'contactEmail',
					align: 'center',
					hidden: false,
					ellipsis: false,
					width: 200,
					sortable: false,
					title: this.$t('messages.Operator.Table.ContactEmail'),
					key: 'contactEmail',
				},
				{
					name: 'conversation',
					align: 'center',
					hidden: false,
					ellipsis: false,
					width: 110,
					sortable: 'custom',
					title: this.$t('messages.Public.Table.Conversation'),
					key: 'unreadMessages',
					render: (h, params) => h('Button', {
						props: {
							type: 'text',
						},
						on: {
							click: () => this.onClickMessages(params.row.id), // TODO maybe more params
						},
					}, [
						h('Badge', {
							props: {
								count: `${params.row.unreadMessages || 0}`,
								dot: true,
							},
						}, [
							h('span', this.$t('messages.Public.Table.Messages')),
						]),
					]),
				},
			],

			labelWidth: {
				edit: 120,
			},
			isEditFormConfirmLoading: false,
			isNewOperatorModalVisible: false,
			newOperatorForm: {
				account: '',
				password: '',
			},
			newOperatorFormRules: {
				account: [
					{ required: true, message: this.$t('messages.Operator.Validator.Requirement.Account'), trigger: 'blur' },
					{ type: 'email', message: this.$t('messages.Operator.Validator.Account'), trigger: 'blur' },
				],
				password: [
					{ required: true, message: this.$t('messages.Operator.Validator.Requirement.Password'), trigger: 'blur' },
					{ type: 'string', min: 6, message: this.$t('messages.Operator.Validator.Password'), trigger: 'blur' },
				],
			},
		}
	},
	mounted() {
		this.initPage()
	},
	computed: {
	},
	methods: {
		// table
		onClickOperatorId(operatorId) {
			this.viewOperatorDetail(operatorId)
		},
		onClickOrderAmount(operatorId) {
			const path = `/orders?operatorId=${operatorId}`
			this.$router.push(path)
		},
		onClickMessages(id) {
			const path = `/messages/${Enum.MessageType.OperatorAdmin}/${id}`
			this.$router.push(path)
		},
		onPaging(page) {
			this.list.page = page - 1
			this.fetchOperatorList()
		},
		viewOperatorDetail(operatorId) {
			const path = `/operators/${operatorId}`
			this.$router.push(path)
		},

		// filter
		onChangeSelector() {
			this.filters.searchFilter.value = null
		},
		onClickSearch() {
			this.list.filter = this.generateFilterQuery()
			this.filterOperator()
		},
		onClickSort(params) {
			this.list.orderBy = generateSortQuery(this.sortItems, params.key, params.order)
			this.filterOperator()
		},

		filterOperator() {
			this.list.page = 0
			this.fetchOperatorList()
		},
		generateFilterQuery() {
			const queryStr = []
			if (this.generateSearchFilterQuery(this.filters.searchFilter.type, this.filters.searchFilter.value) !== '') queryStr.push(this.generateSearchFilterQuery(this.filters.searchFilter.type, this.filters.searchFilter.value))
			return queryStr.join()
		},
		generateSearchFilterQuery(type, value) {
			if (value === '' || value === 0 || value === null) return ''
			switch (type) {
			case Enum.OperatorSelectorOptions.OperatorId:
				return `id=${value}`
			case Enum.OperatorSelectorOptions.OperatorNickname:
				return `nickname LIKE '%${value}%'`
			case Enum.OperatorSelectorOptions.Company:
				return `company LIKE '%${value}%'`
			default:
			}
			return ''
		},

		// new operator
		onClickNewOperator() {
			this.newOperatorForm = {
				account: '',
				password: '',
			}
			this.showNewOperatorModal()
		},
		onClickCancelNewOperator() {
			this.hideNewOperatorModal()
		},
		onClickConfirmNewOperator() {
			this.$refs.newOperatorForm.validate((valid) => {
				if (valid) this.addOperator()
			})
		},
		showNewOperatorModal() {
			this.isNewOperatorModalVisible = true
		},
		hideNewOperatorModal() {
			this.isNewOperatorModalVisible = false
		},
		async addOperator() {
			try {
				this.isEditFormConfirmLoading = true
				const params = {
					account: this.newOperatorForm.account,
					password: md5(this.newOperatorForm.password),
				}
				const operatorId = await Api.addOperator(params)
				this.$Message.success(this.$t('messages.Operator.Message.AddSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideNewOperatorModal()
				this.$router.push(`/operators/${operatorId}/modify`)
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},

		async fetchOperatorList() {
			this.list.isLoading = true
			try {
				this.generateBreadcrumb()
				const res = await Api.fetchOperatorList(
					this.list.pagesize,
					this.list.page,
					this.list.filter,
					this.list.orderBy,
				)
				this.operators = res.items
				this.list.total = res.total
				this.list.isLoading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.list.isLoading = false
			}
		},
		generateBreadcrumb() {
			this.breadcrumbs = [
				{ name: this.$t('messages.Operator.Breadcrumb'), path: '/operators' },
			]
			Bus.$emit('updateBreadcrumbs', this.breadcrumbs)
		},
		initPage() {
			this.fetchOperatorList()
		},
	},
}
</script>

<style lang="scss">
#operators {
	height: 100%;
	.pane {
		min-height: 100%;
		margin-bottom: 20px;
	}
	.tool-bar {
		margin-bottom: 10px;
	}
	.ivu-spin {
		z-index: 10;
	}
	.ivu-table-cell {
		padding-left: 2px;
		padding-right: 2px;
		word-break: break-word;
		.ivu-btn-text {
			color: #2e8cf0;
		}
	}
	.table-paging {
		margin-top: 20px;
	}
}

</style>
