<template>
	<section>
		<Row>
			<Col :span="16" class="padding-right-5">
				<Card>
					<Spin v-if="profile.isLoading" size="large" fix></Spin>
					<p slot="title">借款人信息</p>
					<div v-show="isEditable && isEditVisible" slot="extra">
						<div v-show="!profile.isEditable">
							<Button type="text" @click="onClickEditProfile">编辑</Button>
						</div>
						<div v-show="profile.isEditable">
							<Button type="text" @click="onClickResetProfile">重置</Button>
							<Button type="text" @click="onClickSubmitProfile" :loading="profile.isSubmitting" :disabled="identify.isSubmitting || credit.isSubmitting">提交</Button>
						</div>
					</div>
					<Form ref="profileForm" :model="profile.form" :rules="profile.rules" label-position="left" :label-width="profile.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="姓名" prop="realName">
								<p v-if="!profile.isEditable">{{profile.form.realName || '-'}}</p>
								<Input v-else v-model="profile.form.realName"/>
							</FormItem></Col>
							<Col :span="8"><FormItem label="性别" prop="gender">
								<p v-if="!profile.isEditable">{{util.getGender(this, profile.form.gender) || '-'}}</p>
								<RadioGroup v-else v-model="profile.form.gender">
									<Radio :label="Enum.Gender.Male">男</Radio>
									<Radio :label="Enum.Gender.Female">女</Radio>
								</RadioGroup>
							</FormItem></Col>
							<Col :span="8"><FormItem label="出生日期" prop="birthDate">
								<p v-if="!profile.isEditable">{{util.formatBirthday(this, this.profile.form.birthDate) || '-'}}</p>
								<DatePicker v-else v-model="profile.form.birthDate"></DatePicker>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="联系方式" prop="primaryNumber">
								<p v-if="!profile.isEditable">{{profile.form.primaryNumber || '-'}}</p>
								<Input v-else v-model="profile.form.primaryNumber"/>
							</FormItem></Col>
							<Col :span="8"><FormItem label="联系方式II" prop="alternativeNumber">
								<p v-if="!profile.isEditable">{{profile.form.alternativeNumber || '-'}}</p>
								<Input v-else v-model="profile.form.alternativeNumber"/>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<Spin v-if="identify.isLoading" size="large" fix></Spin>
					<p slot="title">实名信息</p>
					<div v-show="isEditable && isEditVisible" slot="extra">
						<div v-show="!identify.isEditable">
							<Button type="text" @click="onClickEditIdentify">编辑</Button>
						</div>
						<div v-show="identify.isEditable">
							<Button type="text" @click="onClickResetIdentify">重置</Button>
							<Button type="text" @click="onClickSubmitIdentify" :loading="identify.isSubmitting" :disabled="profile.isSubmitting || credit.isSubmitting">提交</Button>
						</div>
					</div>
					<Form ref="identifyForm" :model="identify.form" :rules="identify.rules" label-position="left" :label-width="identify.labelWidth" inline>
						<Row>
							<Col :span="12"><FormItem label="身份证号码" prop="idNumber">
								<p v-if="!identify.isEditable">{{identify.form.idNumber || '-'}}</p>
								<Input v-else v-model="identify.form.idNumber"/>
							</FormItem></Col>
							<Col :span="12"><FormItem label="户籍所在地" prop="location">
								<p v-if="!identify.isEditable">{{identify.form.location || '-'}}</p>
								<Input v-else v-model="identify.form.location"/>
							</FormItem></Col>
						</Row>
						<Row class="margin-top-20">
							<Col :span="12"><FormItem label="身份证正面" prop="frontImageUrl">
								<Row><Col :span="16">
									<SafeImg v-if="!identify.isEditable" :src="util.generateImageUrl(identify.form.frontImageUrl)" type="certificate-md" viewable></SafeImg>
									<ImageUploader v-else v-model="identify.form.frontImageUrl" :type="Enum.ImageType.IdCard"></ImageUploader>
								</Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="正面模糊" prop="frontBlurImageUrl">
								<Row><Col :span="16">
									<SafeImg v-if="!identify.isEditable" :src="util.generateImageUrl(identify.form.frontBlurImageUrl)" type="certificate-md" viewable></SafeImg>
									<ImageUploader v-else v-model="identify.form.frontBlurImageUrl" :type="Enum.ImageType.IdCard"></ImageUploader>
								</Col></Row>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="身份证背面" prop="backImageUrl">
								<Row><Col :span="16">
									<SafeImg v-if="!identify.isEditable" :src="util.generateImageUrl(identify.form.backImageUrl)" type="certificate-md" viewable></SafeImg>
									<ImageUploader v-else v-model="identify.form.backImageUrl" :type="Enum.ImageType.IdCard"></ImageUploader>
								</Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="背面模糊" prop="backBlurImageUrl">
								<Row><Col :span="16">
									<SafeImg v-if="!identify.isEditable" :src="util.generateImageUrl(identify.form.backBlurImageUrl)" type="certificate-md" viewable></SafeImg>
									<ImageUploader v-else v-model="identify.form.backBlurImageUrl" :type="Enum.ImageType.IdCard"></ImageUploader>
								</Col></Row>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<Spin v-if="credit.isLoading" size="large" fix></Spin>
					<p slot="title">信用信息</p>
					<div v-show="isEditable && isEditVisible" slot="extra">
						<div v-show="!credit.isEditable">
							<Button type="text" @click="onClickEditCredit">编辑</Button>
						</div>
						<div v-show="credit.isEditable">
							<Button type="text" @click="onClickResetCredit">重置</Button>
							<Button type="text" @click="onClickSubmitCredit" :loading="credit.isSubmitting" :disabled="identify.isSubmitting || identify.isSubmitting">提交</Button>
						</div>
					</div>
					<Form ref="creditForm" :model="credit.form" :rules="credit.rules" label-position="left" :label-width="credit.labelWidth" inline>
						<Row>
							<Col :span="24"><FormItem label="工作地点" prop="workPlace">
								<p v-if="!credit.isEditable">{{credit.form.workPlace || '-'}}</p>
								<Input v-else v-model="credit.form.workPlace"/>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="24"><FormItem label="常住地址" prop="address">
								<p v-if="!credit.isEditable">{{credit.form.address || '-'}}</p>
								<Input v-else v-model="credit.form.address"/>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="学历状况" prop="education">
								<p v-if="!credit.isEditable">{{credit.form.education || '-'}}</p>
								<Input v-else v-model="credit.form.education"/>
							</FormItem></Col>
							<Col :span="8"><FormItem label="月稳定收入" prop="monthlyStableIncome">
								<p v-if="!credit.isEditable">{{credit.form.monthlyStableIncome || '-'}}</p>
								<Input v-else v-model="credit.form.monthlyStableIncome"/>
							</FormItem></Col>
							<Col :span="8"><FormItem label="年稳定收入" prop="yearlyStableIncome">
								<p v-if="!credit.isEditable">{{credit.form.yearlyStableIncome || '-'}}</p>
								<Input v-else v-model="credit.form.yearlyStableIncome"/>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="车产认证" prop="hasCar">
								<p v-if="!credit.isEditable">{{debtorHasCar}}</p>
								<i-switch v-else v-model="credit.form.hasCar"><span slot="open">是</span><span slot="close">否</span></i-switch>
							</FormItem></Col>
							<Col :span="8"><FormItem label="房产认证" prop="hasHouse">
								<p v-if="!credit.isEditable">{{debtorHasHouse}}</p>
								<i-switch v-else v-model="credit.form.hasHouse"><span slot="open">是</span><span slot="close">否</span></i-switch>
							</FormItem></Col>
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
						<Row type="flex" justify="space-between">
							<Col>
								<div v-if="isEditable && !profile.isLoading && !identify.isLoading && !credit.isLoading">
									<div v-if="!isEditVisible">
										<Button class="margin-right-10" type="primary" @click="onClickUnlock">解锁</Button>
										<Button class="margin-right-10" type="error" @click="onClickDeleteDebtor" :loading="isDeleting">删除</Button>
									</div>
									<div v-else>
										<Button class="margin-right-10" @click="onClickLock">取消</Button>
									</div>
								</div>
							</Col>
							<Col>
								<Button @click="onClickRefreshDebtor" :loading="profile.isLoading || identify.isLoading || credit.isLoading">刷新</Button>
							</Col>
						</Row>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">贷款查看</p>
					<Table :data="loans.data" :columns="loans.columns" :loading="loans.list.isLoading" @on-row-click="onClickLoansRow"></Table>
				</Card>
			</Col>
		</Row>
	</section>
</template>

<script>
import { Debtor } from '../../models/data'
import util from '../../libs/util'
import api from '../../libs/api'
import Enum from '../../models/enum'

export default {
	name: 'debtor_detail',
	data() {
		const blank = {
			debtor: new Debtor(),
		}
		return {
			Enum,
			util,
			isEditable: true,
			isEditVisible: false,
			isSubmitting: false,
			isDeleting: false,
			debtor: blank.debtor,
			profile: {
				isEditable: false,
				isLoading: false,
				isSubmitting: false,
				labelWidth: 75,
				form: {
					realName: blank.debtor.profile.realName,
					gender: blank.debtor.profile.gender,
					birthDate: util.timestampToDate(this, blank.debtor.profile.birthday),
					primaryNumber: blank.debtor.profile.primaryNumber,
					alternativeNumber: blank.debtor.profile.alternativeNumber,
				},
				rules: {},
			},
			identify: {
				isEditable: false,
				isLoading: false,
				isSubmitting: false,
				labelWidth: 100,
				form: {
					idNumber: blank.debtor.identify.idNumber,
					location: blank.debtor.identify.location,
					frontImageUrl: blank.debtor.identify.frontImageUrl,
					frontBlurImageUrl: blank.debtor.identify.frontBlurImageUrl,
					backImageUrl: blank.debtor.identify.backImageUrl,
					backBlurImageUrl: blank.debtor.identify.backBlurImageUrl,
				},
			},
			credit: {
				isEditable: false,
				isLoading: false,
				isSubmitting: false,
				labelWidth: 100,
				form: {
					workPlace: blank.debtor.credit.workPlace,
					address: blank.debtor.credit.address,
					education: blank.debtor.credit.education,
					monthlyStableIncome: blank.debtor.credit.monthlyStableIncome,
					yearlyStableIncome: blank.debtor.credit.yearlyStableIncome,
					hasCar: blank.debtor.credit.hasCar,
					hasHouse: blank.debtor.credit.hasHouse,
				},
			},
			loans: {
				list: {
					isLoading: false,
					pagesize: 10,
					page: 0,
					filters: '',
					orderBy: '',
				},
				data: [],
				columns: [
					{
						name: 'object',
						title: '抵押物',
						key: 'object',
						align: 'left',
					},
					{
						name: 'detail',
						title: '详情',
						align: 'center',
						render: (h, params) => h('div', [
							h('p', `${params.row.amount} - ${params.row.interestRate}`),
							h('p', { style: { 'font-size': '9px' } }, `${util.getLoanTermType(this, params.row.type) || '-'} - ${util.getLoanRepaymentWay(this, params.row.repaymentWay)}`),
							h('p', `${util.formatDate(this, params.row.createTime) || '-'}`),
						]),
					},
					{
						name: 'status',
						title: '状态',
						key: 'status',
						align: 'right',
						render: (h, params) => h('p', util.getLoanStatus(this, params.row.status) || '-'),
					},
				],
			},
		}
	},
	mounted() {
		util.setPageCache(this.$route.name, 'path', this.$route.fullPath)
		this.initPage()
	},
	activated() {
		const { path } = util.getPageCache(this.$route.name)
		if (!path || this.$route.fullPath !== path) {
			this.initPage()
		}
	},
	computed: {
		debtorHasCar() {
			if (this.credit.form.hasCar || this.credit.form.hasCar === false) return `${this.credit.form.hasCar ? '是' : '否'}`
			return '-'
		},
		debtorHasHouse() {
			if (this.credit.form.hasHouse || this.credit.form.hasHouse === false) return `${this.credit.form.hasHouse ? '是' : '否'}`
			return '-'
		},
	},
	methods: {
		// main
		initPage() {
			util.setPageCache(this.$route.name, 'path', this.$route.fullPath)
			this.hideEdit()
			this.loadAll()
		},
		closePage() {
			this.$store.commit('removeTag', 'debtor_detail')
			this.$store.commit('closePage', 'debtor_detail')
		},
		showEdit() {
			this.isEditVisible = true
		},
		hideEdit() {
			this.isEditVisible = false
		},
		debtorDeleting() {
			this.isDeleting = true
		},
		debtorUndeleting() {
			this.isDeleting = false
		},
		onClickUnlock() {
			util.passwordCheck(this, () => {
				this.showEdit()
			})
		},
		onClickLock() {
			this.onClickResetProfile()
			this.onClickResetIdentify()
			this.onClickResetCredit()
			this.hideEdit()
		},
		onClickRefreshDebtor() {
			this.initPage()
		},
		onClickDeleteDebtor() {
			util.passwordCheck(this, () => {
				this.debtorDeleting()
				this.deleteDebtor()
			})
		},
		async deleteDebtor() {
			try {
				await api.debtor.delete(this.$route.params.debtor_id)
				util.closeCurrentPage(this.$store, this.$route.name, () => {
					this.$router.push({
						name: 'debtors_index',
						query: {
							action: 'refresh',
						},
					})
				})
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.debtorUndeleting()
			}
		},
		async loadAll() {
			try {
				this.profileLoading()
				this.identifyLoading()
				this.creditLoading()
				this.loansLoading()
				const res = await api.debtor.profile.fetch(this.$route.params.debtor_id)
				this.debtor.profile = {
					id: res.id,
					realName: res.realName,
					gender: res.gender,
					birthday: res.birthday,
					birthDate: util.timestampToDate(this, res.birthday),
					primaryNumber: res.primaryNumber,
					alternativeNumber: res.alternativeNumber,
				}
				this.initProfileForm()
				this.loadIdentify()
				this.loadCredit()
				this.loadLoans()
			} catch (e) {
				switch (e.code) {
					case 'D_B_GET_FAILED_ERROR':
						this.$Message.error('错误: 未知的借款人ID')
						util.closeCurrentPage(this.$store, this.$route.name, this.$router, {
							name: 'debtors_index',
							query: {
								action: 'refresh',
							},
						})
						break
					default:
						this.$Message.error(e.message)
				}
			} finally {
				this.profileUnloading()
				this.identifyUnloading()
				this.creditUnloading()
				this.loansUnloading()
			}
		},
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
		profileSubmitting() {
			this.profile.isSubmitting = true
		},
		profileUnsubmitting() {
			this.profile.isSubmitting = false
		},
		initProfileForm() {
			this.profile.form = {
				realName: this.debtor.profile.realName,
				gender: this.debtor.profile.gender,
				birthDate: util.timestampToDate(this, this.debtor.profile.birthday),
				primaryNumber: this.debtor.profile.primaryNumber,
				alternativeNumber: this.debtor.profile.alternativeNumber,
			}
		},
		loadProfile() {
			this.profileLoading()
			this.fetchProfile()
		},
		onClickEditProfile() {
			this.editProfile()
		},
		onClickResetProfile() {
			this.initProfileForm()
			this.uneditProfile()
		},
		onClickSubmitProfile() {
			this.$refs.profileForm.validate((valid) => {
				if (valid) {
					const profile = {
						realName: this.profile.form.realName,
						gender: this.profile.form.gender,
						birthday: util.getTimestamp(this, this.profile.form.birthDate),
						primaryNumber: this.profile.form.primaryNumber,
						alternativeNumber: this.profile.form.alternativeNumber,
					}
					this.profileSubmitting()
					this.updateProfile(profile)
				}
			})
		},
		async fetchProfile() {
			try {
				const res = await api.debtor.profile.fetch(this.debtor.profile.id)
				this.debtor.profile = {
					id: res.id,
					realName: res.realName,
					gender: res.gender,
					birthday: res.birthday,
					birthDate: util.timestampToDate(this, res.birthday),
					primaryNumber: res.primaryNumber,
					alternativeNumber: res.alternativeNumber,
				}
				this.initProfileForm()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.profileUnloading()
			}
		},
		async updateProfile(profile) {
			try {
				await api.debtor.profile.update(profile, this.debtor.profile.id)
				this.uneditProfile()
				this.loadProfile()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.profileUnsubmitting()
			}
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
		identifySubmitting() {
			this.identify.isSubmitting = true
		},
		identifyUnsubmitting() {
			this.identify.isSubmitting = false
		},
		initIdentifyForm() {
			this.identify.form = {
				idNumber: this.debtor.identify.idNumber,
				location: this.debtor.identify.location,
				frontImageUrl: this.debtor.identify.frontImageUrl,
				frontBlurImageUrl: this.debtor.identify.frontBlurImageUrl,
				backImageUrl: this.debtor.identify.backImageUrl,
				backBlurImageUrl: this.debtor.identify.backBlurImageUrl,
			}
		},
		loadIdentify() {
			this.identifyLoading()
			this.fetchIdentify()
		},
		onClickEditIdentify() {
			this.editIdentify()
		},
		onClickResetIdentify() {
			this.initIdentifyForm()
			this.uneditIdentify()
		},
		onClickSubmitIdentify() {
			this.$refs.identifyForm.validate((valid) => {
				if (valid) {
					const identify = {
						idNumber: this.identify.form.idNumber,
						location: this.identify.form.location,
						frontImageUrl: this.identify.form.frontImageUrl,
						frontBlurImageUrl: this.identify.form.frontBlurImageUrl,
						backImageUrl: this.identify.form.backImageUrl,
						backBlurImageUrl: this.identify.form.backBlurImageUrl,
					}
					this.identifySubmitting()
					this.updateIdentify(identify)
				}
			})
		},
		async fetchIdentify() {
			try {
				const res = await api.debtor.identify.fetch(this.debtor.profile.id)
				this.debtor.identify = {
					idNumber: res.idNumber,
					location: res.location,
					frontImageUrl: res.frontImageUrl,
					frontBlurImageUrl: res.frontBlurImageUrl,
					backImageUrl: res.backImageUrl,
					backBlurImageUrl: res.backBlurImageUrl,
				}
				this.initIdentifyForm()
			} catch (e) {
				switch (e.code) {
					case 'D_B_GET_FAILED_ERROR':
						this.$Notice.warning({
							title: '实名信息缺失, 请补全',
							duration: 3,
						})
						break
					default:
						this.$Message.error(e.message)
				}
			} finally {
				this.identifyUnloading()
			}
		},
		async updateIdentify(identify) {
			try {
				await api.debtor.identify.update(identify, this.debtor.profile.id)
				this.uneditIdentify()
				this.loadIdentify()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.identifyUnsubmitting()
			}
		},
		// credit
		editCredit() {
			this.credit.isEditable = true
		},
		uneditCredit() {
			this.credit.isEditable = false
		},
		creditLoading() {
			this.credit.isLoading = true
		},
		creditUnloading() {
			this.credit.isLoading = false
		},
		creditSubmitting() {
			this.credit.isSubmitting = true
		},
		creditUnsubmitting() {
			this.credit.isSubmitting = false
		},
		initCreditForm() {
			this.credit.form = {
				workPlace: this.debtor.credit.workPlace,
				address: this.debtor.credit.address,
				education: this.debtor.credit.education,
				monthlyStableIncome: this.debtor.credit.monthlyStableIncome,
				yearlyStableIncome: this.debtor.credit.yearlyStableIncome,
				hasCar: this.debtor.credit.hasCar,
				hasHouse: this.debtor.credit.hasHouse,
			}
		},
		loadCredit() {
			this.creditLoading()
			this.fetchCredit()
		},
		onClickEditCredit() {
			this.editCredit()
		},
		onClickResetCredit() {
			this.initCreditForm()
			this.uneditCredit()
		},
		onClickSubmitCredit() {
			this.$refs.creditForm.validate((valid) => {
				if (valid) {
					const credit = {
						workPlace: this.credit.form.workPlace,
						address: this.credit.form.address,
						education: this.credit.form.education,
						monthlyStableIncome: this.credit.form.monthlyStableIncome,
						yearlyStableIncome: this.credit.form.yearlyStableIncome,
						hasCar: this.credit.form.hasCar,
						hasHouse: this.credit.form.hasHouse,
					}
					this.creditSubmitting()
					this.updateCredit(credit)
				}
			})
		},
		async fetchCredit() {
			try {
				const res = await api.debtor.credit.fetch(this.debtor.profile.id)
				this.debtor.credit = {
					workPlace: res.workPlace,
					address: res.address,
					education: res.education,
					monthlyStableIncome: res.monthlyStableIncome,
					yearlyStableIncome: res.yearlyStableIncome,
					hasCar: res.hasCar,
					hasHouse: res.hasHouse,
				}
				this.initCreditForm()
			} catch (e) {
				switch (e.code) {
					case 'D_B_GET_FAILED_ERROR':
						this.$Notice.warning({
							title: '信用信息缺失, 请补全',
							duration: 3,
						})
						break
					default:
						this.$Message.error(e.message)
				}
			} finally {
				this.creditUnloading()
			}
		},
		async updateCredit(credit) {
			try {
				await api.debtor.credit.update(credit, this.debtor.profile.id)
				this.uneditCredit()
				this.loadCredit()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.creditUnsubmitting()
			}
		},
		// loans
		loansLoading() {
			this.loans.list.isLoading = true
		},
		loansUnloading() {
			this.loans.list.isLoading = false
		},
		onClickLoansRow(params) {
			this.$router.push({
				name: 'loan_detail',
				params: {
					loan_id: params.id,
				},
			})
		},
		async loadLoans() {
			try {
				const filters = `${this.loans.list.filters ? `${this.loans.list.filters},debtorId=${this.$route.params.debtor_id}` : `debtorId=${this.$route.params.debtor_id}`}`
				const res = await api.loan.fetchList(
					this.loans.list.pagesize,
					this.loans.list.page,
					filters,
					this.loans.list.orderBy,
				)
				this.loans.data = res
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.loansUnloading()
			}
		},
	},
}
</script>

<style lang="less">
@import '../../styles/common.less';
@import '../../styles/public.less';
</style>
