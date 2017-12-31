<template>
	<section id="order-modify">
		<Row class-name="pane">
			<Spin v-if="isPageLoading" size="large" fix></Spin>
			<Col class-name="pane-main" :span="18">
				<Card class="order-pane" :padding="30" :bordered="false" dis-hover>
					<Row type="flex" justify="space-between">
						<Col :span="11">
							<InfoCard :title="$t('messages.Order.Pane.Status.Title')">
								<Form :model="order.status" label-position="left" :label-width="labelWidth.left">
									<FormItem :label="$t('messages.Order.Pane.Status.OrderStatus')" prop="status">
										<Tag :color="orderStatusTagColor">{{orderStatusTagText}}</Tag>
									</FormItem>
									<FormItem :label="$t('messages.Order.Pane.Status.PaymentStatus')" prop="paymentStatus">
										<p v-if="order.status.paymentStatus === PaymentStatus.MonthlyPaid">{{$t(`messages.Order.PaymentStatus.${getPaymentStatus(order.status.paymentStatus)}`)}}</p>
										<Select v-else v-model="order.status.paymentStatus">
											<Option :value="PaymentStatus.Paid" :label="$t(`messages.Order.PaymentStatus.${getPaymentStatus(PaymentStatus.Paid)}`)"></Option>
											<Option :value="PaymentStatus.Unpaid" :label="$t(`messages.Order.PaymentStatus.${getPaymentStatus(PaymentStatus.Unpaid)}`)"></Option>
										</Select>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard :title="$t('messages.Order.Pane.Price.Title')">
								<Form :model="order.price" :rules="orderPriceRules" label-position="left" :label-width="labelWidth.left">
									<FormItem :label="$t('messages.Order.Pane.Price.OrderPrice.Label')" prop="orderPrice">
										<InputNumber v-model="order.price.orderPrice" :min="0" :step="1"></InputNumber>
									</FormItem>
									<FormItem :label="$t('messages.Order.Pane.Price.PilotPayment.Label')" prop="pilotPayment">
										<InputNumber v-model="order.price.pilotPayment" :min="0" :step="1"></InputNumber>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard :title="$t('messages.Order.Pane.Remark.Title')">
								<Form :model="order.remark" label-position="left" :label-width="labelWidth.left">
									<FormItem :label="$t('messages.Order.Pane.Remark.Remark')" prop="remark">
										<Input v-model="order.remark.remark" type="textarea" autosize></Input>
									</FormItem>
								</Form>
							</InfoCard>
						</Col>
						<Col :span="11">
							<InfoCard :title="$t('messages.Order.Pane.BasicInfo.Title')">
								<Form :model="order.basicInfo" label-position="left" :label-width="labelWidth.right">
									<FormItem :label="$t('messages.Order.Pane.BasicInfo.StartTime')" prop="startTime">
										<p>{{formatUTCDate(order.basicInfo.startTime)}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Order.Pane.BasicInfo.EndTime')" prop="endTime">
										<p>{{formatUTCDate(order.basicInfo.endTime, 'end')}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Order.Pane.BasicInfo.StartAirport')" prop="startAirportId">
										<p>{{getAirport(order.basicInfo.startAirportId, 'middle')}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Order.Pane.BasicInfo.EndAirport')" prop="endAirportId">
										<p>{{getAirport(order.basicInfo.endAirportId, 'middle')}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Order.Pane.BasicInfo.AircraftType')" prop="aircraftTypeId">
										<p>{{getAircraftType(order.basicInfo.aircraftTypeId, 'middle')}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Order.Pane.BasicInfo.Arp')" prop="arpId">
										<p>{{getArp(order.basicInfo.arpId, 'min')}}</p>
									</FormItem>
								</Form>
							</InfoCard>
						</Col>
					</Row>
				</Card>
			</Col>
			<Col class-name="pane-sub" :span="6">
				<ActionCard modify>
					<div slot="footer">
						<Button type="primary" @click="onClickSave" :loading="isSaveLoading">{{$t('messages.Public.Button.Save')}}</Button>
						<Button @click="onClickCancel">{{$t('messages.Public.Button.Cancel')}}</Button>
					</div>
				</ActionCard>
			</Col>
		</Row>

	</section>
</template>

<script>
import Bus from '../../bus'
import * as Api from '../../api'
import { Enum } from '../../models'
import { errorHandler, getOrderStatusTag, getPaymentStatus, formatUTCDate, getAirport, getAircraftType, getArp, getDuration, getOrderCalcPrice, getPilotPayment } from '../../utils'

export default {
	data() {
		return {
			isPageLoading: false,
			isSaveLoading: false,
			labelWidth: {
				left: 150,
				right: 150,
			},
			PaymentStatus: Enum.PaymentStatus,
			order: {
				status: {
					status: Enum.OrderStatus.Active,
					paymentStatus: Enum.PaymentStatus.MonthlyPaid,
				},
				basicInfo: {
					startTime: null,
					endTime: null,
					startAirportId: null,
					endAirportId: null,
					aircraftTypeId: null,
					arpId: null,
				},
				price: {
					baseDailyPrice: 0,
					startTime: null,
					endTime: null,
					pilotRate: 1,
					aerolinkRate: 1,
					operatorDiscount: 1,
					orderPrice: 0,
					pilotPayment: 0,
				},
				remark: {
					remark: '',
				},
			},
			orderPriceRules: {
				orderPrice: [
					{ required: true, type: 'number' },
				],
				pilotPayment: [
					{ required: true, type: 'number' },
				],
			},
		}
	},
	created() {
	},
	mounted() {
		this.initPage()
	},
	beforeDestory() {
	},
	computed: {
		orderStatusTagColor() {
			const tag = getOrderStatusTag(this.order.status.status)
			return tag.color
		},
		orderStatusTagText() {
			const tag = getOrderStatusTag(this.order.status.status)
			return tag.text
		},
	},
	methods: {
		onClickSave() {
			this.patchOrder()
		},
		onClickCancel() {
			this.backToView()
		},
		getPaymentStatus(status) {
			return getPaymentStatus(status)
		},
		formatUTCDate(timestamp, type) {
			return formatUTCDate(timestamp, type)
		},
		getAirport(id, length) {
			return getAirport(id, length)
		},
		getAircraftType(id, length) {
			return getAircraftType(id, length)
		},
		getArp(id, length) {
			return getArp(id, length)
		},
		getDuration(startTime, endTime) {
			return getDuration(startTime, endTime)
		},
		getOrderCalcPrice(baseDailyPrice, pilotRate, issueDays, aerolinkRate, operatorDiscount) {
			return getOrderCalcPrice(baseDailyPrice, pilotRate, issueDays, aerolinkRate, operatorDiscount)
		},
		getPilotPayment(baseDailyPrice, pilotRate, issueDays) {
			return getPilotPayment(baseDailyPrice, pilotRate, issueDays)
		},

		async fetchOrderDetail() {
			try {
				this.generateBreadcrumb()
				this.isPageLoading = true
				const orderId = this.$route.params.orderId
				const orderRes = await Api.fetchOrderDetail(orderId)
				const order = {
					status: {
						status: orderRes.status,
						paymentStatus: orderRes.paymentStatus,
					},
					basicInfo: {
						startTime: orderRes.startTime,
						endTime: orderRes.endTime,
						startAirportId: orderRes.startAirportId,
						endAirportId: orderRes.endAirportId,
						aircraftTypeId: orderRes.aircraftTypeId,
						arpId: orderRes.arpId,
					},
					price: {
						baseDailyPrice: orderRes.basePrice,
						startTime: orderRes.startTime,
						endTime: orderRes.endTime,
						pilotRate: orderRes.pilotRate,
						aerolinkRate: orderRes.aerolinkRate,
						operatorDiscount: orderRes.discountRate,
						orderPrice: orderRes.orderPrice,
						pilotPayment: orderRes.pilotPrice,
					},
					remark: {
						remark: orderRes.remark,
					},
				}
				this.order = order
				this.isPageLoading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
			}
		},
		async patchOrder() {
			try {
				this.isSaveLoading = true
				const id = this.$route.params.orderId
				const order = {
					paymentStatus: this.order.status.paymentStatus,
					orderPrice: this.order.price.orderPrice,
					pilotPrice: this.order.price.pilotPayment,
					remark: this.order.remark.remark,
				}
				await Api.patchOrder(id, order)
				this.isSaveLoading = false
				this.backToView()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isSaveLoading = false
			}
		},
		generateBreadcrumb() {
			const orderId = this.$route.params.orderId
			this.breadcrumbs = [
				{ name: this.$t('messages.Order.Breadcrumb'), path: '/orders' },
				{ name: `${orderId}`, path: `/orders/${orderId}` },
				{ name: this.$t('messages.Order.Pane.Modify.Breadcrumb'), path: `/orders/${orderId}/modify` },
			]
			Bus.$emit('updateBreadcrumbs', this.breadcrumbs)
		},
		initPage() {
			this.fetchOrderDetail()
		},
		backToView() {
			this.$router.go(-1)
		},
	},
}
</script>

<style>
#order-modify {
	height: 100%;
}
#order-modify .pane {
	height: 100%;
	min-height: 100%;
	margin-bottom: 20px;
}
#order-modify .pane-main {
	min-height: 100%;
}
#order-modify .pane-sub {
	padding: 0 50px;
}
</style>
