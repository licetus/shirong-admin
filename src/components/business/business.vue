<template>
	<section id="business">
		<Card class="pane" :padding="20" :bordered="false" dis-hover>
			<Row class-name="tool-bar" type="flex" justify="space-between">
				<Col :span="12">
					<Row class-name="top-bar-left" type="flex" justify="start">
						<Col>
							<span class="aerolink-rate">{{`${$t('messages.Business.AerolinkRate')}: ${formatRate(aerolinkRate)}`}}</span>
						</Col>
						<Col>
							<Button type="primary" @click="onClickAerolinkRateManagement">
								{{$t('messages.Public.Button.Management')}}
							</Button>
						</Col>
					</Row>
				</Col>
				<Col :span="12">
					<Row class-name="top-bar-right" type="flex" justify="end">
						<Col :span="18">
							<Row type="flex" juestify="end">
								<Col :span="8">
								</Col>
								<Col :span="12">
									<BasicSelector v-model="searchForm.id" mode="aircraft"></BasicSelector>
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
				:loading="isPageLoading"
				:columns="priceColumns"
				:data="prices"
				@on-row-click="onClickRow"
				:no-data-text="$t('messages.Public.Table.NoDataText')"
				:no-filtered-data-text="$t('messages.Public.Table.NoFilteredDataText')"
				stripe
				border>
			</Table>
		</Card>

		<Modal v-model="isRateModalVisible">
			<p slot="header">
				<span>{{$t('messages.Business.Modal.AerolinkRateManagement')}}}</span>
			</p>
			<Form ref="rateForm">
				<Row type="flex" justify="center">
					<FormItem>
						<h1 class="rate-number">{{rateText}}</h1>
					</FormItem>
				</Row>
				<FormItem>
					<Slider v-model="rateForm.ratePercent" :min="100" :max="200" :step="1" show-input show-tip="never"></Slider>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="default" @click="onClickCancelRate">{{$t('messages.Public.Button.Cancel')}}</Button>
				<Button type="primary" @click="onClickUpdateRate" :loading="isRateUpdating">{{$t('messages.Public.Button.Confirm')}}</Button>
			</div>
		</Modal>

		<Modal v-model="isPriceModalVisible">
			<p slot="header">
				<span>{{$t('messages.Business.Modal.AircraftPriceManagement')}}</span>
			</p>
			<Form ref="priceForm" label-position="left" :label-width="120">
				<FormItem :label="$t('messages.Business.Table.Aircraft')">
					<p>{{getAircraftType(priceForm.id, 'max')}}</p>
				</FormItem>
				<FormItem :label="$t('messages.Business.Table.OneDayPrice')">
					<InputNumber v-model="priceForm.oneDayPrice" :min="0" :max="99999" :step="1"></InputNumber>
				</FormItem>
				<FormItem :label="$t('messages.Business.Table.SevenDaysPrice')">
					<InputNumber v-model="priceForm.sevenDaysPrice" :min="0" :max="99999" :step="1"></InputNumber>
				</FormItem>
				<FormItem :label="$t('messages.Business.Table.FourteenDaysPrice')">
					<InputNumber v-model="priceForm.fourteenDaysPrice" :min="0" :max="99999" :step="1"></InputNumber>
				</FormItem>
				<FormItem :label="$t('messages.Business.Table.ThirtyDaysPrice')">
					<InputNumber v-model="priceForm.thirtyDaysPrice" :min="0" :max="99999" :step="1"></InputNumber>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="default" @click="onClickCancelPrice">{{$t('messages.Public.Button.Cancel')}}</Button>
				<Button type="primary" @click="onClickUpdatePrice" :loading="isPriceUpdating">{{$t('messages.Public.Button.Confirm')}}</Button>
			</div>
		</Modal>
	</section>
</template>

<script>
import Bus from '../../bus'
import * as Api from '../../api'
import { errorHandler, getAircraftType, formatMoney, formatRate } from '../../utils'

export default {
	data() {
		return {
			priceColumns: [
				{
					name: 'aircraftType',
					align: 'center',
					ellipsis: false,
					sortable: true,
					sortType: 'asc',
					title: this.$t('messages.Business.Table.Aircraft'),
					key: 'id',
					render: (h, params) => h('Button', {
						props: {
							type: 'text',
						},
						on: {
							click: () => this.onClickAircraftType(params.index),
						},
					}, getAircraftType(params.row.id, 'min')),
				},
				{
					name: 'oneDayPrice',
					align: 'center',
					ellipsis: false,
					sortable: true,
					title: this.$t('messages.Business.Table.OneDayPrice'),
					key: 'oneDayPrice',
					render: (h, params) => h('div', formatMoney(params.row.oneDayPrice, 0)),
				},
				{
					name: 'sevenDaysPrice',
					align: 'center',
					ellipsis: false,
					sortable: true,
					title: this.$t('messages.Business.Table.SevenDaysPrice'),
					key: 'sevenDaysPrice',
					render: (h, params) => h('div', formatMoney(params.row.sevenDaysPrice, 0)),
				},
				{
					name: 'fourteenDaysPrice',
					align: 'center',
					ellipsis: false,
					sortable: true,
					title: this.$t('messages.Business.Table.FourteenDaysPrice'),
					key: 'fourteenDaysPrice',
					render: (h, params) => h('div', formatMoney(params.row.fourteenDaysPrice, 0)),
				},
				{
					name: 'thirtyDaysPrice',
					align: 'center',
					ellipsis: false,
					sortable: true,
					title: this.$t('messages.Business.Table.ThirtyDaysPrice'),
					key: 'thirtyDaysPrice',
					render: (h, params) => h('div', formatMoney(params.row.thirtyDaysPrice, 0)),
				},
			],
			isPageLoading: false,
			filters: {
				searchFilter: {
					value: null,
				},
			},

			aerolinkRate: null,
			isRateModalVisible: false,
			isRateUpdating: false,
			rateForm: {
				ratePercent: 100,
			},

			prices: [],
			isPriceModalVisible: false,
			isPriceUpdating: false,
			searchForm: {
				id: null,
			},
			priceForm: {
				id: null,
				oneDayPrice: 0,
				sevenDaysPrice: 0,
				fourteenDaysPrice: 0,
				thirtyDaysPrice: 0,
			},
		}
	},
	mounted() {
		this.initPage()
	},
	computed: {
		rateText() {
			return formatRate(this.rateForm.ratePercent / 100)
		},
	},
	methods: {
		onClickRow(params) {
			this.priceForm = {
				id: params.id,
				oneDayPrice: params.oneDayPrice,
				sevenDaysPrice: params.sevenDaysPrice,
				fourteenDaysPrice: params.fourteenDaysPrice,
				thirtyDaysPrice: params.thirtyDaysPrice,
			}
			this.showPriceModal()
		},
		// price
		onClickSearch() {
			this.searchAircraft()
		},
		onClickAircraftType(index) {
			this.priceForm = {
				id: this.prices[index].id,
				oneDayPrice: this.prices[index].oneDayPrice,
				sevenDaysPrice: this.prices[index].sevenDaysPrice,
				fourteenDaysPrice: this.prices[index].fourteenDaysPrice,
				thirtyDaysPrice: this.prices[index].thirtyDaysPrice,
			}
			this.showPriceModal()
		},
		onClickCancelPrice() {
			this.hidePriceModal()
		},
		onClickUpdatePrice() {
			this.updatePrice()
		},

		getAircraftType(id, length) {
			return getAircraftType(id, length)
		},

		searchAircraft() {
			for (const item of this.prices) {
				if (item.id === this.searchForm.id) {
					this.priceForm = {
						id: item.id,
						oneDayPrice: item.oneDayPrice,
						sevenDaysPrice: item.sevenDaysPrice,
						fourteenDaysPrice: item.fourteenDaysPrice,
						thirtyDaysPrice: item.thirtyDaysPrice,
					}
					this.showPriceModal()
					break
				}
			}
		},

		showPriceModal() {
			this.isPriceModalVisible = true
		},
		hidePriceModal() {
			this.isPriceModalVisible = false
		},
		async fetchPriceList() {
			try {
				this.isPageLoading = true
				const res = await Api.fetchPriceList()
				this.prices = res
				this.isPageLoading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isPageLoading = false
			}
		},
		async updatePrice() {
			try {
				this.isPriceUpdating = true
				const params = {
					id: this.priceForm.id,
					oneDayPrice: this.priceForm.oneDayPrice,
					sevenDaysPrice: this.priceForm.sevenDaysPrice,
					fourteenDaysPrice: this.priceForm.fourteenDaysPrice,
					thirtyDaysPrice: this.priceForm.thirtyDaysPrice,
				}
				await Api.updatePrice(params)
				this.isPriceUpdating = false
				this.hidePriceModal()
				this.fetchPriceList()
				this.$Message.success(this.$t('messages.Business.Message.UpdateAerolinkRateSuccessfully'))
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isPriceUpdating = false
			}
		},

		// rate
		onClickAerolinkRateManagement() {
			this.rateForm.ratePercent = this.aerolinkRate * 100
			this.showRateModal()
		},
		onClickCancelRate() {
			this.hideRateModal()
		},
		onClickUpdateRate() {
			this.updateAerolinkRate()
		},
		formatRate(rate) {
			if (rate === null || rate === 0 || !rate) return ' - '
			return formatRate(rate)
		},
		showRateModal() {
			this.isRateModalVisible = true
		},
		hideRateModal() {
			this.isRateModalVisible = false
		},
		async fetchAerolinkRate() {
			try {
				const res = await Api.fetchAerolinkRate()
				this.aerolinkRate = res.aerolinkRate
			} catch (error) {
				errorHandler(error.code, error.message, this)
			}
		},
		async updateAerolinkRate() {
			try {
				this.isRateUpdating = true
				const rate = this.rateForm.ratePercent / 100
				await Api.updateAerolinkRate(rate)
				this.isRateUpdating = false
				this.hideRateModal()
				this.fetchAerolinkRate()
				this.$Message.success(this.$t('messages.Business.Message.UpdateAircraftPriceSuccessfully'))
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isRateUpdating = false
			}
		},
		generateBreadcrumb() {
			this.breadcrumbs = [
				{ name: this.$t('messages.Business.Breadcrumb'), path: '/business' },
			]
			Bus.$emit('updateBreadcrumbs', this.breadcrumbs)
		},
		initPage() {
			this.generateBreadcrumb()
			this.fetchAerolinkRate()
			this.fetchPriceList()
		},
	},
}
</script>

<style lang="scss">
@import '../../styles/theme.scss';
#business{
	height: 100%;
	.pane{
		min-height: 100%;
		margin-bottom: 20px;
	}
	.tool-bar{
		margin-bottom: 10px;
		.aerolink-rate {
			font-size: 24px;
			font-weight: bold;
			line-height: 32px;
			margin-right: 20px;
		}
	}
	.ivu-spin{
		z-index: 10;
	}
	.ivu-table-cell{
		padding: $table-cell-padding;
		word-break: break-word;
		&.ivu-btn-text{
			color: #2e8cf0;
		}
		.table-paging{
			margin-top: 20px;
		}
	}
	.ivu-modal-wrap{
	}
}
</style>
