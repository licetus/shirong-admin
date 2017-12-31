<template>
	<section id="orders">
		<Card class="pane" :padding="20" :bordered="false" dis-hover>
			<!-- tool bar -->
			<Row class-name="tool-bar" type="flex" justify="space-between">
				<Col :span="12">
					<Row class-name="top-bar-left" type="flex" justify="start">
						<Col>
							<Button type="primary" @click="onClickNewOrder">
								<Icon type="plus" color="white"></Icon> {{$t('messages.Order.Button.NewOrder')}}
							</Button>
						</Col>
						<Col :span="7" :offset="1">
							<Select v-model="filters.orderStatus" @on-change="onChangeOrderStatusOption" :placeholder="$t('messages.Order.Table.OrderStatus')">
								<Option v-for="item of orderStatusOptions" :value="item.value" :label="item.name" :key="item.value"></Option>
							</Select>
						</Col>
						<Col :span="7" :offset="1">
							<Select v-model="filters.paymentStatus" @on-change="onChangePaymentStatusOption" :placeholder="$t('messages.Order.Table.PaymentStatus')">
								<Option v-for="item of paymentStatusOptions" :value="item.value" :label="item.name" :key="item.value"></Option>
							</Select>
						</Col>
					</Row>
				</Col>
				<Col :span="12">
					<Row class-name="top-bar-right" type="flex" justify="end">
						<Col :span="18">
							<Row type="flex" juestify="end">
								<Col class-name="table-selector" :span="8">
									<Select v-model="filters.searchFilter.type" @on-change="onChangeSelector" placeholder="filter type">
										<Option :value="Enum.OrderSelectorOptions.OrderId">{{$t('messages.Order.Table.OrderId')}}</Option>
										<Option :value="Enum.OrderSelectorOptions.PilotName">{{$t('messages.Order.Table.AssignedPilot')}}</Option>
										<Option :value="Enum.OrderSelectorOptions.OperatorNickname">{{$t('messages.Order.Table.Operator')}}</Option>
										<Option :value="Enum.OrderSelectorOptions.StartTime">{{$t('messages.Order.Table.StartTime')}}</Option>
										<Option :value="Enum.OrderSelectorOptions.EndTime">{{$t('messages.Order.Table.EndTime')}}</Option>
										<Option :value="Enum.OrderSelectorOptions.StartAirport">{{$t('messages.Order.Table.StartAirport')}}</Option>
										<Option :value="Enum.OrderSelectorOptions.EndAirport">{{$t('messages.Order.Table.EndAirport')}}</Option>
										<Option :value="Enum.OrderSelectorOptions.AircraftType">{{$t('messages.Order.Table.AircraftType')}}</Option>
										<Option :value="Enum.OrderSelectorOptions.Arp">{{$t('messages.Order.Table.Arp')}}</Option>
									</Select>
								</Col>
								<Col :span="12">
									<Input v-if="filters.searchFilter.type === Enum.OrderSelectorOptions.OrderId || filters.searchFilter.type === Enum.OrderSelectorOptions.PilotName || filters.searchFilter.type === Enum.OrderSelectorOptions.OperatorNickname" type="text" v-model="filters.searchFilter.value"></Input>
									<DatePicker v-else-if="filters.searchFilter.type === Enum.OrderSelectorOptions.StartTime || filters.searchFilter.type === Enum.OrderSelectorOptions.EndTime" v-model="filters.searchFilter.value" type="daterange" format="dd/MM/yyyy" placement="bottom-end" style="width:100%"></DatePicker>
									<BasicSelector v-else-if="filters.searchFilter.type === Enum.OrderSelectorOptions.StartAirport || filters.searchFilter.type === Enum.OrderSelectorOptions.EndAirport" v-model="filters.searchFilter.value" mode="airport"></BasicSelector>
									<BasicSelector v-else-if="filters.searchFilter.type === Enum.OrderSelectorOptions.AircraftType" v-model="filters.searchFilter.value" mode="aircraft"></BasicSelector>
									<BasicSelector v-else-if="filters.searchFilter.type === Enum.OrderSelectorOptions.Arp" v-model="filters.searchFilter.value" mode="arp"></BasicSelector>
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
				:data="orders"
				:columns="orderColumns"
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

		<Modal v-model="isNewOrderModalVisible" :width="50">
			<p slot="header">{{$t('messages.Order.Modal.NewOrder')}}</p>
			<Form ref="newOrderForm" :model="newOrderForm" :rules="newOrderFormRules" label-position="left" :label-width="labelWidth.edit">
				<Row type="flex" justify="space-between" align="middle">
					<Col :span="11">
						<FormItem ref="startDate" :label="$t('messages.Order.Modal.StartTime')" prop="startDate">
							<DatePicker type="date" v-model="newOrderForm.startDate" format="dd MMM yyyy" :editable="false" :clearable="false"></DatePicker>
						</FormItem>
						<FormItem ref="endDate" :label="$t('messages.Order.Modal.EndTime')" prop="endDate">
							<DatePicker type="date" v-model="newOrderForm.endDate" format="dd MMM yyyy" :editable="false" :clearable="false"></DatePicker>
						</FormItem>
						<FormItem :label="$t('messages.Order.Modal.StartAirport')" prop="startAirportId">
							<BasicSelector v-model="newOrderForm.startAirportId" mode='airport'></BasicSelector>
						</FormItem>
						<FormItem :label="$t('messages.Order.Modal.EndAirport')" prop="endAirportId">
							<BasicSelector v-model="newOrderForm.endAirportId" mode='airport'></BasicSelector>
						</FormItem>
						<FormItem :label="$t('messages.Order.Modal.AircraftType')" prop="aircraftTypeId">
							<BasicSelector v-model="newOrderForm.aircraftTypeId" mode='aircraft'></BasicSelector>
						</FormItem>
						<FormItem :label="$t('messages.Order.Modal.Arp')" prop="arpId">
							<BasicSelector v-model="newOrderForm.arpId" mode='arp'></BasicSelector>
						</FormItem>
					</Col>
					<Col :span="11">
						<FormItem :label="$t('messages.Order.Modal.OperatorId')" prop="operatorId">
							<Input v-model="newOrderForm.operatorId"></Input>
						</FormItem>
						<FormItem :label="$t('messages.Order.Modal.PilotId')" prop="pilotId">
							<Input v-model="newOrderForm.pilotId"></Input>
						</FormItem>
						<FormItem :label="$t('messages.Order.Modal.OrderPrice')" prop="orderPrice">
							<InputNumber v-model="newOrderForm.orderPrice" :min="0" :step="1"></InputNumber>
						</FormItem>
						<FormItem :label="$t('messages.Order.Modal.PilotPayment')" prop="pilotPayment">
							<InputNumber v-model="newOrderForm.pilotPayment" :min="0" :step="1"></InputNumber>
						</FormItem>
						<FormItem :label="$t('messages.Order.Modal.Remark')" prop="remark">
							<Input v-model="newOrderForm.remark" type="textarea" :rows="3"></Input>
						</FormItem>
					</Col>
				</Row>
			</Form>
			<div slot="footer">
				<Button type="default" @click="onClickCancelNewOrder">{{$t('messages.Public.Button.Cancel')}}</Button>
				<Button type="primary" @click="onClickConfirmNewOrder" :loading="isEditFormConfirmLoading">{{$t('messages.Public.Button.Next')}}</Button>
			</div>
		</Modal>
	</section>
</template>

<script>
import Bus from '../../bus'
import * as Api from '../../api'
import { errorHandler, getOrderStatusTag, getPaymentStatus, formatUTCDigitalDate, generateSortQuery, getUTCTimestamp, getAirport, getAircraftType, getArp, formatMoney } from '../../utils'
import { Enum } from '../../models'
import config from '../../config/config'
// import { getStyle } from '../../utils'

export default {
	data() {
		const startDateRangeValidator = (rule, value, callback) => {
			if (value === '' || value === null || !value) {
				callback(new Error(this.$t('messages.Order.Modal.Validator.Requirement.StartTime')))
			} else if (this.newOrderForm.endDate) {
				if (getUTCTimestamp(this.newOrderForm.endDate) - getUTCTimestamp(this.newOrderForm.startDate) < 0) {
					this.isDateRangeValidated = false
					callback(new Error(this.$t('messages.Order.Modal.Validator.InvalidDateRange')))
				} else if (!this.isDateRangeValidated) {
					this.isDateRangeValidated = true
					this.$refs.newOrderForm.validateField('endDate')
				}
			}
			callback()
		}
		const endDateRangeValidator = (rule, value, callback) => {
			if (value === '' || value === null || !value) {
				callback(new Error(this.$t('messages.Order.Modal.Validator.Requirement.endTime')))
			} else if (this.newOrderForm.startDate) {
				if (getUTCTimestamp(this.newOrderForm.endDate) - getUTCTimestamp(this.newOrderForm.startDate) < 0) {
					this.isDateRangeValidated = false
					callback(new Error(this.$t('messages.Order.Modal.Validator.InvalidDateRange')))
				} else if (!this.isDateRangeValidated) {
					this.isDateRangeValidated = true
					this.$refs.newOrderForm.validateField('startDate')
				}
			}
			callback()
		}
		return {
			Enum,
			breadcrumbs: [],
			list: {
				isLoading: false,
				total: 0,
				pagesize: 10,
				page: 0,
				filter: '',
				orderBy: '',
			},
			filters: {
				orderStatus: null,
				paymentStatus: null,
				searchFilter: {
					type: Enum.OrderSelectorOptions.OrderId,
					value: null,
				},
			},
			sortItems: [],
			orders: [],
			orderColumns: [
				{
					name: 'orderId',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: false,
					width: 100,
					title: this.$t('messages.Order.Table.OrderId'),
					key: 'id',
					render: (h, params) => h('Button', {
						props: {
							type: 'text',
						},
						on: {
							click: () => this.onClickOrderId(params.row.id),
						},
					}, params.row.id),
				},
				{
					name: 'status',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: false,
					width: 100,
					title: this.$t('messages.Order.Table.OrderStatus'),
					key: 'status',
					render: (h, params) => {
						const tag = getOrderStatusTag(params.row.status)
						return h('Tag', {
							props: {
								color: tag.color,
							},
						}, this.$t(`messages.Order.OrderStatus.${tag.text}`))
					},
				},
				{
					name: 'paymentStatus',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: false,
					width: 80,
					title: this.$t('messages.Order.Table.PaymentStatus'),
					key: 'paymentStatus',
					render: (h, params) => h('div', this.$t(`messages.Order.PaymentStatus.${getPaymentStatus(params.row.paymentStatus)}`)),
				},
				{
					name: 'startTime',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: 'custom',
					width: 100,
					title: this.$t('messages.Order.Table.StartTime'),
					key: 'startTime',
					render: (h, params) => h('div', formatUTCDigitalDate(params.row.startTime)),
				},
				{
					name: 'endTime',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: 'custom',
					width: 100,
					title: this.$t('messages.Order.Table.EndTime'),
					key: 'endTime',
					render: (h, params) => h('div', formatUTCDigitalDate(params.row.endTime, 'end')),
				},
				{
					name: 'startAirport',
					align: 'center',
					hidden: false,
					ellipsis: false,
					width: 80,
					sortable: false,
					title: this.$t('messages.Order.Table.StartAirport'),
					key: 'startAirportId',
					render: (h, params) => h('Poptip', {
						props: {
							trigger: 'hover',
							placement: 'bottom',
						},
					}, [
						h('div', {
							props: {
								// type: 'border',
							},
						}, getAirport(params.row.startAirportId, 'min')),
						h('div', {
							slot: 'content',
							style: {
								margin: '0 8px',
							},
						}, getAirport(params.row.startAirportId, 'max')),
					]),
					// render: (h, params) => h('div', getAirport(params.row.startAirportId, 'min')),
				},
				{
					name: 'endAirport',
					align: 'center',
					hidden: false,
					ellipsis: false,
					width: 80,
					sortable: false,
					title: this.$t('messages.Order.Table.EndAirport'),
					key: 'endAirportId',
					render: (h, params) => h('Poptip', {
						props: {
							trigger: 'hover',
							placement: 'bottom',
						},
					}, [
						h('div', {
							props: {
								// type: 'border',
							},
						}, getAirport(params.row.endAirportId, 'min')),
						h('div', {
							slot: 'content',
							style: {
								margin: '0 8px',
							},
						}, getAirport(params.row.endAirportId, 'max')),
					]),
					// render: (h, params) => h('div', getAirport(params.row.endAirportId, 'min')),
				},
				{
					name: 'aircraftType',
					align: 'center',
					hidden: false,
					ellipsis: false,
					width: 100,
					sortable: false,
					title: this.$t('messages.Order.Table.AircraftType'),
					key: 'aircraftTypeId',
					render: (h, params) => h('Poptip', {
						props: {
							trigger: 'hover',
							placement: 'bottom',
						},
					}, [
						h('div', {
							props: {
								// type: 'border',
							},
						}, getAircraftType(params.row.aircraftTypeId, 'min')),
						h('div', {
							slot: 'content',
							style: {
								margin: '0 8px',
							},
						}, getAircraftType(params.row.aircraftTypeId, 'max')),
					]),
					// render: (h, params) => h('div', getAircraftType(params.row.aircraftTypeId, 'min')),
				},
				{
					name: 'arp',
					align: 'center',
					hidden: false,
					ellipsis: false,
					width: 50,
					sortable: false,
					title: this.$t('messages.Order.Table.Arp'),
					key: 'arpId',
					render: (h, params) => h('Poptip', {
						props: {
							trigger: 'hover',
							placement: 'bottom',
						},
					}, [
						h('div', {
							props: {
								// type: 'border',
							},
						}, getArp(params.row.arpId, 'min')),
						h('div', {
							slot: 'content',
							style: {
								margin: '0 8px',
							},
						}, getArp(params.row.arpId, 'max')),
					]),
					// render: (h, params) => h('div', getArp(params.row.arpId, 'min')),
				},
				{
					name: 'assignedPilot',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: false,
					title: this.$t('messages.Order.Table.AssignedPilot'),
					key: 'pilotId',
					render: (h, params) => h('a', {
						props: {
							href: '#',
						},
						on: {
							click: () => this.onClickPilot(params.row.pilot.id),
						},
					}, params.row.pilot.fullName),
				},
				{
					name: 'operator',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: false,
					title: this.$t('messages.Order.Table.Operator'),
					key: 'operatorId',
					render: (h, params) => h('a', {
						props: {
							href: '#',
						},
						on: {
							click: () => this.onClickOperator(params.row.operator.id),
						},
					}, params.row.operator.nickname),
				},
				{
					name: 'totalPrice',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: 'custom',
					title: this.$t('messages.Order.Table.TotalPrice'),
					key: 'orderPrice',
					render: (h, params) => h('div', formatMoney(params.row.orderPrice, 0)),
				},
				{
					name: 'conversation',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: 'custom',
					width: 110,
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
			isNewOrderModalVisible: false,
			newOrderForm: {
				startDate: null,
				endDate: null,
				startAirportId: null,
				endAirportId: null,
				aircraftTypeId: null,
				arpId: null,
				operatorId: null,
				pilotId: null,
				orderPrice: 0,
				pilotPayment: 0,
				remark: '',
			},
			isDateRangeValidated: false,
			newOrderFormRules: {
				startDate: [
					// { type: 'date', required: true, message: this.$t('messages.Order.Modal.Validator.Requirement.StartTime'), trigger: 'change' },
					{ validator: startDateRangeValidator, type: 'date', trigger: 'change' },
				],
				endDate: [
					// { type: 'date', required: true, message: this.$t('messages.Order.Modal.Validator.Requirement.EndTime'), trigger: 'change' },
					{ validator: endDateRangeValidator, type: 'date', trigger: 'change' },
				],
				startAirportId: [{ type: 'integer', required: true, message: this.$t('messages.Order.Modal.Validator.Requirement.StartAirport'), trigger: 'change' }],
				endAirportId: [{ type: 'integer', required: true, message: this.$t('messages.Order.Modal.Validator.Requirement.EndAirport'), trigger: 'change' }],
				aircraftTypeId: [{ type: 'integer', required: true, message: this.$t('messages.Order.Modal.Validator.Requirement.AircraftType'), trigger: 'change' }],
				arpId: [{ type: 'integer', required: true, message: this.$t('messages.Order.Modal.Validator.Requirement.Arp'), trigger: 'change' }],
				operatorId: [{ type: 'string', required: true, message: this.$t('messages.Order.Modal.Validator.Requirement.Operator'), trigger: 'blur' }],
				pilotId: [{ type: 'string', required: true, message: this.$t('messages.Order.Modal.Validator.Requirement.Pilot'), trigger: 'blur' }],
				orderPrice: [
					{ type: 'number', required: true, message: this.$t('messages.Order.Modal.Validator.Requirement.OrderPrice'), trigger: 'blur' },
					{ type: 'number', min: 0, message: this.$t('messages.Order.Modal.Validator.InvalidPrice'), trigger: 'change' },
				],
				pilotPayment: [
					{ type: 'number', required: true, message: this.$t('messages.Order.Modal.Validator.Requirement.PilotPayment'), trigger: 'blur' },
					{ type: 'number', min: 0, message: this.$t('messages.Order.Modal.Validator.InvalidPrice'), trigger: 'change' },
				],
				remark: [{ type: 'string', required: false, max: config.remarkLength.order, message: `${this.$t('messages.Order.Modal.Validator.Remark.Length')} ${config.remarkLength.order} ${this.$t('messages.Order.Modal.Validator.Remark.Characters')}`, trigger: 'change' }],
			},
		}
	},
	mounted() {
		this.initPage()
	},
	computed: {
		orderStatusOptions() {
			const status = Enum.OrderStatus
			const options = [{ name: this.$t('messages.Order.OrderStatus.All'), value: -1 }]
			for (const item in status) {
				if (status.hasOwnProperty(item)) {
					const option = {
						name: this.$t(`messages.Order.OrderStatus.${item}`),
						value: status[item],
					}
					options.push(option)
				}
			}
			return options
		},
		paymentStatusOptions() {
			const status = Enum.PaymentStatus
			const options = [{ name: this.$t('messages.Order.PaymentStatus.All'), value: -1 }]
			for (const item in status) {
				if (status.hasOwnProperty(item)) {
					const option = {
						name: this.$t(`messages.Order.PaymentStatus.${item}`),
						value: status[item],
					}
					options.push(option)
				}
			}
			return options
		},
	},
	methods: {
		// table
		onClickOrderId(orderId) {
			this.viewOrderDetail(orderId)
		},
		onClickPilot(pilotId) {
			this.viewPilotDetail(pilotId)
		},
		onClickOperator(operatorId) {
			this.viewOperatorDetail(operatorId)
		},
		onClickMessages(id) {
			const path = `/messages/${Enum.MessageType.Order}/${id}`
			this.$router.push(path)
		},
		onPaging(page) {
			this.list.page = page - 1
			this.fetchOrderList()
		},
		viewOrderDetail(orderId) {
			const path = `/orders/${orderId}`
			this.$router.push(path)
		},
		viewPilotDetail(pilotId) {
			const path = `/pilots/${pilotId}`
			this.$router.push(path)
		},
		viewOperatorDetail(operatorId) {
			const path = `/operators/${operatorId}`
			this.$router.push(path)
		},

		// filter
		onChangeOrderStatusOption() {
			this.list.filter = this.generateFilterQuery()
			this.filterOrder()
		},
		onChangePaymentStatusOption() {
			this.list.filter = this.generateFilterQuery()
			this.filterOrder()
		},
		onChangeSelector() {
			this.filters.searchFilter.value = null
		},
		onClickSearch() {
			this.list.filter = this.generateFilterQuery()
			this.filterOrder()
		},
		onClickSort(params) {
			this.list.orderBy = generateSortQuery(this.sortItems, params.key, params.order)
			this.filterOrder()
		},
		filterOrder() {
			this.list.page = 0
			this.fetchOrderList()
		},
		generateFilterQuery() {
			const queryStr = []
			if (this.filters.orderStatus && this.filters.orderStatus !== -1) queryStr.push(`status=${this.filters.orderStatus}`)
			if (this.filters.paymentStatus && this.filters.paymentStatus !== -1) queryStr.push(`paymentStatus=${this.filters.paymentStatus}`)
			if (this.generateSearchFilterQuery(this.filters.searchFilter.type, this.filters.searchFilter.value) !== '') queryStr.push(this.generateSearchFilterQuery(this.filters.searchFilter.type, this.filters.searchFilter.value))
			return queryStr.join()
		},
		generateSearchFilterQuery(type, value) {
			if (value === '' || value === 0 || value === null) return ''
			switch (type) {
			case Enum.OrderSelectorOptions.OrderId:
				return `id=${value}`
			case Enum.OrderSelectorOptions.PilotName:
				return `pilotFullName LIKE '%${value}%'` // BUG column pilot_full_name does not exist
			case Enum.OrderSelectorOptions.OperatorNickname:
				return `operatorNickname LIKE '%${value}%'` // BUG column operator_nickname does not exist
			case Enum.OrderSelectorOptions.StartTime: {
				if (value[0] && value[1]) return `startTime>=${getUTCTimestamp(value[0])},startTime<=${getUTCTimestamp(value[1])}`
				return ''
			}
			case Enum.OrderSelectorOptions.EndTime: {
				if (value[0] && value[1]) return `endTime>=${getUTCTimestamp(value[0], 'end')},endTime<=${getUTCTimestamp(value[1], 'end')}`
				return ''
			}
			case Enum.OrderSelectorOptions.StartAirport:
				return `startAirportId=${value}`
			case Enum.OrderSelectorOptions.EndAirport:
				return `endAirportId=${value}`
			case Enum.OrderSelectorOptions.AircraftType:
				return `aircraftTypeId=${value}`
			case Enum.OrderSelectorOptions.Arp:
				return `arpId=${value}`
			default:
			}
			// if (this.filters.searchFilter.type && this.filters.searchFilter.type !== '') return `${this.filters.searchFilter.type}=${this.filters.searchFilter.value}`
			return ''
		},

		// new order
		onClickNewOrder() {
			this.newOrderForm = {
				startDate: null,
				endDate: null,
				startAirportId: null,
				endAirportId: null,
				aircraftTypeId: null,
				arpId: null,
				operatorId: null,
				pilotId: null,
				orderPrice: 0,
				pilotPayment: 0,
				remark: '',
			}
			this.showNewOrderModal()
		},
		onClickCancelNewOrder() {
			this.hideNewOrderModal()
		},
		onClickConfirmNewOrder() {
			this.$refs.newOrderForm.validate((valid) => {
				if (valid) this.addOrder()
			})
		},
		showNewOrderModal() {
			this.isNewOrderModalVisible = true
		},
		hideNewOrderModal() {
			this.isNewOrderModalVisible = false
		},
		async addOrder() { // TODO need to test
			try {
				this.isEditFormConfirmLoading = true
				const params = {
					operatorId: this.newOrderForm.operatorId,
					pilotId: this.newOrderForm.pilotId,
					orderPrice: this.newOrderForm.orderPrice,
					pilotPrice: this.newOrderForm.pilotPayment,
					remark: this.newOrderForm.remark,
					startTime: getUTCTimestamp(this.newOrderForm.startDate),
					endTime: getUTCTimestamp(this.newOrderForm.endDate, 'end'),
					startAirportId: this.newOrderForm.startAirportId,
					endAirportId: this.newOrderForm.endAirportId,
					aircraftTypeId: this.newOrderForm.aircraftTypeId,
					arpId: this.newOrderForm.arpId,
				}
				const orderId = await Api.addOrder(params)
				this.$Message.success(this.$t('messages.Order.Message.AddSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideNewOrderModal()
				this.$router.push(`/orders/${orderId}`)
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},

		async fetchOrderList() {
			this.list.isLoading = true
			try {
				const res = await Api.fetchOrderList(
					this.list.pagesize,
					this.list.page,
					this.list.filter,
					this.list.orderBy,
				)
				this.orders = res.items
				this.list.total = res.total
				this.generateBreadcrumb()
				this.list.isLoading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.list.isLoading = false
			}
		},
		formatRouteQuery(query) {
			if (query) {
				const array = []
				for (const item in query) {
					if (query.hasOwnProperty(item)) {
						const str = `${item}=${query[item]}`
						array.push(str)
					}
				}
				return array.join()
			}
			return ''
		},
		generateBreadcrumb() {
			this.breadcrumbs = [
				{ name: this.$t('messages.Order.Breadcrumb'), path: '/orders' },
			]
			Bus.$emit('updateBreadcrumbs', this.breadcrumbs)
		},
		initPage() {
			this.list.filter = this.formatRouteQuery(this.$route.query)
			this.fetchOrderList()
		},
	},
}
</script>

<style lang="scss">
@import '../../styles/theme.scss';
#orders {
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
		padding: $table-cell-padding;
		word-break: break-word;
		.ivu-btn-text {
			color: #2e8cf0;
		}
		.ivu-tag {
			margin: 0;
		}
	}
	.table-paging {
		margin-top: 20px;
	}
}
.ivu-form-item-content {
	& > .ivu-input-number {
		width: 100%;
	}
}
</style>
