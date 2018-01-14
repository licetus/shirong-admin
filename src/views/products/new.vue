<template>
	<section>
		<Row>
			<Col :span="16">
				<Card>
					<Spin v-if="product.profile.isLoading" size="large" fix></Spin>
					<p slot="title">
						基础信息
					</p>
					<div slot="extra">
						<div v-if="!product.profile.isEditable">
							<Button type="text" @click="onClickOpenLoanList">贷款列表</Button>
							<Button type="text" @click="onClickEditProfile">编辑</Button>
						</div>
						<div v-else>
							<Button type="text" @click="onClickOpenLoanList">贷款列表</Button>
							<Button type="text" @click="onClickCancelProfile">取消</Button>
							<Button type="text" @click="onClickSaveProfile" :loading="product.profile.isSaving">保存</Button>
						</div>
					</div>
					<Form ref="profileForm" :model="product.profile.form" :rules="product.profile.rules" label-position="left" :label-width="product.profile.labelWidth" inline>
						<Row>
							<Col :span="12"><FormItem label="项目名称">
								<p v-if="!product.profile.isEditable">{{product.profile.form.name}}</p>
								<Input v-else v-model="product.profile.form.name" />
							</FormItem></Col>
							<Col :span="12"><FormItem label="项目类型">
								<p>{{util.getLoanType(this, loan.data.main.type)}}</p>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="项目标签">测试数据</FormItem></Col>
							<Col :span="12"><FormItem label="排名参数">
								<p v-if="!product.profile.isEditable">{{product.profile.form.rankingScore}}</p>
								<InputNumber v-else v-model="product.profile.form.rankingScore" :min="0" :max="9.99" :step="0.1"></InputNumber>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="24"><FormItem label="项目备注">
								<p v-if="!product.profile.isEditable">{{product.profile.form.remark}}</p>
								<Input v-else v-model="product.profile.form.remark" type="textarea" :rows="1"/>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<Spin v-if="product.finance.isLoading" size="large" fix></Spin>
					<p slot="title">
						详细信息
					</p>
					<div slot="extra">
						<div v-if="!product.finance.isEditable">
							<Button type="text" @click="onClickEditFinance">编辑</Button>
						</div>
						<div v-else>
							<Button type="text" @click="onClickCancelFinance">取消</Button>
							<Button type="text" @click="onClickSaveFinance" :loading="product.finance.isSaving">保存</Button>
						</div>
					</div>
					<Form ref="financeForm" :model="product.finance.form" :rules="product.finance.rules" label-position="left" :label-width="product.finance.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="项目总额"><p>{{product.finance.form.amount}}</p></FormItem></Col>
							<Col :span="8"><FormItem label="项目周期"><p>{{util.getLoanTermType(this, loan.data.main.termType)}}</p></FormItem></Col>
							<Col :span="8"><FormItem label="贷款利率"><p>{{loan.data.main.interestRate}}</p></FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="基础利率">
								<p v-if="!product.finance.isEditable">{{product.finance.form.interestRateBase}}</p>
								<InputNumber v-else v-model="product.finance.form.interestRateBase" :min="0" :max="0.99" :step="0.01"></InputNumber>
							</FormItem></Col>
							<Col :span="8"><FormItem label="附加利率">
								<p v-if="!product.finance.isEditable">{{product.finance.form.interestRateDelta}}</p>
								<InputNumber v-else v-model="product.finance.form.interestRateDelta" :min="0" :max="0.99" :step="0.01"></InputNumber>
							</FormItem></Col>
							<Col :span="8"><FormItem label="最小投资">
								<p v-if="!product.finance.isEditable">{{product.finance.form.minInvestment}}</p>
								<InputNumber v-else v-model="product.finance.form.minInvestment" :min="0" :max="10000" :step="100"></InputNumber>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="还款方式"><p>{{util.getLoanRepaymentWay(this, loan.data.main.repaymentWay)}}</p></FormItem></Col>
							<Col :span="8"><FormItem label="计息方式">
								<p v-if="!product.finance.isEditable">{{util.getProductInterestWay(this, product.finance.form.interestWay) || '-'}}</p>
								<RadioGroup v-else v-model="product.finance.form.interestWay">
									<Radio :label="Enum.Product.InterestWay.ObjectCompleted">{{util.getProductInterestWay(this, Enum.Product.InterestWay.ObjectCompleted)}}</Radio>
								</RadioGroup>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card v-if="product.data.id" class="margin-top-10">
					<Spin v-if="loan.isLoading" size="large" fix></Spin>
					<p slot="title">
						借款人
					</p>
					<div slot="extra">
						<Button type="text" @click="onClickLoanDetail">详情</Button>
					</div>
					<Form :model="loan" label-position="left" :label-width="loan.labelWidth" inline>
						<Row>
							<Col :span="12"><FormItem label="借款人姓名">
								<p>{{loan.data.debtor.profile.realName}}</p>
							</FormItem></Col>
							<Col :span="12"><FormItem label="身份证号码">
								<p>{{loan.data.debtor.identify.idNumber}}</p>
							</FormItem></Col>
							<Col :span="12"><FormItem label="身份证住址">
								<p>{{loan.data.debtor.identify.location}}</p>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="身份证正面">
								<Row><Col :span="18"><SafeImg :src="loan.data.debtor.identify.frontImageUrl" type="certificate-md"></SafeImg></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="身份证背面">
								<Row><Col :span="18"><SafeImg :src="loan.data.debtor.identify.backImageUrl" type="certificate-md"></SafeImg></Col></Row>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
			<Col :span="8" class="padding-left-10">
				<!-- TODO need add auth check -->
				<Card class="margin-bottom-10">
					<p slot="title">
						操作
					</p>
					<Form>
						<FormItem>
							<Row>
								<Col :span="4">
									<!-- TODO need to handle reset -->
									<Button type="ghost">重置</Button>
								</Col>
								<Col :span="4" :offset="2">
									<Button type="primary" @click="onClickSubmitProduct" :loading="isSubmitting" :disabled="!this.product.data.id">提交</Button>
								</Col>
							</Row>
						</FormItem>
						<FormItem>
							<Button type="warning" @click="onClickOpenLoanList">重新选择贷款</Button>
						</FormItem>
					</Form>
				</Card>
				<Card class="margin-top-10" v-if="loan.data.main.type === Enum.Loan.Type.Car">
					<Spin v-if="loan.isLoading" size="large" fix></Spin>
					<p slot="title">
						车辆信息
					</p>
					<div slot="extra">
						<Button type="text" @click="onClickLoanDetail">详情</Button>
					</div>
					<Form :model="loan" label-position="left" :label-width="loan.labelWidth" inline>
						<Row>
							<Col :span="12"><FormItem label="车辆型号">
								<p>{{loan.data.sub.car.carBrand}}</p>
							</FormItem></Col>
							<Col :span="12"><FormItem label="购买价格">
								<p>{{loan.data.sub.car.purchasePrice}}</p>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="行驶里程">
								<p>{{loan.data.sub.car.milage}}</p>
							</FormItem></Col>
							<Col :span="12"><FormItem label="评估价格">
								<p>{{loan.data.sub.car.evaluatePrice}}</p>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="24"><FormItem label="备注">
								<p>{{loan.data.remark}}</p>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="车辆行驶证">
								<Row><Col :span="18"><SafeImg :src="util.generateImageUrl(loan.data.sub.car.vehicleLicenseImageUrl)" type="certificate-md"></SafeImg></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="车辆检验证">
								<Row><Col :span="18"><SafeImg :src="util.generateImageUrl(loan.data.sub.car.inspectionLicenseImageUrl)" type="certificate-md"></SafeImg></Col></Row>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="车辆正面照">
								<Row><Col :span="18"><SafeImg :src="util.generateImageUrl(loan.data.sub.car.carFrontImageUrl)" type="photo-sm"></SafeImg></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="车辆背面照">
								<Row><Col :span="18"><SafeImg :src="util.generateImageUrl(loan.data.sub.car.carBackImageUrl)" type="photo-sm"></SafeImg></Col></Row>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="车辆里程照">
								<Row><Col :span="18"><SafeImg :src="util.generateImageUrl(loan.data.sub.car.carMilageImageUrl)" type="photo-sm"></SafeImg></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="车辆内饰照">
								<Row><Col :span="18"><SafeImg :src="util.generateImageUrl(loan.data.sub.car.carInsideImageUrl)" type="photo-sm"></SafeImg></Col></Row>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
		</Row>

		<Modal v-model="loans.isModalVisible" class="table-modal" width="75">
			<Row class="modal-header-row" type="flex" justify="space-between">
				<Col>
					<Row type="flex">
						<Col>
							<Input v-model="loans.search.val" placeholder="请输入搜索内容..." @on-enter="onClickSearchLoan">
								<Select v-model="loans.search.key" slot="prepend" style="width: 75px">
									<template v-for="(item, index) of searchOptions">
										<Option :value="item.key" :label="item.title"></Option>
									</template>
								</Select>
								<Button slot="append" icon="ios-search" @click="onClickSearchLoan" :loading="loans.list.isLoading"></Button>
							</Input>
						</Col>
						<Col>
							<Button type="text" @click="onClickResetList" :loading="loans.list.isLoading">重置</Button>
						</Col>
					</Row>
				</Col>
				<Col>
					<Button type="text" @click="onClickNewLoan">新增贷款<Icon class="margin-left-10" type="plus-round"></Icon></Button>
				</Col>
			</Row>
			<Table
				:loading="loans.list.isLoading"
				:data="loans.data"
				:columns="loans.columns"
				@on-row-click="onClickRow">
			</Table>
			<div slot="footer"></div>
		</Modal>
	</section>
</template>

<script>
import Cookies from 'js-cookie'
import { Loan, Car, Product, Debtor } from '../../models/data'
import util from '../../libs/util'
import api from '../../libs/api'
import Enum from '../../models/enum'

export default {
	name: 'product_new',
	data() {
		const blank = {
			product: new Product(),
			debtor: new Debtor(),
			loan: new Loan(),
			car: new Car(),
		}
		return {
			Enum,
			util,
			access: parseInt(Cookies.get('access'), 10),
			isSubmitting: false,
			product: {
				data: blank.product,
				profile: {
					labelWidth: 75,
					isLoading: false,
					isEditable: true,
					isSaving: false,
					form: {
						name: blank.product.name,
						tagId: blank.product.tagId,
						rankingScore: blank.product.rankingScore,
						remark: blank.product.remark,
					},
					rules: {},
				},
				finance: {
					labelWidth: 75,
					isLoading: false,
					isEditable: true,
					isSaving: false,
					form: {
						amount: blank.product.amount,
						interestRateBase: blank.product.interestRateBase,
						interestRateDelta: blank.product.interestRateDelta,
						minInvestment: blank.product.minInvestment,
						currentInvestment: blank.product.currentInvestment,
						repaymentWay: blank.loan.repaymentWay,
						termType: blank.product.termType,
						interestWay: blank.product.interestWay,
					},
					rules: {},
				},
			},
			loans: {
				isModalVisible: false,
				search: {
					key: 'object',
					val: '',
					maxLength: 10,
				},
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
						name: 'id',
						title: '编号',
						key: 'id',
						searchable: true,
					},
					{
						name: 'type',
						title: '类型',
						key: 'type',
						searchable: true,
						render: (h, params) => h('p', util.getLoanType(this, params.row.type) || '-'),
					},
					{
						name: 'object',
						title: '标的',
						key: 'object',
						searchable: true,
					},
					{
						name: 'amount',
						title: '金额',
						key: 'amount',
						searchable: true,
					},
					{
						name: 'interestRate',
						title: '利率',
						key: 'interestRate',
					},
					{
						name: 'debtorName',
						title: '借款人',
						key: 'debtorName',
						searchable: true,
					},
					{
						name: 'debtorNumber',
						title: '手机',
						key: 'debtorNumber',
						searchable: true,
					},
					{
						name: 'remark',
						title: '备注',
						key: 'remark',
						searchable: true,
					},
				],
			},
			loan: {
				labelWidth: 75,
				isLoading: false,
				data: {
					debtor: blank.debtor,
					main: blank.loan,
					sub: {
						car: blank.car,
					},
				},
			},
			sale: {
				labelWidth: 75,
				isOnSale: blank.product.isOnSale,
				publishTime: blank.product.publishTime,
			},
			approval: {
				labelWidth: 75,
				data: blank.product.approval,
			},
			investmentRecord: {
				data: [
					{
						username: '15996496248',
						amount: 10000,
						createTime: '2018-1-10',
					},
					{
						username: '15996496248',
						amount: 10000,
						createTime: '2018-1-10',
					},
					{
						username: '15996496248',
						amount: 10000,
						createTime: '2018-1-10',
					},
				],
				columns: [
					{
						name: 'investor',
						title: '投资人',
						key: 'username',
					},
					{
						name: 'amount',
						title: '金额',
						key: 'amount',
						align: 'right',
					},
				],
			},
		}
	},
	computed: {
		searchOptions() {
			const list = []
			this.loans.columns.forEach((item) => {
				if (item.searchable) list.push({ key: item.key, title: item.title })
			})
			return list
		},
	},
	mounted() {
		this.initPage()
	},
	methods: {
		// main
		initPage() {
			this.onClickOpenLoanList()
		},
		productSubmit() {
			this.isSubmitting = true
		},
		productUnsubmit() {
			this.isSubmitting = false
		},
		onClickSubmitProduct() {
			const profile = this.$refs.profileForm.validate(valid => valid)
			const finance = this.$refs.profileForm.validate(valid => valid)
			if (profile && finance) {
				const product = {
					id: this.product.data.id,
					amount: this.product.finance.form.amount,
					termType: this.loan.data.main.termType,
					name: this.product.profile.form.name,
					remark: this.product.profile.form.remark,
					tagId: this.product.profile.form.tagId,
					interestRateBase: this.product.finance.form.interestRateBase,
					interestRateDelta: this.product.finance.form.interestRateDelta,
					minInvestment: this.product.finance.form.minInvestment,
					interestWay: this.product.finance.form.interestWay,
				}
				this.productSubmit()
				this.addProduct(product)
			}
		},
		async addProduct(product) {
			try {
				const res = await api.product.add(product, this.product.data.id)
				util.closeCurrentPage(this.$store, this.$route.name, () => {
					this.$router.push({
						name: 'product_detail',
						params: {
							product_id: res,
						},
					})
				})
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.productUnsubmit()
			}
		},
		// loans
		showLoansModal() {
			this.loans.isModalVisible = true
		},
		hideLoansModal() {
			this.loans.isModalVisible = false
		},
		listLoading() {
			this.loans.list.isLoading = true
		},
		listUnloading() {
			this.loans.list.isLoading = false
		},
		generateSearchFilters() {
			this.loans.list.filters = `${this.loans.search.key} LIKE '%${this.loans.search.val}%'`
		},
		onClickOpenLoanList() {
			this.showLoansModal()
			this.listLoading()
			this.fetchLoanList()
		},
		onClickSearchLoan() {
			if (this.loans.search.val && util.inputLengthCheck(this.loans.search.val, this.loans.search.maxLength, this)) {
				this.generateSearchFilters()
				this.listLoading()
				this.fetchLoanList()
			}
		},
		onClickResetList() {
			this.loans.list.filters = ''
			this.listLoading()
			this.fetchLoanList()
		},
		onClickNewLoan() {
			this.$router.push({
				name: 'loan_new',
			})
			this.hideLoansModal()
		},
		onClickRow(params) {
			this.hideLoansModal()
			this.initLoan(params.id)
			this.loadLoan()
		},
		async fetchLoanList() {
			try {
				const res = await api.loan.fetchAvailableList(
					this.loans.list.pagesize,
					this.loans.list.page,
					this.loans.list.filters,
					this.loans.list.orderBy,
				)
				this.loans.data = res
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.listUnloading()
			}
		},

		// profile
		onClickEditProfile() {
			this.editProfile()
		},
		onClickCancelProfile() {
			this.initProfileForm()
			this.uneditProfile()
		},
		onClickSaveProfile() {
			this.uneditProfile()
		},
		editProfile() {
			this.product.profile.isEditable = true
		},
		uneditProfile() {
			this.product.profile.isEditable = false
		},
		profileLoading() {
			this.product.profile.isLoading = true
		},
		profileUnloading() {
			this.product.profile.isLoading = false
		},
		initProfileForm() {
			this.product.profile.form = {
				name: this.loan.data.main.object,
				tagId: this.product.data.tagId,
				rankingScore: this.product.data.rankingScore,
				remark: this.product.data.remark,
			}
		},
		updateProduct() {
			this.initProfileForm()
			this.profileUnloading()
			this.initFinanceForm()
			this.financeUnloading()
		},
		// finance
		onClickEditFinance() {
			this.editFinance()
		},
		onClickCancelFinance() {
			this.initFinanceForm()
			this.uneditFinance()
		},
		onClickSaveFinance() {
			this.uneditFinance()
		},
		editFinance() {
			this.product.finance.isEditable = true
		},
		uneditFinance() {
			this.product.finance.isEditable = false
		},
		financeLoading() {
			this.product.finance.isLoading = true
		},
		financeUnloading() {
			this.product.finance.isLoading = false
		},
		initFinanceForm() {
			this.product.finance.form = {
				amount: this.loan.data.main.amount,
				termType: this.loan.data.main.termType,
				interestRateBase: this.product.data.interestRateBase,
				interestRateDelta: this.product.data.interestRateDelta,
				minInvestment: this.product.data.minInvestment,
			}
		},
		// loan
		loanLoading() {
			this.loan.isLoading = true
		},
		loanUnloading() {
			this.loan.isLoading = false
		},
		initLoan(id) {
			this.product.data.id = id
		},
		loadLoan() {
			this.loanLoading()
			this.profileLoading()
			this.financeLoading()
			this.fetchLoan()
		},
		async fetchLoan() {
			try {
				const loan = await api.loan.fetch(this.product.data.id)
				this.loan.data.main = {
					id: loan.id,
					debtorId: loan.debtorId,
					agentId: loan.agentId,
					object: loan.object,
					amount: loan.amount,
					interestRate: loan.interestRate,
					approvalStatus: loan.approvalStatus,
					repaymentWay: loan.repaymentWay,
					type: loan.type,
					remark: loan.remark,
					termType: loan.termType,
					status: loan.status,
				}
				switch (loan.type) {
					case Enum.Loan.Type.Car:
						this.loan.data.sub.car = {
							id: loan.sub.id,
							carBrand: loan.sub.carBrand,
							purchasePrice: loan.sub.purchasePrice,
							milage: loan.sub.milage,
							evaluatePrice: loan.sub.evaluatePrice,
							carFrontImageUrl: loan.sub.carFrontImageUrl,
							carBackImageUrl: loan.sub.carBackImageUrl,
							carMilageImageUrl: loan.sub.carMilageImageUrl,
							carInsideImageUrl: loan.sub.carInsideImageUrl,
							vehicleLicenseImageUrl: loan.sub.vehicleLicenseImageUrl,
							inspectionLicenseImageUrl: loan.sub.inspectionLicenseImageUrl,
						}
						break
					default:
				}
				this.updateProduct()
				try {
					const debtorProfile = await api.debtor.profile.fetch(loan.debtorId)
					this.loan.data.debtor.profile = {
						id: debtorProfile.id,
						birthday: debtorProfile.birthday,
						creatorId: debtorProfile.creatorId,
						realName: debtorProfile.realName,
						gender: debtorProfile.gender,
						primaryNumber: debtorProfile.primaryNumber,
						alternativeNumber: debtorProfile.alternativeNumber,
						remark: debtorProfile.remark,
					}
					const debtorIdentify = await api.debtor.identify.fetch(loan.debtorId)
					this.loan.data.debtor.identify = {
						id: debtorIdentify.id,
						idNumber: debtorIdentify.idNumber,
						frontImageUrl: debtorIdentify.frontImageUrl,
						frontBlurImageUrl: debtorIdentify.frontBlurImageUrl,
						backImageUrl: debtorIdentify.backImageUrl,
						backBlurImageUrl: debtorIdentify.backBlurImageUrl,
						location: debtorIdentify.location,
					}
				} catch (e) {
					this.$Message.error(e.message)
				}
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.loanUnloading()
			}
		},
		onClickLoanDetail() {
			this.$router.push({
				name: 'loan_detail',
				params: {
					loan_id: this.product.data.id,
				},
			})
		},
		// async updateProfile() {
		// },
		// async fetchProfile() {
		// },
	},
}
</script>

<style lang="less">
@import '../../styles/common.less';
@import '../../styles/public.less';
</style>
