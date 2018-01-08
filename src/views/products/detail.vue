<template>
	<section>
		<Row>
			<Col :span="16">
				<Card>
					<p slot="title">
						Profile
					</p>
					<div v-if="isEditVisible" slot="extra">
						<div v-if="!product.profile.isEditable">
							<Button type="text" @click="onClickEditProfile">编辑</Button>
						</div>
						<div v-else>
							<Button type="text" @click="onClickCancelProfile">取消</Button>
							<Button type="text" @click="onClickSaveProfile" :loading="product.profile.isSaving">保存</Button>
						</div>
					</div>
					<Form ref="profileForm" :model="product.profile.form" :rules="product.profile.rules" label-position="left" :label-width="product.profile.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="项目状态">
								<p>{{productStatus}}</p>
							</FormItem></Col>
							<Col :span="8"><FormItem label="项目类型">
								<p>{{productType}}</p>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="项目名称">
								<p v-if="!product.profile.isEditable">{{product.profile.form.name}}</p>
								<Input v-else v-model="product.profile.form.name" />
							</FormItem></Col>
							<Col :span="8"><FormItem label="项目标签">测试数据</FormItem></Col>
							<Col :span="8"><FormItem label="排名参数">
								<p v-if="!product.profile.isEditable">{{product.profile.form.rankingScore}}</p>
								<InputNumber v-else v-model="product.profile.form.rankingScore" :min="0" :max="9.99" :step="0.1"></InputNumber>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="项目备注">
								<p>{{product.profile.form.remark}}</p>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="创建时间">{{productCreateTime}}</FormItem></Col>
							<Col :span="8"><FormItem label="修改时间">{{productLastUpdateTime}}</FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">
						Finance
					</p>
					<div v-if="isEditVisible" slot="extra">
						<div v-if="!product.finance.isEditable">
							<Button type="text" @click="onClickEditFinance">编辑</Button>
						</div>
						<div v-else>
							<Button type="text" @click="onClickCancelFinance">取消</Button>
							<Button type="text" @click="onClickSaveFinance" :loading="product.finance.isSaving">保存</Button>
						</div>
					</div>
					<Form :model="product.finance.form" :rules="product.finance.rules" label-position="left" :label-width="product.finance.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="项目总额"><p>{{product.data.amount}}</p></FormItem></Col>
							<Col :span="8"><FormItem label="项目周期"><p>{{productTerm}}</p></FormItem></Col>
							<Col :span="8"><FormItem label="项目进度"><p>{{product.data.currentInvestment}}</p></FormItem></Col>
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
							<Col :span="8"><FormItem label="还款方式"><p>{{productRepayType}}</p></FormItem></Col>
							<Col :span="8"><FormItem label="计息方式"><p>{{productInterestWay}}</p></FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">
						Loan Information
					</p>
					<div slot="extra">
						<Button type="text" @click="onClickLoanDetail">详情</Button>
					</div>
					<Form :model="loan.form" label-position="left" :label-width="loan.labelWidth" inline>
						<Row>
							<Col :span="12"><FormItem label="借款人姓名">
								<p>{{loan.form.debtor.realName}}</p>
							</FormItem></Col>
							<Col :span="12"><FormItem label="身份证号码">
								<p>{{loan.form.debtor.idNumber}}</p>
							</FormItem></Col>
							<Col :span="12"><FormItem label="身份证住址">
								<p>{{loan.form.debtor.location}}</p>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="身份证正面">
								<Row><Col :span="18"><SafeImg :src="loan.form.debtor.frontImageUrl" type="certificate-md"></SafeImg></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="身份证背面">
								<Row><Col :span="18"><SafeImg :src="loan.form.debtor.backImageUrl" type="certificate-md"></SafeImg></Col></Row>
							</FormItem></Col>
						</Row>
						<div v-if="loan.form.type === Enum.Loan.Type.Car">
							<Row>
								<Col :span="12"><FormItem label="车辆型号">
									<p>{{loan.form.sub.car.carBrand}}</p>
								</FormItem></Col>
								<Col :span="12"><FormItem label="购买价格">
									<p>{{loan.form.sub.car.purchasePrice}}</p>
								</FormItem></Col>
							</Row>
							<Row>
								<Col :span="12"><FormItem label="行驶里程">
									<p>{{loan.form.sub.car.milage}}</p>
								</FormItem></Col>
								<Col :span="12"><FormItem label="评估价格">
									<p>{{loan.form.sub.car.evaluatePrice}}</p>
								</FormItem></Col>
							</Row>
							<Row>
								<Col :span="12"><FormItem label="车辆行驶证">
									<Row><Col :span="18"><SafeImg :src="loan.form.sub.car.vehicleLicenseImageUrl" type="certificate-md"></SafeImg></Col></Row>
								</FormItem></Col>
								<Col :span="12"><FormItem label="车辆检验证">
									<Row><Col :span="18"><SafeImg :src="loan.form.sub.car.inspectionLicenseImageUrl" type="certificate-md"></SafeImg></Col></Row>
								</FormItem></Col>
							</Row>
							<Row>
								<Col :span="12"><FormItem label="车辆正面照">
									<Row><Col :span="18"><SafeImg :src="loan.form.sub.car.carFrontImageUrl" type="photo-sm"></SafeImg></Col></Row>
								</FormItem></Col>
								<Col :span="12"><FormItem label="车辆背面照">
									<Row><Col :span="18"><SafeImg :src="loan.form.sub.car.carBackImageUrl" type="photo-sm"></SafeImg></Col></Row>
								</FormItem></Col>
							</Row>
							<Row>
								<Col :span="12"><FormItem label="车辆里程照">
									<Row><Col :span="18"><SafeImg :src="loan.form.sub.car.carMilageImageUrl" type="photo-sm"></SafeImg></Col></Row>
								</FormItem></Col>
								<Col :span="12"><FormItem label="车辆内饰照">
									<Row><Col :span="18"><SafeImg :src="loan.form.sub.car.carInsideImageUrl" type="photo-sm"></SafeImg></Col></Row>
								</FormItem></Col>
							</Row>
						</div>
					</Form>
				</Card>
			</Col>
			<Col :span="8" class="padding-left-10">
				<!-- TODO need add auth check -->
				<Card class="margin-bottom-10">
					<p slot="title">
						Control
					</p>
					<Row>
						<Col :span="4">
							<Button long>暂停</Button>
						</Col>
						<Col :span="4" :offset="1">
							<Button type="error" long>停止</Button>
						</Col>
					</Row>
				</Card>
				<Card>
					<p slot="title">
						Sale
					</p>
					<Form label-position="left" :label-width="sale.labelWidth">
						<FormItem label="上架状态">{{isOnSale}}</FormItem>
						<FormItem label="上架时间">{{publishTime}}</FormItem>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">
						Investment Record
					</p>
					<Table :data="investmentRecord.data" :columns="investmentRecord.columns"></Table>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">
						Approval
					</p>
					<Form :model="approval.form" label-position="left" :label-width="approval.labelWidth">
						<FormItem label="业务员">测试数据</FormItem>
						<FormItem label="评估内容">测试数据</FormItem>
						<FormItem label="审核员">测试数据</FormItem>
						<FormItem label="审核意见">测试数据</FormItem>
						<FormItem label="提交时间">测试数据</FormItem>
						<FormItem label="修改时间">测试数据</FormItem>
					</Form>
				</Card>
			</Col>
		</Row>
	</section>
</template>

<script>
import Cookies from 'js-cookie'
import { Loan, Car, LoanComment, Product, Debtor } from '../../models/data'
import util from '../../libs/util'
import Enum from '../../models/enum'

export default {
	name: 'product_detail',
	data() {
		const blank = {
			product: new Product(),
			debtor: new Debtor(),
			loan: new Loan(),
			car: new Car(),
			loanComment: new LoanComment(),
		}
		return {
			Enum,
			access: parseInt(Cookies.get('access'), 10),
			loanComment: blank.loanComment,
			product: {
				data: blank.product,
				profile: {
					labelWidth: 75,
					isLoading: false,
					isEditable: false,
					isSaving: false,
					form: {
						status: blank.product.status,
						type: blank.product.type,
						name: blank.product.name,
						tagId: blank.product.tagId,
						rankingScore: blank.product.rankingScore,
						remark: blank.product.remark,
						createTime: blank.product.createTime,
						lastUpdateTime: blank.product.lastUpdateTime,
					},
					rules: {},
				},
				finance: {
					labelWidth: 75,
					isLoading: false,
					isEditable: false,
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
			loan: {
				data: blank.loan,
				debtor: blank.debtor,
				labelWidth: 75,
				form: {
					debtor: {
						realName: blank.debtor.realName,
						idNumber: blank.debtor.idNumber,
						location: blank.debtor.location,
						frontImageUrl: blank.debtor.frontImageUrlBlur,
						backImageUrl: blank.debtor.backImageUrlBlur,
					},
					type: blank.loan.type,
					amount: blank.loan.amount,
					interestRate: blank.loan.interestRate,
					termType: blank.loan.termType,
					repaymentWay: blank.loan.repaymentWay,
					remark: blank.loan.remark,
					sub: {
						car: {
							carBrand: blank.car.carBrand,
							purchasePrice: blank.car.purchasePrice,
							milage: blank.car.milage,
							evaluatePrice: blank.car.evaluatePrice,
							vehicleLicenseImageUrl: blank.car.vehicleLicenseImageUrl,
							inspectionLicenseImageUrl: blank.car.inspectionLicenseImageUrl,
							carFrontImageUrl: blank.car.carFrontImageUrl,
							carBackImageUrl: blank.car.carBackImageUrl,
							carMilageImageUrl: blank.car.carMilageImageUrl,
							carInsideImageUrl: blank.car.carInsideImageUrl,
						},
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
		isControlVisible() {
			return this.access === Enum.Role.SuperAdmin
		},
		isEditVisible() {
			return this.access <= Enum.Role.Admin
		},
		isOnSale() {
			return this.product.isOnSale ? '已上架' : '未上架'
		},
		publishTime() {
			return this.product.publishTime // TODO for test
		},
		productStatus() {
			return util.getProductStatus(this, this.product.status)
		},
		productType() {
			return util.getLoanType(this, this.loan.type)
		},
		productCreateTime() {
			return this.product.createTime // TODO for test
		},
		productLastUpdateTime() {
			return this.product.lastUpdateTime // TODO for test
		},
		productTerm() {
			return util.getProductTermType(this, this.product.termType)
		},
		productRepayType() {
			return util.getLoanRepaymentWay(this, this.loan.repaymentWay)
		},
		productInterestWay() {
			return util.getProductInterestWay(this, this.product.interestWay)
		},
	},
	methods: {
		// main
		initPage() {
			this.loadProduct()
		},
		loadProduct() {
			this.profileLoading()
			this.financeLoading()
			this.loanLoading()
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
		initProfileForm() {
			this.profile.form = {
				status: this.product.status,
				type: this.product.type,
				name: this.product.name,
				tagId: this.product.tagId,
				rankingScore: this.product.rankingScore,
				remark: this.product.remark,
				createTime: this.product.createTime,
				lastUpdateTime: this.product.lastUpdateTime,
			}
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
			this.finance.isEditable = true
		},
		uneditFinance() {
			this.finance.isEditable = false
		},
		financeLoading() {
			this.finance.isLoading = true
		},
		financeUnloading() {
			this.finance.isLoading = false
		},
		initFinanceForm() {
			this.finance.form = {
				amount: this.product.amount,
				termType: this.product.termType,
				interestRateBase: this.product.interestRateBase,
				interestRateDelta: this.product.interestRateDelta,
				minInvestment: this.product.minInvestment,
				currentInvestment: this.product.currentInvestment,
				repaymentWay: this.loan.repaymentWay,
				interestWay: this.product.interestWay,
			}
		},
		// loan
		loanLoading() {
			this.loan
		},
		onClickLoanDetail() {
			this.$router.push({
				name: 'customer_detail',
				params: {
					customer_id: 1,
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
</style>
