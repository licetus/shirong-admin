<template>
	<section id="pilot-pane">
		<div class="pilot-pane-title" v-if="title">
			<h2>{{title}}</h2>
		</div>
		<div class="pilot-pane-verified" v-if="isPilotDetail">
			<Row type="flex" justify="end" align="middle">
				<h2 v-if="pilot.isVerified" style="color:#00bf68">{{$t('messages.Pilot.Verification.Verified')}} <Icon type="ios-checkmark" size="24"></Icon></h2>
				<h2 v-else style="color:#9b9b9b">{{$t('messages.Pilot.Verification.Unverified')}} <Icon type="ios-minus" size="24"></Icon></h2>
			</Row>
		</div>
		<div class="pilot-pane-tabs">
			<Tabs class="" value="basic">
				<TabPane :label="$t('messages.Pilot.Pane.Basic.Title')" name="basic">
					<Row type="flex" justify="space-between">
						<Col :span="11">
							<InfoCard :title="$t('messages.Pilot.Pane.Basic.General.Title')">
								<Form :model="pilot.basic.general" label-position="left" :label-width="labelWidth.basic.left">
									<FormItem :label="$t('messages.Pilot.Pane.Basic.General.ProfilePhoto')" prop="photoUrl">
										<p><ImageControl :src="generateImgUrl(pilot.basic.general.photoUrl)" :default="pilotPhotoPlaceholder"></ImageControl></p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.General.FirstName')" prop="firstName">
										<p>{{pilot.basic.general.firstName}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.General.LastName')" prop="lastName">
										<p>{{pilot.basic.general.lastName}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.General.AerolinkId')" prop="staffNumber">
										<p>{{pilot.basic.general.staffNumber}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.General.Birthday')" prop="birthDate">
										<p>{{formatBirthday(pilot.basic.general.birthDate)}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.General.Age')" prop="birthDate">
										<p>{{getAge(pilot.basic.general.birthDate)}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.General.Nationality')" prop="nationalityId">
										<p>{{getCountry(pilot.basic.general.nationalityId)}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.General.Language')" prop="language">
										<p>{{pilot.basic.general.language}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.General.NearestAirport')" prop="nearestAirportId">
										<p>{{getAirport(pilot.basic.general.nearestAirportId, 'max')}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.General.CurrentLocation')" prop="currentLocation">
										<p>{{pilot.basic.general.currentLocation.location}}</p>
										<p class="last-update-time">{{`(${$t('messages.Pilot.Pane.Basic.General.LastUpdatedIn')} ${formatDurationFromNow(pilot.basic.general.currentLocation.lastUpdateTime)})`}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.General.Health')" prop="health">
										<p>{{pilot.basic.general.health}}</p>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard :title="$t('messages.Pilot.Pane.Basic.Rating.Title')">
								<Form :model="pilot.basic.rating" label-position="left" :label-width="labelWidth.basic.left">
									<FormItem :label="$t('messages.Pilot.Pane.Basic.Rating.PerformanceRate')" prop="performanceRate">
										<p><Rate :value="pilot.basic.rating.performanceRate" allow-half disabled></Rate></p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.Rating.PromotionRate')" prop="promotionRate">
										<p>{{pilot.basic.rating.promotionRate}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.Rating.TopPosition')" prop="isFeatured">
										<p>{{`${pilot.basic.rating.isFeatured ? $t('messages.Pilot.Pane.Basic.Rating.Featured') : '-'}`}}</p>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard :title="$t('messages.Pilot.Pane.Basic.PaymentRate.Title')">
								<Form :model="pilot.basic.payRate" label-position="left" :label-width="labelWidth.basic.left">
									<FormItem :label="$t('messages.Pilot.Pane.Basic.PaymentRate.Rate')" prop="pilotRate">
										<p>{{pilot.basic.payRate.pilotRate}}</p>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard :title="$t('messages.Pilot.Pane.Basic.EmploymentHistory.Title')">
								<div class="dynamic-form-wrap">
									<div class="dynamic-form" v-for="item of employmentHistories">
										<Form :model="item" label-position="left" :label-width="labelWidth.basic.left">
											<FormItem :label="$t('messages.Pilot.Pane.Basic.EmploymentHistory.Period')">
												<p>{{formatEmploymentTime(item.startTime, item.endTime)}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.EmploymentHistory.Company')" prop="employer">
												<p>{{item.employer}}</p>
											</FormItem>
										</Form>
									</div>
								</div>
							</InfoCard>
							<InfoCard :title="$t('messages.Pilot.Pane.Basic.FlightHours.Title')">
								<Form :model="pilot.basic.flightHours" label-position="left" :label-width="labelWidth.basic.left">
									<FormItem :label="$t('messages.Pilot.Pane.Basic.FlightHours.TotalFlightHours')" prop="totalFlightHours">
										<p>{{`${pilot.basic.flightHours.totalFlightHours} ${$t('messages.Public.Time.Hrs')}`}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.FlightHours.TotalPicHours')" prop="totalPicHours">
										<p>{{`${pilot.basic.flightHours.totalPicHours} ${$t('messages.Public.Time.Hrs')}`}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.FlightHours.TotalJetHours')" prop="totalJetHours">
										<p>{{`${pilot.basic.flightHours.totalJetHours} ${$t('messages.Public.Time.Hrs')}`}}</p>
									</FormItem>
								</Form>
							</InfoCard>

						</Col>
						<Col :span="11">
							<InfoCard :title="$t('messages.Pilot.Pane.Basic.Aircraft.Title')">
								<div class="dynamic-form-wrap">
									<div class='dynamic-form' v-for="item of pilot.basic.aircraft">
										<Form :model="item" label-position="left" :label-width="labelWidth.basic.right">
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Aircraft.Type')" prop="type">
												<p>{{getAircraftType(item.aircraftTypeId, 'middle')}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Aircraft.StartTime')" prop="type">
												<p>{{formatDigitalDate(item.startDate)}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Aircraft.EndTime')" prop="type">
												<p>{{formatDigitalDate(item.endDate)}}</p>
											</FormItem>
										</Form>
									</div>
								</div>
							</InfoCard>
							<InfoCard :title="$t('messages.Pilot.Pane.Basic.License.Title')">
								<div class="dynamic-form-wrap">
									<div class='dynamic-form' v-for="item of pilot.basic.license">
										<Form :model="item" label-position="left" :label-width="labelWidth.basic.right">
											<FormItem :label="$t('messages.Pilot.Pane.Basic.License.Type')" prop="type">
												<p>{{$t(`messages.Pilot.LicenseType.${getLicenseType(item.type)}`)}}</p>
											</FormItem>
										</Form>
									</div>
								</div>
							</InfoCard>
							<InfoCard :title="$t('messages.Pilot.Pane.Basic.Passport.Title')">
								<div class="dynamic-form-wrap">
									<div class="dynamic-form" v-for="item of pilot.basic.passport">
										<Form :model="item" label-position="left" :label-width="labelWidth.basic.right">
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.PassportNumber')" prop="passportNumber">
												<p>{{item.passportNumber}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.Gender')" prop="gender">
												<p>{{$t(`messages.Public.Gender.${formatGender(item.gender)}`)}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.Nationality')" prop="nationality">
												<p>{{item.nationality}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.Birthday')" prop="dateOfBirth">
												<p>{{formatBirthday(item.dateOfBirth)}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.BirthPlace')" prop="placeOfBirth">
												<p>{{item.placeOfBirth}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.IssueDate')" prop="dateOfIssue">
												<p>{{formatDigitalDate(item.dateOfIssue)}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.ExpirationDate')" prop="dateOfExpiration">
												<p>{{formatDigitalDate(item.dateOfExpiration)}}</p>
											</FormItem>
										</Form>
									</div>
								</div>
							</InfoCard>
							<InfoCard :title="$t('messages.Pilot.Pane.Basic.Visa.Title')">
								<div class="dynamic-form-wrap">
									<div class="dynamic-form" v-for="item of pilot.basic.visa">
										<Form :model="item" label-position="left" :label-width="labelWidth.basic.right">
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Visa.Country')" prop="countryId">
												<p>{{getCountry(item.countryId)}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Visa.Type')" prop="type">
												<p>{{item.type}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Visa.IssueDate')" prop="dateOfIssue">
												<p>{{formatDigitalDate(item.dateOfIssue)}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Visa.Duration')" prop="durationOfEntry">
												<p>{{`${item.durationOfEntry} ${$t('messages.Public.Time.Days')}`}}</p>
											</FormItem>
										</Form>
									</div>
								</div>
							</InfoCard>
							<InfoCard :title="$t('messages.Pilot.Pane.Basic.Contact.Title')">
								<Form :model="pilot.basic.contact" label-position="left" :label-width="labelWidth.basic.right">
									<FormItem :label="$t('messages.Pilot.Pane.Basic.Contact.Email')" prop="email">
										<p>{{pilot.basic.contact.email}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.Contact.PhonePrimary')" prop="phonePrimary">
										<p>{{pilot.basic.contact.phonePrimary}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.Contact.PhoneAlternative')" prop="phoneAlternative">
										<p>{{pilot.basic.contact.phoneAlternative}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.Contact.Address')">
										<p>{{pilot.basic.contact.address1}}</p>
										<p>{{pilot.basic.contact.address2}}</p>
										<p>{{`${pilot.basic.contact.city},${pilot.basic.contact.state},${pilot.basic.contact.country}`}}</p>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard :title="$t('messages.Pilot.Pane.Basic.Payment.Title')">
								<Form :model="pilot.basic.payment" label-position="left" :label-width="labelWidth.basic.right">
									<FormItem :label="$t('messages.Pilot.Pane.Basic.Payment.Name')" prop="name">
										<p>{{pilot.basic.payment.name}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.Payment.Addr')" prop="phonePrimary">
										<p>{{pilot.basic.payment.addr}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.Payment.BankName')" prop="phoneAlternative">
										<p>{{pilot.basic.payment.bankName}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.Payment.BankAddr')">
										<p>{{pilot.basic.payment.bankAddr}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.Payment.SWIFT')">
										<p>{{pilot.basic.payment.SWIFTCode}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Pilot.Pane.Basic.Payment.IBAN')">
										<p>{{pilot.basic.payment.IBANNumber}}</p>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard :title="$t('messages.Pilot.Pane.Basic.Remark.Title')">
								<Form :model="pilot.basic.remark" label-position="left" :label-width="labelWidth.basic.right">
									<FormItem :label="$t('messages.Pilot.Pane.Basic.Remark.Remark')" prop="remark">
										<p>{{pilot.basic.remark.remark}}</p>
									</FormItem>
								</Form>
							</InfoCard>
						</Col>
					</Row>
				</TabPane>
				<TabPane :label="$t('messages.Pilot.Pane.FlightExp.Title')" name="flightExp">
					<Row type="flex" justify="space-between">
						<Col :span="11">
							<template v-for="(item, index) of pilot.flightExp">
								<InfoCard :title="getAircraftType(item.aircraftTypeId, 'max')">
									<Form :model="item" label-position="left" :label-width="labelWidth.flightExp.left">
										<FormItem :label="$t('messages.Pilot.Pane.FlightExp.TotalHours')" prop="totalHours">
											<p>{{`${item.totalHours} ${$t('messages.Public.Time.Hrs')}`}}</p>
										</FormItem>
										<FormItem :label="$t('messages.Pilot.Pane.FlightExp.PicHours')" prop="picHours">
											<p>{{`${item.picHours} ${$t('messages.Public.Time.Hrs')}`}}</p>
										</FormItem>
									</Form>
								</InfoCard>
							</template>
						</Col>
						<Col :span="11"></Col>
					</Row>
				</TabPane>
				<TabPane :label="$t('messages.Pilot.Pane.Documents.Title')" name="documents">
					<Row type="flex" justify="space-between">
						<Col :span="11">
							<template v-for="(item, index) of pilot.documents">
								<InfoCard :title="item.title || $t(`messages.Pilot.DocumentType.${getDocumentType(item.type)}`)">
									<Form :model="item" label-position="left" :label-width="labelWidth.documents.left">
										<FormItem :label="$t('messages.Pilot.Pane.Documents.Type')" prop="type">
											<p>{{$t(`messages.Pilot.DocumentType.${getDocumentType(item.type)}`)}}</p>
										</FormItem>
										<FormItem v-if="item.description" :label="$t('messages.Pilot.Pane.Documents.Description')" prop="description">
											<p>{{item.description}}</p>
										</FormItem>
										<FormItem :label="$t('messages.Pilot.Pane.Documents.ScannedCopy')" prop="imageUrl">
											<p><a href="javascript:void(0);" @click.prevent="onClickViewImgDetail(item.imageUrl)"><ImageControl :src="generateImgUrl(item.imageUrl, certificatePlaceholder)" :default="certificatePlaceholder"></ImageControl></a></p>
											<p><span v-if="!item.blurImageUrl || item.blurImageUrl === ''" class="miss-blur-copy-text">{{$t('messages.Pilot.Pane.Documents.Button.MissBlurCopy')}}</span></p>
										</FormItem>
									</Form>
								</InfoCard>
							</template>
						</Col>
						<Col :span="11"></Col>
					</Row>
				</TabPane>
				<TabPane :label="$t('messages.Pilot.Pane.Availablity.Title')" name="availability">
					<Row type="flex" justify="space-between">
						<Col :span="11">
							<Calendar :events="events" @on-change-month="onClickChangeMonth"></Calendar>
						</Col>
						<Col :span="11">
							<InfoCard :title="`${$t('messages.Pilot.Pane.Availablity.EventOf')} ${currentDate.format('MMMM YYYY')}`">
								<div class="dynamic-form-wrap">
									<div class="dynamic-form" v-for="item of events">
										<Form :model="item" label-position="left" :label-width="labelWidth.availability.right">
											<FormItem :label="$t('messages.Pilot.Pane.Availablity.Duration')">
												<p>{{`${formatDigitalDate(item.start)} - ${formatDigitalDate(item.end)}`}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Availablity.TitleLabel')" prop="title">
												<p>{{item.title}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Availablity.Content')" prop="content">
												<p>{{item.content}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Availablity.Status')" prop="status">
												<!-- TODO format status -->
												<p>{{$t(`messages.Pilot.ScheduleStatus.${getPilotScheduleStatus(item.status)}`)}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Availablity.Type')" prop="type">
												<!-- TODO format type -->
												<p>{{$t(`messages.Pilot.ScheduleType.${getPilotScheduleType(item.type)}`)}}</p>
											</FormItem>
										</Form>
									</div>
								</div>
							</InfoCard>
						</Col>
					</Row>
				</TabPane>
			</Tabs>
		</div>

		<Modal class-name="img-detail-modal" v-model="isImgModalVisible" width="75">
			<Row type="flex" justify="center">
				<ImageControl class="img-detail" :src="generateImgUrl(imgUrl, certificatePlaceholder)" :default="certificatePlaceholder"></ImageControl>
			</Row>
			<div slot="footer"></div>
		</Modal>
	</section>
</template>

<script>
import moment from 'moment'
import avatarPlaceholder from '../../../assets/imgs/pilot-profile-placeholder.png'
import certificatePlaceholder from '../../../assets/imgs/certificate-placeholder.png'
import { generateImgUrl, getAge, getCountry, getLicenseType, getAirport, getAircraftType, getDocumentType, getPilotScheduleType, getPilotScheduleStatus, getEvents, formatBirthday, formatDurationFromNow, formatMonth, formatGender, formatDigitalDate, getVisaType, formatUTCDate } from '../../../utils'

export default {
	name: 'pilot-pane',
	props: {
		title: String,
		pilot: {
			isVerified: Boolean,
			basic: {
				general: {
					photoUrl: String,
					firstName: String,
					lastName: String,
					staffNumber: String,
					birthDate: Number,
					nationalityId: Number,
					language: String,
					nearestAirportId: Number,
					currentLocation: {
						longitude: Number,
						latitude: Number,
						lastUpdateTime: Number,
					},
					health: String,
				},
				rating: {
					performanceRate: Number,
					promotionRate: Number,
					isFeatured: Boolean,
				},
				payRate: {
					pilotRate: Number,
				},
				employmentHistories: [
					{
						startTime: Number,
						endTime: Number,
						employer: String,
					},
				],
				flightHours: {
					totalFlightHours: Number,
					totalPicHours: Number,
					totalJetHours: Number,
				},
				license: [
					{
						type: Number,
					},
				],
				aircraft: [
					{
						aircraftTypeId: Number,
						startDate: Number,
						endDate: Number,
					},
				],
				passport: [
					{
						passportNumber: String,
						gender: Number,
						nationalityId: Number,
						birthDate: Number,
						birthPlace: String,
						issueDate: Number,
						expirationDate: Number,
					},
				],
				visa: [
					{
						countryId: Number,
						type: Number, // TODO: need visa type enum
						issueDate: Number,
						duration: Number,
					},
				],
				contact: {
					email: String,
					phonePrimary: String,
					phoneAlternative: String,
					address1: String,
					address2: String,
					city: String,
					state: String,
					country: String,
				},
				payment: {
					name: String,
					addr: String,
					BankName: String,
					BankAddr: String,
					SWIFTCode: String,
					IBANNumber: String,
				},
				remark: {
					remark: String,
				},
			},
			flightExp: [
				{
					aircraftTypeId: Number,
					totalPicHours: Number,
					totalJetHoursl: Number,
				},
			],
			documents: [
				{
					title: String,
					type: Number,
					description: String,
					imgUrl: String,
				},
			],
			availability: [
				{
					startTime: Number,
					endTime: Number,
					title: String,
					content: String,
					status: Number,
					type: Number,
				},
			],
		},
	},
	data() {
		return {
			labelWidth: {
				basic: {
					left: 150,
					right: 150,
				},
				flightExp: {
					left: 120,
					right: 120,
				},
				documents: {
					left: 120,
					right: 120,
				},
				availability: {
					left: 150,
					right: 150,
				},
			},
			isImgModalVisible: false,
			imgUrl: '',
			pilotPhotoPlaceholder: avatarPlaceholder,
			certificatePlaceholder,
			currentDate: moment(),
		}
	},
	mounted() {
	},
	computed: {
		isPilotDetail() {
			if (this.$route.params.pilotId) return true
			return false
		},
		employmentHistories() {
			return this.sortEmploymentHistories()
		},
		events() {
			return getEvents(this.currentDate, this.pilot.availability)
		},
	},
	methods: {
		onClickViewImgDetail(imgUrl) {
			this.imgUrl = imgUrl
			this.showImgModal()
		},
		showImgModal() {
			this.isImgModalVisible = true
		},
		hideImgModal() {
			this.isImgModalVisible = false
		},
		onClickChangeMonth(start, end, firstDayOfMonth) {
			this.currentDate = firstDayOfMonth
		},
		generateImgUrl(url) {
			return generateImgUrl(url)
		},
		formatBirthday(timestamp) {
			return formatBirthday(timestamp)
		},
		getAge(timestamp) {
			return getAge(timestamp)
		},
		getCountry(countryId) {
			return getCountry(countryId)
		},
		getLicenseType(type) {
			return getLicenseType(type)
		},
		getDocumentType(type) {
			return getDocumentType(type)
		},
		getPilotScheduleType(type) {
			return getPilotScheduleType(type)
		},
		getPilotScheduleStatus(status) {
			return getPilotScheduleStatus(status)
		},
		formatDurationFromNow(timestamp) {
			return formatDurationFromNow(timestamp)
		},
		sortEmploymentHistories() {
			const arr = this.pilot.basic.employmentHistories
			if (arr) arr.sort((a, b) => b.startTime - a.startTime)
			return arr
		},
		formatEmploymentTime(startTime, endTime) {
			const startStr = formatMonth(startTime)
			const endStr = endTime ? formatMonth(endTime) : 'Present'
			return `${startStr} - ${endStr}`
		},
		formatGender(gender) {
			return formatGender(gender)
		},
		formatDigitalDate(timestamp) {
			return formatDigitalDate(timestamp)
		},
		getVisaType(type) {
			return getVisaType(type)
		},
		formatUTCDate(timestamp) {
			return formatUTCDate(timestamp)
		},
		getAirport(id, length) {
			return getAirport(id, length)
		},
		getAircraftType(id, length) {
			return getAircraftType(id, length)
		},
	},
}
</script>

<style lang="scss">
@import "../../../styles/theme.scss";
#pilot-pane {
	margin-bottom: 30px;
	.pilot-pane-verified {
		position: absolute;
		right: 0;
		width: 20%;
		top: -30px;
	}
	.pilot-pane-tabs {
		padding: 10px 30px 30px 30px;
		background-color: #fff;
	}
	.last-update-time {
		font-size: 12px;
	}
	.miss-blur-copy-text {
		font-size: 14px;
		color: $error-color;
	}
}
.img-detail-modal {
	height: 100%;
	.ivu-modal {
		.ivu-modal-content {
			margin-bottom: 50px;
			.img-detail {
				width: 100%;
				height: 100%;
			}
			.ivu-modal-footer {
				padding: 0;
			}
		}
	}
}
</style>
