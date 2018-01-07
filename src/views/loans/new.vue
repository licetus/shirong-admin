<template>
	<section>
		<Row>
			<Col :span="6" class="padding-right-5">
				<Card>
					<p slot="title">借款人</p>
					<div slot="extra">
						<div v-if="!debtor.isEditable">
							<Button type="text" @click="onClickRefreshDebtor" :loading="debtor.isLoading">刷新</Button>
							<Button type="text" @click="onClickEditDebtor">编辑</Button>
						</div>
						<div v-else>
							<Button type="text" @click="onClickCancelDebtor">取消</Button>
							<Button type="text" @click="onClickSubmitDebtor" :loading="debtor.isSubmitting">提交</Button>
						</div>
					</div>
					<Form ref="debtorForm" :model="debtor.form" :rules="debtor.rules" label-position="left" :label-width="debtor.labelWidth" inline>
						<Row>
							<Col :span="24"><FormItem label="借款人姓名" prop="realName">
								<p v-if="!debtor.isEditable">{{debtor.data.profile.realName || '-'}}</p>
								<Input v-else v-model="debtor.form.realName"/>
							</FormItem></Col>
							<Col :span="24"><FormItem label="借款人手机" prop="primaryNumber">
								<p v-if="!debtor.isEditable">{{debtor.data.profile.primaryNumber || '-'}}</p>
								<Input v-else v-model="debtor.form.primaryNumber"/>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
			<Col :span="15" class="padding-left-5">
				<Card>
					<Spin v-if="debtor.isLoading" size="large" fix></Spin>
					<p slot="title">借款人信息</p>
					<div slot="extra">
						<Button type="text" @click="onClickDebtorDetail">详情</Button>
					</div>
					<Form label-position="left" :label-width="debtor.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="姓名">
								<p>{{debtor.data.profile.realName || '-'}}</p>
							</FormItem></Col>
							<Col :span="8"><FormItem label="性别">
								<p>{{debtorGender || '-'}}</p>
							</FormItem></Col>
							<Col :span="8"><FormItem label="年龄">
								<p>{{debtorAge || '-'}}</p>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="24"><FormItem label="身份认证">
								<CheckboxGroup :value="identifyArray">
									<Checkbox label="idNumber">身份号码</Checkbox>
									<Checkbox label="location">户籍地址</Checkbox>
									<Checkbox label="frontImageUrl">正面照片</Checkbox>
									<Checkbox label="frontBlurImageUrl">正面打码</Checkbox>
									<Checkbox label="backImageUrl">背面照片</Checkbox>
									<Checkbox label="backBlurImageUrl">背面打码</Checkbox>
								</CheckboxGroup>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
			<Col :span="3" class="padding-left-10">
				<Card>
					<p slot="title">操作</p>
						<Row  type="flex" justify="center"><Button type="primary" @click="onClickSubmitLoan" :loading="loan.isSubmitting">保存</Button></Row>
						<Row class="margin-top-10" type="flex" justify="center"><Button>取消</Button></Row>
						<Row class="margin-top-10" type="flex" justify="center"><Button type="error">删除</Button></Row>
				</Card>
			</Col>
		</Row>
		<Row class="margin-top-10">
			<Col :span="16" class="padding-right-5">
				<Card>
					<p slot="title">贷款信息</p>
					<div v-if="isEditable" slot="extra">
						<div v-if="!loan.isEditable">
							<Button type="text" @click="onClickEditLoan">编辑</Button>
						</div>
						<div v-else>
							<Button type="text" @click="onClickResetLoan">重置</Button>
							<Button type="text" @click="onClickSaveLoan">保存</Button>
						</div>
					</div>
					<Form ref="loanForm" :model="loan.form" :rules="loan.rules" label-position="left" :label-width="loan.labelWidth" inline>
						<Row>
							<Col :span="12"><FormItem label="贷款类型">
								<RadioGroup v-if="!loan.isEditable" :value="loan.form.type">
									<Radio :label="Enum.Loan.Type.Car" :disabled="loan.form.type !== Enum.Loan.Type.Car">车辆抵押</Radio>
									<Radio :label="Enum.Loan.Type.Other" disabled>其他</Radio>
								</RadioGroup>
								<RadioGroup v-else v-model="loan.form.type">
									<Radio :label="Enum.Loan.Type.Car">车辆抵押</Radio>
									<Radio :label="Enum.Loan.Type.Other" disabled>其他</Radio>
								</RadioGroup>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="贷款金额">
								<p v-if="!loan.isEditable">{{loan.form.amount || '-'}}</p>
								<InputNumber v-else v-model="loan.form.amount" :min="0" :max="99999999" :step="10000"></InputNumber>
							</FormItem></Col>
							<Col :span="12"><FormItem label="贷款利率">
								<p v-if="!loan.isEditable">{{loan.form.interest || '-'}}</p>
								<InputNumber v-else v-model="loan.form.interest" :min="0" :max="1" :step="0.01"></InputNumber>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="贷款期限">
								<RadioGroup v-if="!loan.isEditable" :value="loan.form.termType">
									<Radio :label="Enum.Loan.TermType.SevenDays" :disabled="loan.form.termType !== Enum.Loan.TermType.SevenDays">7天</Radio>
									<Radio :label="Enum.Loan.TermType.OneMonth" :disabled="loan.form.termType !== Enum.Loan.TermType.OneMonth">1个月</Radio>
									<Radio :label="Enum.Loan.TermType.ThreeMonths" :disabled="loan.form.termType !== Enum.Loan.TermType.ThreeMonths">3个月</Radio>
									<Radio :label="Enum.Loan.TermType.SixMonths" :disabled="loan.form.termType !== Enum.Loan.TermType.SixMonths">6个月</Radio>
								</RadioGroup>
								<RadioGroup v-else v-model="loan.form.termType">
									<Radio :label="Enum.Loan.TermType.SevenDays">7天</Radio>
									<Radio :label="Enum.Loan.TermType.OneMonth">1个月</Radio>
									<Radio :label="Enum.Loan.TermType.ThreeMonths">3个月</Radio>
									<Radio :label="Enum.Loan.TermType.SixMonths">6个月</Radio>
								</RadioGroup>
							</FormItem></Col>
							<Col :span="12"><FormItem label="还款方式">
								<RadioGroup v-if="!loan.isEditable" :value="loan.form.repaymentWay">
									<Radio :label="Enum.Loan.RepaymentWay.LumpSum" :disabled="loan.form.repaymentWay !== Enum.Loan.RepaymentWay.LumpSum">一次性还款</Radio>
									<Radio :label="Enum.Loan.RepaymentWay.InterestFirst" :disabled="loan.form.repaymentWay !== Enum.Loan.RepaymentWay.InterestFirst">先息后本</Radio>
								</RadioGroup>
								<RadioGroup v-else v-model="loan.form.repaymentWay">
									<Radio :label="Enum.Loan.RepaymentWay.LumpSum">一次性还款</Radio>
									<Radio :label="Enum.Loan.RepaymentWay.InterestFirst">先息后本</Radio>
								</RadioGroup>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
			<Col :span="8" class="padding-left-5">
				<Card>
					<p slot="title">放款账户</p>
						<Form ref="bankForm" :model="bank.form" :rules="bank.rules" label-position="left" :label-width="bank.labelWidth" inline>
						<Row>
							<Col :span="24"><FormItem label="开户人姓名"></FormItem></Col>
							<Col :span="24"><FormItem label="开户行名称"></FormItem></Col>
							<Col :span="24"><FormItem label="银行卡号"></FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
		</Row>
		<Row class="margin-top-10">
			<Card v-if="isCarPaneVisible">
				<p slot="title">车辆详情</p>
				<div v-if="isEditable" slot="extra">
					<div v-if="!loan.sub.car.isEditable">
						<Button type="text" @click="onClickEditCar">编辑</Button>
					</div>
					<div v-else>
						<Button type="text" @click="onClickResetCar">重置</Button>
						<Button type="text" @click="onClickSaveCar">保存</Button>
					</div>
				</div>
				<Form ref="carForm" :model="loan.sub.car.form" :rules="loan.sub.car.rules" label-position="left" :label-width="loan.sub.car.labelWidth" inline>
					<Row>
						<Col :span="6"><FormItem label="品牌型号">
							<p v-if="!loan.sub.car.isEditable">{{loan.sub.car.form.carBrand}}</p>
							<Input v-else v-model="loan.sub.car.form.carBrand" />
						</FormItem></Col>
						<Col :span="6"><FormItem label="购买价格">
							<p v-if="!loan.sub.car.isEditable">{{loan.sub.car.form.purchasePrice}}</p>
							<InputNumber v-else v-model="loan.sub.car.form.purchasePrice" :min="0" :max="9999999" :step="1000" :precision="0"></InputNumber>
						</FormItem></Col>
						<Col :span="6"><FormItem label="行驶里程">
							<p v-if="!loan.sub.car.isEditable">{{loan.sub.car.form.milage}}</p>
							<InputNumber v-else v-model="loan.sub.car.form.milage" :min="0" :max="9999999" :step="1000" :precision="0"></InputNumber>
						</FormItem></Col>
						<Col :span="6"><FormItem label="评估价格">
							<p v-if="!loan.sub.car.isEditable">{{loan.sub.car.form.evaluatePrice}}</p>
							<InputNumber v-else v-model="loan.sub.car.form.evaluatePrice" :min="0" :max="9999999" :step="1000" :precision="0"></InputNumber>
						</FormItem></Col>
					</Row>
					<Row class="margin-top-20">
						<Col :span="12"><FormItem label="车辆行驶证">
							<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
						</FormItem></Col>
						<Col :span="12"><FormItem label="车辆检验证">
							<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
						</FormItem></Col>
					</Row>
					<Row>
						<Col :span="12"><FormItem label="正面照片">
							<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
						</FormItem></Col>
						<Col :span="12"><FormItem label="背面照片">
							<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
						</FormItem></Col>
					</Row>
					<Row>
						<Col :span="12"><FormItem label="里程照片">
							<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
						</FormItem></Col>
						<Col :span="12"><FormItem label="内饰照片">
							<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
						</FormItem></Col>
					</Row>
				</Form>
			</Card>
		</Row>
	</section>
</template>

<script>
import { Debtor, Loan, Car } from '../../models/data'
import Enum from '../../models/enum'
import api from '../../libs/api'
import util from '../../libs/util'

export default {
	name: 'loan_new',
	data() {
		const blank = {
			debtor: new Debtor(),
			loan: new Loan(),
			car: new Car(),
		}
		return {
			Enum,
			debtor: {
				blankDebtor: new Debtor(),
				data: blank.debtor,
				isEditable: false,
				isSubmitting: false,
				isLoading: false,
				labelWidth: 75,
				form: {
					realName: blank.debtor.profile.realName,
					primaryNumber: blank.debtor.profile.primaryNumber,
				},
				rules: {},
			},
			loan: {
				data: blank.loan,
				isEditable: true,
				isSubmitting: false,
				isLoading: false,
				labelWidth: 75,
				form: {
					type: blank.loan.type,
					amount: blank.loan.amount,
					termType: blank.loan.termType,
					interest: blank.loan.interest,
					repaymentWay: blank.loan.repaymentWay,
					remark: blank.loan.remark,
				},
				rules: {},
				sub: {
					car: {
						data: blank.car,
						isEditable: true,
						labelWidth: 75,
						form: {
							carBrand: blank.car.carBrand,
							purchasePrice: blank.car.purchasePrice,
							milage: blank.car.milage,
							evaluatePrice: blank.car.evaluatePrice,
							carFrontImageUrl: blank.car.carFrontImageUrl,
							carBackImageUrl: blank.car.carBackImageUrl,
							carMilageImageUrl: blank.car.carMilageImageUrl,
							carInsideImageUrl: blank.car.carInsideImageUrl,
							vehicleLicenseImageUrl: blank.car.vehicleLicenseImageUrl,
							inspectionLicenseImageUrl: blank.car.inspectionLicenseImageUrl,
						},
						rules: {},
					},
				},
			},
			bank: {
				data: blank.loan,
				labelWidth: 75,
				form: {},
				rules: {},
			},
		}
	},
	mounted() {
		this.currentPageName = this.$route.name
		this.initPage()
	},
	activated() {
		const { path } = util.getPageCache(this.$route.name)
		if (!path || this.$route.fullPath !== path) {
			this.initPage()
		}
	},
	watch: {
		// $route(to) {
		// 	if (to.id && to.path !== Cookies.get('newLoanPath')) {
		// 		console.log(to.path, Cookies.get('newLoanPath'))
		// 		this.initPage()
		// 	}
		// },
	},
	computed: {
		isNew() {
			return this.$route.name === 'loan_new'
		},
		isEditable() {
			return true
		},
		isCarPaneVisible() {
			return (this.debtor.data.profile.id && this.loan.form.type === Enum.Loan.Type.Car)
		},
		debtorGender() {
			return util.getGender(this, this.debtor.data.profile.gender)
		},
		debtorAge() {
			return util.getAge(this, this.debtor.data.profile.birthday)
		},
		identifyArray() {
			console.log(this.debtor.data.identify)
			const arr = []
			/* eslint-disable */
			for (const item in this.debtor.data.identify) {
				if (this.debtor.data.identify.hasOwnProperty(item)) {
					if (item !== 'id' && this.debtor.data.identify[item]) arr.push(item)
				}
			}
			/* eslint-enable */
			return arr
		},
		loanType() {
			return util.getLoanType(this, this.loan.form.type)
		},
	},
	methods: {
		// main
		initPage() {
			util.setPageCache(this.$route.name, 'path', this.$route.fullPath)
			this.uneditDebtor()
			if (this.$route.query.debtor_id) {
				this.debtor.data.profile.id = this.$route.query.debtor_id
				this.loadDebtor()
			} else {
				this.$Message.error('错误: 未知的借款人')
			}
		},

		// debtor
		editDebtor() {
			this.debtor.isEditable = true
		},
		uneditDebtor() {
			this.debtor.isEditable = false
		},
		debtorSubmitting() {
			this.debtor.isSubmitting = true
		},
		debtorUnsubmitting() {
			this.debtor.isSubmitting = false
		},
		debtorLoading() {
			this.debtor.isLoading = true
		},
		debtorUnLoading() {
			this.debtor.isLoading = false
		},
		clearDebtor() {
			console.log(this.debtor.data, this.debtor.blankDebtor)
			this.debtor.data = this.debtor.blankDebtor
		},
		initDebtor(id) {
			this.debtor.data.profile.realName = this.debtor.form.realName
			this.debtor.data.profile.primaryNumber = this.debtor.form.primaryNumber
			this.$router.replace({
				name: 'loan_new',
				query: {
					debtor_id: id,
				},
			})
			this.clearDebtor()
			this.initPage()
		},
		initDebtorForm() {
			this.debtor.form = {
				realName: this.debtor.data.profile.realName,
				primaryNumber: this.debtor.data.profile.primaryNumber,
			}
		},
		loadDebtor() {
			this.debtorLoading()
			this.fetchDebtorProfile()
		},
		onClickEditDebtor() {
			this.editDebtor()
		},
		onClickCancelDebtor() {
			this.initDebtorForm()
			this.uneditDebtor()
		},
		onClickSubmitDebtor() {
			if (this.debtor.form.primaryNumber === this.debtor.data.profile.primaryNumber) this.uneditDebtor()
			else {
				this.$refs.debtorForm.validate((valid) => {
					if (valid) {
						this.debtorSubmitting()
						this.matchDebtor(this.debtor.form.primaryNumber)
					}
				})
			}
		},
		onClickRefreshDebtor() {
			this.clearDebtor()
			this.loadDebtor()
			console.log(this.debtor.data)
		},
		onClickDebtorDetail() {
			this.$router.push({
				name: 'debtor_detail',
				params: {
					debtor_id: this.debtor.data.profile.id,
				},
			})
		},
		async matchDebtor(number) {
			try {
				const query = {
					pagesize: 1,
					page: 0,
					filters: `primary_number='${number}'`,
					orderBy: '',
				}
				const res = await api.debtor.fetchList(
					query.pagesize,
					query.page,
					query.filters,
					query.orderBy,
				)
				if (res.length === 0) {
					this.$Modal.confirm({
						content: '未能匹配对应借款人, 是否新建借款人？',
						onOk: async () => {
							const id = await api.debtor.profile.add({
								realName: this.debtor.form.realName || '临时姓名 - 待修改',
								primaryNumber: number,
							})
							this.$Notice.success({
								title: '新建借款人成功',
								duration: 3,
							})
							this.initDebtor(id)
						},
					})
				} else {
					this.$Notice.success({
						title: '匹配成功',
						duration: 3,
					})
					this.initDebtor(res[0].id)
				}
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.debtorUnsubmitting()
			}
		},
		async fetchDebtorProfile() {
			try {
				const res = await api.debtor.profile.fetch(this.debtor.data.profile.id)
				this.debtor.data.profile = {
					id: res.id,
					realName: res.realName,
					gender: res.gender,
					birthday: res.birthday,
					primaryNumber: res.primaryNumber,
					alternativeNumber: res.alternativeNumber,
					remark: res.remark,
				}
				this.initDebtorForm()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.debtorUnLoading()
				this.fetchDebtorIdentify()
			}
		},
		async fetchDebtorIdentify() {
			try {
				const res = await api.debtor.identify.fetch(this.debtor.data.profile.id)
				this.debtor.data.identify = {
					idNumber: res.idNumber,
					location: res.location,
					frontImageUrl: res.frontImageUrl,
					frontBlurImageUrl: res.frontBlurImageUrl,
					backImageUrl: res.backImageUrl,
					backBlurImageUrl: res.backBlurImageUrl,
				}
			} catch (e) {
				switch (e.code) {
					case 'D_B_GET_FAILED_ERROR':
						this.$Notice.info({
							title: '贷款人实名信息缺失, 正在打开相关页面',
							duration: 3,
						})
						this.$router.push({
							name: 'debtor_detail',
							params: {
								debtor_id: this.debtor.data.profile.id,
							},
						})
						break
					default: this.$Message.error(e.message)
				}
			}
		},
		// loan
		loanSubmitting() {
			this.loan.isSubmitting = true
		},
		loanUnsubmitting() {
			this.loan.isSubmitting = false
		},
		loadLoan(id) {
			this.$router.push({
				name: 'loan_detail',
				params: {
					loan_id: id,
				},
			})
		},
		onClickSubmitLoan() {
			if (this.loan.form.type) {
				const subMapping = ['', 'other', 'car']
				const loanCheck = this.$refs.loanForm.validate(valid => valid)
				const subCheck = this.$refs[`${subMapping[this.loan.form.type]}Form`].validate(valid => valid)
				if (loanCheck && subCheck) {
					let sub = {}
					switch (this.loan.form.type) {
						case Enum.Loan.Type.Car:
							sub = {
								carBrand: this.loan.sub.car.form.carBrand,
								purchasePrice: this.loan.sub.car.form.purchasePrice,
								milage: this.loan.sub.car.form.milage,
								evaluatePrice: this.loan.sub.car.form.evaluatePrice,
								carFrontImageUrl: this.loan.sub.car.form.carFrontImageUrl,
								carBackImageUrl: this.loan.sub.car.form.carBackImageUrl,
								carMilageImageUrl: this.loan.sub.car.form.carMilageImageUrl,
								carInsideImageUrl: this.loan.sub.car.form.carInsideImageUrl,
								vehicleLicenseImageUrl: this.loan.sub.car.form.vehicleLicenseImageUrl,
								inspectionLicenseImageUrl: this.loan.sub.car.form.inspectionLicenseImageUrl,
							}
							break
						default:
					}
					const loan = {
						debtorId: this.debtor.data.profile.id,
						type: this.loan.form.type,
						amount: this.loan.form.amount,
						termType: this.loan.form.termType,
						interest: this.loan.form.interest,
						repaymentWay: this.loan.form.repaymentWay,
						remark: this.loan.form.remark,
						sub,
					}
					this.loanSubmitting()
					this.addLoan(loan)
				}
			}
		},
		async addLoan(loan) {
			try {
				const res = await api.loan.add(loan)
				this.loadLoan(res)
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.loanUnsubmitting()
			}
		},

		// loan_main
		editLoan() {
			this.loan.isEditable = true
		},
		uneditLoan() {
			this.loan.isEditable = false
		},
		initLoanForm() {
			this.loan.form = {
				type: this.loan.data.type,
				amount: this.loan.data.amount,
				termType: this.loan.data.termType,
				interest: this.loan.data.interest,
				repaymentWay: this.loan.data.repaymentWay,
				remark: this.loan.data.remark,
			}
		},
		onClickEditLoan() {
			this.editLoan()
		},
		onClickResetLoan() {
			this.initLoanForm()
			this.uneditLoan()
		},
		onClickSaveLoan() {
			this.uneditLoan()
		},
		// loan_sub_car
		editCar() {
			this.loan.sub.car.isEditable = true
		},
		uneditCar() {
			this.loan.sub.car.isEditable = false
		},
		initCarForm() {
			this.loan.sub.car.form = {
				carBrand: this.loan.sub.car.data.carBrand,
				purchasePrice: this.loan.sub.car.data.purchasePrice,
				milage: this.loan.sub.car.data.milage,
				evaluatePrice: this.loan.sub.car.data.evaluatePrice,
				carFrontImageUrl: this.loan.sub.car.data.carFrontImageUrl,
				carBackImageUrl: this.loan.sub.car.data.carBackImageUrl,
				carMilageImageUrl: this.loan.sub.car.data.carMilageImageUrl,
				carInsideImageUrl: this.loan.sub.car.data.carInsideImageUrl,
				vehicleLicenseImageUrl: this.loan.sub.car.data.vehicleLicenseImageUrl,
				inspectionLicenseImageUrl: this.loan.sub.car.data.inspectionLicenseImageUrl,
			}
		},
		onClickEditCar() {
			this.editCar()
		},
		onClickResetCar() {
			this.initCarForm()
			this.uneditCar()
		},
		onClickSaveCar() {
			this.uneditCar()
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
