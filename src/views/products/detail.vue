<template>
	<section>
		<Row>
			<Col :span="16">
				<Card>
					<p slot="title">
						Profile
					</p>
					<div v-if="isEditVisible" slot="extra">
						<div v-if="!profile.isEditable">
							<Button type="text" @click="onClickEditProfile">编辑</Button>
						</div>
						<div v-else>
							<Button type="text" @click="onClickCancelProfile">取消</Button>
							<Button type="text" @click="onClickSaveProfile" :loading="profile.isSaving">保存</Button>
						</div>
					</div>
					<Form ref="profileForm" :model="profile.form" :rules="profile.rules" label-position="left" :label-width="profile.labelWidth" inline>
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
								<p v-if="!profile.isEditable">{{profile.form.name}}</p>
								<Input v-else v-model="profile.form.name" />
							</FormItem></Col>
							<Col :span="8"><FormItem label="项目标签">测试数据</FormItem></Col>
							<Col :span="8"><FormItem label="排名参数">
								<p v-if="!profile.isEditable">{{profile.form.rank}}</p>
								<InputNumber v-else v-model="profile.form.rank" :min="0" :max="9.99" :step="0.1"></InputNumber>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="项目描述">测试数据</FormItem></Col>
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
						<div v-if="!finance.isEditable">
							<Button type="text" @click="onClickEditFinance">编辑</Button>
						</div>
						<div v-else>
							<Button type="text" @click="onClickCancelFinance">取消</Button>
							<Button type="text" @click="onClickSaveFinance" :loading="finance.isSaving">保存</Button>
						</div>
					</div>
					<Form :model="finance.form" :rules="finance.rules" label-position="left" :label-width="finance.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="项目总额"><p>{{product.loanAmount}}</p></FormItem></Col>
							<Col :span="8"><FormItem label="项目周期"><p>{{productTerm}}</p></FormItem></Col>
							<Col :span="8"><FormItem label="项目进度"><p>{{product.currentInvestment}}</p></FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="基础利率">
								<p v-if="!finance.isEditable">{{finance.form.interestRateBase}}</p>
								<InputNumber v-else v-model="finance.form.interestRateBase" :min="0" :max="0.99" :step="0.01"></InputNumber>
							</FormItem></Col>
							<Col :span="8"><FormItem label="附加利率">
								<p v-if="!finance.isEditable">{{finance.form.interestRateDelta}}</p>
								<InputNumber v-else v-model="finance.form.interestRateDelta" :min="0" :max="0.99" :step="0.01"></InputNumber>
							</FormItem></Col>
							<Col :span="8"><FormItem label="最小投资">
								<p v-if="!finance.isEditable">{{finance.form.minInvestment}}</p>
								<InputNumber v-else v-model="finance.form.minInvestment" :min="0" :max="10000" :step="100"></InputNumber>
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
						Additional Info
					</p>
					<Form :model="additionalInfo.form" :rules="additionalInfo.rules" label-position="left" :label-width="additionalInfo.labelWidth" inline>
						<Row>
							<Col :span="12"><FormItem label="借款人姓名">测试数据</FormItem></Col>
							<Col :span="12"><FormItem label="身份证号码">测试数据</FormItem></Col>
							<Col :span="12"><FormItem label="身份证住址">测试数据</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="身份证正面">
								<Row><Col :span="18"><Picture src="" type="certificate-md"></Picture></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="身份证背面">
								<Row><Col :span="18"><Picture src="" type="certificate-md"></Picture></Col></Row>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="车辆行驶证">
								<Row><Col :span="18"><Picture src="" type="certificate-md"></Picture></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="车辆检验证">
								<Row><Col :span="18"><Picture src="" type="certificate-md"></Picture></Col></Row>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="车辆正面照">
								<Row><Col :span="18"><Picture src="" type="photo-sm"></Picture></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="车辆背面照">
								<Row><Col :span="18"><Picture src="" type="photo-sm"></Picture></Col></Row>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="车辆里程照">
								<Row><Col :span="18"><Picture src="" type="photo-sm"></Picture></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="车辆内饰照">
								<Row><Col :span="18"><Picture src="" type="photo-sm"></Picture></Col></Row>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
			<Col :span="8" class="padding-left-10">
				<!-- TODO need add auth check -->
				<Card v-if="isControlVisible" class="margin-bottom-10">
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
import { Product } from '../../models/test-data'
import util from '../../libs/util'
import Enum from '../../models/enum'

export default {
	name: 'product_detail',
	data() {
		const blankProduct = new Product()
		return {
			access: parseInt(Cookies.get('access'), 10),
			product: blankProduct,
			profile: {
				labelWidth: 75,
				isLoading: false,
				isEditable: false,
				isSaving: false,
				form: {
					status: blankProduct.status,
					type: blankProduct.type,
					name: blankProduct.name,
					tagId: blankProduct.tagId,
					rank: blankProduct.rank,
					description: blankProduct.description,
					createTime: blankProduct.createTime,
					lastUpdateTime: blankProduct.lastUpdateTime,
				},
				rules: {},
			},
			finance: {
				labelWidth: 75,
				isLoading: false,
				isEditable: false,
				isSaving: false,
				form: {
					totalAmount: blankProduct.totalAmount,
					termType: blankProduct.termType,
					interestRateBase: blankProduct.interestRateBase,
					interestRateDelta: blankProduct.interestRateDelta,
					minInvestment: blankProduct.minInvestment,
					currentInvestment: blankProduct.currentInvestment,
					repayType: blankProduct.repayType,
					interestWay: blankProduct.interestWay,
				},
				rules: {},
			},
			additionalInfo: {
				labelWidth: 75,
				form: {},
			},
			sale: {
				labelWidth: 75,
				isOnSale: blankProduct.isOnSale,
				publishTime: blankProduct.publishTime,
			},
			approval: {
				labelWidth: 75,
				data: blankProduct.approval,
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
			return util.getProductStatus(this.product.status, this)
		},
		productType() {
			return util.getProductType(this.product.type, this)
		},
		productCreateTime() {
			return this.product.createTime // TODO for test
		},
		productLastUpdateTime() {
			return this.product.lastUpdateTime // TODO for test
		},
		productTerm() {
			return util.getProductTermType(this.product.termType, this)
		},
		productRepayType() {
			return util.getProductRepayType(this.product.repayType, this)
		},
		productInterestWay() {
			return util.getProductInterestWay(this.product.interestWay, this)
		},
	},
	methods: {
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
				rank: this.product.rank,
				description: this.product.description,
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
				totalAmount: this.product.totalAmount,
				termType: this.product.termType,
				interestRateBase: this.product.interestRateBase,
				interestRateDelta: this.product.interestRateDelta,
				minInvestment: this.product.minInvestment,
				currentInvestment: this.product.currentInvestment,
				repayType: this.product.repayType,
				interestWay: this.product.interestWay,
			}
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
