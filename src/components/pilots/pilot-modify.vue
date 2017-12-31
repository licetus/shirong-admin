 <template>
	<section id="pilot-modify">
		<Row class-name="pane">
			<Spin v-if="isPageLoading" size="large" fix></Spin>
			<Col class-name="pane-main" :span="18">
				<div class="pilot-pane-verified">
					<Row type="flex" justify="end" align="middle">
						<h2 v-if="pilot.isVerified" style="color:#00bf68">{{$t('messages.Pilot.Verification.Verified')}} <Icon type="ios-checkmark" size="24"></Icon></h2>
						<h2 v-else style="color:#9b9b9b">{{$t('messages.Pilot.Verification.Unverified')}} <Icon type="ios-minus" size="24"></Icon></h2>
					</Row>
				</div>
				<div class="pilot-modify-tabs">
					<Tabs value="basic">
						<TabPane :label="$t('messages.Pilot.Pane.Basic.Title')" name="basic">
							<Row type="flex" justify="space-between">
								<Col :span="11">
									<InfoCard :title="$t('messages.Pilot.Pane.Basic.General.Title')">
										<Form ref="generalForm" :rules="pilotFormRules.basic.general" :model="pilot.basic.general" label-position="left" :label-width="labelWidth.basic.left">
											<FormItem :label="$t('messages.Pilot.Pane.Basic.General.ProfilePhoto')" prop="photoUrl">
												<p><ImageControl :src="generateImgUrl(pilot.basic.general.photoUrl)" :default="pilotPhotoPlaceholder"></ImageControl></p>
												<p><ImgUploader :buttonText="$t('messages.Pilot.Pane.Basic.General.Button.ChangePhoto')" :imgUrl="pilot.basic.general.photoUrl" :defaultUrl="pilotPhotoPlaceholder" @on-upload="onUploadPilotPhoto"></ImgUploader></p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.General.FirstName')" prop="firstName">
												<Input v-model="pilot.basic.general.firstName"></Input>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.General.LastName')" prop="lastName">
												<Input v-model="pilot.basic.general.lastName"></Input>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.General.AerolinkId')" prop="staffNumber">
												<Input v-model="pilot.basic.general.staffNumber"></Input>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.General.Birthday')" prop="birthDate">
												<DatePicker type="date" v-model="pilot.basic.general.birthDate" format="Do MMMM yyyy" :editable="false" :clearable="false"></DatePicker>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.General.Age')">
												<p>{{getAge(pilot.basic.general.birthDate)}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.General.Nationality')" prop="nationalityId">
												<BasicSelector v-model="pilot.basic.general.nationalityId" :label="getCountry(pilot.basic.general.nationalityId)" mode="country"></BasicSelector>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.General.Language')" prop="language">
												<Input v-model="pilot.basic.general.language" type="textarea" autosize></Input>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.General.NearestAirport')" prop="nearestAirportId">
												<BasicSelector v-model="pilot.basic.general.nearestAirportId" :label="getAirport(pilot.basic.general.nearestAirportId, 'middle')" mode="airport"></BasicSelector>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.General.CurrentLocation')" prop="currentLocation">
												<p>{{pilot.basic.general.currentLocation.location || 'loading...'}}</p>
												<p class="last-update-time">{{`(${$t('messages.Pilot.Pane.Basic.General.LastUpdatedIn')} ${formatDurationFromNow(pilot.basic.general.currentLocation.lastUpdateTime)})`}}</p>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.General.Health')" prop="health">
												<Select v-model="pilot.basic.general.health">
													<Option value="1st Class Medical"></Option>
													<Option value="2nd Class Medical"></Option>
													<Option value="3rd Class Medical"></Option>
												</Select>
											</FormItem>
										</Form>
									</InfoCard>
									<InfoCard :title="$t('messages.Pilot.Pane.Basic.Rating.Title')">
										<Form ref="ratingForm" :rules="pilotFormRules.basic.rating" :model="pilot.basic.rating" label-position="left" :label-width="labelWidth.basic.left">
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Rating.PerformanceRate')" prop="performanceRate">
												<Rate v-model="pilot.basic.rating.performanceRate" allow-half></Rate>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Rating.PromotionRate')" prop="promotionRate">
												<Slider v-model="pilot.basic.rating.promotionRate" @on-change="onChangePromotionRate" :min="promotionRateConfig.min" :max="promotionRateConfig.max" :step="promotionRateConfig.step" show-input></Slider>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Rating.TopPosition')" prop="isFeatured">
												<Checkbox v-model="pilot.basic.rating.isFeatured" @on-change="onChangeFeatured">{{$t('messages.Pilot.Pane.Basic.Rating.Featured')}}</Checkbox>
											</FormItem>
										</Form>
									</InfoCard>
									<InfoCard :title="$t('messages.Pilot.Pane.Basic.PaymentRate.Title')">
										<Form ref="payRateForm" :rules="pilotFormRules.basic.payRate" :model="pilot.basic.payRate" label-position="left" :label-width="labelWidth.basic.left">
											<FormItem :label="$t('messages.Pilot.Pane.Basic.PaymentRate.Rate')" prop="pilotRate">
												<InputNumber v-model="pilot.basic.payRate.pilotRate" :min="paymentRateConfig.min" :max="paymentRateConfig.max" :step="paymentRateConfig.step"></InputNumber>
											</FormItem>
										</Form>
									</InfoCard>
									<InfoCard :title="$t('messages.Pilot.Pane.Basic.EmploymentHistory.Title')">
										<div class="dynamic-form-wrap">
											<DynamicForm v-for="(item, index) of employmentHistories" :index="index" :key="index" @on-edit="onClickEditEmploymentHistory">
												<Form :model="item" label-position="left" :label-width="labelWidth.basic.left">
													<FormItem :label="$t('messages.Pilot.Pane.Basic.EmploymentHistory.Period')">
														<p>{{formatEmploymentTime(item.startTime, item.endTime)}}</p>
													</FormItem>
													<FormItem :label="$t('messages.Pilot.Pane.Basic.EmploymentHistory.Company')" prop="employer">
														<p>{{item.employer}}</p>
													</FormItem>
												</Form>
											</DynamicForm>
										</div>
										<p><a href="javascript:void(0);" @click.prevent="onClickAddEmploymentHistory">{{$t('messages.Public.Button.AddNew')}}</a></p>
									</InfoCard>
									<InfoCard :title="$t('messages.Pilot.Pane.Basic.FlightHours.Title')">
										<Form ref="flightHoursForm" :rules="pilotFormRules.basic.flightHours" :model="pilot.basic.flightHours" label-position="left" :label-width="labelWidth.basic.left">
											<FormItem :label="$t('messages.Pilot.Pane.Basic.FlightHours.TotalFlightHours')" prop="totalFlightHours">
												<InputNumber v-model="pilot.basic.flightHours.totalFlightHours" :min="0" :step="1"></InputNumber>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.FlightHours.TotalPicHours')" prop="totalPicHours">
												<InputNumber v-model="pilot.basic.flightHours.totalPicHours" :min="0" :step="1"></InputNumber>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.FlightHours.TotalJetHours')" prop="totalJetHours">
												<InputNumber v-model="pilot.basic.flightHours.totalJetHours" :min="0" :step="1"></InputNumber>
											</FormItem>
										</Form>
									</InfoCard>
								</Col>

								<Col :span="11">
									<InfoCard :title="$t('messages.Pilot.Pane.Basic.Aircraft.Title')">
										<div class="dynamic-form-wrap">
											<DynamicForm v-for="(item, index) of pilot.basic.aircraft" :index="index" :key="index" @on-edit="onClickEditAircraft">
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
											</DynamicForm>
										</div>
										<p><a href="javascript:void(0);" @click.prevent="onClickAddAircraft">{{$t('messages.Public.Button.AddNew')}}</a></p>
									</InfoCard>
									<InfoCard :title="$t('messages.Pilot.Pane.Basic.License.Title')">
										<div class="dynamic-form-wrap">
											<DynamicForm v-for="(item, index) of pilot.basic.license" :index="index" :key="index" @on-edit="onClickEditLicense">
												<Form :model="item" label-position="left" :label-width="labelWidth.basic.right">
													<FormItem :label="$t('messages.Pilot.Pane.Basic.License.Type')">
														<p>{{$t(`messages.Pilot.LicenseType.${getLicenseType(item.type)}`)}}</p>
													</FormItem>
												</Form>
											</DynamicForm>
										</div>
										<p><a href="javascript:void(0);" @click.prevent="onClickAddLicense">{{$t('messages.Public.Button.AddNew')}}</a></p>
									</InfoCard>
									<InfoCard :title="$t('messages.Pilot.Pane.Basic.Passport.Title')">
										<div class="dynamic-form-wrap">
											<DynamicForm v-for="(item, index) of pilot.basic.passport" :index="index" :key="index" @on-edit="onClickEditPassport">
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
													<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.Remark')" prop="remark">
														<p>{{item.remark}}</p>
													</FormItem>
												</Form>
											</DynamicForm>
										</div>
										<p><a href="javascript:void(0);" @click.prevent="onClickAddPassport">{{$t('messages.Public.Button.AddNew')}}</a></p>
									</InfoCard>
									<InfoCard :title="$t('messages.Pilot.Pane.Basic.Visa.Title')">
										<div class="dynamic-form-wrap">
											<DynamicForm v-for="(item, index) of pilot.basic.visa" :index="index" :key="index" @on-edit="onClickEditVisa">
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
											</DynamicForm>
										</div>
										<p><a href="javascript:void(0);" @click.prevent="onClickAddVisa">{{$t('messages.Public.Button.AddNew')}}</a></p>
									</InfoCard>
									<InfoCard :title="$t('messages.Pilot.Pane.Basic.Contact.Title')">
										<Form ref="contactForm" :rules="pilotFormRules.basic.contact" :model="pilot.basic.contact" label-position="left" :label-width="labelWidth.basic.right">
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Contact.Email')" prop="email">
												<Input v-model="pilot.basic.contact.email"></Input>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Contact.PhonePrimary')" prop="phonePrimary">
												<Input v-model="pilot.basic.contact.phonePrimary"></Input>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Contact.PhoneAlternative')" prop="phoneAlternative">
												<Input v-model="pilot.basic.contact.phoneAlternative"></Input>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Contact.Building')" prop="address1">
												<Input v-model="pilot.basic.contact.address1" type="textarea" autosize></Input>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Contact.Road')" prop="address2">
												<Input v-model="pilot.basic.contact.address2" type="textarea" autosize></Input>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Contact.City')" prop="city">
												<Input v-model="pilot.basic.contact.city"></Input>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Contact.State')" prop="state">
												<Input v-model="pilot.basic.contact.state"></Input>
											</FormItem>
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Contact.Country')" prop="country">
												<Input v-model="pilot.basic.contact.country"></Input>
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
										<Form ref="remarkForm" :rules="pilotFormRules.basic.remark" :model="pilot.basic.remark" label-position="left" :label-width="labelWidth.basic.right">
											<FormItem :label="$t('messages.Pilot.Pane.Basic.Remark.Remark')" prop="remark">
												<Input v-model="pilot.basic.remark.remark" type="textarea" autosize></Input>
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
										<InfoCard :title="getAircraftType(item.aircraftTypeId, 'max')" :index="index" editable @on-edit="onClickEditFlightExp">
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
									<p><a href="javascript:void(0);" @click.prevent="onClickAddFlightExp">{{$t('messages.Public.Button.AddNew')}}</a></p>
								</Col>
								<Col :span="11"></Col>
							</Row>
						</TabPane>
						<TabPane :label="$t('messages.Pilot.Pane.Documents.Title')" name="documents">
							<Row type="flex" justify="space-between">
								<Col :span="11">
									<template v-for="(item, index) of pilot.documents">
										<InfoCard :title="item.title || $t(`messages.Pilot.DocumentType.${getDocumentType(item.type)}`)" :index="index" editable @on-edit="onClickEditDocument">
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
									<p><a href="javascript:void(0);" @click.prevent="onClickAddDocument">{{$t('messages.Public.Button.AddNew')}}</a></p>
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
														<p>{{$t(`messages.Pilot.ScheduleStatus.${getPilotScheduleStatus(item.status)}`)}}</p>
													</FormItem>
													<FormItem :label="$t('messages.Pilot.Pane.Availablity.Type')" prop="type">
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

		<Modal class-name="img-detail-modal" v-model="isImgModalVisible" width="75">
			<Row type="flex" justify="center">
				<ImageControl class="img-detail" :src="generateImgUrl(imgUrl, certificatePlaceholder)" :default="certificatePlaceholder"></ImageControl>
			</Row>
			<div slot="footer"></div>
		</Modal>

		<Modal v-model="isEmploymentHistoryModalVisible">
			<p slot="header">
				{{$t(`messages.Pilot.Pane.Basic.EmploymentHistory.Modal.Title.${editFormIndex === -1 ? 'New' : 'Edit'}`)}}
			</p>
			<Form ref="employmentHistoryForm" :model="employmentHistoryForm" :rules="employmentHistoryFormRules" label-position="left" :label-width="labelWidth.edit">
				<FormItem :label="$t('messages.Pilot.Pane.Basic.EmploymentHistory.Modal.StartTime')" prop="startDate">
					<DatePicker v-model="employmentHistoryForm.startDate" type="month" format="MMM yyyy"></DatePicker>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.EmploymentHistory.Modal.EndTime')" prop="endDate">
					<DatePicker v-model="employmentHistoryForm.endDate" type="month" format="MMM yyyy"></DatePicker>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.EmploymentHistory.Modal.Company')" prop="employer">
					<Input v-model="employmentHistoryForm.employer" type="text"></Input>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.EmploymentHistory.Modal.Description')" prop="description">
					<Input v-model="employmentHistoryForm.description" type="textarea" autosize></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button v-if="editFormIndex !== -1" type="error" @click="onClickRemoveEmploymentHistory" :loading="isEditFormDeleteLoading">{{$t('messages.Public.Button.Delete')}}</Button>
				<Button type="default" @click="onClickCancelEmploymentHistory">{{$t('messages.Public.Button.Cancel')}}</Button>
				<Button type="primary" @click="onClickConfirmEmploymentHistory" :loading="isEditFormConfirmLoading">{{$t('messages.Public.Button.Confirm')}}</Button>
			</div>
		</Modal>
		<Modal v-model="isAircraftModalVisible">
			<p slot="header">
				{{$t(`messages.Pilot.Pane.Basic.Aircraft.Modal.Title.${editFormIndex === -1 ? 'New' : 'Edit'}`)}}
			</p>
			<Form ref="aircraftForm" :model="aircraftForm" :rules="aircraftFormRules" label-position="left" :label-width="labelWidth.edit">
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Aircraft.Modal.Type')" prop="aircraftTypeId">
					<BasicSelector v-model="aircraftForm.aircraftTypeId" :label="getAircraftType(aircraftForm.aircraftTypeId, 'middle')" mode="aircraft"></BasicSelector>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Aircraft.Modal.StartTime')" prop="startTime">
					<DatePicker type="date" v-model="aircraftForm.startTime" format="dd/MM/yyyy" :editable="false" :clearable="false"></DatePicker>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Aircraft.Modal.EndTime')" prop="endTime">
					<DatePicker type="date" v-model="aircraftForm.endTime" format="dd/MM/yyyy" :editable="false" :clearable="false"></DatePicker>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button v-if="editFormIndex !== -1" type="error" @click="onClickRemoveAircraft" :loading="isEditFormDeleteLoading">{{$t('messages.Public.Button.Delete')}}</Button>
				<Button type="default" @click="onClickCancelAircraft">{{$t('messages.Public.Button.Cancel')}}</Button>
				<Button type="primary" @click="onClickConfirmAircraft" :loading="isEditFormConfirmLoading">{{$t('messages.Public.Button.Confirm')}}</Button>
			</div>
		</Modal>
		<Modal v-model="isLicenseModalVisible">
			<p slot="header">
				{{$t(`messages.Pilot.Pane.Basic.License.Modal.Title.${editFormIndex === -1 ? 'New' : 'Edit'}`)}}
			</p>
			<Form ref="licenseForm" :model="licenseForm" :rules="licenseFormRules" label-position="left" :label-width="labelWidth.edit">
				<FormItem :label="$t('messages.Pilot.Pane.Basic.License.Modal.Type')" prop="type">
					<Select v-model="licenseForm.type" placeholder="select">
						<!-- TODO: Option should generated by enum models -->
						<template v-for="item of Enum.LicenseType">
							<Option :value="item">{{$t(`messages.Pilot.LicenseType.${getLicenseType(item)}`)}}</Option>
						</template>
					</Select>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button v-if="editFormIndex !== -1" type="error" @click="onClickRemoveLicense" :loading="isEditFormDeleteLoading">{{$t('messages.Public.Button.Delete')}}</Button>
				<Button type="default" @click="onClickCancelLicense">{{$t('messages.Public.Button.Cancel')}}</Button>
				<Button type="primary" @click="onClickConfirmLicense" :loading="isEditFormConfirmLoading">{{$t('messages.Public.Button.Confirm')}}</Button>
			</div>
		</Modal>
		<Modal v-model="isPassportModalVisible">
			<p slot="header">
				{{$t(`messages.Pilot.Pane.Basic.Passport.Modal.Title.${editFormIndex === -1 ? 'New' : 'Edit'}`)}}
			</p>
			<Form ref="passportForm" :model="passportForm" :rules="passportFormRules" label-position="left" :label-width="labelWidth.basic.right">
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.Modal.PassportNumber')" prop="passportNumber">
					<Input v-model="passportForm.passportNumber"></Input>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.Modal.Gender')" prop="gender">
					<Select v-model="passportForm.gender">
						<Option :value="Enum.Gender.Male">{{$t(`messages.Public.Gender.${formatGender(Enum.Gender.Male)}`)}}</Option>
						<Option :value="Enum.Gender.Female">{{$t(`messages.Public.Gender.${formatGender(Enum.Gender.Female)}`)}}</Option>
					</Select>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.Modal.Nationality')" prop="nationality">
					<Input v-model="passportForm.nationality"></Input>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.Modal.Birthday')" prop="birthDate">
					<DatePicker type="date" v-model="passportForm.birthDate" format="Do MMMM yyyy" :editable="false" :clearable="false"></DatePicker>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.Modal.BirthPlace')" prop="birthPlace">
					<Input v-model="passportForm.birthPlace"></Input>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.Modal.IssueDate')" prop="issueDate">
					<DatePicker type="date" v-model="passportForm.issueDate" format="dd/MM/yyyy" :editable="false" :clearable="false"></DatePicker>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.Modal.ExpirationDate')" prop="expirationDate">
					<DatePicker type="date" v-model="passportForm.expirationDate" format="dd/MM/yyyy" :editable="false" :clearable="false"></DatePicker>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Passport.Modal.Remark')" prop="remark">
					<Input type="textarea" v-model="passportForm.remark" autosize></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button v-if="editFormIndex !== -1" type="error" @click="onClickRemovePassport" :loading="isEditFormDeleteLoading">{{$t('messages.Public.Button.Delete')}}</Button>
				<Button type="default" @click="onClickCancelPassport">{{$t('messages.Public.Button.Cancel')}}</Button>
				<Button type="primary" @click="onClickConfirmPassport" :loading="isEditFormConfirmLoading">{{$t('messages.Public.Button.Confirm')}}</Button>
			</div>
		</Modal>
		<Modal v-model="isVisaModalVisible">
			<p slot="header">
				{{$t(`messages.Pilot.Pane.Basic.Visa.Modal.Title.${editFormIndex === -1 ? 'New' : 'Edit'}`)}}
			</p>
			<Form ref="visaForm" :model="visaForm" :rules="visaFormRules" label-position="left" :label-width="labelWidth.edit">
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Visa.Modal.Country')" prop="countryId">
					<BasicSelector v-model="visaForm.countryId" :label="getCountry(visaForm.countryId)" mode="country"></BasicSelector>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Visa.Modal.Type')" prop="type">
					<Input v-model="visaForm.type"></Input>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Visa.Modal.IssueDate')" prop="issueDate">
					<DatePicker type="date" v-model="visaForm.issueDate" format="dd/MM/yyyy" :editable="false" :clearable="false"></DatePicker>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Basic.Visa.Modal.Duration')" prop="duration">
					<InputNumber v-model="visaForm.duration" :min="0" :step="1"></InputNumber>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button v-if="editFormIndex !== -1" type="error" @click="onClickRemoveVisa" :loading="isEditFormDeleteLoading">{{$t('messages.Public.Button.Delete')}}</Button>
				<Button type="default" @click="onClickCancelVisa">{{$t('messages.Public.Button.Cancel')}}</Button>
				<Button type="primary" @click="onClickConfirmVisa" :loading="isEditFormConfirmLoading">{{$t('messages.Public.Button.Confirm')}}</Button>
			</div>
		</Modal>
		<Modal v-model="isFlightExpModalVisible">
			<p slot="header">
				{{$t(`messages.Pilot.Pane.FlightExp.Modal.Title.${editFormIndex === -1 ? 'New' : 'Edit'}`)}}
			</p>
			<Form ref="flightExpForm" :model="flightExpForm" :rules="flightExpFormRules" label-position="left" :label-width="labelWidth.edit">
				<FormItem :label="$t('messages.Pilot.Pane.FlightExp.Modal.Type')" prop="aircraftTypeId">
					<BasicSelector v-model="flightExpForm.aircraftTypeId" :label="getAircraftType(flightExpForm.aircraftTypeId, 'middle')" mode="aircraft"></BasicSelector>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.FlightExp.Modal.TotalHours')" prop="totalHours">
					<InputNumber v-model="flightExpForm.totalHours" :min="0" :step="1"></InputNumber>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.FlightExp.Modal.PicHours')" prop="picHours">
					<InputNumber v-model="flightExpForm.picHours" :min="0" :step="1"></InputNumber>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button v-if="editFormIndex !== -1" type="error" @click="onClickRemoveFlightExp" :loading="isEditFormDeleteLoading">{{$t('messages.Public.Button.Delete')}}</Button>
				<Button type="default" @click="onClickCancelFlightExp">{{$t('messages.Public.Button.Cancel')}}</Button>
				<Button type="primary" @click="onClickConfirmFlightExp" :loading="isEditFormConfirmLoading">{{$t('messages.Public.Button.Confirm')}}</Button>
			</div>
		</Modal>
		<Modal v-model="isDocumentModalVisible" :styles="documentModalStyle" :mask-closable="false">
			<p slot="header">
				{{$t(`messages.Pilot.Pane.Documents.Modal.Title.${editFormIndex === -1 ? 'New' : 'Edit'}`)}}
			</p>
			<Form ref="documentForm" :model="documentForm" :rules="documentFormRules" label-position="left" :label-width="labelWidth.edit">
				<FormItem :label="$t('messages.Pilot.Pane.Documents.Modal.TitleLabel')" prop="title">
					<Input v-model="documentForm.title"></Input>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Documents.Modal.Type')" prop="type">
					<Select v-model="documentForm.type">
						<!-- TODO: should generated by emun models -->
						<template v-for="item of Enum.DocumentType">
							<Option :value="item">{{$t(`messages.Pilot.DocumentType.${getDocumentType(item)}`)}}</Option>
						</template>
					</Select>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Documents.Modal.Description')" prop="description">
					<Input v-model="documentForm.description" type="textarea" autosize></Input>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Documents.Modal.ScannedCopy')" prop="imgUrl">
					<p><ImageControl :src="generateImgUrl(documentForm.imgUrl)" :default="certificatePlaceholder"></ImageControl></p>
					<p><ImgUploader :buttonText="$t('messages.Pilot.Pane.Documents.Modal.Button.Upload')" :imgUrl="documentForm.imgUrl" :defaultUrl="certificatePlaceholder" :transfer="false" @on-upload="onUploadDocumentImg"></ImgUploader></p>
				</FormItem>
				<FormItem :label="$t('messages.Pilot.Pane.Documents.Modal.BlurCopy')" prop="blurImgUrl">
					<p><ImageControl :src="generateImgUrl(documentForm.blurImgUrl)" :default="certificatePlaceholder"></ImageControl></p>
					<p><ImgUploader :buttonText="$t('messages.Pilot.Pane.Documents.Modal.Button.Upload')" :imgUrl="documentForm.blurImgUrl" :defaultUrl="certificatePlaceholder" :transfer="false" @on-upload="onUploadBlurImg"></ImgUploader></p>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button v-if="editFormIndex !== -1" type="error" @click="onClickRemoveDocument" :loading="isEditFormDeleteLoading">{{$t('messages.Public.Button.Delete')}}</Button>
				<Button type="default" @click="onClickCancelDocument">{{$t('messages.Public.Button.Cancel')}}</Button>
				<Button type="primary" @click="onClickConfirmDocument" :loading="isEditFormConfirmLoading">{{$t('messages.Public.Button.Confirm')}}</Button>
			</div>
		</Modal>
	</section>
</template>

<script>
import moment from 'moment'
import avatarPlaceholder from '../../assets/imgs/pilot-profile-placeholder.png'
import certificatePlaceholder from '../../assets/imgs/certificate-placeholder.png'
import Bus from '../../bus'
import * as Api from '../../api'
import { Enum } from '../../models'
import config from '../../config/config'
import { errorHandler, generateImgUrl, getGeoLocation, getLicenseType, getTimestamp, getDate, getDocumentType, getPilotScheduleType, getPilotScheduleStatus, formatBirthday, getAge, getCountry, getEvents, formatDurationFromNow, formatMonth, formatGender, formatDigitalDate, getVisaType, formatUTCDate, getAirport, getAircraftType } from '../../utils'

export default {
	data() {
		const aircraftTypeIdValidator = (rule, value, callback) => {
			for (const item of this.pilot.basic.aircraft) {
				if (value === item.aircraftTypeId && value !== this.aircraftForm.self) callback(new Error(this.$t('messages.Pilot.Pane.Basic.Aircraft.Validator.Duplicate')))
			}
			callback()
		}
		const licenseTypeIdValidator = (rule, value, callback) => {
			for (const item of this.pilot.basic.license) {
				if (value === item.type && value !== this.licenseForm.self) callback(new Error(this.$t('messages.Pilot.Pane.Basic.License.Validator.Duplicate')))
			}
			callback()
		}
		const passportNumberValidator = (rule, value, callback) => {
			for (const item of this.pilot.basic.passport) {
				if (value === item.passportNumber && value !== this.passportForm.self) callback(new Error(this.$t('messages.Pilot.Pane.Basic.Passport.Validator.Duplicate')))
			}
			callback()
		}
		const visaCountryIdValidator = (rule, value, callback) => {
			for (const item of this.pilot.basic.visa) {
				if (value === item.countryId && value !== this.visaForm.self) callback(new Error(this.$t('messages.Pilot.Pane.Basic.Visa.Validator.Duplicate')))
			}
			callback()
		}
		const flightExpAircraftTypeIdValidator = (rule, value, callback) => {
			for (const item of this.pilot.flightExp) {
				if (value === item.aircraftTypeId && value !== this.flightExpForm.self) callback(new Error(this.$t('messages.Pilot.Pane.FlightExp.Validator.Duplicate')))
			}
			callback()
		}
		return {
			Enum,
			isPageLoading: false,
			isSaveLoading: false,
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
					left: 150,
					right: 150,
				},
				availability: {
					left: 150,
					right: 150,
				},
				edit: 120,
			},

			isImgModalVisible: false,

			editFormIndex: -1,
			isEditFormConfirmLoading: false,
			isEditFormDeleteLoading: false,
			// employment history
			isEmploymentHistoryModalVisible: false,
			employmentHistoryForm: {
				id: 0,
				startDate: null,
				endDate: null,
				employer: '',
				description: '',
			},
			employmentHistoryFormRules: { // TODO add employmentHistory form rules
				startDate: [{ type: 'date', required: true, message: this.$t('messages.Pilot.Pane.Basic.EmploymentHistory.Validator.Requirement.StartTime') }],
				// endDate: [{ type: 'date', required: false, message: this.$t('messages.Pilot.Pane.Basic.EmploymentHistory.Validator.Requirement.EndTime') }],
				employer: [{ type: 'string', required: true, message: this.$t('messages.Pilot.Pane.Basic.EmploymentHistory.Validator.Requirement.Company') }],
				description: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Basic.EmploymentHistory.Validator.Requirement.Description') }],
			},
			// license
			isLicenseModalVisible: false,
			licenseForm: {
				id: 0,
				type: null,
			},
			licenseFormRules: { // TODO add license form rules
				type: [
					{ type: 'number', required: true, message: this.$t('messages.Pilot.Pane.Basic.License.Validator.Requirement.Type') },
					{ validator: licenseTypeIdValidator, type: 'number', required: true },
				],
			},
			// aircraft
			isAircraftModalVisible: false,
			aircraftForm: {
				id: 0,
				aircraftTypeId: null,
				startTime: null,
				endTime: null,
			},
			aircraftFormRules: { // TODO add aircraft form rules
				aircraftTypeId: [
					{ type: 'number', required: true, message: this.$t('messages.Pilot.Pane.Basic.Aircraft.Validator.Requirement.Type') },
					{ validator: aircraftTypeIdValidator, type: 'number', required: true },
				],
				startTime: [{ type: 'date', required: true, message: this.$t('messages.Pilot.Pane.Basic.Aircraft.Validator.Requirement.StartTime') }],
				endTime: [{ type: 'date', required: true, message: this.$t('messages.Pilot.Pane.Basic.Aircraft.Validator.Requirement.EndTime') }],
			},
			// passport
			isPassportModalVisible: false,
			passportForm: {
				id: 0,
				passportNumber: null,
				gender: 1,
				nationality: '',
				birthDate: null,
				birthPlace: '',
				issueDate: null,
				expirationDate: null,
				remark: '',
			},
			passportFormRules: { // TODO add passport form rules
				passportNumber: [
					{ type: 'string', required: true, message: this.$t('messages.Pilot.Pane.Basic.Passport.Validator.Requirement.PassportNumber') },
					{ validator: passportNumberValidator, type: 'string', required: true },
				],
				gender: [{ type: 'number', required: true, message: this.$t('messages.Pilot.Pane.Basic.Passport.Validator.Requirement.Gender') }],
				nationality: [{ type: 'string', required: true, message: this.$t('messages.Pilot.Pane.Basic.Passport.Validator.Requirement.Nationality') }],
				birthDate: [{ type: 'date', required: true, message: this.$t('messages.Pilot.Pane.Basic.Passport.Validator.Requirement.Birthday') }],
				birthPlace: [{ type: 'string', required: true, message: this.$t('messages.Pilot.Pane.Basic.Passport.Validator.Requirement.BirthPlace') }],
				issueDate: [{ type: 'date', required: true, message: this.$t('messages.Pilot.Pane.Basic.Passport.Validator.Requirement.IssueDate') }],
				expirationDate: [{ type: 'date', required: true, message: this.$t('messages.Pilot.Pane.Basic.Passport.Validator.Requirement.ExpirationDate') }],
				remark: [{ type: 'string', required: false, max: config.remarkLength.passport, message: `${this.$t('messages.Pilot.Pane.Basic.Passport.Validator.Remark.Length')} ${config.remarkLength.passport} ${this.$t('messages.Pilot.Pane.Basic.Passport.Validator.Remark.Characters')}`, trigger: 'change' }],
			},
			// visa
			isVisaModalVisible: false,
			visaForm: {
				id: 0,
				countryId: null,
				type: '',
				issueDate: null,
				duration: null,
			},
			visaFormRules: { // TODO add visa form rules
				countryId: [
					{ type: 'number', required: true, message: this.$t('messages.Pilot.Pane.Basic.Visa.Validator.Requirement.Country') },
					{ validator: visaCountryIdValidator, type: 'number', required: true },
				],
				type: [{ type: 'string', required: true, message: this.$t('messages.Pilot.Pane.Basic.Visa.Validator.Requirement.Type') }],
				issueDate: [{ type: 'date', required: true, message: this.$t('messages.Pilot.Pane.Basic.Visa.Validator.Requirement.IssueDate') }],
				duration: [{ type: 'number', required: true, message: this.$t('messages.Pilot.Pane.Basic.Visa.Validator.Requirement.Duration') }],
			},
			// flightExp
			isFlightExpModalVisible: false,
			flightExpForm: {
				id: 0,
				aircraftTypeId: null,
				totalHours: null,
				picHours: null,
			},
			flightExpFormRules: { // TODO add flightExp form rules
				aircraftTypeId: [
					{ type: 'number', required: true, message: this.$t('messages.Pilot.Pane.FlightExp.Validator.Requirement.Type') },
					{ validator: flightExpAircraftTypeIdValidator, type: 'number', required: true },
				],
				totalHours: [{ type: 'number', required: true, message: this.$t('messages.Pilot.Pane.FlightExp.Validator.Requirement.TotalHours') }],
				picHours: [{ type: 'number', required: true, message: this.$t('messages.Pilot.Pane.FlightExp.Validator.Requirement.PicHours') }],
			},
			// document
			isDocumentModalVisible: false,
			documentForm: {
				id: 0,
				title: '',
				type: null,
				description: '',
				imgUrl: '',
				blurImgUrl: '',
			},
			documentFormRules: { // TODO add flightExp form rules
				title: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Documents.Validator.Requirement.Title') }],
				type: [{ type: 'number', required: true, message: this.$t('messages.Pilot.Pane.Documents.Validator.Requirement.Type') }],
				description: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Documents.Validator.Requirement.Description') }],
				imgUrl: [{ type: 'string', required: true, message: this.$t('messages.Pilot.Pane.Documents.Validator.Requirement.ScannedCopy') }],
				blurImgUrl: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Documents.Validator.Requirement.BlurCopy') }],
			},
			documentModalStyle: {
				top: '20px',
			},

			pilotPhotoPlaceholder: avatarPlaceholder,
			certificatePlaceholder,

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
							lastUpdateTime: null,
						},
						health: '1st Class Medical',
					},
					rating: {
						performanceRate: 0,
						promotionRate: 0,
						isFeatured: false,
					},
					payRate: {
						pilotRate: 1,
					},
					employmentHistories: [
					],
					flightHours: {
						totalFlightHours: 0,
						totalPicHours: 0,
						totalJetHours: 0,
					},
					license: [
					],
					aircraft: [
					],
					passport: [
					],
					visa: [
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
				],
				documents: [
				],
				availability: [
				],
			},
			pilotFormRules: {
				basic: {
					general: {
						photoUrl: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Basic.General.Validator.Requirement.PhotoUrl'), trigger: 'change' }],
						firstName: [{ type: 'string', required: true, message: this.$t('messages.Pilot.Pane.Basic.General.Validator.Requirement.FirstName'), trigger: 'blur' }],
						lastName: [{ type: 'string', required: true, message: this.$t('messages.Pilot.Pane.Basic.General.Validator.Requirement.LastName'), trigger: 'blur' }],
						staffNumber: [{ type: 'string', required: true, message: this.$t('messages.Pilot.Pane.Basic.General.Validator.Requirement.StaffNumber'), trigger: 'blur' }],
						birthDate: [{ type: 'date', required: false, message: this.$t('messages.Pilot.Pane.Basic.General.Validator.Requirement.Birthday'), trigger: 'change' }],
						nationalityId: [{ type: 'number', required: false, message: this.$t('messages.Pilot.Pane.Basic.General.Validator.Requirement.Nationality'), trigger: 'change' }],
						language: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Basic.General.Validator.Requirement.Language'), trigger: 'blur' }],
						nearestAirportId: [{ type: 'number', required: false, message: this.$t('messages.Pilot.Pane.Basic.General.Validator.Requirement.NearestAirport'), trigger: 'change' }],
						health: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Basic.General.Validator.Requirement.Health'), trigger: 'blur' }],
					},
					rating: {
						performanceRate: [
							{ type: 'number', required: true, message: this.$t('messages.Pilot.Pane.Basic.Rating.Validator.Requirement.PerformanceRate'), trigger: 'change' },
							{ type: 'number', min: config.rate.pilot.performanceRate.min, max: config.rate.pilot.performanceRate.max, message: this.$t('messages.Pilot.Pane.Basic.Rating.Validator.PerformanceRate'), trigger: 'change' },
						],
						promotionRate: [
							{ type: 'number', required: true, message: this.$t('messages.Pilot.Pane.Basic.Rating.Validator.Requirement.PromotionRate'), trigger: 'change' },
							{ type: 'number', min: config.rate.pilot.promotionRate.min, max: config.rate.pilot.promotionRate.max, message: this.$t('messages.Pilot.Pane.Basic.Rating.Validator.PromotionRate'), trigger: 'change' },
						],
					},
					payRate: {
						pilotRate: [
							{ type: 'number', required: true, message: this.$t('messages.Pilot.Pane.Basic.PaymentRate.Validator.Requirement.PilotRate'), trigger: 'change' },
							{ type: 'number', min: config.rate.pilot.promotionRate.min, max: config.rate.pilot.promotionRate.max, message: this.$t('messages.Pilot.Pane.Basic.PaymentRate.Validator.PilotRate'), trigger: 'change' },
						],
					},
					flightHours: {
						totalFlightHours: [{ type: 'number', required: false, message: this.$t('messages.Pilot.Pane.Basic.FlightHours.Validator.Requirement.TotalFlightHours'), trigger: 'blur' }],
						totalPicHours: [{ type: 'number', required: false, message: this.$t('messages.Pilot.Pane.Basic.FlightHours.Validator.Requirement.TotalPicHours'), trigger: 'blur' }],
						totalJetHours: [{ type: 'number', required: false, message: this.$t('messages.Pilot.Pane.Basic.FlightHours.Validator.Requirement.TotalJetHours'), trigger: 'blur' }],
					},
					contact: {
						email: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Basic.Contact.Validator.Requirement.Email'), trigger: 'blur' }],
						phonePrimary: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Basic.Contact.Validator.Requirement.PhonePrimary'), trigger: 'blur' }],
						phoneAlternative: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Basic.Contact.Validator.Requirement.PhoneAlternative'), trigger: 'blur' }],
						address1: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Basic.Contact.Validator.Requirement.Address'), trigger: 'blur' }],
						address2: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Basic.Contact.Validator.Requirement.Building'), trigger: 'blur' }],
						city: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Basic.Contact.Validator.Requirement.Road'), trigger: 'blur' }],
						state: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Basic.Contact.Validator.Requirement.City'), trigger: 'blur' }],
						country: [{ type: 'string', required: false, message: this.$t('messages.Pilot.Pane.Basic.Contact.Validator.Requirement.State'), trigger: 'blur' }],
					},
					remark: {
						remark: [{ type: 'string', required: false, max: config.remarkLength.pilot, message: `${this.$t('messages.Pilot.Pane.Basic.Remark.Validator.Remark.Length')} ${config.remarkLength.pilot} ${this.$t('messages.Pilot.Pane.Basic.Remark.Validator.Remark.Characters')}`, trigger: 'change' }],
					},
				},
			},

			searchLoading: false,
			maxCount: config.selectorOptionCount,
			initOptions: [{ id: -1, slot: 'please input to search' }],
			nationalityOptions: [{ id: -1, slot: 'please input to search' }],
			nearestAirportOptions: [{ id: -1, slot: 'please input to search' }],

			promotionRateConfig: config.rate.pilot.promotionRate,
			paymentRateConfig: config.rate.pilot.paymentRate,

			currentDate: moment(),
		}
	},
	created() {
	},
	mounted() {
		this.initPage()
	},
	computed: {
		employmentHistories() {
			return this.sortEmploymentHistories()
		},
		events() {
			return getEvents(this.currentDate, this.pilot.availability)
		},
	},
	methods: {
		onClickSave() {
			let general
			let rating
			let payRate
			let flightHours
			let contact
			this.$refs.generalForm.validate((valid) => { general = valid })
			this.$refs.ratingForm.validate((valid) => { rating = valid })
			this.$refs.payRateForm.validate((valid) => { payRate = valid })
			this.$refs.flightHoursForm.validate((valid) => { flightHours = valid })
			this.$refs.contactForm.validate((valid) => { contact = valid })
			if (general && rating && payRate && flightHours && contact) {
				this.patchPilot()
			}
		},
		onClickCancel() {
			this.backToView()
		},

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

		onUploadPilotPhoto(url) {
			this.pilot.basic.general.photoUrl = url
		},
		onChangePromotionRate(rate) {
			this.pilot.basic.rating.isFeatured = rate >= this.promotionRateConfig.featureScore
		},
		onChangeFeatured() {
			if (this.pilot.basic.rating.isFeatured && this.pilot.basic.rating.promotionRate < this.promotionRateConfig.featureScore) this.pilot.basic.rating.promotionRate = this.promotionRateConfig.featureScore
			else if (!this.pilot.basic.rating.isFeatured && this.pilot.basic.rating.promotionRate >= this.promotionRateConfig.featureScore) this.pilot.basic.rating.promotionRate = this.promotionRateConfig.featureScore - this.promotionRateConfig.step
		},

		generateImgUrl(url) {
			return generateImgUrl(url)
		},
		formatBirthday(timestamp) {
			return formatBirthday(timestamp)
		},
		getLicenseType(type) {
			return getLicenseType(type)
		},
		getAge(timestamp) {
			return getAge(timestamp)
		},
		getCountry(countryId) {
			return getCountry(countryId)
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
		// employment history
		onClickEditEmploymentHistory(index) {
			this.editFormIndex = index
			this.employmentHistoryForm = {
				id: this.pilot.basic.employmentHistories[index].id,
				startDate: getDate(this.pilot.basic.employmentHistories[index].startTime),
				endDate: getDate(this.pilot.basic.employmentHistories[index].endTime),
				employer: this.pilot.basic.employmentHistories[index].employer,
				description: this.pilot.basic.employmentHistories[index].description,
			}
			this.showEmploymentHistoryEditModal()
		},
		onClickAddEmploymentHistory() {
			this.editFormIndex = -1
			this.employmentHistoryForm = {
				// startTime: 0,
				startDate: 0,
				// endTime: 0,
				endDate: 0,
				employer: '',
				description: '',
			}
			this.showEmploymentHistoryEditModal()
		},
		onClickCancelEmploymentHistory() {
			this.hideEmploymentHistoryEditModal()
		},
		onClickRemoveEmploymentHistory() {
			if (this.editFormIndex !== -1) this.deleteEmploymentHistory()
		},
		onClickConfirmEmploymentHistory() {
			this.$refs.employmentHistoryForm.validate((valid) => {
				if (valid) {
					if (this.editFormIndex === -1) this.addEmploymentHistory()
					else this.patchEmploymentHistory()
				}
			})
		},
		showEmploymentHistoryEditModal() {
			this.isEmploymentHistoryModalVisible = true
		},
		hideEmploymentHistoryEditModal() {
			this.isEmploymentHistoryModalVisible = false
		},
		async deleteEmploymentHistory() {
			try {
				this.isEditFormDeleteLoading = true
				const pilotId = this.$route.params.pilotId
				const id = this.employmentHistoryForm.id
				await Api.deleteEmploymentHistory(pilotId, id)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.EmploymentHistory.Message.DeleteSuccessfully'))
				this.isEditFormDeleteLoading = false
				this.hideEmploymentHistoryEditModal()
				this.fetchEmploymentHistoryList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormDeleteLoading = false
			}
		},
		async addEmploymentHistory() {
			try {
				this.isEditFormConfirmLoading = true
				const pilotId = this.$route.params.pilotId
				const params = {
					startTime: getTimestamp(this.employmentHistoryForm.startDate),
					endTime: getTimestamp(this.employmentHistoryForm.endDate),
					employer: this.employmentHistoryForm.employer,
					description: this.employmentHistoryForm.description,
				}
				await Api.addEmploymentHistory(pilotId, params)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.EmploymentHistory.Message.AddSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideEmploymentHistoryEditModal()
				this.fetchEmploymentHistoryList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async patchEmploymentHistory() {
			try {
				this.isEditFormConfirmLoading = true
				const pilotId = this.$route.params.pilotId
				const id = this.employmentHistoryForm.id
				const params = {
					startTime: getTimestamp(this.employmentHistoryForm.startDate),
					endTime: getTimestamp(this.employmentHistoryForm.endDate),
					employer: this.employmentHistoryForm.employer,
					description: this.employmentHistoryForm.description,
				}
				await Api.patchEmploymentHistory(pilotId, id, params)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.EmploymentHistory.Message.UpdateSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideEmploymentHistoryEditModal()
				this.fetchEmploymentHistoryList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async fetchEmploymentHistoryList() {
			try {
				const pilotId = this.$route.params.pilotId
				const res = await Api.fetchEmploymentHistoryList(pilotId)
				this.pilot.basic.employmentHistories = res
			} catch (error) {
				errorHandler(error.code, error.message, this)
			}
		},
		// license
		onClickEditLicense(index) {
			this.editFormIndex = index
			this.licenseForm = {
				id: this.pilot.basic.license[index].id,
				self: this.pilot.basic.license[index].type,
				type: this.pilot.basic.license[index].type,
			}
			this.$refs.licenseForm.resetFields()
			this.showLicenseEditModal()
		},
		onClickAddLicense() {
			this.editFormIndex = -1
			this.licenseForm = {
				self: null,
				type: null,
			}
			this.$refs.licenseForm.resetFields()
			this.showLicenseEditModal()
		},
		onClickCancelLicense() {
			this.hideLicenseEditModal()
		},
		onClickRemoveLicense() {
			if (this.editFormIndex !== -1) this.deleteLicense()
		},
		onClickConfirmLicense() {
			this.$refs.licenseForm.validate((valid) => {
				if (valid) {
					if (this.editFormIndex === -1) this.addLicense()
					else this.patchLicense()
				}
			})
		},
		showLicenseEditModal() {
			this.isLicenseModalVisible = true
		},
		hideLicenseEditModal() {
			this.isLicenseModalVisible = false
		},
		async deleteLicense() {
			try {
				this.isEditFormDeleteLoading = true
				const pilotId = this.$route.params.pilotId
				const id = this.licenseForm.id
				await Api.deleteLicense(pilotId, id)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.License.Message.DeleteSuccessfully'))
				this.isEditFormDeleteLoading = false
				this.hideLicenseEditModal()
				this.fetchLicenseList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormDeleteLoading = false
			}
		},
		async addLicense() {
			try {
				this.isEditFormConfirmLoading = true
				const pilotId = this.$route.params.pilotId
				const params = {
					type: this.licenseForm.type,
				}
				await Api.addLicense(pilotId, params)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.License.Message.AddSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideLicenseEditModal()
				this.fetchLicenseList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async patchLicense() {
			try {
				this.isEditFormConfirmLoading = true
				const pilotId = this.$route.params.pilotId
				const id = this.licenseForm.id
				const params = {
					type: this.licenseForm.type,
				}
				await Api.patchLicense(pilotId, id, params)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.License.Message.UpdateSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideLicenseEditModal()
				this.fetchLicenseList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async fetchLicenseList() {
			try {
				const pilotId = this.$route.params.pilotId
				const res = await Api.fetchLicenseList(pilotId)
				this.pilot.basic.license = res
			} catch (error) {
				errorHandler(error.code, error.message, this)
			}
		},
		// aircraft
		onClickEditAircraft(index) {
			this.editFormIndex = index
			this.aircraftForm = {
				id: this.pilot.basic.aircraft[index].id,
				self: this.pilot.basic.aircraft[index].aircraftTypeId,
				aircraftTypeId: this.pilot.basic.aircraft[index].aircraftTypeId,
				startTime: getDate(this.pilot.basic.aircraft[index].startDate),
				endTime: getDate(this.pilot.basic.aircraft[index].endDate),
			}
			this.$refs.aircraftForm.resetFields()
			this.showAircraftEditModal()
		},
		onClickAddAircraft() {
			this.editFormIndex = -1
			this.aircraftForm = {
				self: null,
				aircraftTypeId: null,
				startTime: null,
				endTime: null,
			}
			this.$refs.aircraftForm.resetFields()
			this.showAircraftEditModal()
		},
		onClickCancelAircraft() {
			this.hideAircraftEditModal()
		},
		onClickRemoveAircraft() {
			if (this.editFormIndex !== -1) this.deleteAircraft()
		},
		onClickConfirmAircraft() {
			this.$refs.aircraftForm.validate((valid) => {
				if (valid) {
					if (this.editFormIndex === -1) this.addAircraft()
					else this.patchAircraft()
				}
			})
		},
		showAircraftEditModal() {
			this.isAircraftModalVisible = true
		},
		hideAircraftEditModal() {
			this.isAircraftModalVisible = false
		},
		async deleteAircraft() {
			try {
				this.isEditFormDeleteLoading = true
				const pilotId = this.$route.params.pilotId
				const id = this.aircraftForm.id
				await Api.deleteAircraft(pilotId, id)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.Aircraft.Message.DeleteSuccessfully'))
				this.isEditFormDeleteLoading = false
				this.hideAircraftEditModal()
				this.fetchAircraftList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormDeleteLoading = false
			}
		},
		async addAircraft() {
			try {
				this.isEditFormConfirmLoading = true
				const pilotId = this.$route.params.pilotId
				const params = {
					aircraftTypeId: this.aircraftForm.aircraftTypeId,
					startDate: getTimestamp(this.aircraftForm.startTime),
					endDate: getTimestamp(this.aircraftForm.endTime),
				}
				await Api.addAircraft(pilotId, params)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.Aircraft.Message.AddSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideAircraftEditModal()
				this.fetchAircraftList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async patchAircraft() {
			try {
				this.isEditFormConfirmLoading = true
				const pilotId = this.$route.params.pilotId
				const id = this.aircraftForm.id
				const params = {
					aircraftTypeId: this.aircraftForm.aircraftTypeId,
					startDate: getTimestamp(this.aircraftForm.startTime),
					endDate: getTimestamp(this.aircraftForm.endTime),
				}
				await Api.patchAircraft(pilotId, id, params)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.Aircraft.Message.UpdateSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideAircraftEditModal()
				this.fetchAircraftList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async fetchAircraftList() {
			try {
				const pilotId = this.$route.params.pilotId
				const res = await Api.fetchAircraftList(pilotId)
				this.pilot.basic.aircraft = res
			} catch (error) {
				errorHandler(error.code, error.message, this)
			}
		},
		// passport
		onClickEditPassport(index) {
			this.editFormIndex = index
			this.passportForm = {
				id: this.pilot.basic.passport[index].id,
				self: this.pilot.basic.passport[index].passportNumber,
				passportNumber: this.pilot.basic.passport[index].passportNumber,
				gender: this.pilot.basic.passport[index].gender,
				nationality: this.pilot.basic.passport[index].nationality,
				birthDate: getDate(this.pilot.basic.passport[index].dateOfBirth),
				birthPlace: this.pilot.basic.passport[index].placeOfBirth,
				issueDate: getDate(this.pilot.basic.passport[index].dateOfIssue),
				expirationDate: getDate(this.pilot.basic.passport[index].dateOfExpiration),
				remark: this.pilot.basic.passport[index].remark,
			}
			this.$refs.passportForm.resetFields()
			this.showPassportEditModal()
		},
		onClickAddPassport() {
			this.editFormIndex = -1
			this.passportForm = {
				self: null,
				passportNumber: null,
				gender: 1,
				nationality: '',
				birthDate: null,
				birthPlace: '',
				issueDate: null,
				expirationDate: null,
				remark: '',
			}
			this.$refs.passportForm.resetFields()
			this.showPassportEditModal()
		},
		onClickCancelPassport() {
			this.hidePassportEditModal()
		},
		onClickRemovePassport() {
			if (this.editFormIndex !== -1) this.deletePassport()
		},
		onClickConfirmPassport() {
			this.$refs.passportForm.validate((valid) => {
				if (valid) {
					if (this.editFormIndex === -1) this.addPassport()
					else this.patchPassport()
				}
			})
		},
		showPassportEditModal() {
			this.isPassportModalVisible = true
		},
		hidePassportEditModal() {
			this.isPassportModalVisible = false
		},
		async deletePassport() {
			try {
				this.isEditFormDeleteLoading = true
				const pilotId = this.$route.params.pilotId
				const id = this.passportForm.id
				await Api.deletePassport(pilotId, id)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.Passport.Message.DeleteSuccessfully'))
				this.isEditFormDeleteLoading = false
				this.hidePassportEditModal()
				this.fetchPassportList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormDeleteLoading = false
			}
		},
		async addPassport() {
			try {
				this.isEditFormConfirmLoading = true
				const pilotId = this.$route.params.pilotId
				const params = {
					passportNumber: this.passportForm.passportNumber,
					gender: this.passportForm.gender,
					nationality: this.passportForm.nationality,
					dateOfBirth: getTimestamp(this.passportForm.birthDate),
					placeOfBirth: this.passportForm.birthPlace,
					dateOfIssue: getTimestamp(this.passportForm.issueDate),
					dateOfExpiration: getTimestamp(this.passportForm.expirationDate),
					remark: this.passportForm.remark,
				}
				await Api.addPassport(pilotId, params)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.Passport.Message.AddSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hidePassportEditModal()
				this.fetchPassportList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async patchPassport() {
			try {
				this.isEditFormConfirmLoading = true
				const pilotId = this.$route.params.pilotId
				const id = this.passportForm.id
				const params = {
					passportNumber: this.passportForm.passportNumber,
					gender: this.passportForm.gender,
					nationality: this.passportForm.nationality,
					dateOfBirth: getTimestamp(this.passportForm.birthDate),
					placeOfBirth: this.passportForm.birthPlace,
					dateOfIssue: getTimestamp(this.passportForm.issueDate),
					dateOfExpiration: getTimestamp(this.passportForm.expirationDate),
					remark: this.passportForm.remark,
				}
				await Api.patchPassport(pilotId, id, params)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.Passport.Message.UpdateSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hidePassportEditModal()
				this.fetchPassportList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async fetchPassportList() {
			try {
				const pilotId = this.$route.params.pilotId
				const res = await Api.fetchPassportList(pilotId)
				this.pilot.basic.passport = res
			} catch (error) {
				errorHandler(error.code, error.message, this)
			}
		},
		// visa
		onClickEditVisa(index) {
			this.editFormIndex = index
			this.visaForm = {
				id: this.pilot.basic.visa[index].id,
				self: this.pilot.basic.visa[index].countryId,
				countryId: this.pilot.basic.visa[index].countryId,
				type: this.pilot.basic.visa[index].type,
				issueDate: getDate(this.pilot.basic.visa[index].dateOfIssue),
				duration: this.pilot.basic.visa[index].durationOfEntry,
			}
			this.$refs.visaForm.resetFields()
			this.showVisaEditModal()
		},
		onClickAddVisa() {
			this.editFormIndex = -1
			this.visaForm = {
				self: null,
				countryId: null,
				type: '',
				issueDate: null,
				duration: null,
			}
			this.$refs.visaForm.resetFields()
			this.showVisaEditModal()
		},
		onClickCancelVisa() {
			this.hideVisaEditModal()
		},
		onClickRemoveVisa() {
			if (this.editFormIndex !== -1) this.deleteVisa()
		},
		onClickConfirmVisa() {
			this.$refs.visaForm.validate((valid) => {
				if (valid) {
					if (this.editFormIndex === -1) this.addVisa()
					else this.patchVisa()
				}
			})
		},
		showVisaEditModal() {
			this.isVisaModalVisible = true
		},
		hideVisaEditModal() {
			this.isVisaModalVisible = false
		},
		async deleteVisa() {
			try {
				this.isEditFormDeleteLoading = true
				const pilotId = this.$route.params.pilotId
				const id = this.visaForm.id
				await Api.deleteVisa(pilotId, id)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.Visa.Message.DeleteSuccessfully'))
				this.isEditFormDeleteLoading = false
				this.hideVisaEditModal()
				this.fetchVisaList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormDeleteLoading = false
			}
		},
		async addVisa() {
			try {
				this.isEditFormConfirmLoading = true
				const pilotId = this.$route.params.pilotId
				const params = {
					countryId: this.visaForm.countryId,
					type: this.visaForm.type,
					dateOfIssue: getTimestamp(this.visaForm.issueDate),
					durationOfEntry: this.visaForm.duration,
				}
				await Api.addVisa(pilotId, params)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.Visa.Message.AddSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideVisaEditModal()
				this.fetchVisaList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async patchVisa() {
			try {
				this.isEditFormConfirmLoading = true
				const pilotId = this.$route.params.pilotId
				const id = this.visaForm.id
				const params = {
					countryId: this.visaForm.countryId,
					type: this.visaForm.type,
					dateOfIssue: getTimestamp(this.visaForm.issueDate),
					durationOfEntry: this.visaForm.duration,
				}
				await Api.patchVisa(pilotId, id, params)
				this.$Message.success(this.$t('messages.Pilot.Pane.Basic.Visa.Message.UpdateSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideVisaEditModal()
				this.fetchVisaList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async fetchVisaList() {
			try {
				const pilotId = this.$route.params.pilotId
				const res = await Api.fetchVisaList(pilotId)
				this.pilot.basic.visa = res
			} catch (error) {
				errorHandler(error.code, error.message, this)
			}
		},
		// flightExp
		onClickEditFlightExp(index) {
			this.editFormIndex = index
			this.flightExpForm = {
				id: this.pilot.flightExp[index].id,
				self: this.pilot.flightExp[index].aircraftTypeId,
				aircraftTypeId: this.pilot.flightExp[index].aircraftTypeId,
				totalHours: this.pilot.flightExp[index].totalHours,
				picHours: this.pilot.flightExp[index].picHours,
			}
			this.$refs.flightExpForm.resetFields()
			this.showFlightExpEditModal()
		},
		onClickAddFlightExp() {
			this.editFormIndex = -1
			this.flightExpForm = {
				self: null,
				aircraftTypeId: null,
				totalHours: null,
				picHours: null,
			}
			this.$refs.flightExpForm.resetFields()
			this.showFlightExpEditModal()
		},
		onClickCancelFlightExp() {
			this.hideFlightExpEditModal()
		},
		onClickRemoveFlightExp() {
			if (this.editFormIndex !== -1) this.deleteFlightExp()
		},
		onClickConfirmFlightExp() {
			this.$refs.flightExpForm.validate((valid) => {
				if (valid) {
					if (this.editFormIndex === -1) this.addFlightExp()
					else this.patchFlightExp()
				}
			})
		},
		showFlightExpEditModal() {
			this.isFlightExpModalVisible = true
		},
		hideFlightExpEditModal() {
			this.isFlightExpModalVisible = false
		},
		async deleteFlightExp() {
			try {
				this.isEditFormDeleteLoading = true
				const pilotId = this.$route.params.pilotId
				const id = this.flightExpForm.id
				await Api.deleteFlightExp(pilotId, id)
				this.$Message.success(this.$t('messages.Pilot.Pane.FlightExp.Message.DeleteSuccessfully'))
				this.isEditFormDeleteLoading = false
				this.hideFlightExpEditModal()
				this.fetchFlightExpList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormDeleteLoading = false
			}
		},
		async addFlightExp() {
			try {
				this.isEditFormConfirmLoading = true
				const pilotId = this.$route.params.pilotId
				const params = {
					aircraftTypeId: this.flightExpForm.aircraftTypeId,
					totalHours: this.flightExpForm.totalHours,
					picHours: this.flightExpForm.picHours,
				}
				await Api.addFlightExp(pilotId, params)
				this.$Message.success(this.$t('messages.Pilot.Pane.FlightExp.Message.AddSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideFlightExpEditModal()
				this.fetchFlightExpList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async patchFlightExp() {
			try {
				this.isEditFormConfirmLoading = true
				const pilotId = this.$route.params.pilotId
				const id = this.flightExpForm.id
				const params = {
					aircraftTypeId: this.flightExpForm.aircraftTypeId,
					totalHours: this.flightExpForm.totalHours,
					picHours: this.flightExpForm.picHours,
				}
				await Api.patchFlightExp(pilotId, id, params)
				this.$Message.success(this.$t('messages.Pilot.Pane.FlightExp.Message.UpdateSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideFlightExpEditModal()
				this.fetchFlightExpList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async fetchFlightExpList() {
			try {
				const pilotId = this.$route.params.pilotId
				const res = await Api.fetchFlightExpList(pilotId)
				this.pilot.flightExp = res
			} catch (error) {
				errorHandler(error.code, error.message, this)
			}
		},
		// document
		onUploadDocumentImg(url) {
			this.documentForm.imgUrl = url
		},
		onUploadBlurImg(url) {
			this.documentForm.blurImgUrl = url
		},
		onClickEditDocument(index) {
			this.editFormIndex = index
			this.documentForm = {
				id: this.pilot.documents[index].id,
				title: this.pilot.documents[index].title || '',
				type: this.pilot.documents[index].type || '',
				description: this.pilot.documents[index].description || '',
				imgUrl: this.pilot.documents[index].imageUrl || '',
				blurImgUrl: this.pilot.documents[index].blurImageUrl || '',
			}
			this.$refs.documentForm.resetFields()
			this.showDocumentEditModal()
		},
		onClickAddDocument() {
			this.editFormIndex = -1
			this.documentForm = {
				titile: '',
				type: null,
				description: '',
				imgUrl: '',
				blurImgUrl: '',
			}
			this.$refs.documentForm.resetFields()
			this.showDocumentEditModal()
		},
		onClickCancelDocument() {
			this.hideDocumentEditModal()
		},
		onClickRemoveDocument() {
			if (this.editFormIndex !== -1) this.deleteDocument()
		},
		onClickConfirmDocument() {
			this.$refs.documentForm.validate((valid) => {
				if (valid) {
					if (this.editFormIndex === -1) this.addDocument()
					else this.patchDocument()
				}
			})
		},
		showDocumentEditModal() {
			this.isDocumentModalVisible = true
		},
		hideDocumentEditModal() {
			this.isDocumentModalVisible = false
		},
		async deleteDocument() {
			try {
				this.isEditFormDeleteLoading = true
				const pilotId = this.$route.params.pilotId
				const id = this.documentForm.id
				await Api.deleteDocument(pilotId, id)
				this.$Message.success(this.$t('messages.Pilot.Pane.Documents.Message.DeleteSuccessfully'))
				this.isEditFormDeleteLoading = false
				this.hideDocumentEditModal()
				this.fetchDocumentList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormDeleteLoading = false
			}
		},
		async addDocument() {
			try {
				this.isEditFormConfirmLoading = true
				const pilotId = this.$route.params.pilotId
				const params = {
					title: this.documentForm.title,
					type: this.documentForm.type,
					description: this.documentForm.description,
					imageUrl: this.documentForm.imgUrl,
					blurImageUrl: this.documentForm.blurImgUrl,
				}
				await Api.addDocument(pilotId, params)
				this.$Message.success(this.$t('messages.Pilot.Pane.Documents.Message.AddSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideDocumentEditModal()
				this.fetchDocumentList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async patchDocument() {
			try {
				this.isEditFormConfirmLoading = true
				const pilotId = this.$route.params.pilotId
				const id = this.documentForm.id
				const params = {
					title: this.documentForm.title,
					type: this.documentForm.type,
					description: this.documentForm.description,
					imageUrl: this.documentForm.imgUrl,
					blurImageUrl: this.documentForm.blurImgUrl,
				}
				await Api.patchDocument(pilotId, id, params)
				this.$Message.success(this.$t('messages.Pilot.Pane.Documents.Message.UpdateSuccessfully'))
				this.isEditFormConfirmLoading = false
				this.hideDocumentEditModal()
				this.fetchDocumentList()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isEditFormConfirmLoading = false
			}
		},
		async fetchDocumentList() {
			try {
				const pilotId = this.$route.params.pilotId
				const res = await Api.fetchDocumentList(pilotId)
				this.pilot.documents = res
			} catch (error) {
				errorHandler(error.code, error.message, this)
			}
		},

		// availability
		onClickChangeMonth(start, end, firstDayOfMonth) {
			this.currentDate = firstDayOfMonth
		},

		async fetchPilotDetail() {
			try {
				this.isPageLoading = true
				const pilotId = this.$route.params.pilotId
				const pilotRes = await Api.fetchPilotDetail(pilotId)
				const pilot = {
					isVerified: pilotRes.isVerified || false,
					basic: {
						general: {
							photoUrl: pilotRes.photoUrl || '',
							firstName: pilotRes.firstName || '',
							lastName: pilotRes.lastName || '',
							staffNumber: pilotRes.staffNumber || '',
							birthTime: pilotRes.birthDate || null,
							birthDate: getDate(pilotRes.birthDate) || null,
							nationalityId: pilotRes.nationalityId || null,
							language: pilotRes.language || '',
							nearestAirportId: pilotRes.nearestAirportId || null,
							currentLocation: {
								longitude: pilotRes.longitude || null,
								latitude: pilotRes.latitude || null,
								lastUpdateTime: pilotRes.lastLocationTime || null,
							},
							health: pilotRes.health || '',
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
							email: pilotRes.email || '',
							phonePrimary: pilotRes.phonePrimary || '',
							phoneAlternative: pilotRes.phoneAlternative || '',
							address1: pilotRes.homeAddress1 || '',
							address2: pilotRes.homeAddress2 || '',
							city: pilotRes.city || '',
							state: pilotRes.state || '',
							country: pilotRes.country || '',
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
				this.isPageLoading = false
				this.setPilotLocation()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isPageLoading = false
			}
		},
		async setPilotLocation() {
			const location = await getGeoLocation(this.pilot.basic.general.currentLocation.latitude, this.pilot.basic.general.currentLocation.longitude)
			this.$set(this.pilot.basic.general.currentLocation, 'location', location)
		},
		async patchPilot() {
			try {
				this.isSaveLoading = true
				const id = this.$route.params.pilotId
				const pilot = {
					photoUrl: this.pilot.basic.general.photoUrl,
					firstName: this.pilot.basic.general.firstName,
					lastName: this.pilot.basic.general.lastName,
					staffNumber: this.pilot.basic.general.staffNumber,
					birthDate: getTimestamp(this.pilot.basic.general.birthDate),
					nationalityId: this.pilot.basic.general.nationalityId,
					language: this.pilot.basic.general.language,
					nearestAirportId: this.pilot.basic.general.nearestAirportId,
					health: this.pilot.basic.general.health,
					basicScore: this.pilot.basic.rating.performanceRate,
					promotionScore: this.pilot.basic.rating.promotionRate,
					pilotRate: this.pilot.basic.payRate.pilotRate,
					totalFlightHours: this.pilot.basic.flightHours.totalFlightHours,
					totalPicHours: this.pilot.basic.flightHours.totalPicHours,
					totalJetHours: this.pilot.basic.flightHours.totalJetHours,
					email: this.pilot.basic.contact.email,
					phonePrimary: this.pilot.basic.contact.phonePrimary,
					phoneAlternative: this.pilot.basic.contact.phoneAlternative,
					homeAddress1: this.pilot.basic.contact.address1,
					homeAddress2: this.pilot.basic.contact.address2,
					city: this.pilot.basic.contact.city,
					state: this.pilot.basic.contact.state,
					country: this.pilot.basic.contact.country,
					remark: this.pilot.basic.remark.remark,
				}
				await Api.patchPilot(id, pilot)
				this.isSaveLoading = false
				this.backToView()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isSaveLoading = false
			}
		},
		backToView() {
			this.$router.go(-1)
		},
		generateBreadcrumb() {
			const pilotId = this.$route.params.pilotId
			this.breadcrumbs = [
				{ name: this.$t('messages.Pilot.Breadcrumb'), path: '/pilots' },
				{ name: `${this.pilot.basic.general.firstName} ${this.pilot.basic.general.lastName}`, path: `/pilots/${pilotId}` },
				{ name: this.$t('messages.Pilot.Pane.Modify.Breadcrumb'), path: `/pilots/${pilotId}/modify` },
			]
			Bus.$emit('updateBreadcrumbs', this.breadcrumbs)
		},
		initPage() {
			this.fetchPilotDetail()
		},
	},
}
</script>

<style lang="scss">
@import "../../styles/theme.scss";
#pilot-modify {
	height: 100%;
	.pane {
		height: 100%;
		min-height: 100%;
		margin-bottom: 20px;
	}
	.pilot-pane-verified {
		position: absolute;
		right: 0;
		width: 20%;
		top: -30px;
	}
	.pane-main {
		min-height: 100%;
	}
	.pane-sub {
		padding: 0 50px;
	}
	.pilot-modify-tabs {
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
