<template>
	<section>
		<Row>
			<Col :span="16">
				<Card>
					<p slot="title">
						Profile
					</p>
					<Form :model="profileForm" :rules="profileFormRules" label-position="left" :label-width="labelWidth.profile" inline>
						<Row>
							<Col :span="8"><FormItem label="项目状态">测试数据</FormItem></Col>
							<Col :span="8"><FormItem label="项目类型">测试数据</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="项目名称">测试数据</FormItem></Col>
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
					<Form :model="financeForm" :rules="financeFormRules" label-position="left" :label-width="labelWidth.finance" inline>
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
					<Form :model="additionalInfoForm" :rules="additionalInfoFormRules" label-position="left" :label-width="labelWidth.additionalInfo" inline>
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
					<Form label-position="left" :label-width="labelWidth.sale">
						<FormItem label="上架状态">测试数据</FormItem>
						<FormItem label="上架时间">测试数据</FormItem>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">
						Investment Record
					</p>
					<Table :data="investmentList" :columns="investmentColumns"></Table>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">
						Approval
					</p>
					<Form :model="approvalForm" label-position="left" :label-width="labelWidth.approval">
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
export default {
	data() {
		return {
			labelWidth: {
				profile: 75,
				finance: 75,
				additionalInfo: 75,
				sale: 75,
				approval: 75,
			},
			profileForm: {
			},
			profileFormRules: {
			},
			financeForm: {
			},
			financeFormRules: {
			},
			approvalForm: {
			},
			investmentList: [
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
			investmentColumns: [
				{
					name: 'investor',
					title: '投资人',
					key: 'username',
				},
				{
					name: 'amount',
					title: '金额',
					key: 'amount',
				},
			],
		}
	},
}
</script>

<style lang="less">
</style>
