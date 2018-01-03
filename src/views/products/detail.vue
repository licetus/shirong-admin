<template>
	<section>
		<Row>
			<Col :span="8" class="padding-right-5">
				<Card>
					<p slot="title">
						Profile
					</p>
					<Form :model="profileForm" :rules="profileFormRules" label-position="left" :label-width="labelWidth.profile">
						<FormItem label="项目状态"></FormItem>
						<FormItem label="项目类型"></FormItem>
						<FormItem label="项目名称"></FormItem>
						<FormItem label="项目标签"></FormItem>
						<FormItem label="项目描述"></FormItem>
						<FormItem label="排名参数"></FormItem>
						<FormItem label="创建时间"></FormItem>
						<FormItem label="修改时间"></FormItem>
					</Form>
				</Card>
			</Col>
			<Col :span="8" class="padding-left-5">
				<Card>
					<p slot="title">
						Finance
					</p>
					<Form :model="financeForm" :rules="financeFormRules" label-position="left" :label-width="labelWidth.finance">
						<FormItem label="项目总额"></FormItem>
						<FormItem label="项目周期"></FormItem>
						<FormItem label="基础利率"></FormItem>
						<FormItem label="附加利率"></FormItem>
						<FormItem label="最小投资"></FormItem>
						<FormItem label="项目进度"></FormItem>
						<FormItem label="还款方式"></FormItem>
						<FormItem label="计息方式"></FormItem>
					</Form>
				</Card>
			</Col>
			<Col :span="8" class="padding-left-10">
				<Card>
					<p slot="title">
						Sale
					</p>
					<Form label-position="left" :label-width="labelWidth.sale">
						<FormItem label="上架状态"></FormItem>
						<FormItem label="上架时间"></FormItem>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">
						Approval
					</p>
					<Form :model="approvalForm" label-position="left" :label-width="labelWidth.approval">
						<FormItem label="审核员"></FormItem>
						<FormItem label="审核意见"></FormItem>
						<FormItem label="提交时间"></FormItem>
						<FormItem label="修改时间"></FormItem>
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
		}
	},
}
</script>

<style lang="less">
</style>
