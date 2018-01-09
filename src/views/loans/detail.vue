<template>
	<section>
		<Row>
			<Col :span="16" class="padding-right-5">
				<Card>
					<Spin v-if="loan.isLoading" size="large" fix></Spin>
					<p slot="title">贷款信息</p>
					<div v-show="isEditable && isLockVisible" slot="extra">
						<div v-show="!loan.isEditable">
							<Button type="text" @click="onClickUnlockLoan">解锁</Button>
						</div>
						<div v-show="loan.isEditable">
							<Button type="text" @click="onClickResetLoan">重置</Button>
							<Button type="text" @click="onClickLockLoan">锁定</Button>
						</div>
					</div>
					<Form ref="loanForm" :model="loan.form" :rules="loan.rules" label-position="left" :label-width="loan.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="贷款类型">
								<RadioGroup v-if="!loan.isEditable" :value="loan.form.type">
									<Radio :label="Enum.Loan.Type.Car" :disabled="loan.form.type !== Enum.Loan.Type.Car">车辆抵押</Radio>
									<Radio :label="Enum.Loan.Type.Other" disabled>其他</Radio>
								</RadioGroup>
								<RadioGroup v-else v-model="loan.form.type">
									<Radio :label="Enum.Loan.Type.Car">车辆抵押</Radio>
									<Radio :label="Enum.Loan.Type.Other" disabled>其他</Radio>
								</RadioGroup>
							</FormItem></Col>
							<Col :span="8"><FormItem label="当前状态">
								<p>{{util.getLoanStatus(this, loan.data.status) || '-'}}</p>
							</FormItem></Col>
							<Col :span="8"><FormItem label="审核状态">
								<p>{{util.getLoanApprovalStatus(this, loan.data.approvalStatus) || '-'}}</p>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="标的名称">
								<p v-if="!loan.isEditable">{{loan.form.object || '-'}}</p>
								<Input v-else v-model="loan.form.object" />
							</FormItem></Col>
							<Col :span="8"><FormItem label="贷款金额">
								<p v-if="!loan.isEditable">{{loan.form.amount || '-'}}</p>
								<InputNumber v-else v-model="loan.form.amount" :min="0" :max="99999999" :step="10000"></InputNumber>
							</FormItem></Col>
							<Col :span="8"><FormItem label="贷款利率">
								<p v-if="!loan.isEditable">{{loan.form.interestRate || '-'}}</p>
								<InputNumber v-else v-model="loan.form.interestRate" :min="0" :max="1" :step="0.01"></InputNumber>
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
				<Card class="margin-top-10">
					<Spin v-if="debtor.isLoading" size="large" fix></Spin>
					<p slot="title">借款人信息</p>
					<div slot="extra">
						<Button type="text" @click="onClickDebtorDetail">详情</Button>
					</div>
					<Form label-position="left" :label-width="debtor.labelWidth" inline>
						<Row>
							<Col :span="6"><FormItem label="姓名">
								<p>{{debtor.data.profile.realName || '-'}}</p>
							</FormItem></Col>
							<Col :span="6"><FormItem label="手机">
								<p>{{debtor.data.profile.primaryNumber || '-'}}</p>
							</FormItem></Col>
							<Col :span="6"><FormItem label="性别">
								<p>{{util.getGender(this, debtor.data.profile.gender) || '-'}}</p>
							</FormItem></Col>
							<Col :span="6"><FormItem label="年龄">
								<p>{{util.getAge(this, this.debtor.data.profile.birthday) || '-'}}</p>
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
				<Card v-if="loan.data.type === Enum.Loan.Type.Car" class="margin-top-10">
					<p slot="title">车辆详情</p>
					<div v-show="isEditable && isLockVisible" slot="extra">
						<div v-show="!loan.sub.car.isEditable">
							<Button type="text" @click="onClickUnlockCar">解锁</Button>
						</div>
						<div v-show="loan.sub.car.isEditable">
							<Button type="text" @click="onClickResetCar">重置</Button>
							<Button type="text" @click="onClickLockCar">锁定</Button>
						</div>
					</div>
					<Form ref="carForm" :model="loan.sub.car.form" :rules="loan.sub.car.rules" label-position="left" :label-width="loan.sub.car.labelWidth" inline>
						<Row>
							<Col :span="12"><FormItem label="品牌型号">
								<p v-if="!loan.sub.car.isEditable">{{loan.sub.car.form.carBrand}}</p>
								<Input v-else v-model="loan.sub.car.form.carBrand" />
							</FormItem></Col>
							<Col :span="12"><FormItem label="购买价格">
								<p v-if="!loan.sub.car.isEditable">{{loan.sub.car.form.purchasePrice}}</p>
								<InputNumber v-else v-model="loan.sub.car.form.purchasePrice" :min="0" :max="9999999" :step="1000" :precision="0"></InputNumber>
							</FormItem></Col>
							<Col :span="12"><FormItem label="行驶里程">
								<p v-if="!loan.sub.car.isEditable">{{loan.sub.car.form.milage}}</p>
								<InputNumber v-else v-model="loan.sub.car.form.milage" :min="0" :max="9999999" :step="1000" :precision="0"></InputNumber>
							</FormItem></Col>
							<Col :span="12"><FormItem label="评估价格">
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
			</Col>
			<Col :span="8" class="padding-left-5">
				<Card class="margin-bottom-10">
					<p slot="title">操作</p>
					<Row type="flex" justify="space-bewtween">
						<Col :span="16">
							<div v-if="isEditable">
								<div v-if="!isLockVisible">
									<Button class="margin-right-10" type="primary" @click="onClickEditLoan">编辑</Button>
									<Button class="margin-right-10" type="error" @click="onClickDeleteLoan" :loading="loan.isDeleting">删除</Button>
									<div v-if="isStartable" class="margin-top-20">
										<Button class="margin-right-10" type="success" @click="onClickStartLoan" :loading="loan.isStarting">开始计息</Button>
									</div>
									<div v-if="isApprovable" class="margin-top-20">
										<Button class="margin-right-10" type="success" @click="onClickStartApproval">开始审核</Button>
									</div>
								</div>
								<div v-else>
									<Button class="margin-right-10" @click="onClickCancel">取消</Button>
									<Button class="margin-right-10" type="primary" @click="onClickSubmitLoan" :loading="loan.isSubmitting">提交</Button>
								</div>
								<Button v-else-if="isCompleteable" class="margin-right-10" type="primary" @click="onClickCompleteLoan">完成</Button>
							</div>
						</Col>
						<Col :span="8">
							<Row type="flex" justify="end">
								<Button class="margin-right-10" @click="onClickRefreshLoan" :loading="loan.isLoading">刷新</Button>
							</Row>
						</Col>
					</Row>
				</Card>
				<Card>
					<p slot="title">业务员</p>
					<Form label-position="left" :label-width="75" inline>
						<Row>
							<Col :span="24"><FormItem label="姓名"></FormItem></Col>
							<Col :span="24"><FormItem label="工号"></FormItem></Col>
							<Col :span="24"><FormItem label="签约时间"></FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">放款账户</p>
					<Form ref="bankForm" :model="bank.form" :rules="bank.rules" label-position="left" :label-width="bank.labelWidth" inline>
						<Row>
							<Col :span="24"><FormItem label="开户人姓名"></FormItem></Col>
							<Col :span="24"><FormItem label="开户行名称"></FormItem></Col>
							<Col :span="24"><FormItem label="银行卡号"></FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<Spin v-if="approval.list.isLoading" size="large" fix></Spin>
					<p slot="title">审核信息</p>
					<p v-if="approval.data.length < 1">无</p>
					<Form label-position="left" :label-width="approval.labelWidth" inline>
						<Row class="border-bottom" v-for="(item, index) of approval.data" :key="index">
							<Col :span="24"><FormItem label="审核意见">
								<p>{{item.content}}</p>
							</FormItem></Col>
							<Col :span="24"><FormItem label="审核时间">
								<p>{{util.formatTime(this, item.createTime)}}</p>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
		</Row>

		<Modal v-model="approval.isModalVisible">
			<p slot="header">填写审核意见</p>
			<Form class="margin-top-20" ref="approvalForm" :model="approval.form" :rules="approval.rules" :label-width="0">
				<FormItem label="">
					<Input v-model="approval.form.content" type="textarea" :rows="5" />
				</FormItem>
			</Form>
			<div slot="footer">
				<Button @click="onClickCancelApprove">取消</Button>
				<Button type="error" @click="onClickDisapprove" :loading="approval.isDisapproving" :disabled="approval.isApproving">驳回</Button>
				<Button type="success" @click="onClickApprove" :loading="approval.isApproving" :disabled="approval.isDisapproving">通过</Button>
			</div>
		</Modal>
	</section>
</template>

<script>
import Cookies from 'js-cookie'
import { Debtor, Loan, Car } from '../../models/data'
import Enum from '../../models/enum'
import api from '../../libs/api'
import util from '../../libs/util'

export default {
	name: 'loan_detail',
	data() {
		const blank = {
			debtor: new Debtor(),
			loan: new Loan(),
			car: new Car(),
		}
		return {
			access: parseInt(Cookies.get('access'), 10),
			Enum,
			util,
			isLockVisible: false,
			loan: {
				data: blank.loan,
				isEditable: false,
				isSubmitting: false,
				isDeleting: false,
				isStarting: false,
				isCompleting: false,
				isLoading: false,
				labelWidth: 75,
				form: {
					type: blank.loan.type,
					amount: blank.loan.amount,
					termType: blank.loan.termType,
					interestRate: blank.loan.interestRate,
					repaymentWay: blank.loan.repaymentWay,
					remark: blank.loan.remark,
				},
				rules: {},
				sub: {
					car: {
						data: blank.car,
						isEditable: false,
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
			debtor: {
				data: blank.debtor,
				isLoading: false,
				labelWidth: 75,
			},
			bank: {
				data: blank.loan,
				labelWidth: 75,
				form: {},
				rules: {},
			},
			approval: {
				labelWidth: 75,
				isModalVisible: false,
				isDisapproving: false,
				isApproving: false,
				list: {
					isLoading: false,
					pagesize: 10,
					page: 0,
					filters: '',
					sortBy: 'create_time desc',
				},
				data: [
					blank.loan,
				],
				form: {
					content: '',
				},
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
		isEditable() {
			return this.loan.data.status === Enum.Loan.Status.Prepared
		},
		isStartable() {
			return this.loan.data.approvalStatus === Enum.Loan.ApprovalStatus.Approved
		},
		isApprovable() {
			return (this.loan.data.approvalStatus === Enum.Loan.ApprovalStatus.Submitted) || (this.loan.data.approvalStatus === Enum.Loan.ApprovalStatus.Disapproved)
		},
		isCompleteable() {
			return this.loan.data.status === Enum.Loan.Status.Running
		},
		subPaneType() {
			return (this.debtor.data.profile.id && this.loan.form.type === Enum.Loan.Type.Car)
		},
		identifyArray() {
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
	},
	methods: {
		// main
		initPage() {
			this.loadLoan()
			this.loadApprovalComments()
		},
		showLock() {
			this.isLockVisible = true
		},
		hideLock() {
			this.isLockVisible = false
		},
		onClickEditLoan() {
			this.showLock()
		},
		onClickCancel() {
			this.hideLock()
		},
		onClickRefreshLoan() {
			this.initPage()
		},
		// loan
		loanLoading() {
			this.loan.isLoading = true
		},
		loanUnloading() {
			this.loan.isLoading = false
		},
		loanSubmitting() {
			this.loan.isSubmitting = true
		},
		loanUnsubmitting() {
			this.loan.isSubmitting = false
		},
		loanDeleting() {
			this.loan.isDeleting = true
		},
		loanUndeleting() {
			this.loan.isDeleting = false
		},
		loanStarting() {
			this.loan.isStarting = true
		},
		loanUnstarting() {
			this.loan.isStarting = false
		},
		loanCompleting() {
			this.loan.isCompleting = true
		},
		loanUncompleting() {
			this.loan.isCompleting = false
		},
		loadLoan() {
			this.loanLoading()
			this.fetchLoan()
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
						interestRate: this.loan.form.interestRate,
						repaymentWay: this.loan.form.repaymentWay,
						remark: this.loan.form.remark,
						sub,
					}
					this.loanSubmitting()
					this.updateLoan(loan)
				}
			}
		},
		onClickDeleteLoan() {
			this.loanDeleting()
			this.deleteLoan()
		},
		onClickStartApproval() {
			this.showApprovalModal()
		},
		onClickStartLoan() {
			this.loanStarting()
			this.startLoan()
		},
		onClickCompleteLoan() {
			this.loanCompleting()
			this.completeLoan()
		},
		async deleteLoan() {
			try {
				await api.loan.delete(this.$route.params.loan_id)
				util.closeCurrentPage(this.$store, this.$route.name, this.$router, {
					name: 'loans_index',
					query: {
						action: 'refresh',
					},
				})
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.loanUndeleting()
			}
		},
		async startLoan() {
			try {
				await api.loan.start(this.$route.params.loan_id)
				this.loadLoan()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.loanUnstarting()
			}
		},
		async completeLoan() {
			try {
				await api.loan.complete(this.$route.params.loan_id)
				this.loadLoan()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.loanUncompleting()
			}
		},
		async updateLoan(loan) {
			try {
				const res = await api.loan.update(loan, this.$route.params.loan_id)
				this.$Notice.success({
					title: '更新成功, 正在刷新...',
					duration: 3,
				})
				this.loadLoan(res)
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.loanUnsubmitting()
			}
		},
		async fetchLoan() {
			try {
				const res = await api.loan.fetch(this.$route.params.loan_id)
				this.loan.data = {
					id: res.id,
					debtorId: res.debtorId,
					agentId: res.agentId,
					object: res.object,
					amount: res.amount,
					interestRate: res.interestRate,
					approvalStatus: res.approvalStatus,
					repaymentWay: res.repaymentWay,
					type: res.type,
					remark: res.remark,
					termType: res.termType,
					status: res.status,
				}
				this.loadDebtor()
				switch (res.type) {
					case Enum.Loan.Type.Car:
						this.loan.data.sub = {
							carBrand: res.sub.carBrand,
							purchasePrice: res.sub.purchasePrice,
							milage: res.sub.milage,
							evaluatePrice: res.sub.evaluatePrice,
							carFrontImageUrl: res.sub.carFrontImageUrl,
							carBackImageUrl: res.sub.carBackImageUrl,
							carMilageImageUrl: res.sub.carMilageImageUrl,
							carInsideImageUrl: res.sub.carInsideImageUrl,
							vehicleLicenseImageUrl: res.sub.vehicleLicenseImageUrl,
							inspectionLicenseImageUrl: res.sub.inspectionLicenseImageUrl,
						}
						break
					default: this.loan.data.sub = {}
				}
				this.initLoanForm()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.loanUnloading()
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
				debtorId: this.loan.data.debtorId,
				agentId: this.loan.data.agentId,
				object: this.loan.data.object,
				amount: this.loan.data.amount,
				interestRate: this.loan.data.interestRate,
				approvalStatus: this.loan.data.approvalStatus,
				repaymentWay: this.loan.data.repaymentWay,
				type: this.loan.data.type,
				remark: this.loan.data.remark,
				termType: this.loan.data.termType,
				status: this.loan.data.status,
			}
			switch (this.loan.data.type) {
				case Enum.Loan.Type.Car:
					this.initCarForm()
					break
				default:
			}
		},
		onClickUnlockLoan() {
			this.editLoan()
		},
		onClickResetLoan() {
			this.initLoanForm()
			this.uneditLoan()
		},
		onClickLockLoan() {
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
				carBrand: this.loan.data.sub.carBrand,
				purchasePrice: this.loan.data.sub.purchasePrice,
				milage: this.loan.data.sub.milage,
				evaluatePrice: this.loan.data.sub.evaluatePrice,
				carFrontImageUrl: this.loan.data.sub.carFrontImageUrl,
				carBackImageUrl: this.loan.data.sub.carBackImageUrl,
				carMilageImageUrl: this.loan.data.sub.carMilageImageUrl,
				carInsideImageUrl: this.loan.data.sub.carInsideImageUrl,
				vehicleLicenseImageUrl: this.loan.data.sub.vehicleLicenseImageUrl,
				inspectionLicenseImageUrl: this.loan.data.sub.inspectionLicenseImageUrl,
			}
		},
		onClickUnlockCar() {
			this.editCar()
		},
		onClickResetCar() {
			this.initCarForm()
			this.uneditCar()
		},
		onClickLockCar() {
			this.uneditCar()
		},

		// debtor
		debtorLoading() {
			this.debtor.isLoading = true
		},
		debtorUnLoading() {
			this.debtor.isLoading = false
		},
		loadDebtor() {
			this.debtorLoading()
			this.fetchDebtorProfile()
		},
		onClickDebtorDetail() {
			this.$router.push({
				name: 'debtor_detail',
				params: {
					debtor_id: this.debtor.data.profile.id,
				},
			})
		},
		async fetchDebtorProfile() {
			try {
				const res = await api.debtor.profile.fetch(this.loan.data.debtorId)
				this.debtor.data.profile = {
					id: res.id,
					realName: res.realName,
					gender: res.gender,
					birthday: res.birthday,
					primaryNumber: res.primaryNumber,
					alternativeNumber: res.alternativeNumber,
					remark: res.remark,
				}
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.debtorUnLoading()
				this.fetchDebtorIdentify()
			}
		},
		async fetchDebtorIdentify() {
			try {
				const res = await api.debtor.identify.fetch(this.loan.data.debtorId)
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
								debtor_id: this.loan.data.debtorId,
							},
						})
						break
					default: this.$Message.error(e.message)
				}
			}
		},
		// approval
		approvalLoading() {
			this.approval.list.isLoading = true
		},
		approvalUnloading() {
			this.approval.list.isLoading = false
		},
		loadApprovalComments() {
			this.approvalLoading()
			this.fetchApprovalComments()
		},
		async fetchApprovalComments() {
			try {
				this.approval.data = await api.loan.comment.fetchList(
					this.approval.list.pagesize,
					this.approval.list.page,
					this.approval.list.filters,
					this.approval.list.sortBy,
					this.$route.params.loan_id,
				)
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.approvalUnloading()
			}
		},

		// approval
		showApprovalModal() {
			this.approval.isModalVisible = true
		},
		hideApprovalModal() {
			this.approval.isModalVisible = false
		},
		loanApproving() {
			this.approval.isApproving = true
		},
		loanUnapproving() {
			this.approval.isApproving = false
		},
		loanDisapproving() {
			this.approval.isDisapproving = true
		},
		loanUndisapproving() {
			this.approval.isDisapproving = false
		},
		onClickCancelApprove() {
			this.hideApprovalModal()
		},
		onClickDisapprove() {
			const comment = {
				content: this.approval.form.content,
			}
			this.loanDisapproving()
			this.disapproveLoan(comment)
			// this.$refs.approvalForm.validate((valid) => { // BUG validate not work
			// 	if (valid) {
			// 	}
			// })
		},
		onClickApprove() {
			const comment = {
				content: this.approval.form.content,
			}
			this.loanApproving()
			this.approveLoan(comment)
			// this.$refs.approvalForm.validate((valid) => { // BUG validate not work
			// 	if (valid) {
			// 	}
			// })
		},
		async disapproveLoan(comment) {
			try {
				await api.loan.comment.add(comment, this.$route.params.loan_id)
				await api.loan.disapprove(this.$route.params.loan_id)
				this.hideApprovalModal()
				this.loadApprovalComments()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.loanUndisapproving()
			}
		},
		async approveLoan(comment) {
			try {
				await api.loan.comment.add(comment, this.$route.params.loan_id)
				await api.loan.approve(this.$route.params.loan_id)
				this.hideApprovalModal()
				this.loadApprovalComments()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.loanUnapproving()
			}
		},

		onClickImage() {
			console.log('upload img')
		},
	},
}
</script>

<style lang="less">
@import '../../styles/common.less';
@import '../../styles/public.less';
</style>
