<template>
	<section>
		<Row>
			<Col :span="16">
				<Card>
					<p slot="title">
						Profile
					</p>
					<div slot="extra">
						<div v-if="!profile.isEditable">
							<Button type="text" @click="onClickEditProfile" >编辑</Button>
						</div>
						<div v-else>
							<Button type="text" @click="onClickCancelProfile">取消</Button>
							<Button type="text" @click="onClickSaveProfile" :loading="profile.isSaving">保存</Button>
						</div>
					</div>
					<Form ref="profileForm" :model="profile.form" :rules="profile.rules" label-position="left" :label-width="profile.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="项目状态">
								<p v-if="!profile.isEditable">{{productStatus}}</p>
							</FormItem></Col>
							<Col :span="8"><FormItem label="项目类型">测试数据</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="项目名称">
								<p v-if="!profile.isEditable">{{profile.form.name}}</p>
								<Input v-else v-model="profile.form.name" />
							</FormItem></Col>
							<Col :span="8"><FormItem label="项目标签">测试数据</FormItem></Col>
							<Col :span="8"><FormItem label="排名参数">测试数据</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="项目描述">测试数据</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="创建时间">测试数据</FormItem></Col>
							<Col :span="8"><FormItem label="修改时间">测试数据</FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">
						Finance
					</p>
					<Form :model="finance.form" :rules="finance.rules" label-position="left" :label-width="finance.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="项目总额">测试数据</FormItem></Col>
							<Col :span="8"><FormItem label="项目周期">测试数据</FormItem></Col>
							<Col :span="8"><FormItem label="基础利率">测试数据</FormItem></Col>
							<Col :span="8"><FormItem label="附加利率">测试数据</FormItem></Col>
							<Col :span="8"><FormItem label="最小投资">测试数据</FormItem></Col>
							<Col :span="8"><FormItem label="项目进度">测试数据</FormItem></Col>
							<Col :span="8"><FormItem label="还款方式">测试数据</FormItem></Col>
							<Col :span="8"><FormItem label="计息方式">测试数据</FormItem></Col>
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
							<Col :span="12"><FormItem label="身份证正面">测试数据</FormItem></Col>
							<Col :span="12"><FormItem label="身份证背面">测试数据</FormItem></Col>
							<Col :span="12"><FormItem label="车辆行驶证">测试数据</FormItem></Col>
							<Col :span="12"><FormItem label="车辆检验证">测试数据</FormItem></Col>
							<Col :span="12"><FormItem label="车辆正面照">测试数据</FormItem></Col>
							<Col :span="12"><FormItem label="车辆背面照">测试数据</FormItem></Col>
							<Col :span="12"><FormItem label="车辆里程照">测试数据</FormItem></Col>
							<Col :span="12"><FormItem label="车辆内饰照">测试数据</FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
			<Col :span="8" class="padding-left-10">
				<Card>
					<p slot="title">
						Sale
					</p>
					<Form label-position="left" :label-width="sale.labelWidth">
						<FormItem label="上架状态">测试数据</FormItem>
						<FormItem label="上架时间">测试数据</FormItem>
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
import defaultProduct from './data'
import util from '../../libs/util'

export default {
	name: 'product_detail',
	data() {
		return {
			product: defaultProduct.testProduct,
			profile: {
				labelWidth: 75,
				isLoading: false,
				isEditable: false,
				isSaving: false,
				form: {
					status: defaultProduct.testProduct.status,
					type: defaultProduct.testProduct.type,
					name: defaultProduct.testProduct.name,
					tagId: defaultProduct.testProduct.tagId,
					rank: defaultProduct.testProduct.rank,
					description: defaultProduct.testProduct.description,
					createTime: defaultProduct.testProduct.createTime,
					lastUpdateTime: defaultProduct.testProduct.lastUpdateTime,
				},
				rules: {},
			},
			finance: {
				labelWidth: 75,
				isEditable: false,
				form: {
					totalAmount: defaultProduct.testProduct.totalAmount,
					termType: defaultProduct.testProduct.termType,
					interestRateBase: defaultProduct.testProduct.interestRateBase,
					interestRateDelta: defaultProduct.testProduct.interestRateDelta,
					minInvestment: defaultProduct.testProduct.minInvestment,
					currentInvestment: defaultProduct.testProduct.currentInvestment,
					repayType: defaultProduct.testProduct.repayType,
					interestWay: defaultProduct.testProduct.interestWay,
				},
				rules: {},
			},
			additionalInfo: {
				labelWidth: 75,
				form: {},
			},
			sale: {
				labelWidth: 75,
				isOnSale: defaultProduct.testProduct.isOnSale,
				publishTime: defaultProduct.testProduct.publishTime,
			},
			approval: {
				labelWidth: 75,
				data: defaultProduct.testProduct.approval,
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
		productStatus() {
			return util.getProductStatus(this.product.status)
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
		async updateProfile() {
		},
		async fetchProfile() {
		},
	},
}
</script>

<style lang="less">
@import '../../styles/common.less';
</style>
