<template>
	<section>
		<Row>
			<Col :span="16" class="padding-right-5">
				<Card>
					<Spin v-if="profile.isLoading" size="large" fix></Spin>
					<p slot="title">借款人信息</p>
					<div v-if="isEditVisible" slot="extra">
						<div v-if="!profile.isEditable">
							<Button type="text" @click="onClickEditProfile">编辑</Button>
						</div>
						<div v-else>
							<Button type="text" @click="onClickResetProfile">重置</Button>
							<Button type="text" @click="onClickSaveProfile" :loading="profile.isSaving">保存</Button>
						</div>
					</div>
					<Form ref="profileForm" :model="profile.form" :rules="profile.rules" label-position="left" :label-width="profile.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="姓名">
								<p v-if="!profile.isEditable">{{profile.form.realName || '-'}}</p>
								<Input v-else v-model="profile.form.realName"/>
							</FormItem></Col>
							<Col :span="8"><FormItem label="性别">
								<p v-if="!profile.isEditable">{{debtorGender}}</p>
								<RadioGroup v-else v-model="profile.form.gender">
									<Radio :label="Gender.Male">男</Radio>
									<Radio :label="Gender.Female">女</Radio>
								</RadioGroup>
							</FormItem></Col>
							<Col :span="8"><FormItem label="出生日期">
								<p v-if="!profile.isEditable">{{debtorBirthday}}</p>
								<DatePicker v-else v-model="profile.form.birthday"></DatePicker>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="是否有车">
								<p v-if="!profile.isEditable">{{debtorIsCarOwner}}</p>
								<i-switch v-else v-model="profile.form.isCarOwner"><span slot="open">是</span><span slot="close">否</span></i-switch>
							</FormItem></Col>
							<Col :span="8"><FormItem label="联系方式">
								<p v-if="!profile.isEditable">{{profile.form.primaryNumber || '-'}}</p>
								<Input v-else v-model="profile.form.primaryNumber"/>
							</FormItem></Col>
							<Col :span="8"><FormItem label="联系方式II">
								<p v-if="!profile.isEditable">{{profile.form.alternativeNumber || '-'}}</p>
								<Input v-else v-model="profile.form.alternativeNumber"/>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<Spin v-if="identify.isLoading" size="large" fix></Spin>
					<p slot="title">实名信息</p>
					<div v-if="isEditVisible" slot="extra">
						<div v-if="!identify.isEditable">
							<Button type="text" @click="onClickEditIdentify">编辑</Button>
						</div>
						<div v-else>
							<Button type="text" @click="onClickResetIdentify">重置</Button>
							<Button type="text" @click="onClickSaveIdentify" :loading="identify.isSaving">保存</Button>
						</div>
					</div>
					<Form ref="identifyForm" :model="identify.form" :rules="identify.rules" label-position="left" :label-width="identify.labelWidth" inline>
						<Row>
							<Col :span="12"><FormItem label="身份证号码">
								<p v-if="!identify.isEditable">{{identify.form.idNumber || '-'}}</p>
								<Input v-else v-model="identify.form.idNumber"/>
							</FormItem></Col>
							<Col :span="12"><FormItem label="户籍所在地">
								<p v-if="!identify.isEditable">{{identify.form.location || '-'}}</p>
								<Input v-else v-model="identify.form.location"/>
							</FormItem></Col>
						</Row>
						<Row class="margin-top-20">
							<Col :span="12"><FormItem label="身份证正面">
								<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="正面模糊">
								<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="身份证背面">
								<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="背面模糊">
								<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">信用信息</p>
					<Form ref="creditForm" :model="credit.form" :rules="credit.rules" label-position="left" :label-width="credit.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="工作地点"></FormItem></Col>
							<Col :span="8"><FormItem label="常住地址"></FormItem></Col>
							<Col :span="8"><FormItem label="学历状况"></FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="月稳定收入"></FormItem></Col>
							<Col :span="8"><FormItem label="年稳定收入"></FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="车产认证"></FormItem></Col>
							<Col :span="8"><FormItem label="房产认证"></FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="申请次数"></FormItem></Col>
							<Col :span="8"><FormItem label="成功次数"></FormItem></Col>
							<Col :span="8"><FormItem label="还清次数"></FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="逾期次数"></FormItem></Col>
							<Col :span="8"><FormItem label="严重逾期次数"></FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
			<Col :span="8" class="padding-left-5">
				<Card>
					<p slot="title">控制台</p>
					<Row>
						<Col :span="4">
							<Button long>取消</Button>
						</Col>
						<Col :span="4" :offset="1">
							<Button type="primary" long>提交</Button>
						</Col>
					</Row>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">贷款查看</p>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">账户管理</p>
					<!-- <Table :data="investmentRecord.data" :columns="investmentRecord.columns"></Table> -->
				</Card>
			</Col>
		</Row>
	</section>
</template>

<script>
import { Debtor } from '../../models/data'
import util from '../../libs/util'
import Enum from '../../models/enum'

export default {
	name: 'debtors_new',
	data() {
		const blank = {
			debtor: new Debtor(),
		}
		return {
			Gender: Enum.Gender,
			isEditVisible: true,
			debtor: blank.debtor,
			profile: {
				isEditable: false,
				isLoading: false,
				isSaving: false,
				labelWidth: 75,
				form: {
					realName: blank.debtor.realName,
					gender: blank.debtor.gender,
					birthday: blank.debtor.birthday,
					isCarOwner: blank.debtor.isCarOwner,
					primaryNumber: blank.debtor.primaryNumber,
					alternativeNumber: blank.debtor.alternativeNumber,
				},
				rules: {},
			},
			identify: {
				isEditable: false,
				isLoading: false,
				isSaving: false,
				labelWidth: 75,
				form: {
					idNumber: blank.debtor.idNumber,
					location: blank.debtor.location,
					frontImageUrl: blank.debtor.frontImageUrl,
					frontBlurImageUrl: blank.debtor.frontBlurImageUrl,
					backImageUrl: blank.debtor.backImageUrl,
					backBlurImageUrl: blank.debtor.backBlurImaegUrl,
				},
			},
			credit: {
				isEditable: false,
				isLoading: false,
				isSaving: false,
				labelWidth: 100,
				form: {
					workPlace: blank.debtor.workPlace,
					address: blank.debtor.address,
					education: blank.debtor.education,
					monthlyStableIncome: blank.debtor.monthlyStableIncome,
					yearlyStableIncome: blank.debtor.yearlyStableIncome,
					hasCar: blank.debtor.hasCar,
					hasHouse: blank.debtor.hasHouse,
				},
			},
		}
	},
	mounted() {
	},
	computed: {
		debtorGender() {
			if (this.profile.form.gender) return util.getGender(this.profile.form.gender, this)
			return '-'
		},
		debtorBirthday() {
			if (this.profile.form.birthday) return util.formatBirthday(this.profile.form.birthday, this)
			return '-'
		},
		debtorIsCarOwner() {
			if (this.profile.form.isCarOwner || this.profile.form.isCarOwner === false) return `${this.profile.form.isCarOwner ? '是' : '否'}`
			return '-'
		},
	},
	methods: {
		// profile
		editProfile() {
			this.profile.isEditable = true
		},
		uneditProfile() {
			this.profile.isEditable = false
		},
		profileLoading() {
			this.profile.isLoading = true
		},
		profileUnloading() {
			this.profile.isLoading = false
		},
		profileSaving() {
			this.profile.isSaving = true
		},
		profileUnsaving() {
			this.profile.isSaving = false
		},
		initProfileForm() {
			this.profile.form = {
				realName: this.debtor.realName,
				gender: this.debtor.gender,
				birthday: this.debtor.birthday,
				isCarOwner: this.debtor.isCarOwner,
				primaryNumber: this.debtor.primaryNumber,
				alternativeNumber: this.debtor.alternativeNumber,
			}
		},
		onClickEditProfile() {
			this.editProfile()
		},
		onClickResetProfile() {
			this.initProfileForm()
			this.uneditProfile()
		},
		onClickSaveProfile() {
			this.uneditProfile()
		},
		// identify
		editIdentify() {
			this.identify.isEditable = true
		},
		uneditIdentify() {
			this.identify.isEditable = false
		},
		identifyLoading() {
			this.identify.isLoading = true
		},
		identifyUnloading() {
			this.identify.isLoading = false
		},
		identifySaving() {
			this.identify.isSaving = true
		},
		identifyUnsaving() {
			this.identify.isSaving = false
		},
		initIdentifyForm() {
			this.identify.form = {
				idNumber: this.debtor.idNumber,
				location: this.debtor.location,
				frontImageUrl: this.debtor.frontImageUrl,
				frontBlurImageUrl: this.debtor.frontBlurImageUrl,
				backImageUrl: this.debtor.backImageUrl,
				backBlurImageUrl: this.debtor.backBlurImaegUrl,
			}
		},
		onClickEditIdentify() {
			this.editIdentify()
		},
		onClickResetIdentify() {
			this.initIdentifyForm()
			this.uneditIdentify()
		},
		onClickSaveIdentify() {
			this.uneditIdentify()
		},

		onClickImage() {
			console.log('upload img')
		},
	},
}
</script>

<style lang="less">
@import '../../styles/common.less';
</style>
