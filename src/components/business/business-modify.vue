<template>
	<section id="business-modify">
		<Row class-name="pane">
			<Col class-name="pane-main" :span="18">
				<Card class="test-pane" :padding="30" :bordered="false" dis-hover>
					<Row type="flex" justify="space-between">
						<Col :span="11">
							<InfoCard title="info-card: text<p>">
								<Form label-position="left">
									<FormItem label="Status" :label-width="100">
										<p>{{value}}</p>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard title="info-card: checkbox">
								<Form label-position="left">
									<FormItem label="Status" :label-width="100">
										<Checkbox v-model="check">{{value}}</Checkbox>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard title="info-card: remark<p>">
								<Form label-position="left">
									<FormItem label="Status" :label-width="100">
										<p>{{value}}</p>
									</FormItem>
								</Form>
								<p slot="remark">
									I am wrong, I am really wrong. I should not be married from the begining. If I am not married, my husband will never die. If my husband haven't died......
								</p>
							</InfoCard>
							<InfoCard title="info-card: text<p>">
								<Form label-position="left">
									<FormItem label="Status" :label-width="100">
										<Tag>{{value}}</Tag>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard title="info-card: editable-duplicate-form" editable>
								<div class="dynamic-form-wrap">
									<DynamicForm v-for="(item, index) of duplicateForm" :index="index" :key="index" @on-edit="onClickEdit">
										<Form label-position="left" :label-width="100">
											<FormItem label="Label">
												<Input v-model="duplicateForm[index]" type="text"></Input>
											</FormItem>
											<FormItem label="Label">
												<p>{{item}}</p>
											</FormItem>
										</Form>
									</DynamicForm>
									<a href="javascript:void(0);" @click.prevent="onClickAddNew">Add New</a>
								</div>
							</InfoCard>
							<InfoCard title="geo location">
								<Form label-position="left" :label-width="100">
									<FormItem label="LAT">
										<Input v-model="lat"></Input>
									</FormItem>
									<FormItem label="LNG">
										<Input v-model="lng"></Input>
									</FormItem>
									<FormItem label="Location">
										<p>{{location}}</p>
									</FormItem>
								</Form>
								<a href="javascript:void(0);" @click.prevent="onClickGetLocation">Get Location</a>
							</InfoCard>
						</Col>
						<Col :span="11">
							<InfoCard title="info-card: datepicker">
								<Form label-position="left">
									<FormItem label="DatePicker" :label-width="100">
										<DatePicker v-model="date"></DatePicker>
									</FormItem>
									<FormItem label="Date" :label-width="100">
										<p>{{date}}</p>
										<p>{{date.getTime()}}</p>
									</FormItem>
									<FormItem label="UTC" :label-width="100">
										<p>{{getUTCTimestamp(date)}}</p>
									</FormItem>
									<FormItem label="Local" :label-width="100">
										<p>{{getLocalDate(getUTCTimestamp(date))}}</p>
									</FormItem>
									<FormItem label="DatePicker" :label-width="100">
										<DatePicker :value="getLocalDate(getUTCTimestamp(date))"></DatePicker>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard title="info-card: input">
								<Form label-position="left">
									<FormItem label="Status" :label-width="100">
										<Input type="text" v-model="value" :placeholder="value"></Input>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard title="info-card: select">
								<Form label-position="left">
									<FormItem label="Status" :label-width="100">
										<Select v-model="value" :placeholder="value">
											<Option :value="value">{{value}}</Option>
										</Select>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard title="info-card: basic-selector">
								<Form label-position="left">
									<FormItem label="Airport" :label-width="100">
										<BasicSelector v-model="basicInfo.airportId" mode="airport"></BasicSelector>
									</FormItem>
									<FormItem label="Airport ID" :label-width="100">
										<p>{{basicInfo.airportId}}</p>
									</FormItem>
									<FormItem label="Aircraft" :label-width="100">
										<BasicSelector v-model="basicInfo.aircraftTypeId" mode="aircraft"></BasicSelector>
									</FormItem>
									<FormItem label="Aircraft ID" :label-width="100">
										<p>{{basicInfo.aircraftTypeId}}</p>
									</FormItem>
									<FormItem label="Arp" :label-width="100">
										<BasicSelector v-model="basicInfo.arpId" mode="arp"></BasicSelector>
									</FormItem>
									<FormItem label="Arp ID" :label-width="100">
										<p>{{basicInfo.arpId}}</p>
									</FormItem>
									<FormItem label="Country" :label-width="100">
										<BasicSelector v-model="basicInfo.countryId" mode="country"></BasicSelector>
									</FormItem>
									<FormItem label="Country ID" :label-width="100">
										<p>{{basicInfo.countryId}}</p>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard title="info-card: image">
								<Form label-position="left" :label-width="100">
									<FormItem label="Avatar">
										<p><ImageControl :src="generateImgUrl(imgUrl)" :default="defaultImgUrl"></ImageControl></p>
									</FormItem>
									<FormItem>
										<p><ImgUploader buttonText="Upload Image" :imgUrl="generateImgUrl(imgUrl)" :defaultUrl="defaultImgUrl" @on-upload="onUpload"></ImgUploader></p>
									</FormItem>
									<FormItem label="Url">
										<p>{{imgUrl}}</p>
									</FormItem>
								</Form>
							</InfoCard>
							<Calendar :events="testEvents" :firstDay="0" locale="en"></Calendar>
						</Col>
					</Row>
				</Card>
			</Col>
			<Col class-name="pane-sub" :span="6">
				<ActionCard>
					<div slot="body">
						<div><Button type="text" @click="onClickContactOrderParticipants">Contact Order Participants</Button></div>
						<div><Button type="text" @click="onClickModifyOrder">Modify Order</Button></div>
						<div><Button type="text" @click="onClickModifyPilotProfile">Modify Pilot Profile</Button></div>
						<div><Button type="text" @click="onClickModifyOperatorProfile">Modify Operator Profile</Button></div>
					</div>
					<div slot="footer">
						<Button type="error" @click="onClickDeleteThisOrder">DeleteThisOrder</Button>
					</div>
				</ActionCard>
			</Col>
		</Row>

		<Modal v-model="isEditModalVisible">
			<p slot="header">{{editFormIndex === -1 ? 'New' : 'Edit'}}</p>
			<Form label-position="left" :label-width="100">
				<FormItem label="Label">
					<Input v-model="editForm" type="text"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button v-if="editFormIndex !== -1" type="error" @click="onClickRemove">Delete</Button>
				<Button type="default" @click="onClickCancel">Cancel</Button>
				<Button type="primary" @click="onClickConfirm">Confirm</Button>
			</div>
		</Modal>

	</section>
</template>

<script>
import defaultImgUrl from '../../../src/assets/imgs/avatar-placeholder.png'
import { generateImgUrl, getUTCTimestamp, getLocalDate, getGeoLocation } from '../../utils'

export default {
	data() {
		return {
			check: false,
			date: new Date(),
			value: 'Placeholder',
			imgUrl: '',
			defaultImgUrl,
			basicInfo: {
				airportId: 1,
				aircraftTypeId: 1,
				arpId: 1,
				countryId: 1,
			},
			duplicateForm: [
				'content',
				'content',
				'content',
			],
			isEditModalVisible: false,
			editFormIndex: -1,
			editForm: '',

			testEvents: [
				{
					title: 'test event title',
					start: '2017-10-7',
					end: '2017-10-17',
				},
			],

			lat: 31.146661,
			lng: 121.593699,
			location: '',
		}
	},
	methods: {
		onClickContactOrderParticipants() {
		},
		onClickModifyOrder() {
		},
		onClickModifyPilotProfile() {
		},
		onClickModifyOperatorProfile() {
		},
		onSwitch() {
			this.check = !this.check
		},
		onClickDeleteThisOrder() {
		},
		onClickEdit(index) {
			this.editFormIndex = index
			this.editForm = this.duplicateForm[index]
			this.isEditModalVisible = true
		},
		onClickAddNew() {
			this.editFormIndex = -1
			this.editForm = ''
			this.isEditModalVisible = true
		},
		onClickCancel() {
			this.isEditModalVisible = false
		},
		onClickRemove() {
			if (this.editFormIndex !== -1) this.duplicateForm.splice(this.editFormIndex, 1)
			this.isEditModalVisible = false
		},
		onClickConfirm() {
			if (this.editFormIndex === -1) this.duplicateForm.push(this.editForm)
			else this.duplicateForm[this.editFormIndex] = this.editForm
			this.isEditModalVisible = false
		},
		onUpload(url) {
			this.imgUrl = url
		},
		onClickGetLocation() {
			this.getLocation()
		},
		generateImgUrl(url) {
			return generateImgUrl(url)
		},
		getUTCTimestamp(date) {
			return getUTCTimestamp(date)
		},
		getLocalDate(utcTimestamp) {
			return getLocalDate(utcTimestamp)
		},
		async getLocation() {
			this.location = await getGeoLocation(this.lat, this.lng)
		},
	},
}
</script>

<style lang="scss">
#business-modify{
	height: 100%;
	.pane{
		height: 100%;
		min-height: 100%;
		margin-bottom: 20px;
	}
	.pane-main{
		min-height: 100%;
	}
	.pane-sub{
		padding: 0 50px;
	}
	.test-pane{
		margin-bottom: 30px;
	}
}

</style>
