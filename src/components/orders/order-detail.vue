<template>
	<section id="order-detail">
		<Row class-name="pane">
			<Spin v-if="isLoading" size="large" fix></Spin>
			<Col class-name="pane-main" :span="18">
				<OrderPane :order="order.order"></OrderPane>
				<PilotPane :title="$t('messages.Pilot.Pane.Title')" :pilot="order.pilot"></PilotPane>
				<OperatorPane :title="$t('messages.Operator.Pane.Title')" :operator="order.operator"></OperatorPane>
			</Col>
			<Col class-name="pane-sub" :span="6">
				<ActionCard>
					<div slot="body">
						<div><Button type="text" @click="onClickContactOrderParticipants" :loading="buttonLoading.contact">{{$t('messages.Public.Button.ContactOrderParticipants')}}</Button></div>
						<div><Button type="text" @click="onClickModifyOrder" :loading="buttonLoading.order">{{$t('messages.Order.Button.Modify')}}</Button></div>
						<div><Button type="text" @click="onClickModifyPilot" :loading="buttonLoading.pilot">{{$t('messages.Pilot.Button.Modify')}}</Button></div>
						<div><Button type="text" @click="onClickModifyOperator" :loading="buttonLoading.operator">{{$t('messages.Operator.Button.Modify')}}</Button></div>
					</div>
					<div slot="footer">
						<Button v-if="this.order.order.status.status === Enum.OrderStatus.Pending" type="primary" @click="onClickActivateOrder" :loading="buttonLoading.activate">{{$t('messages.Order.Button.Activate')}}</Button>
						<Button v-if="this.order.order.status.status === Enum.OrderStatus.Pending || this.order.order.status.status === Enum.OrderStatus.Active" type="default" @click="onClickCancelOrder" :loading="buttonLoading.cancel">{{$t('messages.Order.Button.Cancel')}}</Button>
						<Button type="error" @click="onClickDeleteOrder" :loading="buttonLoading.delete">{{$t('messages.Order.Button.Delete')}}</Button>
					</div>
				</ActionCard>
			</Col>
		</Row>

	</section>
</template>

<script>
import Bus from '../../bus'
import * as Api from '../../api'
import { errorHandler, getGeoLocation } from '../../utils'
import { Enum } from '../../models'

export default {
	data() {
		return {
			Enum,
			pilotId: 0,
			operatorId: 0,
			isLoading: false,
			buttonLoading: {
				contact: false,
				order: false,
				pilot: false,
				operator: false,
				delete: false,
				activate: false,
				cancel: false,
			},
			order: {
				order: {
					status: {
						status: Enum.OrderStatus.Canceled,
						paymentStatus: Enum.PaymentStatus.Unpaid,
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
				pilot: {
					basic: {
						general: {
							photoUrl: '',
							firstName: '',
							lastName: '',
							staffNumber: '',
							birthDate: null,
							nationalityId: null,
							language: '',
							nearestAirportId: null,
							currentLocation: {
								longitude: 0,
								latitude: 0,
								lastUpdateTime: null,
							},
							health: '',
						},
						rating: {
							performanceRate: 1,
							promotionRate: 1,
							isFeatured: false,
						},
						payRate: {
							pilotRate: 1,
						},
						employmentHistories: [
							{
								startTime: null,
								endTime: null,
								company: '',
							},
						],
						flightHours: {
							totalFlightHours: 0,
							totalPicHours: 0,
							totalJetHours: 0,
						},
						passport: [
							{
								passportNumber: '',
								gender: 1,
								nationalityId: null,
								birthDate: null,
								birthPlace: '',
								issueDate: null,
								expirationDate: null,
							},
						],
						visa: [
							{
								countryId: null,
								type: '',
								issueDate: null,
								duration: 0,
							},
						],
						contact: {
							email: '',
							phonePrimary: '',
							phoneAlternative: '',
							address1: '',
							address2: '',
							city: '',
							state: '',
							country: '',
						},
						payment: {
							name: '-',
							addr: '-',
							bankName: '-',
							bankAddr: '-',
							SWIFTCode: '-',
							IBANNumber: '-',
						},
						remark: {
							remark: '',
						},
					},
					flightExp: [
						{
							aircraftTypeId: null,
							totalPicHours: 0,
							totalJetHours: 0,
						},
					],
					documents: [
						{
							title: '',
							description: '',
							imgUrl: '',
						},
					],
					availability: [],
				},
				operator: {
					general: {
						id: null,
						avatarUrl: '',
						company: '',
						nickname: '',
						contactPerson: '',
						contactEmail: '',
						contactNumber: '',
						businessAddress: '',
					},
					discount: {
						operatorDiscount: 1,
					},
					operatorType: {
						operatorType: 1,
					},
					remark: {
						remark: '',
					},
				},
			},
		}
	},
	mounted() {
		this.initPage()
	},
	destoryed() {
	},
	methods: {
		onClickContactOrderParticipants() {
			this.buttonLoading.contact = true
			const id = this.$route.params.orderId
			const path = `/messages/${Enum.MessageType.Order}/${id}`
			this.$router.push(path)
			this.buttonLoading.contact = false
		},
		onClickModifyOrder() {
			this.buttonLoading.order = true
			this.modifyOrder()
			this.buttonLoading.order = false
		},
		onClickModifyPilot() {
			this.buttonLoading.pilot = true
			this.modifyPilot()
			this.buttonLoading.pilot = false
		},
		onClickModifyOperator() {
			this.buttonLoading.operator = true
			this.modifyOperator()
			this.buttonLoading.operator = false
		},
		onClickActivateOrder() {
			if (this.order.order.status.status === Enum.OrderStatus.Pending) {
				this.$Modal.confirm({
					title: this.$t('messages.Order.Message.Activate.Title'),
					content: this.$t('messages.Order.Message.Activate.Content'),
					onOk: () => this.activateOrder(),
				})
			}
		},
		onClickCancelOrder() {
			if (this.order.order.status.status === Enum.OrderStatus.Pending || this.order.order.status.status === Enum.OrderStatus.Active) {
				this.$Modal.confirm({
					title: this.$t('messages.Order.Message.Cancel.Title'),
					content: this.$t('messages.Order.Message.Cancel.Content'),
					onOk: () => this.cancelOrder(),
				})
			}
		},
		onClickDeleteOrder() {
			this.$Modal.confirm({
				title: this.$t('messages.Order.Message.Delete.Title'),
				content: this.$t('messages.Order.Message.Delete.Content'),
				onOk: () => this.deleteOrder(),
			})
		},

		modifyOrder() {
			const id = this.$route.params.orderId
			const path = `/orders/${id}/modify`
			this.$router.push(path)
		},
		modifyPilot() {
			const id = this.pilotId
			const path = `/pilots/${id}/modify`
			this.$router.push(path)
		},
		modifyOperator() {
			const id = this.operatorId
			const path = `/operators/${id}/modify`
			this.$router.push(path)
		},

		async fetchOrderDetail() {
			try {
				this.generateBreadcrumb()
				this.isLoading = true
				const orderId = this.$route.params.orderId
				const orderRes = await Api.fetchOrderDetail(orderId)
				this.pilotId = orderRes.pilotId
				this.operatorId = orderRes.operatorId
				const order = {
					status: {
						status: orderRes.status || null,
						paymentStatus: orderRes.paymentStatus || null,
					},
					basicInfo: {
						startTime: orderRes.startTime || null,
						endTime: orderRes.endTime || null,
						startAirportId: orderRes.startAirportId || null,
						endAirportId: orderRes.endAirportId || null,
						aircraftTypeId: orderRes.aircraftTypeId || null,
						arpId: orderRes.arpId || null,
					},
					price: {
						baseDailyPrice: orderRes.basePrice || 0,
						startTime: orderRes.startTime || null,
						endTime: orderRes.endTime || null,
						pilotRate: orderRes.pilotRate || 1,
						aerolinkRate: orderRes.aerolinkRate || 1,
						operatorDiscount: orderRes.discountRate || 1,
						orderPrice: orderRes.orderPrice || 0,
						pilotPayment: orderRes.pilotPrice || 0,
					},
					remark: {
						remark: orderRes.remark || '',
					},
				}
				const pilotRes = await Api.fetchPilotDetail(orderRes.pilotId)
				const pilot = {
					isVerified: pilotRes.isVerified || false,
					basic: {
						general: {
							photoUrl: pilotRes.photoUrl || '',
							firstName: pilotRes.firstName || '-',
							lastName: pilotRes.lastName || '-',
							staffNumber: pilotRes.staffNumber || '-',
							birthDate: pilotRes.birthDate || null,
							nationalityId: pilotRes.nationalityId || null,
							language: pilotRes.language || '-',
							nearestAirportId: pilotRes.nearestAirportId || null,
							currentLocation: {
								longitude: pilotRes.longitude || null,
								latitude: pilotRes.latitude || null,
								lastUpdateTime: pilotRes.lastLocationTime || null,
							},
							health: pilotRes.health || '-',
						},
						rating: {
							performanceRate: pilotRes.basicScore || 5,
							promotionRate: pilotRes.promotionScore || 5,
							isFeatured: pilotRes.isFeatured || false,
						},
						payRate: {
							pilotRate: pilotRes.pilotRate || 1,
						},
						employmentHistories: pilotRes.employmentHistories || [],
						flightHours: {
							totalFlightHours: pilotRes.totalFlightHours || 0,
							totalPicHours: pilotRes.totalPicHours || 0,
							totalJetHours: pilotRes.totalJetHours || 0,
						},
						license: pilotRes.licenses || [],
						aircraft: pilotRes.licenseAircrafts || [],
						passport: pilotRes.passports || [],
						visa: pilotRes.visas || [],
						contact: {
							email: pilotRes.email || '-',
							phonePrimary: pilotRes.phonePrimary || '-',
							phoneAlternative: pilotRes.phoneAlternative || '-',
							address1: pilotRes.homeAddress1 || '-',
							address2: pilotRes.homeAddress2 || '-',
							city: pilotRes.city || '-',
							state: pilotRes.state || '-',
							country: pilotRes.country || '-',
						},
						payment: {
							name: pilotRes.beneficiaryName || '-',
							addr: pilotRes.beneficiaryAddress || '-',
							bankName: pilotRes.beneficiaryBankName || '-',
							bankAddr: pilotRes.beneficiaryBankAddress || '-',
							SWIFTCode: pilotRes.swiftCode || '-',
							IBANNumber: pilotRes.ibanNumber || '-',
						},
						remark: {
							remark: pilotRes.remark || '',
						},
					},
					flightExp: pilotRes.flightHours || [],
					documents: pilotRes.documents || [],
					availability: pilotRes.schedules || [],
				}
				const location = await getGeoLocation(pilot.basic.general.currentLocation.latitude, pilot.basic.general.currentLocation.longitude)
				pilot.basic.general.currentLocation.location = location
				const operatorRes = await Api.fetchOperatorDetail(orderRes.operatorId)
				const operator = {
					general: {
						id: operatorRes.id || null,
						avatarUrl: operatorRes.avatarUrl || '',
						company: operatorRes.company || '-',
						nickname: operatorRes.nickname || '-',
						contactPerson: operatorRes.contactPerson || '-',
						contactEmail: operatorRes.contactEmail || '-',
						contactNumber: operatorRes.contactNumber || '-',
						businessAddress: operatorRes.businessAddress || '-',
					},
					discount: {
						operatorDiscount: operatorRes.discountRate || 1,
					},
					operatorType: {
						operatorType: operatorRes.type || 1,
					},
					remark: {
						remark: operatorRes.remark || '',
					},
				}
				this.order = {
					order,
					pilot,
					operator,
				}
				this.isLoading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isLoading = false
			}
		},
		async activateOrder() {
			try {
				this.buttonLoading.activate = true
				const id = this.$route.params.orderId
				await Api.activateOrder(id)
				this.buttonLoading.activate = false
				this.$Message.success(this.$t('messages.Order.Message.ActivateSuccessfully'))
				this.fetchOrderDetail()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.buttonLoading.activate = false
			}
		},
		async cancelOrder() {
			try {
				this.buttonLoading.cancel = true
				const id = this.$route.params.orderId
				await Api.cancelOrder(id)
				this.buttonLoading.cancel = false
				this.$Message.success(this.$t('messages.Order.Message.CancelSuccessfully'))
				this.fetchOrderDetail()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.buttonLoading.cancel = false
			}
		},
		async deleteOrder() {
			try {
				this.buttonLoading.delete = true
				const id = this.$route.params.orderId
				await Api.deleteOrder(id)
				this.buttonLoading.delete = false
				this.$Message.success(this.$t('messages.Order.Message.DeleteSuccessfully'))
				this.backToTable()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.buttonLoading.delete = false
			}
		},
		backToTable() {
			this.$router.replace('/orders')
		},
		generateBreadcrumb() {
			const orderId = this.$route.params.orderId
			this.breadcrumbs = [
				{ name: this.$t('messages.Order.Breadcrumb'), path: '/orders' },
				{ name: `${orderId}`, path: `/orders/${orderId}` },
			]
			Bus.$emit('updateBreadcrumbs', this.breadcrumbs)
		},
		initPage() {
			this.fetchOrderDetail()
		},
	},
}
</script>

<style>
#order-detail {
	height: 100%;
}
#order-detail .pane {
	height: 100%;
	min-height: 100%;
	margin-bottom: 20px;
}
#order-detail .pane-main {
	min-height: 100%;
}
#order-detail .pane-sub {
	padding: 0 50px;
}

</style>
