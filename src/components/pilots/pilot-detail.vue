<template>
	<section id="pilot-detail">
		<Row class-name="pane">
			<Spin v-if="isLoading" size="large" fix></Spin>
			<Col class-name="pane-main" :span="18">
				<PilotPane :pilot="pilot"></PilotPane>
			</Col>
			<Col class-name="pane-sub" :span="6">
				<ActionCard>
					<div slot="body">
						<div><Button type="text" @click="onClickModifyPilot">{{$t('messages.Pilot.Button.Modify')}}</Button></div>
					</div>
					<div slot="footer">
						<Row type="flex" justify="space-between" align="middle">
							<Col><p>Verification</p></Col>
							<Col><i-switch :value="pilot.isVerified" @on-change="onSwitchVerification" :disabled="isPutVerificationLoading"></i-switch></Col>
						</Row>
						<!-- <Button type="error" @click="onClickDeletePilot" disabled>{{$t('messages.PilotActionDeletePilot')}}</Button> -->
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

export default {
	data() {
		return {
			isLoading: false,
			isPutVerificationLoading: false,
			buttonLoading: false,
			pilot: {
				isVerified: false,
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
							lastUpdateTime: 0,
							location: 'loading...',
						},
						health: '',
					},
					rating: {
						performanceRate: 0,
						promotionRate: 0,
						isFeatured: false,
					},
					payRate: {
						pilotRate: 0,
					},
					employmentHistories: [
						{
							startTime: null,
							endTime: null,
							employer: '',
						},
					],
					flightHours: {
						totalFlightHours: 0,
						totalPicHours: 0,
						totalJetHours: 0,
					},
					license: [
						{
							id: 0,
							type: null,
						},
					],
					aircraft: [
						{
							aircraftTypeId: null,
							startDate: null,
							endDate: null,
						},
					],
					passport: [
						{
							passportNumber: '',
							gender: 1,
							nationalityId: null,
							dateOfBirth: null,
							placeOfBirth: '',
							dateOfIssue: null,
							dateOfExpiration: null,
						},
					],
					visa: [
						{
							countryId: null,
							type: '',
							dateOfIssue: null,
							durationOfEntry: 0,
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
						name: '',
						addr: '',
						BankName: '',
						BankAddr: '',
						SWIFTCode: '',
						IBANNumber: '',
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
		}
	},
	mounted() {
		this.initPage()
	},
	methods: {
		onClickModifyPilot() {
			this.buttonLoading = true
			this.modifyPilot()
			this.buttonLoading = false
		},
		onSwitchVerification(isVerified) {
			this.putPilotVerification(isVerified)
		},
		onClickDeletePilot() {
		},
		modifyPilot() {
			const id = this.$route.params.pilotId
			const path = `/pilots/${id}/modify`
			this.$router.push(path)
		},
		async putPilotVerification(isVerified) {
			try {
				this.isPutVerificationLoading = true
				const pilotId = this.$route.params.pilotId
				await Api.putPilotVerification(pilotId, isVerified)
				this.isPutVerificationLoading = false
				this.$Message.success(this.$t('messages.Pilot.Message.UpdatePilotVerificationSuccessfully'))
				this.fetchPilotDetail()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isPutVerificationLoading = false
			}
		},
		async fetchPilotDetail() {
			try {
				this.isLoading = true
				const pilotId = this.$route.params.pilotId
				const pilotRes = await Api.fetchPilotDetail(pilotId)
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
				this.pilot = pilot
				this.generateBreadcrumb()
				this.isLoading = false
				this.setPilotLocation()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isLoading = false
			}
		},
		async setPilotLocation() {
			const location = await getGeoLocation(this.pilot.basic.general.currentLocation.latitude, this.pilot.basic.general.currentLocation.longitude)
			this.$set(this.pilot.basic.general.currentLocation, 'location', location)
		},
		generateBreadcrumb() {
			const pilotId = this.$route.params.pilotId
			this.breadcrumbs = [
				{ name: this.$t('messages.Pilot.Breadcrumb'), path: '/pilots' },
				{ name: `${this.pilot.basic.general.firstName} ${this.pilot.basic.general.lastName}`, path: `/pilots/${pilotId}` },
			]
			Bus.$emit('updateBreadcrumbs', this.breadcrumbs)
		},
		initPage() {
			this.fetchPilotDetail()
		},
	},
}
</script>

<style>
#pilot-detail {
	height: 100%;
}
#pilot-detail .pane {
	height: 100%;
	min-height: 100%;
	margin-bottom: 20px;
}
#pilot-detail .pane-main {
	min-height: 100%;
}
#pilot-detail .pane-sub {
	padding: 0 50px;
}

</style>
