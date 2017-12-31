<template>
	<section id="pilots">
		<Card class="pane" :padding="20" :bordered="false" dis-hover>
			<!-- tool bar -->
			<Row class-name="tool-bar" type="flex" justify="space-between">
				<Col :span="12">
					<Row class-name="top-bar-left" type="flex" justify="start">
						<Col>
							<Button type="primary" @click="onClickNewPilot">
								<Icon type="plus" color="white"></Icon> {{$t('messages.Pilot.Button.NewPilot')}}
							</Button>
						</Col>
					</Row>
				</Col>
				<Col :span="12">
					<Row class-name="top-bar-right" type="flex" justify="end">
						<Col :span="18">
							<Row type="flex" juestify="end">
								<Col class-name="table-selector" :span="8">
									<Select v-model="filters.searchFilter.type" @on-change="onChangeSelector">
										<Option :value="Enum.PilotSelectorOptions.PilotId">{{$t('messages.Pilot.Table.PilotId')}}</Option>
										<Option :value="Enum.PilotSelectorOptions.StaffNumber">{{$t('messages.Pilot.Table.StaffNumber')}}</Option>
										<Option :value="Enum.PilotSelectorOptions.PilotName">{{$t('messages.Pilot.Table.PilotName')}}</Option>
										<Option :value="Enum.PilotSelectorOptions.Nationality">{{$t('messages.Pilot.Table.Nationality')}}</Option>
										<Option :value="Enum.PilotSelectorOptions.NearestAirport">{{$t('messages.Pilot.Table.NearestAirport')}}</Option>
										<Option :value="Enum.PilotSelectorOptions.Visa">{{$t('messages.Pilot.Table.Visa')}}</Option>
										<Option :value="Enum.PilotSelectorOptions.AircraftType">{{$t('messages.Pilot.Table.AircraftType')}}</Option>
									</Select>
								</Col>
								<Col :span="12">
									<Input v-if="filters.searchFilter.type === Enum.PilotSelectorOptions.PilotId || filters.searchFilter.type === Enum.PilotSelectorOptions.StaffNumber || filters.searchFilter.type === Enum.PilotSelectorOptions.PilotName" type="text" v-model="filters.searchFilter.value"></Input>
									<BasicSelector v-else-if="filters.searchFilter.type === Enum.PilotSelectorOptions.Nationality || filters.searchFilter.type === Enum.PilotSelectorOptions.Visa" v-model="filters.searchFilter.value" mode="country"></BasicSelector>
									<BasicSelector v-else-if="filters.searchFilter.type === Enum.PilotSelectorOptions.NearestAirport" v-model="filters.searchFilter.value" mode="airport"></BasicSelector>
									<BasicSelector v-else-if="filters.searchFilter.type === Enum.PilotSelectorOptions.AircraftType" v-model="filters.searchFilter.value" mode="aircraft"></BasicSelector>
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
				:data="pilots"
				:columns="pilotColumns"
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

		<Modal v-model="isNewPilotModalVisible">
			<p slot="header">{{$t('messages.Pilot.Modal.NewPilot')}}</p>
			<Form ref="newPilotForm" :model="newPilotForm" :rules="newPilotFormRules" label-position="left" :label-width="labelWidth.edit">
				<FormItem :label="$t('messages.Pilot.Modal.Country')" prop="country">
					<BasicSelector :label="getCountryCode(newPilotForm.country, 'max')" v-model="newPilotForm.country" mode="countryCode"></BasicSelector>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Modal.Account')" prop="account">
					<Row type="flex" justify="space-between" align="middle">
						<Col :span="3"><span class="new-pilot-country-code">{{`${newPilotForm.country ? getCountryCode(newPilotForm.country, 'min') : '+'}`}}</span></Col>
						<Col :span="21"><Input v-model="newPilotForm.account"></Input></Col>
					</Row>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Modal.Password')" prop="password">
					<Input v-model="newPilotForm.password"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="default" @click="onClickCancelNewPilot">{{$t('messages.Public.Button.Cancel')}}</Button>
				<Button type="primary" @click="onClickConfirmNewPilot" :loading="isEditFormConfirmLoading">{{$t('messages.Public.Button.Next')}}</Button>
			</div>
		</Modal>
	</section>
</template>

<script>
import Bus from '../../bus'
import * as Api from '../../api'
import { md5, errorHandler, generateSortQuery, getCountry, getAirport, getLicenseType, getAircraftType, getCountryCode, getGeoLocation } from '../../utils'
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
					type: Enum.PilotSelectorOptions.PilotId,
					value: null,
				},
			},
			sortItems: [],
			pilots: [],
			pilotColumns: [
				{
					name: 'staffNumber',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: false,
					width: 100,
					title: this.$t('messages.Pilot.Table.StaffNumber'),
					key: 'staffNumber',
					render: (h, params) => h('p', [
						h('Button', {
							props: {
								type: 'text',
							},
							style: {
								'margin-bottom': '-5px',
							},
							on: {
								click: () => this.onClickStaffNumber(params.row.id),
							},
						}, params.row.staffNumber || 'NoData'),
						h('p', {
							style: {
								'font-size': '10px',
							},
						}, params.row.id),
					]),
				},
				{
					name: 'verification',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: 'custom',
					width: 100,
					title: this.$t('messages.Pilot.Table.Verification'),
					key: 'isVerified',
					render: (h, params) => {
						if (params.row.isVerified) {
							return h('span', {
								style: {
									color: '#00bf68',
								},
							}, this.$t('messages.Pilot.Verification.Verified'))
						}
						return h('span', {
							style: {
								color: '#9b9b9b',
							},
						}, this.$t('messages.Pilot.Verification.Unverified'))
					},
				},
				{
					name: 'name',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: false,
					width: 120,
					title: this.$t('messages.Pilot.Table.PilotName'),
					key: 'fullName',
					render: (h, params) => h('p', params.row.fullName || 'NoData'),
				},
				{
					name: 'nationality',
					align: 'center',
					hidden: false,
					ellipsis: false,
					width: 100,
					sortable: false,
					title: this.$t('messages.Pilot.Table.Nationality'),
					key: 'nationalityId',
					render: (h, params) => h('div', getCountry(params.row.nationalityId)),
				},
				{
					name: 'nearestAirport',
					align: 'center',
					hidden: false,
					ellipsis: false,
					width: 80,
					sortable: false,
					title: this.$t('messages.Pilot.Table.NearestAirport'),
					key: 'nearestAirportId',
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
						}, getAirport(params.row.nearestAirportId, 'min')),
						h('div', {
							slot: 'content',
							style: {
								margin: '0 8px',
							},
						}, getAirport(params.row.nearestAirportId, 'max')),
					]),
					// render: (h, params) => h('div', getAirport(params.row.endAirportId, 'min')),
				},
				{
					name: 'currentLoacation',
					align: 'center',
					hidden: false,
					ellipsis: false,
					width: 100,
					sortable: false,
					title: this.$t('messages.Pilot.Table.CurrentLocation'),
					// key: 'currentLoacation',
					render: (h, params) => h('div', params.row.location || 'loading...'),
				},
				{
					name: 'pilotRate',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: 'custom',
					width: 80,
					title: this.$t('messages.Pilot.Table.PilotRate'),
					key: 'pilotRate',
				},
				{
					name: 'totalFlightHours',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: 'custom',
					width: 80,
					title: this.$t('messages.Pilot.Table.TotalFlightHours'),
					key: 'totalFlightHours',
				},
				{
					name: 'visa',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: false,
					title: this.$t('messages.Pilot.Table.Visa'),
					key: 'visas',
					render: (h, params) => h('div', params.row.visas.map(item => getCountry(item)).join(' / ')),

				},
				{
					name: 'license',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: false,
					width: 80,
					title: this.$t('messages.Pilot.Table.License'),
					key: 'licenses',
					render: (h, params) => h('div', params.row.licenses.map(item => this.$t(`messages.Pilot.LicenseType.${getLicenseType(item)}`)).join(' / ')),
				},
				{
					name: 'aircraft',
					align: 'center',
					hidden: false,
					sortable: false,
					title: this.$t('messages.Pilot.Table.AircraftType'),
					key: 'licenseAircrafts',
					render: (h, params) => h('div', params.row.licenseAircrafts.map(item => getAircraftType(item, 'min')).join(' / ')),
				},
				{
					name: 'assignedOrders',
					align: 'center',
					hidden: false,
					ellipsis: false,
					sortable: 'custom',
					width: 75,
					title: this.$t('messages.Pilot.Table.AssignedOrders'),
					key: 'assignedOrderCount',
					render: (h, params) => h('Button', {
						props: {
							type: 'text',
						},
						on: {
							click: () => {
								if (params.row.assignedOrderCount > 0) this.onClickAssignedOrders(params.row.id)
							},
						},
					}, params.row.assignedOrderCount || 0),
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
			isNewPilotModalVisible: false,
			newPilotForm: {
				country: null,
				account: '',
				password: '',
			},
			newPilotFormRules: {
				country: [
					{ type: 'number', required: true, message: this.$t('messages.Pilot.Modal.Validator.Requirement.Country') },
				],
				account: [
					{ type: 'string', required: true, message: this.$t('messages.Pilot.Modal.Validator.Requirement.Account') },
				],
				password: [
					{ type: 'string', required: true, message: this.$t('messages.Pilot.Modal.Validator.Requirement.Password') },
					{ type: 'string', min: 6, message: this.$t('messages.Pilot.Modal.Validator.PasswordTooShort') },
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
		onClickStaffNumber(orderId) {
			this.viewPilotDetail(orderId)
		},
		onClickAssignedOrders(pilotId) {
			const path = `/orders?pilotId=${pilotId}&status=2`
			this.$router.push(path)
		},
		onClickMessages(id) {
			const path = `/messages/${Enum.MessageType.PilotAdmin}/${id}`
			this.$router.push(path)
		},
		onPaging(page) {
			this.list.page = page - 1
			this.fetchPilotList()
		},
		viewPilotDetail(pilotId) {
			const path = `/pilots/${pilotId}`
			this.$router.push(path)
		},
		async getLocation(lat, lng, index) {
			if (lat && lng) {
				const location = await getGeoLocation(lat, lng)
				const res = {
					location,
					index,
				}
				return res
			}
			return {
				location: '-',
				index,
			}
		},

		// filter
		onChangeSelector() {
			this.filters.searchFilter.value = null
		},
		onClickSearch() {
			this.list.filter = this.generateFilterQuery()
			this.filterPilot()
		},
		onClickSort(params) {
			this.list.orderBy = generateSortQuery(this.sortItems, params.key, params.order)
			this.filterPilot()
		},

		filterPilot() {
			this.list.page = 0
			this.fetchPilotList()
		},
		generateFilterQuery() {
			const queryStr = []
			if (this.generateSearchFilterQuery(this.filters.searchFilter.type, this.filters.searchFilter.value) !== '') queryStr.push(this.generateSearchFilterQuery(this.filters.searchFilter.type, this.filters.searchFilter.value))
			return queryStr.join()
		},
		generateSearchFilterQuery(type, value) {
			if (value === '' || value === 0 || value === null) return ''
			switch (type) {
			case Enum.PilotSelectorOptions.PilotId:
				return `id=${value}`
			case Enum.PilotSelectorOptions.StaffNumber:
				return `staffNumber LIKE '%${value}%'`
			case Enum.PilotSelectorOptions.PilotName:
				return `fullName LIKE '%${value}%'` // BUG column pilot_full_name does not exist
			case Enum.PilotSelectorOptions.Nationality:
				return `nationalityId=${value}`
			case Enum.PilotSelectorOptions.NearestAirport:
				return `nearestAirportId=${value}`
			case Enum.PilotSelectorOptions.Visa:
				return `visas@>array[${value}]`
			case Enum.PilotSelectorOptions.AircraftType:
				return `licenseAircrafts@>array[${value}]`
			default:
			}
			return ''
		},

		// new pilot
		getCountryCode,
		onClickNewPilot() {
			this.$refs.newPilotForm.resetFields()
			this.newPilotForm = {
				countryCode: null,
				account: '',
				password: '',
			}
			this.showNewPilotModal()
		},
		onClickCancelNewPilot() {
			this.hideNewPilotModal()
		},
		onClickConfirmNewPilot() {
			this.$refs.newPilotForm.validate((valid) => {
				if (valid) this.addPilot()
			})
		},
		showNewPilotModal() {
			this.isNewPilotModalVisible = true
		},
		hideNewPilotModal() {
			this.isNewPilotModalVisible = false
		},
		async addPilot() {
			try {
				this.isEditFormConfirmLoading = true
				const params = {
					account: `${getCountryCode(this.newPilotForm.country, 'min')}${this.newPilotForm.account}`,
					password: md5(this.newPilotForm.password),
				}
				const pilotId = await Api.addPilot(params)
				this.$Message.success(this.$t('messages.Pilot.Message.AddPilotSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideNewPilotModal()
				this.$router.push(`/pilots/${pilotId}/modify`)
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},

		async fetchPilotList() {
			this.list.isLoading = true
			try {
				this.generateBreadcrumb()
				const res = await Api.fetchPilotList(
					this.list.pagesize,
					this.list.page,
					this.list.filter,
					this.list.orderBy,
				)
				this.pilots = res.items
				this.list.total = res.total
				this.list.isLoading = false
				this.setPilotLocation()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.list.isLoading = false
			}
		},
		async setPilotLocation() {
			const locations = []
			this.pilots.forEach((item, index) => {
				const location = this.getLocation(item.latitude, item.longitude, index)
				locations.push(location)
			})
			const locationRes = await Promise.all(locations)
			locationRes.forEach((item) => {
				this.$set(this.pilots[item.index], 'location', item.location)
			})
		},
		generateBreadcrumb() {
			this.breadcrumbs = [
				{ name: this.$t('messages.Pilot.Breadcrumb'), path: '/pilots' },
			]
			Bus.$emit('updateBreadcrumbs', this.breadcrumbs)
		},
		initPage() {
			this.fetchPilotList()
		},
	},
}
</script>

<style lang="scss">
@import '../../styles/theme.scss';
#pilots {
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
	}
	.table-paging {
		margin-top: 20px;
	}
}
.new-pilot-country-code {
	font-size: 16px;
}

</style>
