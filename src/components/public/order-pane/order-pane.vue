<template>
	<section id="order-pane">
		<div class='order-pane-title' v-if="title">
			<h2>{{title}}</h2>
		</div>
		<Card class="order-pane-body" :padding="30" :bordered="false" dis-hover>
			<Row type="flex" justify="space-between">
				<Col :span="11">
					<InfoCard :title="$t('messages.Order.Pane.Status.Title')">
						<Form :model="order.status" label-position="left" :label-width="leftLabelWidth">
							<FormItem :label="$t('messages.Order.Pane.Status.OrderStatus')" prop="status">
								<Tag :color="orderStatusTagColor">{{$t(`messages.Order.OrderStatus.${orderStatusTagText}`)}}</Tag>
							</FormItem>
							<FormItem :label="$t('messages.Order.Pane.Status.PaymentStatus')" prop="paymentStatus">
								<p>{{$t(`messages.Order.PaymentStatus.${paymentStatusText}`)}}</p>
							</FormItem>
						</Form>
					</InfoCard>
					<InfoCard :title="$t('messages.Order.Pane.BasicInfo.Title')">
						<Form :model="order.basicInfo" label-position="left" :label-width="leftLabelWidth">
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
					<InfoCard :title="$t('messages.Order.Pane.Remark.Title')">
						<Form :model="order.remark" label-position="left" :label-width="leftLabelWidth">
							<FormItem :label="$t('messages.Order.Pane.Remark.Remark')" prop="remark">
								<p>{{order.remark.remark}}</p>
							</FormItem>
						</Form>
					</InfoCard>
				</Col>
				<Col :span="11">
					<InfoCard :title="$t('messages.Order.Pane.Price.OrderPrice.Title')">
						<Form :model="order.price" label-position="left" :label-width="rightLabelWidth">
							<FormItem :label="$t('messages.Order.Pane.Price.Total')">
								<p>{{formatMoney(order.price.orderPrice, 0)}}</p>
								<p v-if="order.price.orderPrice !== getOrderCalcPrice(order.price.baseDailyPrice, order.price.pilotRate, getDuration(order.price.startTime, order.price.endTime), order.price.aerolinkRate, order.price.operatorDiscount)">
									<del>{{formatMoney(getOrderCalcPrice(order.price.baseDailyPrice, order.price.pilotRate, getDuration(order.price.startTime, order.price.endTime), order.price.aerolinkRate, order.price.operatorDiscount), 0)}}</del>
								</p>
							</FormItem>
							<FormItem :label="$t('messages.Order.Pane.Price.BasePrice')" prop="baseDailyPrice">
								<p>{{formatMoney(order.price.baseDailyPrice, 0)}}</p>
							</FormItem>
							<FormItem :label="$t('messages.Order.Pane.Price.PilotRate')" prop="pilotRate">
								<p>{{order.price.pilotRate}}</p>
							</FormItem>
							<FormItem :label="$t('messages.Order.Pane.Price.IssueDays')">
								<p>{{getDuration(order.price.startTime, order.price.endTime)}}</p>
							</FormItem>
							<FormItem :label="$t('messages.Order.Pane.Price.OrderPrice.AerolinkRate')" prop="aerolinkRate">
								<p>{{formatRate(order.price.aerolinkRate)}}</p>
							</FormItem>
							<FormItem :label="$t('messages.Order.Pane.Price.OrderPrice.OperatorDiscount')" prop="operatorDiscount">
								<p>{{operatorDiscount}}</p>
							</FormItem>
						</Form>
						<p slot="remark">
							{{operatorPriceRemark}}
						</p>
					</InfoCard>
					<InfoCard :title="$t('messages.Order.Pane.Price.PilotPayment.Title')">
						<Form :model="order.price" label-position="left" :label-width="rightLabelWidth">
							<FormItem :label="$t('messages.Order.Pane.Price.Total')">
								<p>{{formatMoney(order.price.pilotPayment, 0)}}</p>
								<p v-if="order.price.pilotPayment !== getPilotPayment(order.price.baseDailyPrice, order.price.pilotRate, getDuration(order.price.startTime, order.price.endTime))">
									<del>{{formatMoney(getPilotPayment(order.price.baseDailyPrice, order.price.pilotRate, getDuration(order.price.startTime, order.price.endTime)), 0)}}</del>
								</p>
							</FormItem>
							<FormItem :label="$t('messages.Order.Pane.Price.BasePrice')" prop="baseDailyPrice">
								<p>{{formatMoney(order.price.baseDailyPrice, 0)}}</p>
							</FormItem>
							<FormItem :label="$t('messages.Order.Pane.Price.PilotRate')" prop="pilotRate">
								<p>{{order.price.pilotRate}}</p>
							</FormItem>
							<FormItem :label="$t('messages.Order.Pane.Price.IssueDays')">
								<p>{{getDuration(order.price.startTime, order.price.endTime)}}</p>
							</FormItem>
						</Form>
						<p slot="remark">
							{{PilotPaymentRemark}}
						</p>
					</InfoCard>
				</Col>
			</Row>
		</Card>
	</section>
</template>

<script>
import { getOrderStatusTag, getPaymentStatus, formatUTCDate, formatRate, getAirport, getAircraftType, getArp, formatMoney, getDuration, getOrderCalcPrice, getPilotPayment } from '../../../utils'

export default {
	name: 'order-pane',
	props: {
		title: String,
		order: {
			status: {
				status: Number,
				paymentStatus: Number,
			},
			basicInfo: {
				startTime: Number,
				endTime: Number,
				startAirportId: Number,
				endAirportId: Number,
				aircraftTypeId: Number,
				arpId: Number,
			},
			price: {
				baseDailyPrice: Number,
				startTime: Number,
				endTime: Number,
				pilotRate: Number,
				aerolinkRate: Number,
				operatorDiscount: Number,
				orderPrice: Number,
				pilotPayment: Number,
			},
			remark: {
				remark: String,
			},
		},
	},
	data() {
		return {
			leftLabelWidth: 120,
			rightLabelWidth: 150,
		}
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
		paymentStatusText() {
			return getPaymentStatus(this.order.status.paymentStatus)
		},
		operatorDiscount() {
			if (this.order.price.operatorDiscount === 1) return '-'
			return `- ${formatRate(1 - this.order.price.operatorDiscount)}`
		},
		operatorPriceRemark() {
			return `${this.$t('messages.Order.Pane.Price.CalcLogic')}:\n${this.$t('messages.Order.Pane.Price.OrderPrice.CalcLogic')}` // BUG: '*'.sup() & \n not work
		},
		PilotPaymentRemark() {
			return `${this.$t('messages.Order.Pane.Price.CalcLogic')}:\n${this.$t('messages.Order.Pane.Price.PilotPayment.CalcLogic')}` // BUG: '*'.sup() & \n not work
		},
	},
	methods: {
		formatUTCDate(timestamp, type) {
			return formatUTCDate(timestamp, type)
		},
		formatRate(rate) {
			return formatRate(rate)
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
		formatMoney(number, places, symbol, thousand, decimal) {
			return formatMoney(number, places, symbol, thousand, decimal)
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
	},
}
</script>

<style>
#order-pane {
	margin-bottom: 30px;
}
</style>
